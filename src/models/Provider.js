const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Provider = sequelize.define('Provider', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        validate: { isEmail: true }
    },
    city: DataTypes.STRING
}, {
    tableName: 'providers',
    timestamps: true,
});

module.exports = Provider;