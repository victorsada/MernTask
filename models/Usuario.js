const mongoose = require("mongoose");

const UsuariosSchema = mongoose.Schema({
  nombre: {
    type: String, //tipo de dato
    required: true, //es obligatorio
    trim: true //Elimina los espacios en blanco al inicio y final para que se guarde bien en la DB
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true // para que no se pueda repetir este valor
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  registo: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Usuario", UsuariosSchema); //´primer parametro el nombre del modelo, y el seguindo el schema
