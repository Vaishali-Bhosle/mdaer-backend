const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MLModelMetadata = sequelize.define(
    'MLModelMetadata',
    {
      model_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      model_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      model_version: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      accuracy: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      model_path: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      last_trained_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'ml_model_metadata',
      timestamps: false,
    }
  );

  return MLModelMetadata;
};
