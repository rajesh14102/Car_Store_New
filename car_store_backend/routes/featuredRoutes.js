const express = require('express');
const router = express.Router();
const { uploadFeaturedCar, getFeaturedCar } = require('../controllers/featuredController');
const upload = require('../middlewares/uploadMiddleware');

router.post('/upload', upload.single('model'), uploadFeaturedCar);
router.get('/get', getFeaturedCar);

module.exports = router;
