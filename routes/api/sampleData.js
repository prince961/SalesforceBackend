const express = require('express');
const router = express.Router();
const sampleDataController = require('../../controllers/sampleDataController.js');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), sampleDataController.getTable)
    
    
router.route('/GetMetaData')
    .get(sampleDataController.getColumnNames)

module.exports = router;