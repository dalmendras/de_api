var DataTypes = require("sequelize").DataTypes;
var _departments = require("./departments");
var _hired_employees = require("./hired_employees");
var _jobs = require("./jobs");

function initModels(sequelize) {
  var departments = _departments(sequelize, DataTypes);
  var hired_employees = _hired_employees(sequelize, DataTypes);
  var jobs = _jobs(sequelize, DataTypes);

  jobs.hasMany(hired_employees, { as: "hired_employees", foreignKey: "job_id"});
  hired_employees.belongsTo(jobs, { as: "jobs", foreignKey: "id"});
  departments.hasMany(hired_employees, { as: "hired_employees", foreignKey: "department_id"});
  hired_employees.belongsTo(departments, { as: "department", foreignKey: "id"});

  return {
    departments,
    hired_employees,
    jobs,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;