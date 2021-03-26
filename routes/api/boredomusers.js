const router = require("express").Router();
const userController = require("../../controller/userController");

router.route("/")
    .post(userController.save)
    .get(userController.findAll)
    .put(userController.update)

router.route("/:id")
    .get(userController.getUser)
    .put(userController.addNew)

router.route("/add/:id")
    .put(userController.getNew)

module.exports = router;