// controllers/requestController.js
const ReceiverRequest = require('../Models/request.model');
const createReceiverRequest = async (req, res) => {
    const { receiverName, receiverId, loc, foodItems, quantity } = req.body;
  
    try {
      const existingRequest = await ReceiverRequest.findOne({ receiverId, loc });
  
      if (existingRequest) {
        return res.status(400).json({ message: 'Request already exists for this receiver' });
      }
      const newRequest = new ReceiverRequest({
        receiverName,
        receiverId,
        loc,
        foodItems,
        quantity,
      });
  
      const savedRequest = await newRequest.save();
      res.status(201).json({ msg: 'Request added successfully', savedRequest });
    } catch (error) {
      res.status(400).json({ message: 'Error creating request', error });
    }
  };
  
module.exports = {
  createReceiverRequest
};