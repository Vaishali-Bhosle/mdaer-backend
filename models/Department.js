const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Department = sequelize.define(
    'Department',
    {
      department_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      department_name: {
        type: DataTypes.STRING(150),
        unique: true,
        allowNull: false,
      },
      institution_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'institutions', // Table name as per Institution model
          key: 'institution_id',
        },
      },
      admin_1: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users', // Table name as per User model
          key: 'user_id',
        },
      },
      admin_2: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users', // Table name as per User model
          key: 'user_id',
        },
      },
    },
    {
      tableName: 'departments',
      timestamps: false,
    }
  );

  Department.associate = (models) => {
    Department.belongsTo(models.Institution, {
      foreignKey: 'institution_id',
      as: 'institution',
    });
    Department.belongsTo(models.User, {
      foreignKey: 'admin_1',
      as: 'adminOne',
    });
    Department.belongsTo(models.User, {
      foreignKey: 'admin_2',
      as: 'adminTwo',
    });
  };

  return Department;
};
