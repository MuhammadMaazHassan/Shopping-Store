const User = require("../models/User");

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;
  user.address = req.body.address || user.address;
  user.areaCode = req.body.areaCode || user.areaCode;
  
  if (req.body.notificationSettings !== undefined) {
    user.notificationSettings = req.body.notificationSettings;
  }
  
  if (req.body.preferences !== undefined) {
    user.preferences = req.body.preferences;
  }

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    address: updatedUser.address,
    areaCode: updatedUser.areaCode,
    isAdmin: updatedUser.isAdmin,
    notificationSettings: updatedUser.notificationSettings,
    preferences: updatedUser.preferences,
  });
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
