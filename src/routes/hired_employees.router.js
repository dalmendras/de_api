const express = require('express');
const router = express.Router(); 
const hiredEmployeesController = require('../controllers/hired_employees.controller');
const auth = require('../middleware/auth');
const multer = require('multer');

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

router
    .get('/', auth, hiredEmployeesController.getAll )
    .get('/:id', auth, hiredEmployeesController.getById )
    .post('/', auth, hiredEmployeesController.create )
    .put('/:id', auth, hiredEmployeesController.updateById )
    .delete('/:id', auth, hiredEmployeesController.deleteById )
    .post('/upload', auth, upload.single('file'), hiredEmployeesController.uploadCsvFile( 1000 ) )
    .post('/upload_bigfile', auth, upload.single('file'), hiredEmployeesController.uploadCsvFile( 10000 ) )

module.exports = router;
