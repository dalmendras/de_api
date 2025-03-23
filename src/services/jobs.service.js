const { models } = require('../config/database');

class JobsService {

    constructor() {}

    async find() {
        const res = await models.jobs.findAll({});
        return res;
    }

    async findOne(id) {
        const res = await models.jobs.findByPk(id);
        return res;
    }
  
    async create(data) {
        const res = await models.jobs.create(data);
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
        
        let existingCount = 0;
        let newCount = 0;

        for (const row of data) {
            const rowData = { ...row };
            console.log('Saving row:', rowData);
            const existingRecord = await this.findOne(rowData.id);
            if (existingRecord) {
                await this.update(rowData.id, rowData);
                existingCount++;
            } else {
                await this.create(rowData);
                newCount++;
            }
        }
        const res = {   newRecords: newCount,
                        existingId: existingCount,
                        totalRecords: newCount + existingCount,
                        message: `File uploaded and processed successfully`
                    };
        return res;
    }
}

module.exports = JobsService;