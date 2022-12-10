import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import './styles.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="chat-input-form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>
      <SendIcon />
    </button>
  </form>
)

export default Input;