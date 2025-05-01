import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const ProductForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    model: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'model') {
      setFormData({ ...formData, model: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('description', formData.description);
    submitData.append('price', formData.price);
    submitData.append('model', formData.model);
    onSubmit(submitData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        p: 2,
        bgcolor: '#24283c',
        borderRadius: 3,
      }}
    >
      <TextField
        label="Car Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        InputProps={{
          style: { color: '#bd8c44' },
        }}
        InputLabelProps={{
          style: { color: '#bd8c44' },
          shrink: true,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#bd8c44' },
            '&:hover fieldset': { borderColor: '#bd8c44' },
            '&.Mui-focused fieldset': { borderColor: '#bd8c44' },
          },
          input: { fontFamily: 'Tagesschrift, sans-serif' },
        }}
      />

      <TextField
        label="Car Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        InputProps={{
          style: { color: '#bd8c44' },
        }}
        InputLabelProps={{
          style: { color: '#bd8c44' },
          shrink: true,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#bd8c44' },
            '&:hover fieldset': { borderColor: '#bd8c44' },
            '&.Mui-focused fieldset': { borderColor: '#bd8c44' },
          },
          input: { fontFamily: 'Tagesschrift, sans-serif' },
        }}
      />

      <TextField
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
        InputProps={{
          style: { color: '#bd8c44' },
        }}
        InputLabelProps={{
          style: { color: '#bd8c44' },
          shrink: true,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#bd8c44' },
            '&:hover fieldset': { borderColor: '#bd8c44' },
            '&.Mui-focused fieldset': { borderColor: '#bd8c44' },
          },
          input: { fontFamily: 'Tagesschrift, sans-serif' },
        }}
      />

      <Button
        variant="outlined"
        component="label"
        sx={{
          color: '#bd8c44',
          borderColor: '#bd8c44',
          fontFamily: 'Tagesschrift, sans-serif',
          '&:hover': {
            backgroundColor: '#bd8c44',
            color: 'white',
            borderColor: '#bd8c44',
          },
        }}
      >
        Upload Car 3D Model (.glb)
        <input type="file" name="model" accept=".glb" hidden onChange={handleChange} />
      </Button>

      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: '#bd8c44',
          fontFamily: 'Tagesschrift, sans-serif',
          color: '#24283c',
          '&:hover': {
            backgroundColor: '#9c6c30',
          },
        }}
      >
        Add Car
      </Button>
    </Box>
  );
};

export default ProductForm;
