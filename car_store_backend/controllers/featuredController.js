const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const prisma = require('../config/prismaClient');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ✅ Upload Featured Car
const uploadFeaturedCar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'featured-cars',
    });

    // Remove temp file
    fs.unlinkSync(req.file.path);

    // Remove old featured entry
    await prisma.featuredCar.deleteMany();

    // Save Cloudinary URL
    await prisma.featuredCar.create({
      data: { modelUrl: result.secure_url },
    });

    res.json({ message: 'Featured car uploaded', url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload featured car' });
  }
};

// ✅ Get Featured Car
const getFeaturedCar = async (req, res) => {
  try {
    const featured = await prisma.featuredCar.findFirst({
      orderBy: { uploadedAt: 'desc' },
    });

    res.json({ modelUrl: featured?.modelUrl || null });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch featured car' });
  }
};

module.exports = {
  uploadFeaturedCar,
  getFeaturedCar,
};
