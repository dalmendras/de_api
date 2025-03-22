const express = require('express');
const router = express.Router(); 
const hiredEmployeesController = require('../controllers/hired_employees.controller');
const auth = require('../middleware/auth');

router
    .get('/', auth, hiredEmployeesController.getAll )
    .get('/:id', auth, hiredEmployeesController.getById )
    .post('/', auth, hiredEmployeesController.create )
    .put('/:id', auth, hiredEmployeesController.updateById )
    .delete('/:id', auth, hiredEmployeesController.deleteById )

module.exports = router;
