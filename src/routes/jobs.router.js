const express = require('express');
const router = express.Router(); 
const jobsController = require('../controllers/jobs.controller');
const auth = require('../middleware/auth');

router
    .get('/', auth, jobsController.getAll )
    .get('/:id', auth, jobsController.getById )
    .post('/', auth, jobsController.create )
    .put('/:id', auth, jobsController.updateById )
    .delete('/:id', auth, jobsController.deleteById )

module.exports = router;
