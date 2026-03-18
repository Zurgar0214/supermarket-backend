const sequelize = require('../config/database');
const User = require('./User');
const Role = require('./Role');

Role.hasMany(User, { foreignKey: 'roleId', as: 'users', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = { sequelize, User, Role };
