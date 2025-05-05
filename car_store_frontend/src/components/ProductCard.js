import { Card, CardContent, Typography, CardActions, Button, Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThreeDViewer from './ThreeDViewer';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

const ProductCard = ({ product, onDelete, onEdit }) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleViewProduct = (e) => {
    e.stopPropagation();
    navigate(`/view/${product.id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 350,
        minHeight: 460,
        m: 2,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.7)',
        borderRadius: 3,
        bgcolor: '#24283c',
        color: 'white',
        position: 'relative',
        overflow: 'visible',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 0 25px 8px rgba(189, 140, 68, 0.8)',
          cursor: 'pointer',
        },
      }}
    >
      {/* Top Right View Icon */}
      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}>
        <Tooltip title="View Product">
          <IconButton
            onClick={handleViewProduct}
            sx={{ color: '#bd8c44' }}
            aria-label="View Product"
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* 3D Model Viewer */}
      <Box sx={{ height: 300 }}>
        <ThreeDViewer
          modelUrl={`${process.env.REACT_APP_API_BASE_URL}${product.modelUrl}`}
          small={true}
          isSideView={true}
        />

      </Box>

      {/* Product Info */}
      <CardContent>
        <Typography variant="h6" fontWeight="bold" sx={{ color: '#bd8c44' }}>
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#ddd' }}>
          {product.description}
        </Typography>
        <Typography
          variant="h6"
          mt={2}
          sx={{
            color: '#bd8c44',
            fontWeight: 'bold',
            backgroundColor: 'rgba(189, 140, 68, 0.1)',
            border: '1px solid #bd8c44',
            borderRadius: '20px',
            display: 'inline-block',
            px: 2,
            py: 0.5,
            fontFamily: 'Tagesschrift, sans-serif',
            boxShadow: '0 0 10px rgba(189, 140, 68, 0.3)',
          }}
        >
          ₹ {product.price.toLocaleString()}
        </Typography>
      </CardContent>

      {/* Admin Actions */}
      {isAdmin && (
        <CardActions>
          {onEdit && (
            <Button
              size="small"
              startIcon={<EditIcon />}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
              }}
              sx={{ color: '#bd8c44' }}
              aria-label="Edit Product"
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              size="small"
              startIcon={<DeleteIcon />}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product.id);
              }}
              sx={{ color: 'error.main' }}
              aria-label="Delete Product"
            >
              Delete
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default memo(ProductCard); // ✅ Prevents unnecessary re-renders
