const express = require('express');
const router = express.Router();

const {
  uploadFeaturedCar,
  getFeaturedCar,
} = require('../controllers/featuredController');

const { upload } = require('../middlewares/uploadMiddleware');

// ✅ Upload the homepage featured car model (.glb)
router.post('/upload', upload.single('model'), uploadFeaturedCar);

// ✅ Fetch the current featured car model URL
router.get('/get', getFeaturedCar);

module.exports = router;
