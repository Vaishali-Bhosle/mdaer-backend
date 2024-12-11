const { v4: uuidv4 } = require('uuid'); // Import UUID library
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const { sequelize } = require('../models');
const {
  Institution,
  Department,
  User,
  GlobalRecall,
  CAPAGuideline,
  ConsumerReport,
  NonConsumerReport,
  Notification,
  AuditLog,
  MLModelMetadata,
  ReportAttachment,
} = require('../models');

(async () => {
  try {
    console.log('Starting enhanced seeder...');

    // Sync database
    await sequelize.sync({ force: true }); // Resets all tables
    console.log('Database synced.');

    // Hashing utility
    const hashPassword = async (password) => {
      const saltRounds = 10; // Adjust according to your security needs
      return await bcrypt.hash(password, saltRounds);
    };

    // Seed Institutions
    const institution = await Institution.create({
      institution_name: 'Test Institution',
      address: '123 Test Street',
    });

    // Seed Departments
    const department = await Department.create({
      department_name: 'Test Department',
      institution_id: institution.institution_id,
    });

    // Seed Users
    const adminUser = await User.create({
      username: 'admin_user',
      password: await hashPassword('admin_password123'), // Properly hashed password
      full_name: 'Admin User',
      email: 'admin_user@example.com',
      phone_number: '1234567890',
      address: 'Admin Address',
      role: 'institution_admin',
    });

    const coordinator = await User.create({
      username: 'coordinator_user',
      password: await hashPassword('coordinator_password123'), // Properly hashed password
      full_name: 'Coordinator User',
      email: 'coordinator@example.com',
      phone_number: '0987654321',
      address: 'Coordinator Address',
      role: 'coordinator',
      department_id: department.department_id,
    });

    const patientCaretaker = await User.create({
      username: 'caretaker_user',
      password: await hashPassword('caretaker_password123'), // Properly hashed password
      full_name: 'Caretaker User',
      email: 'caretaker@example.com',
      phone_number: '9876543210',
      address: 'Caretaker Address',
      role: 'patient_caretaker',
    });

    // Seed Consumer Reports
    const consumerReport = await ConsumerReport.create({
      report_id: uuidv4(), // Generate UUID
      patient_hospital_id: 'H123',
      patient_initials: 'C.U.',
      age: '2000-01-01',
      gender: 'male',
      weight: 70,
      medical_history: 'Diabetes',
      device_name: 'Test Device',
      manufacturer_name: 'Test Manufacturer',
      batch_number: 'B12345',
      serial_number: 'S12345',
      expiry_date: '2025-01-01',
      adverse_event_date: '2024-01-01',
      type_of_report: 'adverse_event',
      implant_date: '2023-01-01',
      explant_date: '2024-01-01',
      event_location: 'hospital',
      is_device_in_use: true,
      seriousness: 'serious',
      serious_reason: 'Life-threatening event',
      other_devices_used: 'Device B',
      event_description: 'Test adverse event description.',
      reporter_id: patientCaretaker.user_id,
    });

    // Seed Report Attachments for Consumer Report
    await ReportAttachment.create({
      report_id: consumerReport.report_id,
      report_type: 'consumer',
      file_path: '/uploads/test-attachment.pdf',
      file_size: 1024,
      file_type: 'pdf',
    });
    
    // Seed Non-Consumer Reports
    const nonConsumerReport = await NonConsumerReport.create({
      report_id: uuidv4(), // Generate UUID
      date_of_report: new Date(),
      type_of_report: 'initial',
      reporter_id: coordinator.user_id,
      device_category: 'Surgical',
      risk_classification: 'C',
      is_refurbished: true,
      refurbishment_performed_by: 'oem',
      license_no: 'LN12345',
      model_no: 'MN12345',
      catalogue_no: 'CN12345',
      batch_no: 'B12345',
      serial_no: 'S12345',
      software_version: '1.0.0',
      associated_devices: 'Device A, Device B',
      event_description: 'Non-consumer report description.',
    });
    await ReportAttachment.create({
      report_id: nonConsumerReport.report_id,
      report_type: 'non_consumer', // Add the appropriate report type
      file_path: '/uploads/non-consumer-attachment.pdf',
      file_size: 2048,
      file_type: 'pdf',
    });
    // Seed CAPA Guidelines
    await CAPAGuideline.create({
      report_id: nonConsumerReport.report_id, // Use valid report ID
      admin_id: adminUser.user_id,
      guideline: 'Ensure proper sterilization before use.',
    });

    // Seed Global Recalls
    await GlobalRecall.create({
      device_name: 'Device A',
      manufacturer_name: 'Manufacturer A',
      recall_reason: 'Safety Hazard',
      recall_date: new Date(),
      action_taken: 'notified',
    });

    // Seed Notifications
    await Notification.create({
      user_id: patientCaretaker.user_id,
      message: 'Your report has been received and is under review.',
      is_read: false,
    });

    await Notification.create({
      user_id: coordinator.user_id,
      message: 'A new non-consumer report has been assigned to you.',
      is_read: false,
    });

    // Seed Audit Logs
    await AuditLog.create({
      user_id: adminUser.user_id,
      action: 'Logged in',
      ip_address: '127.0.0.1',
    });

    // Seed ML Model Metadata
    await MLModelMetadata.create({
      model_name: 'CAPA Predictor',
      model_version: 'v1.0',
      accuracy: 95.5,
      model_path: '/models/capa-predictor-v1',
      active: true,
    });

    console.log('Data successfully seeded.');
  } catch (error) {
    console.error('Error seeding data:', error.message);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
})();
