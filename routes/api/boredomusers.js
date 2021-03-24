const router = require("express").Router();
const userController = require("../../controller/userController");

router.route("/")
    .post(userController.save)
    .get(userController.findAll)
    .put(userController.update)

router.route("/:id")
    .get(userController.getUser)
    .put(userController.addNew)

module.exports = router;