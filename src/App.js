import React, { useState } from "react";
import UserContext from './hooks/userContext';
import TablePage from './pages/table/tablePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortFolioOptV2 from './pages/portfolioOpt/portfolioV2';
import DonatePage from './pages/donation';
import ChatPage from './pages/chat';
import HomePage from './pages/home';
import { useFetch } from "react-async"
import NavBarV2 from './components/navBar/navBarV2'
import Footer from './components/footer';
import PublicAPIPage from './pages/publicAPI';
import UserSettings from './containers/settings/userSettings';
import ChatModal from './containers/chatModal';
import './App.css';

const APIEndPoint = "https://40rrfmjfvc.execute-api.us-east-1.amazonaws.com/v1/hello"

function App() {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);

  const calculateSize = () => {
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    setScreenWidth(width);
  }

  window.addEventListener("resize", ()=> {
    calculateSize();
  });

  return (
    <UserContext.Provider value={{}}>
      <BrowserRouter>
        <div className="coin-body">
          <div>
            <NavBarV2 />
            <Routes>
              {/* pages with navbar */}
              <Route path="/" element={<HomePage screenWidth={screenWidth} />} />
              <Route path="/stat" element={<TablePage screenWidth={screenWidth}/>} />
              <Route path="/optimization" element={<PortFolioOptV2 />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/publicAPI" element={<PublicAPIPage />} />
            </Routes>
          </div>
          <Footer/>
          <UserSettings/>
          {screenWidth < 1000 &&
            <ChatModal />
          }
        </div>
      </BrowserRouter>
    </UserContext.Provider>
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
