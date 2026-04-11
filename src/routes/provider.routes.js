const router = require('express').Router();
const controller = require('../controllers/provider.controller');

/**
 * @swagger
 * tags:
 *   name: Providers
 *   description: API de proveedores
 */

/**
 * @swagger
 * /api/providers:
 *   get:
 *     summary: Obtener todos los proveedores
 *     tags: [Providers]
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/providers/{id}:
 *   get:
 *     summary: Obtener proveedor por ID
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/providers:
 *   post:
 *     summary: Crear proveedor
 *     tags: [Providers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 */
router.post('/', controller.create);

/**
 * @swagger
 * /api/providers/{id}:
 *   put:
 *     summary: Actualizar proveedor
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /api/providers/{id}:
 *   delete:
 *     summary: Eliminar proveedor
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.delete('/:id', controller.delete);

module.exports = router;