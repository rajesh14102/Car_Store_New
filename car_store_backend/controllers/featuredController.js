const prisma = require('../config/prismaClient');
const path = require('path');

const uploadFeaturedCar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const filePath = `/uploads/${req.file.filename}`;

    // Delete existing featured car metadata
    await prisma.featuredCar.deleteMany();

    // Save new one
    await prisma.featuredCar.create({
      data: { modelUrl: filePath },
    });

    res.json({ message: 'Featured car uploaded successfully' });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload featured car' });
  }
};

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
