const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ConsumerReport = sequelize.define(
    'ConsumerReport',
    {
      report_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      patient_hospital_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      patient_initials: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      age: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: true,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      medical_history: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      device_name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      manufacturer_name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      batch_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      serial_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      expiry_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      adverse_event_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      type_of_report: {
        type: DataTypes.ENUM('adverse_event', 'product_problem'),
        allowNull: false,
      },
      implant_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      explant_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      event_location: {
        type: DataTypes.ENUM('hospital', 'home', 'other'),
        allowNull: true,
      },
      is_device_in_use: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      seriousness: {
        type: DataTypes.ENUM('serious', 'non_serious'),
        allowNull: true,
      },
      serious_reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      other_devices_used: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      event_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      reporter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Table name as per User model
          key: 'user_id',
        },
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'consumer_reports',
      timestamps: false,
    }
  );

  ConsumerReport.associate = (models) => {
    ConsumerReport.belongsTo(models.User, {
      foreignKey: 'reporter_id',
      as: 'reporter',
    });
  };

  return ConsumerReport;
};
