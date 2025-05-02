const prisma = require('../config/prismaClient');

// Add Product
const addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !description || !price || !req.file || !req.file.path) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        modelUrl: req.file.path,
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error('Add Product Error:', error.message);
    return res.status(500).json({ error: 'Failed to add product' });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json(products);
  } catch (error) {
    console.error('Get Products Error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get Single Product
const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    return res.status(200).json(product);
  } catch (error) {
    console.error('Get Product Error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

    const data = {};
    if (req.body.name) data.name = req.body.name;
    if (req.body.description) data.description = req.body.description;
    if (req.body.price) data.price = parseFloat(req.body.price);
    if (req.file && req.file.path) data.modelUrl = req.file.path;

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'No fields provided for update' });
    }

    const updated = await prisma.product.update({
      where: { id },
      data,
    });

    return res.status(200).json(updated);
  } catch (error) {
    console.error('Update Product Error:', error.message);
    return res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

    await prisma.product.delete({ where: { id } });

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete Product Error:', error.message);
    return res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
