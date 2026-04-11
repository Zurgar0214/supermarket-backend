const service = require('../services/user.service');

exports.getAll = async (req, res) => {
    try {
        const data = await service.getAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await service.getById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = await service.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = await service.update(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await service.delete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};