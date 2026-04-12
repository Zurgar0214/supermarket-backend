const { sequelize, Sale, SaleDetail, User, Product } = require('../models');

const saleInclude = [
  { model: User, as: 'user' },
  {
    model: SaleDetail,
    as: 'saleDetails',
    include: [{ model: Product, as: 'product' }]
  }
];

const calculateTotal = (details = []) => {
  return details.reduce((acc, detail) => {
    const quantity = Number(detail.quantity || 0);
    const price = Number(detail.price || 0);
    return acc + (quantity * price);
  }, 0);
};

const normalizeMoney = (value) => Number(value).toFixed(2);

const recalculateSaleTotal = async (saleId, transaction) => {
  const details = await SaleDetail.findAll({ where: { saleId }, transaction });
  const total = calculateTotal(details);

  await Sale.update(
    { total: normalizeMoney(total) },
    { where: { id: saleId }, transaction }
  );

  return total;
};

const validateUserExists = async (userId, transaction) => {
  const user = await User.findByPk(userId, { transaction });
  if (!user) throw new Error('User not found');
};

const validateDetails = (details) => {
  if (!Array.isArray(details) || details.length === 0) {
    throw new Error('details must be a non-empty array');
  }
};

const buildSaleDetailPayload = async (saleId, detail, transaction) => {
  if (!detail.productId) throw new Error('productId is required in each detail');
  if (!detail.quantity || Number(detail.quantity) <= 0) {
    throw new Error('quantity must be greater than 0 in each detail');
  }

  const product = await Product.findByPk(detail.productId, { transaction });
  if (!product) throw new Error(`Product not found: ${detail.productId}`);

  const unitPrice = detail.price ?? product.price;

  return {
    saleId,
    productId: detail.productId,
    quantity: Number(detail.quantity),
    price: normalizeMoney(unitPrice),
  };
};

exports.recalculateSaleTotal = recalculateSaleTotal;

exports.getAll = async () => {
  return await Sale.findAll({
    include: saleInclude,
    order: [['createdAt', 'DESC']]
  });
};

exports.getById = async (id) => {
  const sale = await Sale.findByPk(id, { include: saleInclude });
  if (!sale) throw new Error('Sale not found');
  return sale;
};

exports.create = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const { userId, details, date } = data;

    if (!userId) throw new Error('userId is required');
    validateDetails(details);
    await validateUserExists(userId, transaction);

    const sale = await Sale.create(
      { userId, date: date || new Date(), total: 0 },
      { transaction }
    );

    const detailsPayload = await Promise.all(
      details.map((detail) => buildSaleDetailPayload(sale.id, detail, transaction))
    );

    await SaleDetail.bulkCreate(detailsPayload, { transaction });
    await recalculateSaleTotal(sale.id, transaction);
    await transaction.commit();

    return await exports.getById(sale.id);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

exports.update = async (id, data) => {
  const transaction = await sequelize.transaction();
  try {
    const sale = await Sale.findByPk(id, { transaction });
    if (!sale) throw new Error('Sale not found');

    const { userId, details, date } = data;

    if (userId) {
      await validateUserExists(userId, transaction);
      sale.userId = userId;
    }

    if (date) {
      sale.date = date;
    }

    await sale.save({ transaction });

    if (details !== undefined) {
      validateDetails(details);
      await SaleDetail.destroy({ where: { saleId: id }, transaction });

      const detailsPayload = await Promise.all(
        details.map((detail) => buildSaleDetailPayload(id, detail, transaction))
      );

      await SaleDetail.bulkCreate(detailsPayload, { transaction });
    }

    await recalculateSaleTotal(id, transaction);
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
    const sale = await Sale.findByPk(id, { transaction });
    if (!sale) throw new Error('Sale not found');

    await SaleDetail.destroy({ where: { saleId: id }, transaction });
    await sale.destroy({ transaction });

    await transaction.commit();
    return { message: 'Sale deleted successfully' };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
