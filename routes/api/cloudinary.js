const router = require("express").Router();
const cloudController = require("../../controller/cloudController");

router.route("/")
    .post(cloudController.addImage)

module.exports = router;