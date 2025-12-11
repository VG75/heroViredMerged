import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/uniapply', {
    dialect: 'postgres',
    logging: false, // Set to console.log to see SQL queries
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL Connected via Sequelize');
        // Sync models - using alter: true for development to update tables without dropping
        await sequelize.sync({ alter: true });
        console.log('Database Log Models Synced');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

export default sequelize;
