const { models } = require('../config/database');

class HiredEmployeesService {

    constructor() {}

    async find() {
        const res = await models.hired_employees.findAll({});
        return res;
    }

    async findOne(id) {
        const res = await models.hired_employees.findByPk(id);
        return res;
    }
  
    async create(data) {
        const res = await models.hired_employees.create(data);
        return res;
    }

    async update(id, data) {
        const model = await this.findOne(id);
        const res = await model.update(data);
        return res;
    }

    async delete(id) {
        const model = await this.findOne(id);
        const res = await model.destroy();
        return res;
    }

    async fileLoad(data) {
        if (!Array.isArray(data)) {
            throw new Error('Data must be an array');
        }
        
        let existingCount = 0;
        let newCount = 0;
    
        for (const row of data) {
            const rowData = { ...row };
            //console.log('Saving row:', rowData);
            const existingRecord = await this.findOne(rowData.id);
            if (existingRecord) {
                await this.update(rowData.id, rowData);
                existingCount++;
            } else {
                await this.create(rowData);
                newCount++;
            }
        }
    
        return {   
            newRecords: newCount,
            existingRecords: existingCount,
            totalRecords: newCount + existingCount,
            message: `File uploaded and processed successfully`
        };
    }

}

module.exports = HiredEmployeesService;