const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const featuredRoutes = require('./routes/featuredRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Global Middlewares ---
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Static File Serving ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // For GLB model access

// --- API Routes ---
app.use('/api/products', productRoutes);
app.use('/api/featured', featuredRoutes);

// --- 404 Handling ---
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// --- Global Error Handler (Optional) ---
app.use((err, req, res, next) => {
  console.error('Unexpected Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

const { exec } = require('child_process');

// Run Prisma migration at runtime
exec('npx prisma db push', (err, stdout, stderr) => {
  if (err) {
    console.error('❌ Prisma DB Push failed:', stderr);
  } else {
    console.log('✅ Prisma DB Push succeeded:', stdout);
  }
});
