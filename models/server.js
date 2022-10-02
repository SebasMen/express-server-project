const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users'

    // Conectar a la BD
    this.connectDB();

    // Middlewares: funciones que añaden funcionalidades al server
    this.middlewares();
    
    // Rutas de la app
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // Cors permite definir quien pude acceder al backend
    this.app.use(cors());

    // Parseo y lectura del body
    this.app.use(express.json());

    // Directorio publico, ocupa la ruta principal
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port,  () => {
      console.log('Servidor corriendo en el puerto ' + this.port);
    });
  }
}

module.exports = Server;