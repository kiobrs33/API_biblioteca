const mysqlConnection = require("../db/dbConnection");

module.exports = {
    show: (req, res, next) => {
        mysqlConnection.query(
            "SELECT * FROM categorias",
            (err, rows, fields) => {
                if (!err) {
                    res.json(rows);
                } else {
                    console.log("SE GENERO ERROR -> " + err);
                }
            }
        );
    },
    showOne: (req, res, next) => {
        var id = req.params.id;
        mysqlConnection.query(
            "SELECT * FROM categorias WHERE categoria_id = ?",
            [id],
            (err, rows, fields) => {
                if (!err) {
                    res.json(rows[0]);
                } else {
                    console.log("SE GENERO ERROR -> " + err);
                }
            }
        );
    },
    create: (req, res, next) => {
        var nombre = req.body.nombre;

        var query = "INSERT INTO categorias (nombre) VALUES (?)";
        mysqlConnection.query(query, [nombre], (err, rows, fields) => {
            if (!err) {
                res.json({ Status: "Se guardo correctamente la categoria" });
            } else {
                console.log("SE GENERO ERROR -> " + err);
            }
        });
    },
    update: (req, res, next) => {
        var id = req.params.id;
        let updateParams = {
            ...req.body
        };
        var query = "UPDATE categorias SET ? WHERE categoria_id = ?";
        mysqlConnection.query(
            query,
            [updateParams, id],
            (err, rows, fields) => {
                if (!err) {
                    res.json({
                        Status: "Se actualizo correctamente la categoria"
                    });
                    // res.json(rows);
                } else {
                    console.log("SE GENERO ERROR -> " + err);
                }
            }
        );
    },

    delete: (req, res, next) => {
        var id = req.params.id;
        var query = "DELETE FROM categorias WHERE categoria_id = ?";
        mysqlConnection.query(query, [id], (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "Se elimino correctamente la categoria =D "
                });
            } else {
                console.log("SE GENERO ERROR -> " + err);
            }
        });
    }
};
