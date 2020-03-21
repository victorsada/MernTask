//rutas para crear usuarios
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { check } = require("express-validator");
//crea un usuario
// api/usuarios
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio") // aca definimos que campo vamos a validar, cual va a ser su mensaje de error
      .not() //y que regla vamos a aplicar
      .isEmpty()
  ],
  check("email", "Agrega un Email válido").isEmail(),
  check("password", "El password debe ser minimo 6 caracteres").isLength({
    min: 6
  }),
  usuarioController.crearUsuario
);

module.exports = router;
