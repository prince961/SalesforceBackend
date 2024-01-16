const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeadSchema = new Schema({
    LeadName: {
        type: String,
        required: true
    },
    AccountName: {
        type: String
    },
    ContactLastName:{
        type: String
    },
    ContactFirstName:{
        type: String
    },
    ContactNumber:{
        type: Number,
    },
    Industry: String,
    LeadUUID:String,
    LeadID: Number,
    LeadCreationDate:Date,
    LastChangedDate: Date,
    LeadCreatedByID: String,
    LastChangedByID: String
});

module.exports = mongoose.model('Lead', LeadSchema);