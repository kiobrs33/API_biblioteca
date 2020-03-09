const mysqlConnection = require('../db/dbConnection');

module.exports = {
	show: (req, res, next) => {
		mysqlConnection.query('SELECT * FROM libros', (err, rows, fields) => {
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
			'SELECT * FROM libros WHERE libro_id = ?',
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
        var categoria_id = req.body.categoria_id;
        var visitas = req.body.visitas;
        var descargas = req.body.descargas;
        var ruta_pdf = req.body.ruta_pdf;
        
        
		var query =
			'INSERT INTO libros (nombre,categoria_id,visitas,descargas,ruta_pdf) VALUES (?,?,?,?,?)';
		mysqlConnection.query(
			query,
			[ nombre, categoria_id, visitas, descargas, ruta_pdf],
			(err, rows, fields) => {
				if (!err) {
					res.json({ Status: 'Se guardo correctamente el libro' });
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
		var query = 'UPDATE libros SET ? WHERE libro_id = ?';
		mysqlConnection.query(query, [updateParams, id], (err, rows, fields) => {
			if (!err) {
				res.json({ Status: 'Se actualizo correctamente el perfil' });
				// res.json(rows);
			} else {
				console.log('SE GENERO ERROR -> ' + err);
			}
		});
	},
	updateLibro: (req, res, next) => {
		var ruta_pdf= req.body.ruta_pdf;
		var libro_id = req.body.libro_id;
		
		var query = 'UPDATE libros SET ruta_pdf = ? WHERE libro_id = ?';
		mysqlConnection.query(query, 
			[ruta_pdf,libro_id], (err, rows, fields) => {
			if (!err) {
				res.json({ Status: 'Se actualizo correctamente el libro' });
				
			} else {
				console.log('SE GENERO ERROR -> ' + err);
			}
		});
	},
	
	delete: (req, res, next) => {
		var id = req.params.id;
		var query = 'DELETE FROM libros WHERE libro_id = ?';
		mysqlConnection.query(query, [id], (err, rows, fields) => {
			if (!err) {
				res.json({ Status: 'Se elimino correctamente el libro =D ' });
			} else {
				console.log('SE GENERO ERROR -> ' + err);
			}
		});
	}
};
