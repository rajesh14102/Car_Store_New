import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import { getFeaturedCar } from '../services/featuredService';
import ProductCard from '../components/ProductCard';
import ThreeDViewer from '../components/ThreeDViewer';
import { Box, Typography, TextField, Slider, Container, Grid } from '@mui/material';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [featuredModelUrl, setFeaturedModelUrl] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (error) {
        console.error('Failed to load products', error);
      }
    };

    const loadFeaturedCar = async () => {
      try {
        const res = await getFeaturedCar();
        setFeaturedModelUrl(res.data.modelUrl);
      } catch (error) {
        console.error('Failed to load featured car', error);
      }
    };

    loadProducts();
    loadFeaturedCar();
  }, []);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchName.toLowerCase()) &&
    product.price >= priceRange[0] &&
    product.price <= priceRange[1]
  );

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 3 }, pt: 2, pb: 4 }}>
      {/* Intro Text */}
      <Typography
        variant="h5"
        align="center"
        sx={{
          color: '#bd8c44',
          fontWeight: 'bold',
          fontFamily: 'Tagesschrift, sans-serif',
          mb: 1
        }}
      >
        Welcome to Car Store - Where Dreams are Driven!
      </Typography>

      <Typography
        variant="body1"
        align="center"
        sx={{
          color: '#bd8c44',
          maxWidth: 800,
          mx: 'auto',
          fontFamily: 'Tagesschrift, sans-serif',
          mb: 3
        }}
      >
        At Car Store, we offer a premium selection of high-performance cars, timeless classics, and futuristic designs — 
        all brought to life in immersive 3D. Explore our showroom, experience perfection, and drive your dreams!
      </Typography>

      {/* Featured Car */}
      {featuredModelUrl && (
        <Box sx={{ width: '100%', height: { xs: 400, sm: 600, md: 700, lg: 800 }, mb: 4 }}>
          <ThreeDViewer
            modelUrl={`http://localhost:5000${featuredModelUrl}`}
            small={false}
          />
        </Box>
      )}

      {/* Filters */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          mb: 4
        }}
      >
        <TextField
          label="Search Cars"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          variant="outlined"
          sx={{
            width: { xs: '100%', sm: 300 },
            input: {
              color: '#bd8c44',
              fontFamily: 'Tagesschrift, sans-serif'
            },
            label: {
              color: '#bd8c44',
              fontFamily: 'Tagesschrift, sans-serif'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#bd8c44' },
              '&:hover fieldset': { borderColor: '#bd8c44' },
              '&.Mui-focused fieldset': { borderColor: '#bd8c44' }
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#bd8c44'
            }
          }}
        />
        <Box sx={{ width: 300 }}>
          <Typography sx={{ color: '#bd8c44', mb: 0.5, fontFamily: 'Tagesschrift, sans-serif' }}>
            Filter by Price
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={10000000}
            sx={{ color: '#bd8c44' }}
          />
        </Box>
      </Box>

      {/* Product Cards (3 per row on large screens) */}
      <Grid container spacing={3} justifyContent="center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ color: '#bd8c44', fontFamily: 'Tagesschrift, sans-serif' }}
          >
            No cars found matching your search.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default HomePage;
