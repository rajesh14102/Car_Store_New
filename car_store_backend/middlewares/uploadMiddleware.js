const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// 🔐 Cloudinary config using .env
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// 📦 Multer storage setup with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: '3d-car-store-models',
    resource_type: 'raw', // required for .glb
    format: async () => 'glb', // enforce .glb
  },
});

// 📂 Multer uploader
const upload = multer({ storage });

module.exports = { upload };
