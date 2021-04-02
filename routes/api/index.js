const router = require("express").Router()
const userRoutes = require("./boredomusers");
const cloudinaryRoutes = require("./cloudinary");

router.use("/user", userRoutes);
router.use("/cloudinary", cloudinaryRoutes);

module.exports = router;