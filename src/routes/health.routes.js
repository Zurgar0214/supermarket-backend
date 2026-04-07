const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health Check
 *     description: Returns the health status of the API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is up and running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Server is running successfully
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'Server is running successfully'
  });
});

module.exports = router;
