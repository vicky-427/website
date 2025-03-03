const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = process.env.UPLOAD_DIR || 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow common file types
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type!'));
  }
});

// Routes
router.post('/upload', auth, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname,
      size: req.file.size,
      uploadedBy: req.user.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', auth, (req, res) => {
  try {
    const uploadDir = process.env.UPLOAD_DIR || 'uploads';
    fs.readdir(uploadDir, (err, files) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to read files' });
      }
      const fileList = files.map(filename => ({
        name: filename,
        path: `/uploads/${filename}`,
        uploadDate: fs.statSync(path.join(uploadDir, filename)).mtime
      }));
      res.json(fileList);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:filename', auth, (req, res) => {
  try {
    const filepath = path.join(process.env.UPLOAD_DIR || 'uploads', req.params.filename);
    fs.unlink(filepath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete file' });
      }
      res.json({ message: 'File deleted successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;   