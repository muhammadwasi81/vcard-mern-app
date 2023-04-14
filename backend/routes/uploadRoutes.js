const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../../frontend/public/images/"));
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
  res.json({ filename: req.file.filename });
});

module.exports = router;
