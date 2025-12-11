import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Document = sequelize.define('Document', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING, // e.g., 'AADHAR', 'MARKSHEET_10', 'MARKSHEET_12'
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'VERIFIED', 'REJECTED'),
        defaultValue: 'PENDING'
    },
    aiExtractionData: {
        type: DataTypes.JSONB, // Store extracted data from AI
        allowNull: true
    },
    adminComments: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
});

export default Document;
