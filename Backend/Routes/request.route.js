const express = require("express");
const router = express.Router();
const {
  getAllRequests,
  getCompletedRequests,
  getFulfilledReceiverRequests,
  getvolunteeredRequests,
  createReceiverRequest
} = require("../controllers/request.controller");

// Route to get all requests
router.get("/", getAllRequests);
router.post("/", createReceiverRequest);

// Route to get completed requests
router.get("/donated", getCompletedRequests);

// Route to get fulfilled receiver requests
router.get("/received", getFulfilledReceiverRequests);

// Route to get volunteered requests
router.get("/volunteered", getvolunteeredRequests);

module.exports = router;
