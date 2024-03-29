import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { update_chat } from '../../../../redux/slices/chat';
import Divider from '@mui/material/Divider';

import './join.css';

export default function SignIn({ toggleJoin }) {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  
  const handleSubmit = () => {
    dispatch(update_chat({username}))
    toggleJoin();
  }

  return (
    <div className="join-outer-cont">
      <div onClick={toggleJoin} className="join-close-btn">X</div>
      <div className="join-inner-cont">
        <h4 className="heading">Join</h4>
        <Divider 
          sx={{ m: "5px", color:"text.secondary"}} 
          variant="inset" 
        />
        <div>
          <input 
            placeholder="username" 
            className="join-input" 
            type="text" 
            onChange={(event) => setUsername(event.target.value)} 
          />
        </div>
        {/* <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom("coin")} />
        </div> */}
          <button 
            className="join-button" 
            onClick={handleSubmit} 
            type="submit"
          >
            Sign In
          </button>
      </div>
    </div>
  );
}