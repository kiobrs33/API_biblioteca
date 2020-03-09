const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.show);
router.post('/signin', usuarioController.signin);
router.post('/verify', usuarioController.verify);
router.get('/:id', usuarioController.showOne);
router.post('/', usuarioController.create);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController.delete);
module.exports = router;
