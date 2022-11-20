import * as React from 'react';
import Modal from '../../components/modal/modal';
import ModalContent from './modalContent';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import './settings.css';

export default function UserSettings() {

  const [isOpen, setIsOpen] = React.useState(false);

  const openSettings = () => {
    setIsOpen(true);
  }

  const closeSettings = () => {
    setIsOpen(false);
  }

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        handleClose={closeSettings}
        title={"Cite Settings"}
        Content={ModalContent}
      />
      <div className="user-settings-cont">
        <Box onClick={openSettings} sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab size="small" color="primary" aria-label="settings">
            <Tooltip title="Settings">
              <>
                <SettingsIcon 
                  sx={{ color:"white" }}
                />
              </>
            </Tooltip>
          </Fab>
        </Box>
      </div>
    </>
  );
}