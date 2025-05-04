import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { Box, Typography, CircularProgress, Container } from '@mui/material';
import ThreeDViewer from '../components/ThreeDViewer';

const ViewProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch (error) {
        console.error('Failed to fetch product', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#bd8c44' }} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography
        variant="h6"
        textAlign="center"
        mt={5}
        sx={{ color: '#bd8c44', fontFamily: 'Tagesschrift, sans-serif' }}
      >
        Product not found
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ px: 2, py: 5 }}>
      <Typography
        variant="h4"
        mb={4}
        textAlign="center"
        sx={{
          color: '#bd8c44',
          fontWeight: 'bold',
          fontFamily: 'Tagesschrift, sans-serif'
        }}
      >
        {product.name}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Box sx={{ width: { xs: 300, sm: 500, md: 700 }, height: { xs: 300, sm: 500, md: 600 } }}>
          <ThreeDViewer
            modelUrl={featuredModelUrl}
            small={false}
            isSideView={true}
          />
        </Box>
      </Box>

      <Typography
        variant="body1"
        textAlign="center"
        mb={3}
        sx={{
          color: '#bd8c44',
          fontFamily: 'Tagesschrift, sans-serif'
        }}
      >
        {product.description}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            color: '#bd8c44',
            fontWeight: 'bold',
            backgroundColor: 'rgba(189, 140, 68, 0.1)',
            border: '1px solid #bd8c44',
            borderRadius: '20px',
            px: 3,
            py: 1,
            fontFamily: 'Tagesschrift, sans-serif',
            boxShadow: '0 0 10px rgba(189, 140, 68, 0.3)',
            textAlign: 'center',
          }}
        >
          ₹ {product.price.toLocaleString()}
        </Typography>
      </Box>
    </Container>
  );
};

export default ViewProductPage;
