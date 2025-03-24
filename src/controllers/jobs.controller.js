const JobsService = require('../services/jobs.service');
const service = new JobsService();
const uploadCsv = require('../utils/uploadCsv');


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
        if (error.message === 'Api Exceeded') {
            res.status(413).send({   success: false, 
                                     message: 'File exceeds maximum row limit of 1000 rows. Split file into smaller files and try again.',
                                 });
        } else {
            console.error('Error saving data to the database:', error);
            res.status(500).send({   success: false, 
                                    message: 'Error saving data to the database.',
                                });
        }
    }
}

const uploadCsvFile = (limitRows) => async (req, res) => {
    
    const headers = ['id', 'job'];

    try {
        const results = await uploadCsv(req, headers, limitRows, 'jobs');
        
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

module.exports = {
    create, getAll, getById, updateById, deleteById, uploadCsvFile
};
