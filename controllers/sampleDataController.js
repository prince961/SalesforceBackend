const logApiRequest = require('./logApiRequestController')
const {pool} = require('../config/dbConn');

const getTable = async (req, res) => {
    
    try {
        const result = await pool.query('SELECT distinct Zone FROM "FY 21 table 1"');
        res.json(result.rows);
        const responseTime = new Date()-req.reqStartTime;
        logApiRequest(req,'200',responseTime);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        const responseTime = new Date()-req.reqStartTime;
        logApiRequest(req,'500',responseTime);

    }
};

const getColumnNames = async (req, res) => {
    console.log(req.query.Columns);
    try {
        const result = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'FY 21 table 1'");
        res.json(result.rows);
        const responseTime = new Date()-req.reqStartTime;
        logApiRequest(req,'200',responseTime);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        const responseTime = new Date()-req.reqStartTime;
        logApiRequest(req,'500',responseTime);

    }
};

module.exports ={getTable,getColumnNames};