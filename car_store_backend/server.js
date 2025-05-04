const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import Routes
const featuredRoutes = require('./routes/featuredRoutes');
const productRoutes = require('./routes/productRoutes');

// Initialize app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Detect Render environment
const isRender = process.env.ON_RENDER === 'true';

// ✅ Serve uploads folder correctly for both local and Render
const UPLOADS_DIR = isRender
  ? '/mnt/data/uploads' // Render's writable folder (must already exist)
  : path.join(__dirname, 'uploads'); // Local uploads folder

app.use('/uploads', express.static(UPLOADS_DIR));

// API Routes
app.use('/api/featured', featuredRoutes);
app.use('/api/products', productRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚗 Server is running on port ${PORT}`);
});
