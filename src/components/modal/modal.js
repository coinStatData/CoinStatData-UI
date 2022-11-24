import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';

const deafultStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 290,
  bgcolor: 'background.paper',
  border: '3px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "10px"
};

export default function BasicModal({ 
  title, 
  Content, 
  handleClose, 
  isOpen,
  style=deafultStyle 
}) {

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography 
            id="modal-modal-title" 
            variant="h6" 
            component="h2"
            align="center"
          >
            {title}
          </Typography>
          <Divider sx={{mt: "5px"}}></Divider>
          <Content></Content>
        </Box>
      </Modal>
    </div>
  );
}