const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      full_name: {
        type: DataTypes.STRING(150),
      },
      email: {
        type: DataTypes.STRING(150),
        unique: true,
      },
      phone_number: {
        type: DataTypes.STRING(15),
        unique: true,
      },
      address: {
        type: DataTypes.TEXT,
      },
      role: {
        type: DataTypes.ENUM(
          'institution_admin',
          'department_admin',
          'coordinator',
          'healthcare_professional',
          'patient_caretaker'
        ),
        allowNull: false,
      },
      department_id: {
        type: DataTypes.INTEGER,
        references: { model: 'departments', key: 'department_id' },
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'users',
      timestamps: false,
    }
  );

  return User;
};
