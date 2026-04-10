const { sequelize } = require('../models');

class DatabaseSync {
  static async sync() {
    try {
      await sequelize.authenticate()
        .then(() => {
          console.log('Database connection established successfully.');
        })
        .catch((error) => {
          console.error('Unable to connect to the database: ', error);
        });

      // alter: true actualiza las tablas existentes sin borrarlas. 
      // alter: false solo crea las tablas si no existen.
      await sequelize.sync({ alter: true });
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Error synchronizing the database: ', error);
    }
  }
}

module.exports = DatabaseSync;
