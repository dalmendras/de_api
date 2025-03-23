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
    references: {
        model: 'departments',
        key: 'id'
    }
    },
    job_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
        model: 'jobs',
        key: 'id'
    }
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
    indexes: [
      {
        name: "hired_employees_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      // Delete this index to avoid duplicates
      /*
      {
        name: "departments_jobs_id_idx",
        unique: false,
        fields: [
          { name: "department_id" },
          { name: "job_id" },
        ]
      }
      */
    ],
    hooks: {
      beforeUpdate: (ts_record, options) => {
        ts_record.updatedAt = new Date();
      }
    }
  });
};
