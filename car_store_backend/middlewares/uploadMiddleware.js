import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const isRender = process.env.ON_RENDER === 'true';

const uploadDir = isRender
  ? '/mnt/data/uploads'  // ✅ For Render (no mkdir needed)
  : path.join('uploads'); // ✅ Local

// ✅ Ensure local directory only (Render fails on mkdirSync!)
if (!isRender && !fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext);
  },
});

export const upload = multer({ storage });
