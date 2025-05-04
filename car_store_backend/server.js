const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

const featuredRoutes = require('./routes/featuredRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🛡 Serve uploads folder statically
const UPLOADS_DIR = process.env.ON_RENDER
  ? path.join('/mnt/data/uploads')
  : path.join(__dirname, 'uploads');

app.use('/uploads', express.static(UPLOADS_DIR));

// Routes
app.use('/api/featured', featuredRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚗 Server is running on port ${PORT}`);
});
