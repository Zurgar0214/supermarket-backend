const { sequelize, SaleDetail, Sale, Product } = require('../models');
const salesService = require('./sales.service');

const detailInclude = [
  { model: Sale, as: 'sale' },
  { model: Product, as: 'product' }
];

const normalizeMoney = (value) => Number(value).toFixed(2);

const validateSaleExists = async (saleId, transaction) => {
  const sale = await Sale.findByPk(saleId, { transaction });
  if (!sale) throw new Error('Sale not found');
  return sale;
};

const validateProductExists = async (productId, transaction) => {
  const product = await Product.findByPk(productId, { transaction });
  if (!product) throw new Error('Product not found');
  return product;
};

exports.getAll = async () => {
  return await SaleDetail.findAll({
    include: detailInclude,
    order: [['createdAt', 'DESC']]
  });
};

exports.getById = async (id) => {
  const saleDetail = await SaleDetail.findByPk(id, { include: detailInclude });
  if (!saleDetail) throw new Error('Sale detail not found');
  return saleDetail;
};

exports.create = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const { saleId, productId, quantity, price } = data;

    if (!saleId) throw new Error('saleId is required');
    if (!productId) throw new Error('productId is required');
    if (!quantity || Number(quantity) <= 0) throw new Error('quantity must be greater than 0');

    await validateSaleExists(saleId, transaction);
    const product = await validateProductExists(productId, transaction);

    const saleDetail = await SaleDetail.create({
      saleId,
      productId,
      quantity: Number(quantity),
      price: normalizeMoney(price ?? product.price)
    }, { transaction });

    await salesService.recalculateSaleTotal(saleId, transaction);
    await transaction.commit();

    return await exports.getById(saleDetail.id);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

exports.update = async (id, data) => {
  const transaction = await sequelize.transaction();
  try {
    const saleDetail = await SaleDetail.findByPk(id, { transaction });
    if (!saleDetail) throw new Error('Sale detail not found');

    const oldSaleId = saleDetail.saleId;

    if (data.saleId) {
      await validateSaleExists(data.saleId, transaction);
      saleDetail.saleId = data.saleId;
    }

    if (data.productId) {
      await validateProductExists(data.productId, transaction);
      saleDetail.productId = data.productId;
    }

    if (data.quantity !== undefined) {
      if (Number(data.quantity) <= 0) throw new Error('quantity must be greater than 0');
      saleDetail.quantity = Number(data.quantity);
    }

    if (data.price !== undefined) {
      saleDetail.price = normalizeMoney(data.price);
    }

    await saleDetail.save({ transaction });

    await salesService.recalculateSaleTotal(oldSaleId, transaction);
    if (saleDetail.saleId !== oldSaleId) {
      await salesService.recalculateSaleTotal(saleDetail.saleId, transaction);
    }

    await transaction.commit();
    return await exports.getById(id);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

exports.delete = async (id) => {
  const transaction = await sequelize.transaction();
  try {
    const saleDetail = await SaleDetail.findByPk(id, { transaction });
    if (!saleDetail) throw new Error('Sale detail not found');

    const saleId = saleDetail.saleId;
    await saleDetail.destroy({ transaction });
    await salesService.recalculateSaleTotal(saleId, transaction);

    await transaction.commit();
    return { message: 'Sale detail deleted successfully' };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
