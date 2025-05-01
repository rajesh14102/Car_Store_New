import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

const EditProductModal = ({ product, onClose, onSave }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product, model: null });

  useEffect(() => {
    setUpdatedProduct({ ...product, model: null });
  }, [product]);

  const handleSave = () => {
    onSave(updatedProduct);
    onClose();
  };

  return (
    <Dialog
      open={Boolean(product)}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#1b1f31',
          color: '#bd8c44',
        },
      }}
    >
      <DialogTitle sx={{ fontFamily: 'Tagesschrift, sans-serif' }}>Edit Car</DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Name"
          value={updatedProduct.name}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, name: e.target.value })
          }
          InputLabelProps={{ style: { color: '#bd8c44' } }}
          InputProps={{ style: { color: '#bd8c44' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#bd8c44' },
              '&:hover fieldset': { borderColor: '#bd8c44' },
              '&.Mui-focused fieldset': { borderColor: '#bd8c44' },
            },
          }}
        />
        <TextField
          label="Description"
          value={updatedProduct.description}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, description: e.target.value })
          }
          InputLabelProps={{ style: { color: '#bd8c44' } }}
          InputProps={{ style: { color: '#bd8c44' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#bd8c44' },
              '&:hover fieldset': { borderColor: '#bd8c44' },
              '&.Mui-focused fieldset': { borderColor: '#bd8c44' },
            },
          }}
        />
        <TextField
          label="Price"
          type="number"
          value={updatedProduct.price}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, price: e.target.value })
          }
          InputLabelProps={{ style: { color: '#bd8c44' } }}
          InputProps={{ style: { color: '#bd8c44' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#bd8c44' },
              '&:hover fieldset': { borderColor: '#bd8c44' },
              '&.Mui-focused fieldset': { borderColor: '#bd8c44' },
            },
          }}
        />
        <Button
          variant="outlined"
          component="label"
          sx={{
            mt: 1,
            borderColor: '#bd8c44',
            color: '#bd8c44',
            '&:hover': {
              backgroundColor: '#bd8c44',
              color: '#1b1f31',
            },
          }}
        >
          Choose New .glb File
          <input
            type="file"
            hidden
            accept=".glb"
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, model: e.target.files[0] })
            }
          />
        </Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#bd8c44' }}>
          Cancel
        </Button>
        <Button onClick={handleSave} sx={{ color: '#bd8c44' }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;
