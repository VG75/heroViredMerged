import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const University = sequelize.define('University', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ranking: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    logoColor: {
        type: DataTypes.STRING,
        defaultValue: 'bg-blue-100 text-blue-700'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'Universities',
    timestamps: true
});

export default University;
