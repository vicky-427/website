const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    idea: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    work_type: {
      type: String,
      enum: ["Residential", "Commercial", "Restore"],
      required: true,
    },
    file: {
      type: String, // Store file path or URL
    },
    termsAccepted: {
      type: Boolean,
      required: true,
    },
    validatedByEngineer: {
      type: Boolean,
      default: false,
    },
    engineerFeePaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
