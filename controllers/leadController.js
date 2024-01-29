const Lead = require('../model/Lead');
const {v4: uuid} = require('uuid');
const logApiRequest = require('./logApiRequestController')


const createNewLead= async(req, res)=>{

    try{
        //const newId = await getNextSequenceValue('LeadID');
        //console.log(newId);
        const newId = await getNextAvailableId();

        console.log("new ID:"+newId);
        const result = await Lead.create({
            LeadName:req.body.LeadName,
            AccountName:req.body.AccountName,
            ContactLastName:req.body.ContactLastName,
            ContactFirstName:req.body.ContactFirstName,
            ContactNumber:req.body.ContactNumber,
            Industry:req.body.Industry,
            LeadUUID: uuid(),
            LeadID: newId,
            LeadCreationDate: new Date(),
            LeadCreatedBy: req.user


        })
        res.status(201).json(result);
        const responseTime = new Date()-req.reqStartTime;
        logApiRequest(req,'200',responseTime);
    }catch(err){
        console.log(req.body)
        console.log(err.message);
        res.status(400).json(err.message)
        const responseTime = new Date()-req.reqStartTime;
        logApiRequest(req,'400',responseTime);

    }
}

async function getNextAvailableId() {
    const lastObj = await Lead.findOne({}, {}, { sort: { 'LeadID': -1 } });
    if (lastObj && lastObj.LeadID !== undefined) {
        console.log(lastObj);
        return lastObj.LeadID + 1;
    } else {
        return 1;
    }

  }

const updateLead = async(req, res)=>{
    if (!req?.body?.LeadID) {
        return res.status(400).json({ 'message': 'LeadID parameter is required.' });
    }
    const lead = await Lead.findOne({ LeadID: req.body.LeadID }).exec();
    if (!lead) {
        return res.status(204).json({ "message": `No Lead matches ID ${req.body.LeadID}.` });
    }
    
    if (req.body?.LeadName) lead.LeadName = req.body.LeadName;
    if (req.body?.AccountName) lead.AccountName=req.body.AccountName;
    if (req.body?.ContactLastName) lead.ContactLastName=req.body.ContactLastName;
    if (req.body?.ContactFirstName) lead.ContactFirstName=req.body.ContactFirstName;
    if (req.body?.ContactNumber) lead.ContactNumber=req.body.ContactNumber;
    if (req.body?.Industry) lead.Industry=req.body.Industry;
    lead.LastChangedByID = req.user;
    lead.LastChangedDate = new Date();
    
    const result = await lead.save();
    
    res.json(result);
    const responseTime = new Date()-req.reqStartTime;
    logApiRequest(req,'200',responseTime);
}

const getLeads = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort, filter } = req.query;

        // Parse query parameters
        const parsedPage = parseInt(page);
        const parsedLimit = parseInt(limit);

        // Build the query object based on filter
        const query = buildQuery(filter);

        // Execute the query with pagination and sorting
        const leads = await Lead.find(query)
            .sort(buildSort(sort))
            .skip((parsedPage - 1) * parsedLimit)
            .limit(parsedLimit);

        // Get the total count of leads (without pagination)
        const totalCount = await Lead.countDocuments(query);

        res.status(200).json({
            leads,
            total: totalCount,
            currentPage: parsedPage,
            totalPages: Math.ceil(totalCount / parsedLimit),
        });
        const responseTime = new Date()-req.reqStartTime;
        logApiRequest(req,'200',responseTime);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        const responseTime = new Date()-req.reqStartTime;
        logApiRequest(req,'500',responseTime);
    }
};

// Helper function to build the query based on filters
const buildQuery = (filter) => {
    // Implement your logic to build the query based on the filter
    // For simplicity, let's assume filter is an object with key-value pairs
    return filter || {};
};

// Helper function to build the sort object
const buildSort = (sort) => {
    // Implement your logic to build the sort object based on the sort parameter
    // For simplicity, let's assume sort is a string with the field name and direction
    return sort ? { [sort.split(':')[0]]: sort.split(':')[1] === 'desc' ? -1 : 1 } : {};

};

  
module.exports ={createNewLead, updateLead, getLeads};