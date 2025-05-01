import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ConfirmDeleteDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#24283c',
          color: '#bd8c44',
          fontFamily: 'Tagesschrift, sans-serif',
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        Confirm Delete
      </DialogTitle>

      <DialogContent sx={{ fontSize: 16 }}>
        Are you sure you want to delete this car?
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: '#bd8c44',
            fontFamily: 'Tagesschrift, sans-serif',
            '&:hover': {
              backgroundColor: 'rgba(189, 140, 68, 0.1)',
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: '#d32f2f',
            color: '#fff',
            fontFamily: 'Tagesschrift, sans-serif',
            '&:hover': {
              backgroundColor: '#b71c1c',
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
