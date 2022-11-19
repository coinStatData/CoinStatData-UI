import React from 'react';
import './message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <div className="sentText pr-10">{trimmedName}</div>
          <div className="messageBox background-orange">
            <div className="messageText colorWhite">{ReactEmoji.emojify(text)}</div>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <div className="messageText colorDark">{ReactEmoji.emojify(text)}</div>
            </div>
            <div className="sentText pl-10 ">{user}</div>
          </div>
        )
  );
}

export default Message;