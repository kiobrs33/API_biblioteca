const express = require("express");
const router = express.Router();
const libroController = require("../controllers/libroController");

router.get("/", libroController.show);
router.get("/:id", libroController.showOne);
router.post("/", libroController.create);
router.put("/:id", libroController.update);
router.put("updateLibro/:id", libroController.updateLibro);
router.delete("/:id", libroController.delete);
module.exports = router;
