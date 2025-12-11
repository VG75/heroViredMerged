import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'admin123',
    database: 'postgres' // Connect to default postgres DB first
});

async function setupDatabase() {
    try {
        await client.connect();
        console.log('✅ Connected to PostgreSQL successfully!');

        // Try to create database
        try {
            await client.query('CREATE DATABASE uniapply;');
            console.log('✅ Database "uniapply" created successfully!');
        } catch (err) {
            if (err.code === '42P04') {
                console.log('ℹ️  Database "uniapply" already exists.');
            } else {
                throw err;
            }
        }

        await client.end();
        console.log('✅ Setup complete! You can now start the backend server.');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        console.error('Please check your PostgreSQL credentials and ensure the service is running.');
        process.exit(1);
    }
}

setupDatabase();
