const express = require('express');
const router = express.Router();
const leadController = require('../../controllers/leadController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), leadController.createNewLead)
    .put(leadController.updateLead)
    

module.exports = router;