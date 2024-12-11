// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   const ReportAttachment = sequelize.define(
//     'ReportAttachment',
//     {
//       attachment_id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       report_id: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         references: { model: 'reports', key: 'report_id' }, // Assuming a "reports" table exists
//       },
//       file_path: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//       },
//       file_size: {
//         type: DataTypes.BIGINT,
//         allowNull: true,
//       },
//       file_type: {
//         type: DataTypes.ENUM('image', 'pdf'),
//         allowNull: false,
//       },
//       uploaded_at: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//       },
//     },
//     {
//       tableName: 'report_attachments',
//       timestamps: false,
//     }
//   );

//   return ReportAttachment;
// };


const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ReportAttachment = sequelize.define(
    'ReportAttachment',
    {
      attachment_id: {
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
      file_path: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      file_size: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      file_type: {
        type: DataTypes.ENUM('image', 'pdf'),
        allowNull: false,
      },
      uploaded_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'report_attachments',
      timestamps: false,
    }
  );

  // Associations (Optional)
  ReportAttachment.associate = (models) => {
    ReportAttachment.belongsTo(models.ConsumerReport, {
      foreignKey: 'report_id',
      constraints: false,
      as: 'ConsumerReport',
    });
    ReportAttachment.belongsTo(models.NonConsumerReport, {
      foreignKey: 'report_id',
      constraints: false,
      as: 'NonConsumerReport',
    });
  };

  // Hooks (Optional)
  ReportAttachment.addHook('beforeSave', (attachment) => {
    if (attachment.report_type === 'consumer' && !attachment.report_id) {
      throw new Error('Consumer report ID must be provided for consumer attachments.');
    }
    if (attachment.report_type === 'non_consumer' && !attachment.report_id) {
      throw new Error('Non-consumer report ID must be provided for non-consumer attachments.');
    }
  });

  return ReportAttachment;
};
