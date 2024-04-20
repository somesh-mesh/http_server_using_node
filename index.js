const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://admin:po31OJnK4Ttyyupk@cluster0.7o3sy75.mongodb.net/userappnew");
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

app.post("/signUp", async function (req, res) {
  // Retrieve data from request body
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  // Validation: Check for empty fields
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Please provide all required fields." });
  }

  // Check if user already exists in the database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Create a new user
  const user = new User({
    name: name,
    email: email,
    password: password,
  });

  // Save the new user to the database
  try {
    await user.save();
    console.log("User saved successfully");
    res.json({ msg: "User Created Successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


