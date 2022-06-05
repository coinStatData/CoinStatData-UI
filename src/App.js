import React, { useState } from 'react';
import UserContext from './context/userContext';
import TablePage from './pages/table/tablePage';
import NavBarComp from './components/navBar/navBar';
import './App.css';

function App() {

  const [coin_g, setCoin_g] = useState('bitcoin');
  const [resp_g, setResp_g] = useState({});
  const [interval_g, setInterval_g] = useState('hourly');

  const update_g = (change, what) => {
    // for useContext hook
    switch(what) {
      case "interval":
        setInterval_g(change);
        break;
      case "coin":
        setCoin_g(change);
        break;
      case "resp":
        setResp_g(change);
        break;
      default:
        // code block
    }
  }

  return (
      <UserContext.Provider value={{interval_g, update_g, coin_g, resp_g}}>
        <NavBarComp></NavBarComp>
        <TablePage/>
      </UserContext.Provider>
  );
}

export default App;
