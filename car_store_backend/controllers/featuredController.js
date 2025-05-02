const prisma = require('../config/prismaClient');

const uploadFeaturedCar = async (req, res) => {
  try {
    if (!req.file || !req.file.path) return res.status(400).json({ error: 'No file uploaded' });

    const filePath = req.file.path; // ✅ Cloudinary returns full URL

    await prisma.featuredCar.deleteMany();

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