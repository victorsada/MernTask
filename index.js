const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

//habilitar cors
app.use(cors()); //hace que el front y back puedan estar en dos dominios distintos
//Habilitar express.json
app.use(express.json({ extend: true })); //nos permitira leer datos que el usuario coloque

//Puerto de la app.
const port = process.env.PORT || 4000; // si existe process.env.port se da ese puerto, sino el 4000. (4000 para que no coincida con el de cliente)

// Importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));
//arrancar la app  o el servidor, es lo mismo
app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});

//Xku72albTbq4qgD9 <---- password del usuario mongoDB Atlas
