const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

const featuredRoutes = require('./routes/featuredRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files
const uploadPath = process.env.ON_RENDER
  ? '/mnt/data/uploads'
  : path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadPath));

// ✅ Routes
app.use('/api/featured', featuredRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
