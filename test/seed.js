const { sequelize } = require('../models');
const {
  Institution,
  Department,
  User,
} = require('../models'); // Adjust imports based on your structure

(async () => {
  try {
    console.log('Starting seeder...');

    // Sync database
    await sequelize.sync({ force: true }); // Resets all tables
    console.log('Database synced.');

    // Create Institutions
    const institution = await Institution.create({
      institution_name: 'Test Institution',
      address: '123 Test Street',
    });

    // Create Departments
    const department = await Department.create({
      department_name: 'Test Department',
      institution_id: institution.institution_id,
    });

    // Create Users
    const adminUser = await User.create({
      username: 'admin_user',
      password: 'hashed_password123', // Use a hashed password
      full_name: 'Admin User',
      email: 'admin_user@example.com',
      phone_number: '1234567890',
      address: 'Admin Address',
      role: 'institution_admin',
      department_id: null,
    });

    console.log('Data successfully seeded.');
  } catch (error) {
    console.error('Error seeding data:', error.message);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
})();
