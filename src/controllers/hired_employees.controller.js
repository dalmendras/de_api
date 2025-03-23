const HiredEmployeesService = require('../services/hired_employees.service');
const service = new HiredEmployeesService();
const uploadCsv = require('../utils/uploadCsv');
const CustomService = require('../services/custom.service');
const customService = new CustomService();

const create = async ( req, res ) => {
    try { 
        const response = await service.create(req.body);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
        console.log(error);
    }
}

const getAll = async ( req, res ) => {
    try {
        const response = await service.find();
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
        console.log(error);
    }
}

const getById = async ( req, res ) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).send({ success: false, message: 'Invalid ID type' });
        }
        const response = await service.findOne(id);
        if (!response) {
            res.status(404).send({ success: false, message: 'Not Found' });
        } else {
            res.json(response);
        }
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
        console.log(error);
    }
}

const updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await service.update(id,body);
        if (response) {
            return res.json({   success: true, 
                                message: 'Updated',
                            });
        } else {
            return res.status(400).send({ success: false, message: 'Update failed' });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
        console.log(error);
    }
}

const deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await service.delete(id);
        if (response) {
            return res.json({   success: true, 
                                message: 'Deleted',
                            });
        } else {
            return res.status(400).send({ success: false, message: 'Delete failed' });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
        console.log(error);
    }
}

const uploadCsvFile = (limitRows) => async (req, res) => {
    const headers = ['id', 'name', 'datetime', 'department_id', 'job_id'];

    try {
        // Note: We're no longer passing res to uploadCsv
        const results = await uploadCsv(req, headers, limitRows, 'hired_employees');
        
        // Check if results is an array before passing to fileLoad
        if (!Array.isArray(results)) {
            return res.status(500).send({
                success: false,
                message: 'CSV parsing failed. Expected an array of results.'
            });
        }
        
        const resController = await service.fileLoad(results);
        return res.status(200).send(resController);
    } catch (error) {
        console.error('Error processing file:', error);
        
        // Handle specific error cases
        if (error.message === 'Api Exceeded') {
            return res.status(413).send({
                success: false, 
                message: 'File exceeds maximum row limit of 1000 rows. Split file into smaller files and try again.'
            });
        } else if (error.message === 'No file uploaded.') {
            return res.status(400).send({
                success: false,
                message: 'No file uploaded.'
            });
        } else if (error.message === 'Invalid file type. Only .csv files are allowed.') {
            return res.status(400).send({
                success: false,
                message: 'Invalid file type. Only .csv files are allowed.'
            });
        } else if (error.message === 'No data found in file.') {
            return res.status(400).send({
                success: false,
                message: 'The uploaded file contains no data.'
            });
        } else {
            return res.status(500).send({
                success: false, 
                message: 'Error saving data to the database: ' + error.message
            });
        }
    }
};


const customEmployeeQuarter = async (req, res) => {
    try {
        const query =   `SELECT
                        d.department,
                        j.job,
                        COUNT(CASE WHEN EXTRACT(QUARTER FROM he.datetime::timestamp) = 1 THEN he.id ELSE NULL END)::int AS Q1,
                        COUNT(CASE WHEN EXTRACT(QUARTER FROM he.datetime::timestamp) = 2 THEN he.id ELSE NULL END)::int AS Q2,
                        COUNT(CASE WHEN EXTRACT(QUARTER FROM he.datetime::timestamp) = 3 THEN he.id ELSE NULL END)::int AS Q3,
                        COUNT(CASE WHEN EXTRACT(QUARTER FROM he.datetime::timestamp) = 4 THEN he.id ELSE NULL END)::int AS Q4
                        FROM hired_employees he
                        INNER JOIN departments d ON d.id = he.department_id
                        INNER JOIN jobs j        ON j.id = he.job_id
                        WHERE EXTRACT(YEAR FROM he.datetime::timestamp) = 2021
                        GROUP BY 1, 2
                        ORDER BY 1, 2;`;
        const response = await customService.executeQuery(query);
        return res.json(response);
    } catch (error) {
        console.error("Error executing custom query:", error);
        return res.status(500).send({ 
            success: false, 
            message: error.message || 'An error occurred executing the query'
        });
    }
}

const customEmployeeDepartment = async (req, res) => {
    try {
        const query =   `SELECT
                        d.id,
                        d.department,
                        COUNT(he.id) as hired
                        FROM hired_employees he
                        INNER JOIN departments d ON d.id = he.department_id
                        WHERE EXTRACT(YEAR FROM he.datetime::timestamp) = 2021
                        GROUP BY 1, 2
                        HAVING COUNT(he.id) >= (
                                                    SELECT avg(count_dep) AS mean
                                                    FROM (
                                                            SELECT
                                                            d.department,
                                                            COUNT(he.id) as count_dep
                                                            FROM hired_employees he
                                                            INNER JOIN departments d ON d.id = he.department_id
                                                            WHERE EXTRACT(YEAR FROM he.datetime::timestamp) = 2021
                                                            GROUP BY 1) as dep_stat
                                                )
                        ORDER BY 3 DESC;`;
        const response = await customService.executeQuery(query);
        return res.json(response);
    } catch (error) {
        console.error("Error executing custom query:", error);
        return res.status(500).send({ 
            success: false, 
            message: error.message || 'An error occurred executing the query'
        });
    }
}

module.exports = {
    create, getAll, getById, updateById, deleteById, uploadCsvFile, customEmployeeQuarter, customEmployeeDepartment
};
