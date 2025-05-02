const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const featuredRoutes = require('./routes/featuredRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static GLB files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/products', productRoutes);
app.use('/api/featured', featuredRoutes);

// Error Handling
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Unexpected Error:', err);
  res.status(500).json({ error: 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
