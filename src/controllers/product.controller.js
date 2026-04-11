const { Product, Provider } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const data = await Product.findAll({
            include: {
                model: Provider,
                as: 'provider'
            }
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await Product.findByPk(req.params.id, {
            include: {
                model: Provider,
                as: 'provider'
            }
        });

        if (!data) return res.status(404).json({ error: 'Producto no encontrado' });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { price, stock } = req.body;

        if (price <= 0) {
            return res.status(400).json({ error: 'El precio debe ser mayor a 0' });
        }

        if (stock < 0) {
            return res.status(400).json({ error: 'El stock no puede ser negativo' });
        }

        const data = await Product.create(req.body);
        res.status(201).json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = await Product.findByPk(req.params.id);

        if (!data) return res.status(404).json({ error: 'Producto no encontrado' });

        await data.update(req.body);
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const data = await Product.findByPk(req.params.id);

        if (!data) return res.status(404).json({ error: 'Producto no encontrado' });

        await data.destroy();
        res.json({ message: 'Producto eliminado' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};