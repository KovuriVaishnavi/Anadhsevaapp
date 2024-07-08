const Donation = require("../Models/donation.model"); // Adjust the path as per your project structure
const ReceiverRequest = require("../Models/request.model");
const Transaction = require("../Models/transaction.model.js");
const errorHandler = require("../middleware/errorHandling.js");
const createReceiverRequest = async (req, res) => {
  const { receiverName, receiverId, loc, foodItems, quantity } = req.body;

  try {
    const newRequest = new ReceiverRequest({
      receiverName,
      receiverId,
      location: loc,
      foodItems,
      quantity,
    });

    const savedRequest = await newRequest.save();
    res.status(201).json({ msg: 'Request added successfully', savedRequest });
  } catch (error) {
    res.status(400).json({ message: 'Error creating request', error });
  }
};
const getAllRequests = async (req, res) => {
  try {
    const requests = await ReceiverRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompletedRequests = async (req, res) => {
  try {
    const requests = await Donation.find({ status: "taken" });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFulfilledReceiverRequests = async (req, res) => {
  try {
    const requests = await ReceiverRequest.find({
      status: { $in: ["taken", "completed"] },
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getvolunteeredRequests = async (req, res) => {
  try {
    const requests = await Transaction.find({
      status: { $in: ["taken", "completed"] },
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPendingRequests = async (req, res) => {
  const requests = await ReceiverRequest.find({status: "pending"});
  res.status(200).json(requests);
}

module.exports = {
  getAllRequests,
  getCompletedRequests,
  getFulfilledReceiverRequests,
  getvolunteeredRequests,
  createReceiverRequest,
  getPendingRequests
};

// controllers/requestController.js
// const ReceiverRequest = require('../Models/request.model');
// const createReceiverRequest = async (req, res) => {
//     const { receiverName, receiverId, loc, foodItems, quantity } = req.body;

//     try {
//       const existingRequest = await ReceiverRequest.findOne({ receiverId, loc });

//       if (existingRequest) {
//         return res.status(400).json({ message: 'Request already exists for this receiver' });
//       }
//       const newRequest = new ReceiverRequest({
//         receiverName,
//         receiverId,
//         loc,
//         foodItems,
//         quantity,
//       });

//       const savedRequest = await newRequest.save();
//       res.status(201).json({ msg: 'Request added successfully', savedRequest });
//     } catch (error) {
//       res.status(400).json({ message: 'Error creating request', error });
//     }
//   };

// module.exports = {
//   createReceiverRequest
// };
