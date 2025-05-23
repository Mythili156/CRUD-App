const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (user_crud -> db login -> collection crud)
mongoose.connect('mongodb://localhost:27017/user_crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB 'user_crud' database"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Define schema and model for collection 'crud' in DB 'user_crud'
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
}, { collection: 'crud' }); // explicitly specify collection name

const User = mongoose.model('User', userSchema);

// Register endpoint: saves user data in 'crud' collection
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email and password" });
    }

    // Optional: Check if user with email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "❌ Error registering user", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
