import React, { useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './message/message';

import './messages.css';

const Messages = ({ messages, name }) => {
  useEffect(() => {
    console.log('messages', messages);
  }, [messages])

  return (
    <div>
      <ScrollToBottom className="messages-cont">
      {Array.isArray(messages) &&
        messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)
      }
      </ScrollToBottom>
    </div>
  )

  };

export default Messages;