const path = require("path");
const router = require("express").Router();
const userRouter = require("./User.js");
const imageRouter = require("./image-upload");

// API Routes
router.use("/User", userRouter);
router.use("/api", imageRouter);

// If no API routes are hit, send the React app
router.use("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;