const express = require('express');
const router = express.Router(); 
const departmentsController = require('../controllers/departments.controller');
const auth = require('../middleware/auth');
const multer = require('multer');

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

router
    .get('/', auth, departmentsController.getAll )
    .get('/:id', auth, departmentsController.getById )
    .post('/', auth, departmentsController.create )
    .put('/:id', auth, departmentsController.updateById )
    .delete('/:id', auth, departmentsController.deleteById )
    .post('/upload', auth, upload.single('file'), departmentsController.uploadCsvFile( 1000 ) )

module.exports = router;
