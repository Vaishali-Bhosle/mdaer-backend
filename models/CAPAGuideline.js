const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CAPAGuideline = sequelize.define(
    'CAPAGuideline',
    {
      capa_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      report_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'non_consumer_reports', // Table name as per NonConsumerReport model
          key: 'report_id',
        },
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Table name as per User model
          key: 'user_id',
        },
      },
      guideline: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'capa_guidelines',
      timestamps: false,
    }
  );

  CAPAGuideline.associate = (models) => {
    CAPAGuideline.belongsTo(models.NonConsumerReport, {
      foreignKey: 'report_id',
      as: 'non_consumer_report',
    });

    CAPAGuideline.belongsTo(models.User, {
      foreignKey: 'admin_id',
      as: 'admin',
    });
  };

  return CAPAGuideline;
};
