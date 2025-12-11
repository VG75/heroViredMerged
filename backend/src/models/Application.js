import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Application = sequelize.define('Application', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    universityName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    programName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('DRAFT', 'SUBMITTED', 'ISSUE_RAISED', 'VERIFIED', 'REJECTED', 'PAYMENT_RECEIVED', 'WITHDRAWN'),
        defaultValue: 'DRAFT'
    },
    personalDetails: {
        type: DataTypes.JSONB, // Store flexible form data
        allowNull: true
    },
    adminComments: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
});

export default Application;
