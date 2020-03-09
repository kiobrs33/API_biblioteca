const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    next();
});

app.options("/*", function(req, res, next) {
    res.sendStatus(200);
});

//Rutas para la conexion a la base de datos
const router = express.Router();

//Todas las rutas tendran el prefijo API
app.use("/api", router);

//Invocando las rutas para Classes(Clases)
const categoriaRouter = require("../routes/Categoria");
router.use("/categoria", categoriaRouter);

const libroRouter = require("../routes/Libro");
router.use("/libro", libroRouter);

const perfilRouter = require("../routes/Perfil");
router.use("/perfil", perfilRouter);

const preguntaRouter = require("../routes/Pregunta");
router.use("/pregunta", preguntaRouter);

const usuarioRouter = require("../routes/Usuario");
router.use("/usuario", usuarioRouter);

//Consultas ESPECIALES PARA LARAVEL - PROJECT
const laravelRouter = require("../routes/Laravel");
router.use("/laravel", laravelRouter);

//==============================================

router.get("/", function(req, res) {
    res.json({ message: "Bienvenido a nuestra API HuallacaniBD" });
});

//Estableciendo el puerto e iniciando el servidor
const port = process.env.PORT || 5000;
app.listen(port);
console.log("Iniciando servicio en el puerto : " + port);
