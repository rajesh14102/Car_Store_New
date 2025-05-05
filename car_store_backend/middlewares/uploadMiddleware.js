const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set the uploads folder relative to the project root
const uploadDir = path.join(process.cwd(), 'uploads');

// Ensure the folder exists (Render wipes folders on deploy, but we recreate it on boot)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
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
