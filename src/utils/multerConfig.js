const multer = require('multer');
const path = require('path');

/**
 * Configure multer for CSV file uploads
 */
const configureMulter = () => {
  // Set up multer with explicit storage configuration
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/app/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  // Add file size limits and better error handling
  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: function (req, file, cb) {
      if (path.extname(file.originalname).toLowerCase() !== '.csv') {
        return cb(new Error('Only CSV files are allowed'));
      }
      cb(null, true);
    }
  });

  return upload;
};

module.exports = configureMulter;