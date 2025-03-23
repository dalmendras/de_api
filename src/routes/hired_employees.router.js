const express = require('express');
const router = express.Router(); 
const hiredEmployeesController = require('../controllers/hired_employees.controller');
const auth = require('../middleware/auth');
const multer = require('multer');

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

router
    .get('/', auth, hiredEmployeesController.getAll )
    .get('/employee_quarter', auth, hiredEmployeesController.customEmployeeQuarter )
    .get('/employee_department', auth, hiredEmployeesController.customEmployeeDepartment )
    .get('/:id', auth, hiredEmployeesController.getById )
    .post('/', auth, hiredEmployeesController.create )
    .put('/:id', auth, hiredEmployeesController.updateById )
    .delete('/:id', auth, hiredEmployeesController.deleteById )
    .post('/upload', auth, upload.single('file'), hiredEmployeesController.uploadCsvFile( 1000 ) )

module.exports = router;
