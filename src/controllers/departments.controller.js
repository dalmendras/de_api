const DepartmentsService = require('../services/departments.service');
const service = new DepartmentsService();
// const fs = require('fs');
// const path = require('path');
// const csv = require('csv-parser');
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
        res.status(500).send({ success: false, message: error.message });
        console.log(error);
    }
}

/*
const uploadCsv = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Check if the file has a .csv extension
    if (path.extname(req.file.originalname).toLowerCase() !== '.csv') {
        return res.status(400).send('Invalid file type. Only .csv files are allowed.');
    }

    const filePath = path.join(__dirname, '../../uploads', req.file.filename);

    // Define headers for the CSV file
    const headers = ['id', 'department'];

    // Process the CSV file here
    const results = [];
    let rowCount = 0;
    const maxRows = 1000;

    // Process the CSV file here
    fs.createReadStream(filePath)
        .pipe(csv({ separator: ',', headers: headers  }))

        .on('data', (data) => {
            if (rowCount < maxRows) {
                // Cast id field as integer
                data.id = parseInt(data.id, 10);
                results.push(data);
                rowCount++;
            } else {
                // If row count exceeds maxRows, stop processing and send a response
                this.destroy(); // Stop the stream
                return res.status(413).send('File contains more than 1000 rows.');
            }
        })
        .on('end', async () => {
            if (rowCount <= maxRows) {
                try {
                    // Save each row to the database
                    for (const row of results) {
                        const rowData = { ...row }; // Convert row to object
                        console.log('Saving row:', rowData);
                        const existingRecord = await service.findOne(rowData.id);
                        if (existingRecord) {
                            await service.update(rowData.id, rowData);
                        } else {
                            await service.create(rowData);
                        }
                    }
                    res.status(200).send('File uploaded and processed successfully.');
                } catch (error) {
                    console.error('Error saving data to the database:', error);
                    res.status(500).send('Error saving data to the database.');
                }
            }
        })
        .on('error', (err) => {
            res.status(500).send('Error processing file.');
        });
};
*/

const uploadCsvFile = (limitRows) => async (req, res) => {

    const headers = ['id', 'department'];

    try {
        // Note: We're no longer passing res to uploadCsv
        const results = await uploadCsv(req, headers, limitRows, 'departments');
        
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
