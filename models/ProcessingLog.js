const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ProcessingLog = sequelize.define(
    'ProcessingLog',
    {
      processing_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      report_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      report_type: {
        type: DataTypes.ENUM('consumer', 'non_consumer'),
        allowNull: false,
      },
      processing_type: {
        type: DataTypes.ENUM('speech_to_text', 'image_to_text'),
        allowNull: false,
      },
      raw_input: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      processed_output: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      confidence_score: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'processing_logs',
      timestamps: false,
    }
  );

  // Associations (Optional)
  ProcessingLog.associate = (models) => {
    ProcessingLog.belongsTo(models.ConsumerReport, {
      foreignKey: 'report_id',
      constraints: false,
      as: 'ConsumerReport',
    });
    ProcessingLog.belongsTo(models.NonConsumerReport, {
      foreignKey: 'report_id',
      constraints: false,
      as: 'NonConsumerReport',
    });
  };

  // Hooks (Optional)
  ProcessingLog.addHook('beforeSave', (processingLog) => {
    if (processingLog.report_type === 'consumer' && !processingLog.report_id) {
      throw new Error('Consumer report ID must be provided for consumer reports.');
    }
    if (processingLog.report_type === 'non_consumer' && !processingLog.report_id) {
      throw new Error('Non-consumer report ID must be provided for non-consumer reports.');
    }
  });

  return ProcessingLog;
};
