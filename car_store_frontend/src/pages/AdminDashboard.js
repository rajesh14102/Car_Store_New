import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { toast } from 'react-toastify';

import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from '../services/productService';
import { uploadFeaturedCar } from '../services/featuredService';

import ProductCard from '../components/ProductCard';
import EditProductModal from '../components/EditProductModal';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    model: null,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [featuredCarFile, setFeaturedCarFile] = useState(null);

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      toast.error('Failed to load products', {
        position: 'top-right',
        style: {
          background: '#24283c',
          color: '#bd8c44',
          fontFamily: 'Tagesschrift, sans-serif',
        },
      });
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      const { name, description, price, model } = newProduct;
      if (!name || !description || !price || !model) {
        toast.error('All fields are required', {
          position: 'top-right',
          style: {
            background: '#24283c',
            color: '#bd8c44',
            fontFamily: 'Tagesschrift, sans-serif',
          },
        });
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('model', model);

      await addProduct(formData);
      toast.success('Product added successfully', {
        position: 'top-right',
        style: {
          background: '#24283c',
          color: '#bd8c44',
          fontFamily: 'Tagesschrift, sans-serif',
        },
      });

      setOpenAdd(false);
      setNewProduct({ name: '', description: '', price: '', model: null });
      loadProducts();
    } catch (error) {
      toast.error('Failed to add product', {
        position: 'top-right',
        style: {
          background: '#24283c',
          color: '#bd8c44',
          fontFamily: 'Tagesschrift, sans-serif',
        },
      });
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const formData = new FormData();
      const { name, description, price, model } = updatedProduct;
      if (name) formData.append('name', name);
      if (description) formData.append('description', description);
      if (price) formData.append('price', price);
      if (model) formData.append('model', model);

      await updateProduct(updatedProduct.id, formData);
      toast.success('Product updated successfully', {
        position: 'top-right',
        style: {
          background: '#24283c',
          color: '#bd8c44',
          fontFamily: 'Tagesschrift, sans-serif',
        },
      });
      loadProducts();
    } catch (error) {
      toast.error('Failed to update product', {
        position: 'top-right',
        style: {
          background: '#24283c',
          color: '#bd8c44',
          fontFamily: 'Tagesschrift, sans-serif',
        },
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      toast.success('Product deleted successfully', {
        position: 'top-right',
        style: {
          background: '#24283c',
          color: '#bd8c44',
          fontFamily: 'Tagesschrift, sans-serif',
        },
      });
      loadProducts();
    } catch (error) {
      toast.error('Failed to delete product', {
        position: 'top-right',
        style: {
          background: '#24283c',
          color: '#bd8c44',
          fontFamily: 'Tagesschrift, sans-serif',
        },
      });
    }
  };

  const handleFeaturedCarUpload = async (e) => {
    e.preventDefault();
    if (!featuredCarFile) {
      toast.error('Please select a file', {
        position: 'top-right',
        style: {
          background: '#24283c',
          color: '#bd8c44',
          fontFamily: 'Tagesschrift, sans-serif',
        },
      });
      return;
    }

    const formData = new FormData();
    formData.append('model', featuredCarFile);

    try {
      await uploadFeaturedCar(formData);
      toast.success('Featured Car updated successfully', {
        position: 'top-right',
        style: {
          background: '#24283c',
          color: '#bd8c44',
          fontFamily: 'Tagesschrift, sans-serif',
        },
      });
    } catch (error) {
      toast.error('Failed to upload featured car', {
        position: 'top-right',
        style: {
          background: '#24283c',
          color: '#bd8c44',
          fontFamily: 'Tagesschrift, sans-serif',
        },
      });
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        mb={4}
        sx={{
          color: '#bd8c44',
          fontFamily: 'Tagesschrift, sans-serif',
          textAlign: 'center',
        }}
      >
        Admin Dashboard
      </Typography>

      {/* Featured Upload + Add New */}
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Button
          variant="outlined"
          component="label"
          sx={{
            color: '#bd8c44',
            borderColor: '#bd8c44',
            fontFamily: 'Tagesschrift, sans-serif',
            '&:hover': { backgroundColor: '#bd8c44', color: 'white' },
          }}
        >
          Choose Featured Car (.glb)
          <input
            type="file"
            hidden
            accept=".glb"
            onChange={(e) => setFeaturedCarFile(e.target.files[0])}
          />
        </Button>

        <Button
          variant="contained"
          onClick={handleFeaturedCarUpload}
          sx={{
            backgroundColor: '#bd8c44',
            fontFamily: 'Tagesschrift, sans-serif',
            '&:hover': { backgroundColor: '#9c6c30' },
          }}
        >
          Upload Featured Car
        </Button>

        <Button
          variant="outlined"
          onClick={() => setOpenAdd(true)}
          sx={{
            color: '#bd8c44',
            borderColor: '#bd8c44',
            fontFamily: 'Tagesschrift, sans-serif',
            '&:hover': { backgroundColor: '#bd8c44', color: 'white' },
          }}
        >
          Add New Car
        </Button>
      </Box>

      {/* Product Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={(p) => setSelectedProduct(p)}
            onDelete={(id) => setConfirmDeleteId(id)}
          />
        ))}
      </Box>

      {/* Add Product Modal */}
      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        PaperProps={{
          sx: { backgroundColor: '#1b1f31', color: '#bd8c44' },
        }}
      >
        <DialogTitle sx={{ fontFamily: 'Tagesschrift, sans-serif' }}>Add New Car</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {['Name', 'Description', 'Price'].map((label) => (
            <TextField
              key={label}
              label={label}
              type={label === 'Price' ? 'number' : 'text'}
              value={newProduct[label.toLowerCase()]}
              onChange={(e) =>
                setNewProduct({ ...newProduct, [label.toLowerCase()]: e.target.value })
              }
              InputLabelProps={{
                style: { color: '#bd8c44' },
              }}
              InputProps={{
                style: { color: '#bd8c44' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#bd8c44' },
                  '&:hover fieldset': { borderColor: '#bd8c44' },
                  '&.Mui-focused fieldset': { borderColor: '#bd8c44' },
                },
              }}
            />
          ))}

          <Button
            variant="outlined"
            component="label"
            sx={{
              mt: 1,
              borderColor: '#bd8c44',
              color: '#bd8c44',
              '&:hover': {
                backgroundColor: '#bd8c44',
                color: 'white',
              },
            }}
          >
            Choose .glb File
            <input
              type="file"
              hidden
              accept=".glb"
              onChange={(e) =>
                setNewProduct({ ...newProduct, model: e.target.files[0] })
              }
            />
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} sx={{ color: '#bd8c44' }}>
            Cancel
          </Button>
          <Button onClick={handleAddProduct} sx={{ color: '#bd8c44' }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSave={handleUpdateProduct}
        />
      )}

      {/* Confirm Delete */}
      {confirmDeleteId && (
        <ConfirmDeleteDialog
          open={Boolean(confirmDeleteId)}
          onClose={() => setConfirmDeleteId(null)}
          onConfirm={() => {
            handleDeleteProduct(confirmDeleteId);
            setConfirmDeleteId(null);
          }}
        />
      )}
    </Box>
  );
};

export default AdminDashboard;
