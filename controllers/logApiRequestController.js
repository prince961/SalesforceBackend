const ApiLog = require('../model/ApiLog');

async function logApiRequest(req,resCode,responseTime) {
    const apiRequestLogEntry = new ApiLog({
    
      RequestUUID:req.uuid,
      RequestSentBy: req.user,
      RequestReceivedDate: req.reqStartTime,
      RequestURL: req.url,
      ResponseTimeImMs: responseTime,
      ResponseCode: resCode,
      RequestMethod: req.method,
      RequestOrigin: req.headers.origin

    });
  
    try {
      await apiRequestLogEntry.save();
      
    } catch (error) {
      
    }
  }
  
  module.exports = logApiRequest;
  