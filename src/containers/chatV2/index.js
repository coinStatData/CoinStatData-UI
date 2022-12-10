import React, { useState, useEffect } from "react";
import Messages from './components/messages/messages';
import TextContainer from './components/textCont/textContainer';
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
      setMessage('');
    }
  }

  return (
    <div className="chatv2-super-outer">
      <div className="chat-type-title">
        <span>Jarvis</span>
          <img src={require('../../assets/bot.png')}></img>
      </div>
      <div className="chatv2-outer-cont">
        <div className="chat-inner-cont-main">
          <div id="chat-popup-header1">
            {/* <InfoBar room={room} /> */}
            <Messages messages={messages} name={name} />
          </div>
        </div>
        <div className="chat-inner-cont-users">
          <TextContainer users={users}/>
        </div>
      </div>
      <div className="chatv2-input-cont">
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;