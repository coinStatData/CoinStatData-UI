import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import './CAPM.css';

const CAPM = (props) => {

    //chat socket
    const name = useSelector((state) => state.chat.username);
    const room = useSelector((state) => state.chat.room);
    const [users, setUsers] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

  useEffect(() => { 

  }, []);

  return (
    <div className="">

    </div>
  );
}

export default CAPM;