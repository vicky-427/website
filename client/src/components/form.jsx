const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
const { Submission } = require("./models/submission");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/construction_ideas", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.post("/api/submissions", upload.single("file"), async (req, res) => {
  try {
    const { name, phone, email, idea, budget, work_type, termsAccepted } = req.body;
    const file = req.file ? req.file.path : "";

    const newSubmission = new Submission({
      name,
      phone,
      email,
      idea,
      budget,
      work_type,
      file,
      termsAccepted,
    });

    await newSubmission.save();
    res.status(201).json({ message: "Submission successful", submission: newSubmission });
  } catch (error) {
    res.status(500).json({ message: "Error submitting form", error });
  }
});

app.get("/api/submissions", async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving submissions", error });
  }
});

// Axios function to submit form data
const submitForm = async (formData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/submissions", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, submitForm };
