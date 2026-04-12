const service = require('../services/salesDetails.service');

const getStatusCode = (error) => {
  const known404 = ['Sale detail not found', 'Sale not found', 'Product not found'];
  const known400 = ['saleId is required', 'productId is required', 'quantity must be greater than 0'];

  if (known404.includes(error.message)) return 404;
  if (known400.includes(error.message)) return 400;
  return 500;
};

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
    res.status(getStatusCode(error)).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await service.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(getStatusCode(error)).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await service.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(getStatusCode(error)).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const data = await service.delete(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(getStatusCode(error)).json({ error: error.message });
  }
};
