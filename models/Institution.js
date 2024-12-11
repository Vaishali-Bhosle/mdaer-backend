const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Institution = sequelize.define(
    'Institution',
    {
      institution_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      institution_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      tableName: 'institutions',
      timestamps: false,
    }
  );

  return Institution;
};
