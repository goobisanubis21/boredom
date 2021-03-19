const router = require("express").Router()
const userRoutes = require("./boredomusers");

router.use("/user", userRoutes);

module.exports = router;