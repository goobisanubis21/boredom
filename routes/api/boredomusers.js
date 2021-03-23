const router = require("express").Router();
const userController = require("../../controller/userController");

router.route("/")
    .post(userController.save)
    .get(userController.findAll)
    .put(userController.update)
// Matches with "/api/books/:id"
// router
//   .route("/:search")
//   .get(booksController.searchBooks)

// router.route("/:id")
//   // .get(booksController.findById)
//   .delete(booksController.remove);

module.exports = router;