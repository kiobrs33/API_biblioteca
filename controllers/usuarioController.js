const mysqlConnection = require("../db/dbConnection");

module.exports = {
    signin: (req, res, next) => {
        var usuario = req.body.usuario;
        var contraseña = req.body.contraseña;
        console.log(usuario, contraseña);
        var query =
            "SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?";
        mysqlConnection.query(
            query,
            [usuario, contraseña],
            (err, rows, fields) => {
                if (!err) {
                    if (rows.length == 0) {
                        res.json({
                            error: true,
                            message: "Username or Password is wrong"
                        });
                        // return res.status(401).json({
                        //     error: true,
                        //     message: "Username or Password is wrong"
                        // });
                    }
                    res.json({
                        data: rows
                    });
                } else {
                    res.json({ Status: err });
                }
            }
        );
    },
    verify: (req, res, next) => {
        var dni = req.body.dni;
        var nombre = req.body.nombre;

        var query =
            "select * from perfiles where perfiles.dni = ? and perfiles.nombre= ?";
        mysqlConnection.query(query, [dni, nombre], (err, rows, fields) => {
            if (!err) {
                console.log(dni + codigo);

                if (rows.length == 0) {
                    return res.status(401).json({
                        error: true,
                        message:
                            "Usted no es alumno de Tecsup! Salga de aqui..."
                    });
                }
                res.json({
                    message: "Verificado!",
                    data: rows
                });
            } else {
                res.json({ Status: err });
            }
        });
    },
    show: (req, res, next) => {
        mysqlConnection.query("SELECT * FROM usuarios", (err, rows, fields) => {
            if (!err) {
                res.json(rows);
            } else {
                console.log("SE GENERO ERROR -> " + err);
            }
        });
    },
    showOne: (req, res, next) => {
        var id = req.params.id;
        mysqlConnection.query(
            "SELECT * FROM usuarios WHERE usuario_id = ?",
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
        var usuario = req.body.usuario;
        var contraseña = req.body.contraseña;
        var perfil_id = req.body.perfil_id;
        var tipo = req.body.tipo;

        var query =
            "INSERT INTO usuarios (usuario,contraseña,perfil_id,tipo) VALUES (?,?,?,?)";
        mysqlConnection.query(
            query,
            [usuario, contraseña, perfil_id, tipo],
            (err, rows, fields) => {
                if (!err) {
                    res.json({ Status: "Se guardo correctamente al usuario" });
                } else {
                    console.log("SE GENERO ERROR -> " + err);
                }
            }
        );
    },
    update: (req, res, next) => {
        var id = req.params.id;
        let updateParams = {
            ...req.body
        };
        var query = "UPDATE usuarios SET ? WHERE usuario_id = ?";
        mysqlConnection.query(
            query,
            [updateParams, id],
            (err, rows, fields) => {
                if (!err) {
                    res.json({
                        Status: "Se actualizo correctamente al usuario"
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
        var query = "DELETE FROM usuarios WHERE usuario_id = ?";
        mysqlConnection.query(query, [id], (err, rows, fields) => {
            if (!err) {
                res.json({ Status: "Se elimino correctamente al usuario =D " });
            } else {
                console.log("SE GENERO ERROR -> " + err);
            }
        });
    }
};
