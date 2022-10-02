const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);

    console.log('Base de datos online');
  } catch (error) {
    // Para ver el error
    console.log(error);
    // Error controlado en cosola
    throw new Error('Error al iniciar la base de datos');
  }
}

// Si se puede llegar a tener varios conexion es mejor exportar
// por nombre y no por default
module.exports = {
  dbConnection
}