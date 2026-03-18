const express = require('express');
const { sequelize } = require('./src/models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
    await sequelize.sync();
    console.log('Models synchronized');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }
};

startServer();

module.exports = app;