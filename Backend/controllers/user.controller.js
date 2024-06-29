const userModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "Email already exists, please try again!" });
    }
    const user = await userModel.create({
      email: req.body.email,
      phone: req.body.phone,
      location: {
        name: req.body.address,
        lat: req.body.lat,
        long: req.body.long,
      },
      name: req.body.name,
    });
    res.status(201).json({ msg: "User created successfully", user: user });
  } catch (error) {
    res.status(500).json({ msg: "Error creating user", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await userModel.findOne({ email: email });
    if (!user)
      return res
        .status(401)
        .json({ message: "Invalid login credentials! Please check it." });

    let payload = { email: user.email };
    const token = jwt.sign(payload, "SecretKey", { expiresIn: "1h" });
    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "user login unsuccessful", error: error.message });
  }
};
module.exports = { registerUser, loginUser };
