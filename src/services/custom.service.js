const db = require('../config/database');

class CustomService {
    constructor() {
        this.sequelize = db.sequelize;
    }
    
    async executeQuery(query) {
        try {
            const [results] = await this.sequelize.query(query);
            return results;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }
}

module.exports = CustomService;