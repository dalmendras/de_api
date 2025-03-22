const express = require('express');
const router = express.Router(); 
const departmentsController = require('../controllers/departments.controller');
const auth = require('../middleware/auth');

router
    .get('/', auth, departmentsController.getAll )
    .get('/:id', auth, departmentsController.getById )
    .post('/', auth, departmentsController.create )
    .put('/:id', auth, departmentsController.updateById )
    .delete('/:id', auth, departmentsController.deleteById )

module.exports = router;
