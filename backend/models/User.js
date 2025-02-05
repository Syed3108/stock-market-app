// User model (create a models/User.js file)
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: String }], // Array of cryptocurrency IDs
});

const User = mongoose.model("User", userSchema);

// Add favorite crypto
app.post("/api/favorites", async (req, res) => {
  const { userId, cryptoId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user.favorites.includes(cryptoId)) {
      user.favorites.push(cryptoId);
      await user.save();
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error adding favorite" });
  }
});
