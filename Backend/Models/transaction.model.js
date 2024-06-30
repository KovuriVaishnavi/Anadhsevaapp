const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructure Schema from mongoose

const transactionSchema = new Schema(
  {
    donorName: { type: String, ref: "User", required: true },
    receiverName: { type: String, ref: "User", required: true },
    volunteerId: {
      type: Schema.Types.ObjectId,
      ref: "Volunteer",
      required: true,
    },
    donationId: {
      type: Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },
    rloc: {
      name: { type: String, required: true },
      lat: { type: Number, required: true },
      long: { type: Number, required: true },
    },
    dloc: {
      name: { type: String, required: true },
      lat: { type: Number, required: true },
      long: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "failed", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
