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
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
  const msg1 = "We could not find the coin. Please try another!";
  const msg2 = "Oopse, something went wrong. Please try again later!";

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

  const calculateSize = () => {
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    setScreenWidth(width);
  }

  window.addEventListener("resize", ()=> {
    calculateSize();
  });

  const errorResponse = (e) => {
    if(e.response) {
      if(e.response.status == 404) {
        setErrorMessage(msg1);
        setShowAlert(true);
      } else {
        setErrorMessage(msg2);
        setShowAlert(true);
      }
    } else {
      setErrorMessage(msg2);
      setShowAlert(true);
    }
  }

  return (
    <>
      <UserContext.Provider value={{interval_g, update_g, coin_g, resp_g}}>
          <BrowserRouter>
            <Routes>
              {/* pages with navbar */}
              <Route path="/" element={<HomePage errorResponse={errorResponse} screenWidth={screenWidth} />} />
              <Route path="/stat" element={<TablePage screenWidth={screenWidth}/>} />
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
