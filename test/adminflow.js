const axios = require('axios');
const { sequelize } = require('../models'); // Adjust the path as per your setup
require('dotenv').config();

const BASE_URL = 'http://localhost:5000/api';

(async () => {
  try {
    console.log('Starting Admin Tests...');

    // Step 1: Admin Login
    const loginRes = await axios.post(`${BASE_URL}/login`, {
      username: 'admin_user',
      password: 'admin_password123',
    });
    console.log('Admin Login:', loginRes.data);

    const adminToken = loginRes.data.token; // Save token for authorization
    // Step 2: Create Institution
    const institutionRes = await axios.post(
      `${BASE_URL}/institutions/create`,
      {
        institution_name: 'Admin Institution',
        address: '123 Admin Street',
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log('Institution Created:', institutionRes.data);

    // Step 3: Create Department
    const departmentRes = await axios.post(
      `${BASE_URL}/departments/create`,
      {
        department_name: 'Admin Department',
        institution_id: institutionRes.data.id,
        admin_1: null,
        admin_2: null,
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log('Department Created:', departmentRes.data);

    // Step 4: Create Admin User 1
    const adminUser1Res = await axios.post(`${BASE_URL}/users/register`, {
      username: 'department_admin1',
      password: 'password123',
      full_name: 'Admin One',
      email: 'admin1@example.com',
      phone_number: '1234567890',
      role: 'department_admin',
      department_id: departmentRes.data.id,
    });
    console.log('Department Admin 1 Created:', adminUser1Res.data);

    // Step 5: Create Admin User 2
    const adminUser2Res = await axios.post(`${BASE_URL}/users/register`, {
      username: 'department_admin2',
      password: 'password123',
      full_name: 'Admin Two',
      email: 'admin2@example.com',
      phone_number: '0987654321',
      role: 'department_admin',
      department_id: departmentRes.data.id,
    });
    console.log('Department Admin 2 Created:', adminUser2Res.data);

    // Step 6: Assign Department Admins
    const assignAdminRes = await axios.put(
      `${BASE_URL}/departments/assign-admins`,
      {
        department_id: departmentRes.data.id,
        admin_1: adminUser1Res.data.user.id,
        admin_2: adminUser2Res.data.user.id,
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log('Department Admins Assigned:', assignAdminRes.data);

    // Step 7: View All Departments in an Institution
    const listDepartmentsRes = await axios.get(
      `${BASE_URL}/departments?institution_id=${institutionRes.data.id}`,
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log('Departments List:', listDepartmentsRes.data);

    // Step 8: Add CAPA Guidelines for a Report
    const capaRes = await axios.post(
      `${BASE_URL}/capa/add`,
      {
        report_id: 'sample-report-id', // Replace with actual report ID
        admin_id: loginRes.data.user.id,
        guideline: 'Admin CAPA guideline for test report.',
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log('CAPA Guideline Added:', capaRes.data);

    // Step 9: Add a Global Recall
    const recallRes = await axios.post(
      `${BASE_URL}/recalls/add`,
      {
        device_name: 'Device Test',
        manufacturer_name: 'Manufacturer Test',
        recall_reason: 'Safety Concern',
        recall_date: '2024-01-01',
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log('Global Recall Added:', recallRes.data);

    // Step 10: View Notifications
    const notificationsRes = await axios.get(`${BASE_URL}/notifications`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log('Notifications:', notificationsRes.data);

    // Step 11: Mark Notification as Read
    const markNotificationReadRes = await axios.put(
      `${BASE_URL}/notifications/mark-read/1`, // Replace with actual notification ID
      {},
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log('Notification Marked as Read:', markNotificationReadRes.data);

    // Step 12: Fetch Audit Logs
    const auditLogsRes = await axios.get(`${BASE_URL}/logs`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log('Audit Logs:', auditLogsRes.data);

    // Step 13: Admin Logout
    console.log('Admin Logout: Manual, as token expires automatically.');

    console.log('All Admin tests completed successfully.');
  } catch (error) {
    console.error('Admin Test failed:', error.response ? error.response.data : error.message);
  } finally {
    // Close DB connection
    await sequelize.close();
    console.log('Database connection closed.');
  }
})();
