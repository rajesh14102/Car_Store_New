const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Determine correct directory
const uploadDir = process.env.ON_RENDER
  ? '/mnt/data/uploads'
  : path.join(__dirname, '..', 'uploads');

// ✅ Ensure folder exists (ONLY LOCALLY)
if (!process.env.ON_RENDER) {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;
