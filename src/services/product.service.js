const { Product, Provider } = require('../models');

exports.getAll = async () => {
    return await Product.findAll({
        include: {
            model: Provider,
            as: 'provider'
        }
    });
};

exports.getById = async (id) => {
    const product = await Product.findByPk(id, {
        include: { model: Provider, as: 'provider' }
    });
    if (!product) throw new Error('Product not found');
    return product;
};

exports.create = async (data) => {
    return await Product.create(data);
};

exports.update = async (id, data) => {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Product not found');
    return await product.update(data);
};

exports.delete = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Product not found');
    return await product.destroy();
};