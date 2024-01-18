const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApiLogSchema = new Schema({
    
    RequestUUID:String,
    RequestSentBy: String,
    RequestReceivedDate: Date,
    RequestURL: String,
    ResponseTimeImMs: Number,
    ResponseCode: Number,
    RequestMethod: String,
    RequestOrigin: String
});

module.exports = mongoose.model('ApiLog', ApiLogSchema);
