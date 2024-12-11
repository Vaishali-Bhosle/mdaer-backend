const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const GlobalRecall = sequelize.define(
    'GlobalRecall',
    {
      recall_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      device_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      manufacturer_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      recall_reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      recall_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      action_taken: {
        type: DataTypes.ENUM('notified', 'resolved'),
        defaultValue: 'notified',
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'global_recalls',
      timestamps: false,
    }
  );

  return GlobalRecall;
};
