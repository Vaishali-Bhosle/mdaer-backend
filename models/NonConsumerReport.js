const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const NonConsumerReport = sequelize.define(
    'NonConsumerReport',
    {
      report_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      date_of_report: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      type_of_report: {
        type: DataTypes.ENUM('initial', 'follow_up', 'final', 'trend'),
        allowNull: false,
      },
      reporter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'user_id' },
      },
      device_category: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      risk_classification: {
        type: DataTypes.ENUM('A', 'B', 'C', 'D'),
        allowNull: false,
      },
      is_refurbished: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      refurbishment_performed_by: {
        type: DataTypes.ENUM('oem', 'other'),
        allowNull: true,
      },
      license_no: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      model_no: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      catalogue_no: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      batch_no: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      serial_no: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      software_version: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      associated_devices: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      nomenclature_code: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      udi_no: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      installation_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      expiry_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      last_preventive_maintenance_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      last_calibration_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      year_of_manufacturing: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      device_usage_duration: {
        type: DataTypes.STRING, // PostgreSQL INTERVAL equivalent
        allowNull: true,
      },
      is_device_available: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      usage_as_per_manual: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      event_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      patient_details: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      investigation_needed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      investigation_action_taken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      root_cause: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      capa_action_taken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'non_consumer_reports',
      timestamps: false,
    }
  );

  return NonConsumerReport;
};
