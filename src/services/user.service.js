const { User } = require('../models');

exports.getAll = async () => await User.findAll();

exports.getById = async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return user;
};

exports.create = async (data) => await User.create(data);

exports.update = async (id, data) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return await user.update(data);
};

exports.delete = async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return await user.destroy();
};