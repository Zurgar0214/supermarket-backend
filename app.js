const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
const DatabaseSync = require('./src/config/sync');

// Rutas
const healthRoutes = require('./src/routes/health.routes');
const productRoutes = require('./src/routes/product.routes');
const userRoutes = require('./src/routes/user.routes');
const providerRoutes = require('./src/routes/provider.routes');
const salesRoutes = require('./src/routes/sales.routes');
const salesDetailsRoutes = require('./src/routes/salesDetails.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas principales
app.use('/api/health', healthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/sales-details', salesDetailsRoutes);

// Ruta base
app.get('/', (req, res) => {
    res.send(`Server is running successfully 🚀, go -> http://localhost:${PORT}/api-docs to test the API`);
});

// Manejo de rutas no existentes
app.use((req, res) => {
    res.status(404).json({ error: `Route not found, go -> http://localhost:${PORT}/api-docs` });
});

// Inicialización
const startServer = async () => {
    try {
        await DatabaseSync.sync();

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Failed to start server: ', error);
    }
};

startServer();

module.exports = app;