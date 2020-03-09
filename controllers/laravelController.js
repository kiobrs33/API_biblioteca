const mysqlConnection = require("../db/dbConnection");

module.exports = {
    listBooksforCategorie: (req, res, next) => {
        var id_categoria = req.params.id_categoria;
        mysqlConnection.query(
            "SELECT * FROM libros WHERE categoria_id = ?",
            [id_categoria],
            (err, rows, fields) => {
                if (!err) {
                    res.json(rows);
                } else {
                    console.log("SE GENERO ERROR -> " + err);
                }
            }
        );
    },
    bookFind: (req, res, next) => {
        var id_book = req.params.id_book;
        mysqlConnection.query(
            "SELECT libros.*, categorias.nombre AS nombre_categoria FROM libros INNER JOIN categorias ON libros.categoria_id = categorias.categoria_id AND libros.libro_id = ?",
            [id_book],
            (err, rows, fields) => {
                if (!err) {
                    res.json(rows);
                } else {
                    console.log("SE GENERO ERROR -> " + err);
                }
            }
        );
    },
    listBooks: (req, res, next) => {
        mysqlConnection.query(
            "SELECT libros.*, categorias.nombre AS nombre_categoria FROM libros INNER JOIN categorias ON libros.categoria_id = categorias.categoria_id",
            (err, rows, fields) => {
                if (!err) {
                    res.json(rows);
                } else {
                    console.log("SE GENERO ERROR -> " + err);
                }
            }
        );
    },
    bookUpdate: (req, res, next) => {
        var id = req.params.id;
        let updateParams = {
            ...req.body
        };
        var query = "UPDATE libros SET ? WHERE libro_id = ?";
        mysqlConnection.query(
            query,
            [updateParams, id],
            (err, rows, fields) => {
                if (!err) {
                    res.json({
                        Status: "Se actualizo correctamente el perfil"
                    });
                    // res.json(rows);
                } else {
                    console.log("SE GENERO ERROR -> " + err);
                }
            }
        );
    },
    listQuestions: (req, res, next) => {
        mysqlConnection.query(
            "SELECT preguntas.*, libros.nombre AS nombre_libro FROM preguntas INNER JOIN libros ON libros.libro_id = preguntas.libro_id",
            (err, rows, fields) => {
                if (!err) {
                    res.json(rows);
                } else {
                    console.log("SE GENERO ERROR -> " + err);
                }
            }
        );
    },
    questionFind: (req, res, next) => {
        var id_pregunta = req.params.id_question;
        mysqlConnection.query(
            "SELECT preguntas.*, libros.nombre AS nombre_libro FROM preguntas INNER JOIN libros ON libros.libro_id = preguntas.libro_id AND preguntas.preguntas_id = ?",
            [id_pregunta],
            (err, rows, fields) => {
                if (!err) {
                    res.json(rows);
                } else {
                    console.log("SE GENERO ERROR -> " + err);
                }
            }
        );
    }
};
