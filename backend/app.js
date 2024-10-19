// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  employees: Number,
  otp: String,
  otpExpires: Date,
  isEmailVerified: { type: Boolean, default: false },
  password: { type: String, required: true }, // Added password field
});

const User = mongoose.model('User', userSchema);

// Interview Schema
const interviewSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  courseLevel: { type: String, required: true }, // Changed from candidateEmail
  endDate: { type: Date, required: true },
});

const Interview = mongoose.model('Interview', interviewSchema); // Ensure Interview model is defined

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Sign up route
app.post('/signup', async (req, res) => {
  const { name, email, phone, company, employees, password } = req.body; // Added password to destructure

  // Generate OTP
  const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP

  const newUser = new User({ name, email, phone, company, employees, password, otp, otpExpires: Date.now() + 10 * 60 * 1000 });

  try {
    await newUser.save();

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error in /signup route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/verify-otp', async (req, res) => {
  const { otp, email } = req.body;

  console.log("Received request to verify OTP for:", email); // Log the email

  try {
    const user = await User.findOne({ email });
    console.log("Found user:", user); // Log the user found

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check OTP expiration
    const currentTime = new Date();
    if (user.otpExpires < currentTime) {
      return res.status(400).json({ message: "OTP has expired." });
    }

    // Check if the OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    // OTP matched, you can now proceed with your logic (e.g., login or activation)
    res.status(200).json({ message: "OTP verified successfully." });
  } catch (error) {
    console.error("Error in /verify-otp:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});









// Login endpoint
app.post('/login', async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const user = await User.findOne({ 
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }] // Check both email and username
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const isPasswordValid = user.password === password; // Change this line if you're using hashed passwords

    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    res.json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Error in /login route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Interview routes
app.post('/api/interviews', async (req, res) => {
  try {
    const interviewData = req.body;

    // Create a new interview document
    const interview = new Interview(interviewData);
    await interview.save();

    res.status(201).json({ message: 'Interview created successfully', interview });
  } catch (error) {
    console.error('Error creating interview:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add this code after your existing routes in app.js

// Get all interviews
app.get('/api/interviews', async (req, res) => {
  try {
    const interviews = await Interview.find(); // Fetch all interviews from the database
    res.status(200).json(interviews); // Send the interviews as a JSON response
  } catch (error) {
    console.error('Error fetching interviews:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
