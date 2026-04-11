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
 *     responses:
 *       200:
 *         description: Lista completa de proveedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Provider'
 */

/**
 * @swagger
 * /api/providers:
 *   post:
 *     summary: Crear proveedor
 *     tags: [Providers]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Provider'
 *     responses:
 *       201:
 *         description: Proveedor creado
 */

/**
 * @swagger
 * /api/providers/{id}:
 *   get:
 *     summary: Obtener proveedor
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Proveedor encontrado
 */

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
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Provider'
 *     responses:
 *       200:
 *         description: Proveedor actualizado
 */

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
 *     responses:
 *       200:
 *         description: Proveedor eliminado
 */