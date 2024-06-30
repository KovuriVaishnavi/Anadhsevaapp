const volunteer = require("../Models/transaction.model");
const donation = require("../Models/donation.model");
const request = require("../Models/request.model");

const errorHandler = require("express-async-handler");

const getAllTransactions = errorHandler(async (req, res) => {
  const transactions = await volunteer.find({ status: "pending" });

  res.json(transactions);
});
module.exports = { getAllTransactions };
