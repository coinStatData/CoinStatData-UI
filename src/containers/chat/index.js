import React, { useState, useEffect } from "react";
import Messages from './components/messages/messages';
import InfoBar from './components/infoBar/infoBar';
import Input from './components/input/input';
import io from "socket.io-client";
import { useSelector } from 'react-redux';
import './styles.css';

const ENDPOINT = process.env['REACT_APP_SERVER_URL'] || 'http://localhost:5000';
let socket;

const Chat = (props) => {

    //chat socket
    const name = useSelector((state) => state.chat.username);
    const room = useSelector((state) => state.chat.room);
    const [users, setUsers] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

  useEffect(() => { 
    socket = io(ENDPOINT);
    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, name]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    if(!users) {
      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
    }
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
      setMessage('')
    }
  }

  return (
    <div className="chat-outer-cont">
      <div className="chat-inner-cont">
        <div id="chat-popup-header1">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
        </div>
        
      </div>
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      {/* <TextContainer users={users}/> */}
    </div>
  );
}

export default Chat;