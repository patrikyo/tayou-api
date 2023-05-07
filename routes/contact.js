const express = require("express");
const router = express.Router();

const contact_create = require("../controllers/contactController");

router.post("/contact", (req, res) => {
  contact_create(req, res);
});

module.exports = router;
