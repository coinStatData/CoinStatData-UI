import React, { useState } from "react";
import UserContext from './hooks/userContext';
import TablePage from './pages/table/tablePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortFolioOpt from './pages/portfolioOpt';
import DonatePage from './pages/donation';
import ChatPage from './pages/chat';
import HomePage from './pages/home';
import { useFetch } from "react-async"
import './App.css';

const APIEndPoint = "https://40rrfmjfvc.execute-api.us-east-1.amazonaws.com/v1/hello"

function App() {

  const [coin_g, setCoin_g] = useState('bitcoin');
  const [resp_g, setResp_g] = useState({});
  const [interval_g, setInterval_g] = useState('daily');

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
    <>
      <UserContext.Provider value={{interval_g, update_g, coin_g, resp_g}}>

          <BrowserRouter>
            <Routes>
              {/* pages with navbar */}
              <Route path="/" element={<HomePage />} />
              <Route path="/stat" element={<TablePage />} />
              <Route path="/optimization" element={<PortFolioOpt />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </BrowserRouter>

      </UserContext.Provider>
    </>
  );
}

export default App;

const APIResult = () => {
  const { data, error } = useFetch(APIEndPoint, {
    headers: { accept: "application/json" },
  })
  if (error) return <p>{error.message}</p>
  if (data) return <p>{data.message}</p>
  return null
}
