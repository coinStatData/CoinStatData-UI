import * as React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { dragElement } from '../../../util';
import Chat from '../../chat';
import "./chatPopup.css";

export default function ChatPopUp({ closeChat }) {
 
  React.useEffect(() => {
    const container = document.querySelector("#chat-popup-cont")
    document.getElementById("chat-popup-header1").style.cursor = "move";
    container.addEventListener("touchmove", 
      dragElement(document.querySelector("#chat-popup-cont"), "chat-popup-header1"), 
      false
    );
  },[]);
  
  return (
    <div id="chat-popup-cont">
      <div id="chat-popup-header">
        <HighlightOffIcon 
          sx={{ width:"30px" }} 
          onClick={closeChat}
        />
      </div>
      <Chat />
    </div>
  );
  
}