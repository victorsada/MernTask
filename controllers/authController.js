const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // extraer el email y password
  const { email, password } = req.body;

  try {
    // Revisar que sea un usuario registrado
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    const passCorrecto = await bcryptjs.compare(password, usuario.password); //password: manda el usuario. usuario.password: el pass que esta en la base de datos
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Contraseña Incorrecta" });
    }

    //Si todo es correcto: el usuario existe y password correcto, entonces
    //crear el JWT
    const payload = {
      usuario: {
        id: usuario.id
      }
    };
    //Firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      { expiresIn: 3600 },
      (error, token) => {
        if (error) throw error;
        res.json({ token }); //obtenemos el token
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//Obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {
  try {
    //findById es el select de sql. lo que este dentro del parentesis es el where / .select('-campo')
    const usuario = await Usuario.findById(req.usuario.id).select("-password"); //es la manera en Mongo para decir que no nos traiga un campo especifico
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
