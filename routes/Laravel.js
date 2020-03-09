const express = require("express");
const router = express.Router();
const laravelController = require("../controllers/laravelController");

//Funciones especiales para los LIBROS
router.get("/books", laravelController.listBooks);
router.get("/books/find/:id_book", laravelController.bookFind);
router.get("/books/:id_categoria", laravelController.listBooksforCategorie);
router.put("/books/update", laravelController.bookUpdate);

//Funciones para PREGUNTAS
router.get("/questions", laravelController.listQuestions);
router.get("/questions/:id_question", laravelController.questionFind);

module.exports = router;
