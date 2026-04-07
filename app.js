const express = require('express');
const DatabaseSync = require('./src/config/sync');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

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