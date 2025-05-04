import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

// 📁 Use /mnt/data/uploads in Render, fallback to ./uploads locally
const isOnRender = process.env.ON_RENDER === 'true';
const uploadDir = isOnRender
  ? '/mnt/data/uploads'
  : path.join(process.cwd(), 'uploads');

// ✅ Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 🛠️ Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    cb(null, filename);
  }
});

// ✅ File type validation
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'model/gltf-binary') {
    cb(null, true);
  } else {
    cb(new Error('Only .glb files are allowed!'), false);
  }
};

// 📦 Upload middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export default upload;
