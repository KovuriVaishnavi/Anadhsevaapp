const express = require("express");
const {
  postDonation,
  getDonation,
} = require("../controllers/donation.controller");
const { adminAuth } = require("../middleware/adminAuth");
const router = express.Router();

router.post("/", postDonation);

module.exports = router;
