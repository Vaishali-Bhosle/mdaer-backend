const db = require('../config/db');

// Add a Consumer Report
exports.addConsumerReport = async (req, res) => {
  const {
    patient_hospital_id,
    patient_initials,
    age,
    gender,
    weight,
    medical_history,
    device_name,
    manufacturer_name,
    batch_number,
    serial_number,
    expiry_date,
    adverse_event_date,
    type_of_report,
    implant_date,
    explant_date,
    event_location,
    is_device_in_use,
    seriousness,
    serious_reason,
    other_devices_used,
    event_description,
  } = req.body;

  if (!event_description) {
    return res.status(400).json({ message: 'Event description is required.' });
  }

  try {
    const result = await db.query(
      `INSERT INTO consumer_reports (
        patient_hospital_id, patient_initials, age, gender, weight, medical_history,
        device_name, manufacturer_name, batch_number, serial_number, expiry_date,
        adverse_event_date, type_of_report, implant_date, explant_date, event_location,
        is_device_in_use, seriousness, serious_reason, other_devices_used, event_description,
        reporter_id
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
      ) RETURNING *`,
      [
        patient_hospital_id,
        patient_initials,
        age,
        gender,
        weight,
        medical_history,
        device_name,
        manufacturer_name,
        batch_number,
        serial_number,
        expiry_date,
        adverse_event_date,
        type_of_report,
        implant_date,
        explant_date,
        event_location,
        is_device_in_use,
        seriousness,
        serious_reason,
        other_devices_used,
        event_description,
        req.user.user_id,
      ]
    );

    res.status(201).json({
      message: 'Consumer report added successfully.',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error adding consumer report:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Add a Non-Consumer Report
exports.addNonConsumerReport = async (req, res) => {
  const {
    date_of_report,
    type_of_report,
    device_category,
    risk_classification,
    is_refurbished,
    refurbishment_performed_by,
    license_no,
    model_no,
    catalogue_no,
    batch_no,
    serial_no,
    software_version,
    associated_devices,
    nomenclature_code,
    udi_no,
    installation_date,
    expiry_date,
    last_preventive_maintenance_date,
    last_calibration_date,
    year_of_manufacturing,
    device_usage_duration,
    is_device_available,
    usage_as_per_manual,
    event_description,
    patient_details,
    investigation_needed,
    investigation_action_taken,
    root_cause,
    capa_action_taken,
  } = req.body;

  if (!event_description) {
    return res.status(400).json({ message: 'Event description is required.' });
  }

  try {
    const result = await db.query(
      `INSERT INTO non_consumer_reports (
        date_of_report, type_of_report, device_category, risk_classification, is_refurbished,
        refurbishment_performed_by, license_no, model_no, catalogue_no, batch_no, serial_no,
        software_version, associated_devices, nomenclature_code, udi_no, installation_date,
        expiry_date, last_preventive_maintenance_date, last_calibration_date, year_of_manufacturing,
        device_usage_duration, is_device_available, usage_as_per_manual, event_description,
        patient_details, investigation_needed, investigation_action_taken, root_cause,
        capa_action_taken, reporter_id
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21,
        $22, $23, $24, $25, $26, $27, $28, $29, $30
      ) RETURNING *`,
      [
        date_of_report,
        type_of_report,
        device_category,
        risk_classification,
        is_refurbished,
        refurbishment_performed_by,
        license_no,
        model_no,
        catalogue_no,
        batch_no,
        serial_no,
        software_version,
        associated_devices,
        nomenclature_code,
        udi_no,
        installation_date,
        expiry_date,
        last_preventive_maintenance_date,
        last_calibration_date,
        year_of_manufacturing,
        device_usage_duration,
        is_device_available,
        usage_as_per_manual,
        event_description,
        patient_details,
        investigation_needed,
        investigation_action_taken,
        root_cause,
        capa_action_taken,
        req.user.user_id,
      ]
    );

    res.status(201).json({
      message: 'Non-consumer report added successfully.',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error adding non-consumer report:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get Consumer Report by ID
exports.getConsumerReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM consumer_reports WHERE report_id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Consumer report not found.' });
    }

    res.status(200).json({
      message: 'Consumer report retrieved successfully.',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error fetching consumer report:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get Non-Consumer Report by ID
exports.getNonConsumerReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM non_consumer_reports WHERE report_id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Non-consumer report not found.' });
    }

    res.status(200).json({
      message: 'Non-consumer report retrieved successfully.',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error fetching non-consumer report:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get All Reports (Admin Only)
exports.getAllReports = async (req, res) => {
  try {
    const consumerReports = await db.query('SELECT * FROM consumer_reports');
    const nonConsumerReports = await db.query('SELECT * FROM non_consumer_reports');

    res.status(200).json({
      message: 'All reports retrieved successfully.',
      data: {
        consumerReports: consumerReports.rows,
        nonConsumerReports: nonConsumerReports.rows,
      },
    });
  } catch (error) {
    console.error('Error fetching all reports:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
