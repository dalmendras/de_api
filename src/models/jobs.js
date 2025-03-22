const Sequelize = require('sequelize');

const defaultScope = {
  attributes: { exclude: ['dt_crea','dt_mod','createdAt','updatedAt'] }
};

module.exports = function(sequelize, DataTypes) {
  
  return sequelize.define('jobs', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    job: {
      type: DataTypes.STRING(100),
      allowNull: false
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
    tableName: 'jobs',
    schema: 'public',
    timestamps: false,
    defaultScope: defaultScope,
    indexes: [
      {
        name: "jobs_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ],
    hooks: {
      beforeUpdate: (ts_record, options) => {
        ts_record.updatedAt = new Date();
      }
    }
  });
};
