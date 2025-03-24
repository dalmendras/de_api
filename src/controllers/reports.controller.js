const CustomService = require('../services/custom.service');
const customService = new CustomService();


const customEmployeeQuarter = async (req, res) => {
    try {
        // Default to 2021 if not provided
        const year = req.query.year || 2021;
        // Validate year is a valid number
        if (isNaN(year) || year < 1900 || year > 2100) {
            return res.status(400).send({
                success: false,
                message: 'Invalid year parameter. Must be a number between 1900 and 2100.'
            });
        }
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
                        WHERE EXTRACT(YEAR FROM he.datetime::timestamp) = ${year}
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
        // Default to 2021 if not provided
        const year = req.query.year || 2021;
        
        // Validate year is a valid number
        if (isNaN(year) || year < 1900 || year > 2100) {
            return res.status(400).send({
                success: false,
                message: 'Invalid year parameter. Must be a number between 1900 and 2100.'
            });
        }
        const query =   `SELECT
                        d.id,
                        d.department,
                        COUNT(he.id)::int as hired
                        FROM hired_employees he
                        INNER JOIN departments d ON d.id = he.department_id
                        WHERE EXTRACT(YEAR FROM he.datetime::timestamp) = ${year}
                        GROUP BY 1, 2
                        HAVING COUNT(he.id) >= (
                                                    SELECT avg(count_dep) AS mean
                                                    FROM (
                                                            SELECT
                                                            d.department,
                                                            COUNT(he.id) as count_dep
                                                            FROM hired_employees he
                                                            INNER JOIN departments d ON d.id = he.department_id
                                                            WHERE EXTRACT(YEAR FROM he.datetime::timestamp) = ${year}
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
    customEmployeeQuarter, customEmployeeDepartment
};
