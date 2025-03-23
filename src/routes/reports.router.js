const express = require('express');
const router = express.Router(); 
const reportsController = require('../controllers/reports.controller');
const auth = require('../middleware/auth');

router
    .get('/employee_quarter', auth, reportsController.customEmployeeQuarter )
    .get('/employee_department', auth, reportsController.customEmployeeDepartment )

module.exports = router;
