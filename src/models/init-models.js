var DataTypes = require("sequelize").DataTypes;
var _departments = require("./departments");
var _hired_employees = require("./hired_employees");
var _jobs = require("./jobs");

function initModels(sequelize) {
  var departments = _departments(sequelize, DataTypes);
  var hired_employees = _hired_employees(sequelize, DataTypes);
  var jobs = _jobs(sequelize, DataTypes);

  return {
    departments,
    hired_employees,
    jobs,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;