const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const uploadCsv = async (req, headers, limitRows, tableName) => {

    console.log('Request received:', { 
        hasFile: !!req.file,
        fileInfo: req.file ? `${req.file.originalname} (${req.file.size} bytes)` : 'No file'
    });

    // Check if a file was uploaded
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
                // console.log('Processing row:', data);
                if (rowCount < maxRows) {
                    
                    // Check if required fields are present and can be parsed
                    let isValid = true;
                    
                    // ID is always required all tables
                    const id = parseInt(data.id, 10);
                    if (isNaN(id)) {
                        console.log(`Skipping row with invalid id: ${data.id}`);
                        isValid = false;
                    } else {
                        data.id = id;
                    }

                    // Fields Table hired_employees
                    if (tableName === 'hired_employees') {
                        // department_id
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

                        // job_id
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

                        // datetime
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
                    stream.destroy();
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