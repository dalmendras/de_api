const { models } = require('../config/database');

class DepartmentsService {

    constructor() {}

    async find() {
        const res = await models.departments.findAll({});
        return res;
    }

    async findOne(id) {
        const res = await models.departments.findByPk(id);
        return res;
    }
  
    async create(data) {
        const res = await models.departments.create(data);
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

}

module.exports = DepartmentsService;