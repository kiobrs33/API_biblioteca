const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');

router.get('/', perfilController.show);
router.get('/:id', perfilController.showOne);
router.post('/', perfilController.create);
router.put('/:id', perfilController.update);
router.put('updateFoto/:id', perfilController.updateFoto);
router.delete('/:id', perfilController.delete);
module.exports = router;
