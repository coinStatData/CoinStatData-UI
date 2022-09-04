import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update_chat } from '../../redux/slices/chat';

//import './styles.css';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState("global");
  const dispatch = useDispatch();
  
  const handleSubmit = () => {
    dispatch(update_chat({username, room}))
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom("global")} />
        </div>
          <button className={'button mt-20'} onClick={handleSubmit} type="submit">Sign In</button>
      </div>
    </div>
  );
}