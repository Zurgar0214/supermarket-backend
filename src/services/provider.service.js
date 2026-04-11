const { Provider } = require('../models');

exports.getAll = async () => await Provider.findAll();

exports.getById = async (id) => {
    const provider = await Provider.findByPk(id);
    if (!provider) throw new Error('Provider not found');
    return provider;
};

exports.create = async (data) => await Provider.create(data);

exports.update = async (id, data) => {
    const provider = await Provider.findByPk(id);
    if (!provider) throw new Error('Provider not found');
    return await provider.update(data);
};

exports.delete = async (id) => {
    const provider = await Provider.findByPk(id);
    if (!provider) throw new Error('Provider not found');
    return await provider.destroy();
};