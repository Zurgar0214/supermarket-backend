/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - stock
 *         - providerId
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         stock:
 *           type: integer
 *         providerId:
 *           type: string
 *
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *
 *     Provider:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         city:
 *           type: string
 *
 *     Sale:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           example: 550e8400-e29b-41d4-a716-446655440003
 *         userId:
 *           type: string
 *           example: 550e8400-e29b-41d4-a716-446655440004
 *         date:
 *           type: string
 *           format: date-time
 *           example: 2026-04-12T20:30:00.000Z
 *         total:
 *           type: number
 *           example: 30000
 *         user:
 *           $ref: '#/components/schemas/User'
 *         saleDetails:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SaleDetail'
 *
 *     SaleInput:
 *       type: object
 *       required:
 *         - userId
 *         - details
 *       properties:
 *         userId:
 *           type: string
 *           example: 550e8400-e29b-41d4-a716-446655440004
 *         date:
 *           type: string
 *           format: date-time
 *           example: 2026-04-12T20:30:00.000Z
 *         details:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SaleDetailInput'
 *
 *     SaleDetail:
 *       type: object
 *       required:
 *         - saleId
 *         - productId
 *         - quantity
 *       properties:
 *         id:
 *           type: string
 *           example: 550e8400-e29b-41d4-a716-446655440010
 *         saleId:
 *           type: string
 *           example: 550e8400-e29b-41d4-a716-446655440003
 *         productId:
 *           type: string
 *           example: 550e8400-e29b-41d4-a716-446655440002
 *         quantity:
 *           type: integer
 *           example: 2
 *         price:
 *           type: number
 *           example: 15000
 *         product:
 *           $ref: '#/components/schemas/Product'
 *
 *     SaleDetailInput:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *           example: 550e8400-e29b-41d4-a716-446655440002
 *         quantity:
 *           type: integer
 *           example: 2
 *
 *     SaleDetailCreateInput:
 *       type: object
 *       required:
 *         - saleId
 *         - productId
 *         - quantity
 *       properties:
 *         saleId:
 *           type: string
 *           example: 550e8400-e29b-41d4-a716-446655440003
 *         productId:
 *           type: string
 *           example: 550e8400-e29b-41d4-a716-446655440002
 *         quantity:
 *           type: integer
 *           example: 2
 *
 *     SaleDetailUpdateInput:
 *       type: object
 *       properties:
 *         saleId:
 *           type: string
 *           example: 550e8400-e29b-41d4-a716-446655440003
 *         productId:
 *           type: string
 *           example: 550e8400-e29b-41d4-a716-446655440002
 *         quantity:
 *           type: integer
 *           example: 3
 */