import * as React from 'react';
import ChatPopUp from './popupCont';
import Chat from '../chat';
import ChatIcon from '@mui/icons-material/Chat';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import './chatModal.css';

export default function ChatModal() {

  const [isOpen, setIsOpen] = React.useState(false);

  const openChat = () => {
    setIsOpen(!isOpen);
  }

  const closeChat = () => {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && 
        <div className="">
          <ChatPopUp closeChat={closeChat} />
        </div>
      }
      <div className="chat-modal-cont">
        <Box onClick={openChat} sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab size="small" color="primary" aria-label="settings">
            <Tooltip title="Public Chat-Room">
              <ChatIcon 
                sx={{ color:"white" }}
              />
            </Tooltip>
          </Fab>
        </Box>
      </div>
    </>
  );
}