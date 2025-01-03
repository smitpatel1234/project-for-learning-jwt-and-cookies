const UserModel = require('../mydb/user');

module.exports.users = async (req, res) => {
  try {
    const user = req.user;  // Access the user attached by jwtauth
    const user1 = await UserModel.findOne({ _id: user._id }); // Find user by _id

    if (!user1) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ username: user1.username }); // Send back the username
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
