import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Payment = sequelize.define('Payment', {
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
    ticketId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Tickets',
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING(3),
        defaultValue: 'INR'
    },
    type: {
        type: DataTypes.ENUM('APPLICATION_FEE', 'ISSUE_RESOLUTION_FEE'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED'),
        defaultValue: 'PENDING'
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true
    },
    transactionId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    paymentGatewayResponse: {
        type: DataTypes.JSON,
        allowNull: true
    },
    paidAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'Payments',
    timestamps: true
});

export default Payment;
