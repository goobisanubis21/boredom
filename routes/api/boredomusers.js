const router = require("express").Router();
const userController = require("../../controller/userController");

router.route("/")
  .get(userController.findAll);

// Matches with "/api/books/:id"
// router
//   .route("/:search")
//   .get(booksController.searchBooks)

// router.route("/:id")
//   // .get(booksController.findById)
//   .delete(booksController.remove);

module.exports = router;