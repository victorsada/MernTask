const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const conectarDB = async () => {
  try {
    //el primer parametro de mongoose.connect es el link de la base de datos
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("Base de Datos Conectada");
  } catch (error) {
    console.log("hubo un error");
    console.log(error);
    process.exit(1); // Detener la app
  }
};

module.exports = conectarDB;
