const errorHandler = require("express-async-handler");
const Donation = require("../Models/donation.model");
const ReceiverRequest = require("../Models/request.model");
// const Transaction = require("../Models/transaction.model");

// Post a donation to a specific receiver request
const postDonation = errorHandler(async (req, res) => {
  const { foodItems, quantity, receiverId, shelfLife } = req.body;
  const user = req.user;
  const donorId = user._id;
  const donorName = user.username;
  const loc = user.loc;
  let newDonation;

  if (!receiverId) {
    newDonation = new Donation({
      donorId,
      donorName,
      loc,
      shelfLife,
      foodItems,
      quantity,
      misc: true,
    });
  } else {
    newDonation = new Donation({
      donorId,
      donorName,
      loc,
      shelfLife,
      foodItems,
      quantity,
      receiverId,
    });
  }
  await newDonation.save();

  // Update receiver request status to fulfilled
  const request = await ReceiverRequest.findByIdAndUpdate(receiverId, {
    status: "taken",
  });
  if (!request) {
    res.status(404);
    throw new Error("Request not found");
  }

  const transaction = new Transaction({
    dloc: loc,
    rloc: request.loc,
    donationId: newDonation._id,
    donorName: donorName,
    receiverName: request.receiverName,
    donorId: donorId,
  });
  await transaction.save();

  res.status(201).json(newDonation);
});

const getDonation = errorHandler(async (req, res) => {
  const donations = await Donation.find();
  res.json(donations);
});

module.exports = {
  postDonation,
  getDonation,
};
