import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    applicationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Applications',
            key: 'id'
        }
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'),
        defaultValue: 'OPEN'
    },
    priority: {
        type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT'),
        defaultValue: 'MEDIUM'
    },
    category: {
        type: DataTypes.ENUM('DOCUMENT_ISSUE', 'PAYMENT', 'APPLICATION_STATUS', 'TECHNICAL', 'OTHER'),
        defaultValue: 'OTHER'
    },
    adminResponse: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    respondedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    respondedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'Tickets',
    timestamps: true
});

export default Ticket;
