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

router.route("/remove/:id")
    .put(userController.seeYa)

router.route("/removefollower/:id")
    .put(userController.seeYaFollower)

module.exports = router;