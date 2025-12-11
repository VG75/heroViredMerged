import { sequelize } from './src/config/database.js';
import { Application, User } from './src/models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const checkApplications = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected');

        // Check how many applications exist
        const count = await Application.count();
        console.log(`\n📊 Total Applications in DB: ${count}`);

        // Get recent applications
        const recent = await Application.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']],
            include: [{ model: User, attributes: ['name', 'email'] }]
        });

        console.log('\n📝 Recent Applications:');
        recent.forEach(app => {
            console.log(`  - ID: ${app.id}`);
            console.log(`    University: ${app.universityName}`);
            console.log(`    Program: ${app.programName}`);
            console.log(`    Status: ${app.status}`);
            console.log(`    User: ${app.User?.name || 'Unknown'}`);
            console.log(`    Created: ${app.createdAt}`);
            console.log('');
        });

        // Check Users
        const userCount = await User.count();
        console.log(`👥 Total Users: ${userCount}`);

        const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role'] });
        console.log('\n👤 Users:');
        users.forEach(user => {
            console.log(`  - ${user.name} (${user.email}) - ${user.role}`);
        });

        await sequelize.close();
        console.log('\n✅ Test completed');
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

checkApplications();
