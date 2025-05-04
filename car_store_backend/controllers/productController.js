const prisma = require('../config/prismaClient');

const addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !description || !price || !req.file)
      return res.status(400).json({ error: 'All fields are required' });

    const modelUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        modelUrl
      }
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Add Product Error:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json(products);
  } catch (error) {
    console.error('Get Products Error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    console.error('Get Product Error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

    const data = {};
    if (req.body.name) data.name = req.body.name;
    if (req.body.description) data.description = req.body.description;
    if (req.body.price) data.price = parseFloat(req.body.price);
    if (req.file) data.modelUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const updated = await prisma.product.update({ where: { id }, data });
    res.status(200).json(updated);
  } catch (error) {
    console.error('Update Product Error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

    await prisma.product.delete({ where: { id } });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete Product Error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
