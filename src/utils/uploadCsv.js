/*
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const uploadCsv = async (req, res, headers, limitRows) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Check if the file has a .csv extension
    if (path.extname(req.file.originalname).toLowerCase() !== '.csv') {
        return res.status(400).send('Invalid file type. Only .csv files are allowed.');
    }

    const filePath = path.join(__dirname, '../../uploads', req.file.filename);

    // Process the CSV file here
    const results = [];
    let rowCount = 0;
    const maxRows = limitRows ? 1000 : Infinity;

    // Process the CSV file here
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath)
            .pipe(csv({ separator: ',', headers: headers }))
            .on('data', (data) => {
                if (rowCount < maxRows) {
                    console.log('Processing row:', data);
                    // Cast id field as integer
                    data.id = parseInt(data.id, 10);
                    results.push(data);
                    rowCount++;
                } else {
                    // If row count exceeds maxRows, stop processing and send a response
                    stream.destroy(); // Stop the stream
                    reject(new Error('Api Exceeded'));
                }
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
};

module.exports = uploadCsv;
*/


const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const uploadCsv = async (req, headers, limitRows, tableName) => {
    if (!req.file) {
        throw new Error('No file uploaded.');
    }

    // Check if the file has a .csv extension
    if (path.extname(req.file.originalname).toLowerCase() !== '.csv') {
        throw new Error('Invalid file type. Only .csv files are allowed.');
    }

    const filePath = path.join(__dirname, '../../uploads', req.file.filename);

    // Process the CSV file here
    const results = [];
    let rowCount = 0;
    let skippedRows = 0;
    const maxRows = limitRows;

    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath)
            .pipe(csv({ separator: ',', headers: headers }))
            .on('data', (data) => {
                console.log('Processing row:', data);
                if (rowCount < maxRows) {
                    // Check if required fields are present and can be parsed
                    let isValid = true;
                    
                    // ID is always required
                    const id = parseInt(data.id, 10);
                    if (isNaN(id)) {
                        console.log(`Skipping row with invalid id: ${data.id}`);
                        isValid = false;
                    } else {
                        data.id = id;
                    }

                    if (tableName === 'hired_employees') {
                    
                        // job_id handling - set to null if undefined or empty string
                        if (data.department_id === undefined || data.department_id === '') {
                            console.log(`Setting department_id to null for row with id: ${data.department_id}`);
                            data.department_id = null;
                        } else {
                            const deptId = parseInt(data.department_id, 10);
                            if (isNaN(deptId)) {
                                console.log(`Setting department_id to null for row with invalid job_id: ${data.department_id}`);
                                data.department_id = null;
                            } else {
                                data.department_id = deptId;
                            }
                        }
                        
                        // job_id handling - set to null if undefined or empty string
                        if (data.job_id === undefined || data.job_id === '') {
                            console.log(`Setting job_id to null for row with id: ${data.id}`);
                            data.job_id = null;
                        } else {
                            const jobId = parseInt(data.job_id, 10);
                            if (isNaN(jobId)) {
                                console.log(`Setting job_id to null for row with invalid job_id: ${data.job_id}`);
                                data.job_id = null;
                            } else {
                                data.job_id = jobId;
                            }
                        }

                        // job_id handling - set to null if undefined or empty string
                        if (data.datetime === undefined || data.datetime === '') {
                            console.log(`Setting job_id to null for row with id: ${data.datetime}`);
                            data.datetime = null;
                        }
                    }

                    rowCount++;
                    
                    if (isValid) {
                        results.push(data);
                    } else {
                        skippedRows++;
                    }
                } else {
                    // If row count exceeds maxRows, stop processing
                    stream.destroy(); // Stop the stream
                    reject(new Error('Api Exceeded'));
                }
            })
            .on('end', () => {
                if (results.length === 0) {
                    reject(new Error('No data found in file.'));
                } else {
                    resolve(results);
                }
            })
            .on('error', (err) => {
                reject(err);
            });
    });
};

module.exports = uploadCsv;