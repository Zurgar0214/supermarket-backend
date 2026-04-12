/**
 * @swagger
 * tags:
 *   name: SaleDetails
 *   description: API de detalles de venta
 */

/**
 * @swagger
 * /api/sales-details:
 *   get:
 *     summary: Obtener todos los detalles de una venta
 *     tags: [SaleDetails]
 *     responses:
 *       200:
 *         description: Lista completa de detalles de venta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SaleDetail'
 */

/**
 * @swagger
 * /api/sales-details:
 *   post:
 *     summary: Agregar un detalle a una venta existente y recalcular total
 *     tags: [SaleDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaleDetailCreateInput'
 *     responses:
 *       201:
 *         description: Detalle de venta creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaleDetail'
 */

/**
 * @swagger
 * /api/sales-details/{id}:
 *   get:
 *     summary: Obtener un detalle de venta por ID
 *     tags: [SaleDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle de venta encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaleDetail'
 *       404:
 *         description: Detalle de venta no encontrado
 */

/**
 * @swagger
 * /api/sales-details/{id}:
 *   put:
 *     summary: Actualizar un detalle de venta y el total
 *     tags: [SaleDetails]
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
 *             $ref: '#/components/schemas/SaleDetailUpdateInput'
 *     responses:
 *       200:
 *         description: Detalle de venta actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaleDetail'
 *       404:
 *         description: Detalle de venta no encontrado
 */

/**
 * @swagger
 * /api/sales-details/{id}:
 *   delete:
 *     summary: Eliminar un detalle de venta y recalculartotal
 *     tags: [SaleDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle de venta eliminado correctamente
 *       404:
 *         description: Detalle de venta no encontrado
 */
