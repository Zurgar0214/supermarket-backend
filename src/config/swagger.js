const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Supermarket API',
      version: '1.0.0',
      description: 'API description for supermarket management, handling Products, Providers, Sales, and Users.',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Development server',
      },
    ],
  },
    apis:
    [
        path.join(__dirname, '../routes/*.js'),
        path.join(__dirname, '../docs/*.js'),
    ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
