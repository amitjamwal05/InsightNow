const multer = require('multer');
const path = require('path');

// Define file storage and filter (for image only)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname); // Generate unique filename
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
