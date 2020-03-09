const mysqlConnection = require('../db/dbConnection');

module.exports = {
	show: (req, res, next) => {
		mysqlConnection.query('SELECT * FROM preguntas', (err, rows, fields) => {
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
			'SELECT * FROM preguntas WHERE preguntas_id = ?',
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
        var libro_id = req.body.libro_id;
        var titulo = req.body.titulo;
        var respuesta_1 = req.body.respuesta_1;
        var respuesta_2 = req.body.respuesta_2;
        var respuesta_3 = req.body.respuesta_3;
        var respuesta_4 = req.body.respuesta_4;
        var respuesta_correcta = req.body.respuesta_correcta;
        

		var query =
			'INSERT INTO preguntas (libro_id,titulo,respuesta_1,respuesta_2,respuesta_3,respuesta_4,respuesta_correcta) VALUES (?,?,?,?,?,?,?)';
		mysqlConnection.query(
			query,
			[ libro_id,titulo,respuesta_1,respuesta_2,respuesta_3,respuesta_4,respuesta_correcta],
			(err, rows, fields) => {
				if (!err) {
					res.json({ Status: 'Se guardo correctamente la pregunta' });
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
		var query = 'UPDATE preguntas SET ? WHERE preguntas_id = ?';
		mysqlConnection.query(query, [updateParams, id], (err, rows, fields) => {
			if (!err) {
				res.json({ Status: 'Se actualizo correctamente la pregunta' });
				// res.json(rows);
			} else {
				console.log('SE GENERO ERROR -> ' + err);
			}
		});
	},

	
	delete: (req, res, next) => {
		var id = req.params.id;
		var query = 'DELETE FROM preguntas WHERE preguntas_id = ?';
		mysqlConnection.query(query, [id], (err, rows, fields) => {
			if (!err) {
				res.json({ Status: 'Se elimino correctamente la pregunta =D ' });
			} else {
				console.log('SE GENERO ERROR -> ' + err);
			}
		});
	}
	
};
