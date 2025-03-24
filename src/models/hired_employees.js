const Sequelize = require('sequelize');

const defaultScope = {
  attributes: { exclude: ['dt_crea','dt_mod','createdAt','updatedAt'] }
};

module.exports = function(sequelize, DataTypes) {
  
  return sequelize.define('hired_employees', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    datetime:{
        type: DataTypes.DATE,
    },
    department_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    },
    job_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    },
    createdAt:{
      type: DataTypes.DATE,
      field: 'dt_crea',
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt:{
        type: DataTypes.DATE,
        field: 'dt_mod',
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    },
  }, {
    sequelize,
    tableName: 'hired_employees',
    schema: 'public',
    timestamps: false,
    defaultScope: defaultScope,
    hooks: {
      beforeUpdate: (ts_record, options) => {
        ts_record.updatedAt = new Date();
      }
    }
  });
};
