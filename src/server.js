const app = require('./app');
const sequelize = require('./utils/connection');

const PORT = process.env.PORT || 8080;

const syncDatabase1 = async () => {
    try {
      // Sincronizar sin perder datos, solo alterando las tablas
      await sequelize.sync({alter : true });
      console.log('Tablas sincronizadas correctamente sin pérdida de datos.');
    } catch (error) {
      console.error('Error al sincronizar la base de datos:', error);
    }
  };

  const syncDatabase = async () => {
    try {
      // Eliminar todas las tablas y volver a crearlas
      await sequelize.sync({force : true });
      console.log('Tablas sincronizadas correctamente sin pérdida de datos.');
    } catch (error) {
      console.error('Error al sincronizar la base de datos:', error);
    }
  };

const main = async () => {
    try {
        sequelize.sync();
        console.log("DB connected");
        // syncDatabase();
        app.listen(PORT);
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.log(error)
    }
}

main();
