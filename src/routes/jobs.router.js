const express = require('express');
const router = express.Router(); 
const jobsController = require('../controllers/jobs.controller');
const auth = require('../middleware/auth');
const configureMulter = require('../utils/multerConfig');
const upload = configureMulter();

router
    .get('/', auth, jobsController.getAll )
    .get('/:id', auth, jobsController.getById )
    .post('/', auth, jobsController.create )
    .put('/:id', auth, jobsController.updateById )
    .delete('/:id', auth, jobsController.deleteById )
    .post('/upload', auth, upload.single('file'), jobsController.uploadCsvFile( 1000 ) )

module.exports = router;
