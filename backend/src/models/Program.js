import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Program = sequelize.define('Program', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    universityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Universities',
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    degree: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    eligibility: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    tableName: 'Programs',
    timestamps: true
});

export default Program;
