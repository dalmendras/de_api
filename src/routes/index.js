const express = require('express');

const departmentsRouter = require('./departments.router');
const jobsRouter = require('./jobs.router');
const hiredEmployeesRouter = require('./hired_employees.router');
const reportsRouter = require('./reports.router');

function routerApi(app) {
    const router = express.Router();
  
    // Base path
    app.use('/api/v1', router);

    // Tables
    router.use('/departments', departmentsRouter);
    router.use('/jobs', jobsRouter);
    router.use('/hired_employees', hiredEmployeesRouter);
    router.use('/reports', reportsRouter);
}

module.exports = routerApi;