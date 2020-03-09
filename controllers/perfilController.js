const mysqlConnection = require('../db/dbConnection');

module.exports = {
	show: (req, res, next) => {
		mysqlConnection.query('SELECT * FROM perfiles', (err, rows, fields) => {
			if (!err) {
				res.json(rows);
			} else {
				console.log('SE GENERO ERROR -> ' + err);
			}
		});
	},
	showOne: (req, res, next) => {
		var id = req.params.id;
		mysqlConnection.query(
			'SELECT * FROM perfiles WHERE perfil_id = ?',
			[id],
			(err, rows, fields) => {
				if (!err) {
					res.json(rows[0]);
				} else {
					console.log('SE GENERO ERROR -> ' + err);
				}
			}
		);
	},
	create: (req, res, next) => {
		var nombre = req.body.nombre;
		var apellidos = req.body.apellidos;
		var fec_reg = req.body.fec_reg;
		var colegio = req.body.colegio;
        var grado = req.body.grado;
        var nivel = req.body.nivel;
        var rango = req.body.rango;
		var porcentaje = req.body.porcentaje;
        var libros_leidos = req.body.libros_leidos;
        var dni = req.body.dni;
        var ruta_foto = req.body.ruta_foto;
        
        
		var query =
			'INSERT INTO perfiles (nombre,apellidos,fec_reg,colegio,grado,nivel,rango,porcentaje,libros_leidos,dni,ruta_foto) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
		mysqlConnection.query(
			query,
			[ nombre, apellidos, fec_reg, colegio, grado,nivel,rango,porcentaje,libros_leidos,dni,ruta_foto],
			(err, rows, fields) => {
				if (!err) {
					res.json({ Status: 'Se guardo correctamente el perfil' });
				} else {
					console.log('SE GENERO ERROR -> ' + err);
				}
			}
		);
	},
	update: (req, res, next) => {
		var id = req.params.id;
		let updateParams = {
			...req.body
		};
		var query = 'UPDATE perfiles SET ? WHERE perfil_id = ?';
		mysqlConnection.query(query, [updateParams, id], (err, rows, fields) => {
			if (!err) {
				res.json({ Status: 'Se actualizo correctamente el perfil' });
				// res.json(rows);
			} else {
				console.log('SE GENERO ERROR -> ' + err);
			}
		});
	},
	updateFoto: (req, res, next) => {
		var ruta_foto= req.body.ruta_foto;
		var perfil_id = req.body.perfil_id;
		
		var query = 'UPDATE perfiles SET ruta_foto = ? WHERE perfil_id = ?';
		mysqlConnection.query(query, 
			[ruta_foto,perfil_id], (err, rows, fields) => {
			if (!err) {
				res.json({ Status: 'Se actualizo correctamente la foto' });
				
			} else {
				console.log('SE GENERO ERROR -> ' + err);
			}
		});
	},
	
	delete: (req, res, next) => {
		var id = req.params.id;
		var query = 'DELETE FROM perfiles WHERE perfil_id = ?';
		mysqlConnection.query(query, [id], (err, rows, fields) => {
			if (!err) {
				res.json({ Status: 'Se elimino correctamente el perfil =D ' });
			} else {
				console.log('SE GENERO ERROR -> ' + err);
			}
		});
	}
};
