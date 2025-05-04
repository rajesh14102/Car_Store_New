const express = require('express');
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware');

router.post('/', upload.single('model'), addProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', upload.single('model'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
