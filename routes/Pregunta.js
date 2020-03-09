const express = require('express');
const router = express.Router();
const preguntaController = require('../controllers/preguntaController');

router.get('/', preguntaController.show);
router.get('/:id', preguntaController.showOne);
router.post('/', preguntaController.create);
router.put('/:id', preguntaController.update);
router.delete('/:id', preguntaController.delete);
module.exports = router;
