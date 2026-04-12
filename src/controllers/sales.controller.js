const service = require('../services/sales.service');

const getStatusCode = (error) => {
  const known404 = ['Sale not found', 'User not found'];
  const known400 = [
    'userId is required',
    'details must be a non-empty array',
    'productId is required in each detail',
    'quantity must be greater than 0 in each detail'
  ];

  if (known404.includes(error.message) || error.message.startsWith('Product not found:')) return 404;
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
