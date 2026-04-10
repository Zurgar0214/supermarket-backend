const sequelize = require('../config/database');
const User = require('./User');
const Provider = require('./Provider');
const Product = require('./Product');
const Sale = require('./Sale');
const SaleDetail = require('./SaleDetail');

// Relationships

// Proveedor -> Productos (1:N)
Provider.hasMany(Product, { foreignKey: 'providerId', as: 'products', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Product.belongsTo(Provider, { foreignKey: 'providerId', as: 'provider', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Usuario -> Ventas (1:N)
User.hasMany(Sale, { foreignKey: 'userId', as: 'sales', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Sale.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Venta -> DetalleVenta (1:N)
Sale.hasMany(SaleDetail, { foreignKey: 'saleId', as: 'saleDetails', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
SaleDetail.belongsTo(Sale, { foreignKey: 'saleId', as: 'sale', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Producto -> DetalleVenta (1:N)
Product.hasMany(SaleDetail, { foreignKey: 'productId', as: 'saleDetails', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
SaleDetail.belongsTo(Product, { foreignKey: 'productId', as: 'product', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

module.exports = { sequelize, User, Provider, Product, Sale, SaleDetail };
