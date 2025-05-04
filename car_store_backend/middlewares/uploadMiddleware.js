const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Choose upload directory depending on environment
const uploadPath = process.env.ON_RENDER
  ? '/mnt/data/uploads'
  : path.join(__dirname, '..', 'uploads');

// Ensure folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

module.exports = upload;
