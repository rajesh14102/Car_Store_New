const express = require('express');
const router = express.Router();

const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { upload } = require('../middlewares/uploadMiddleware');

// ✅ Create a new product
router.post('/', upload.single('model'), addProduct);

// ✅ Get all products
router.get('/', getAllProducts);

// ✅ Get product by ID
router.get('/:id', getProductById);

// ✅ Update product by ID
router.put('/:id', upload.single('model'), updateProduct);

// ✅ Delete product by ID
router.delete('/:id', deleteProduct);

module.exports = router;
