const express = require('express');
const connectDB = require('./config/db');
const filesRouter = require('./routes/files');
const projectsRouter = require('./routes/projects');

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Routes
app.use('/api/files', filesRouter);
app.use('/api/projects', projectsRouter);

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});