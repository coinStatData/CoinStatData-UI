import React, { useState } from 'react';
import UserContext from './context/userContext';
import TablePage from './pages/table/tablePage';
import NavBarComp from './components/navBar/navBar';
import './App.css';

function App() {

  const [coin_g, setCoin_g] = useState('bitcoin');
  const [resp_g, setResp_g] = useState({});
  const [chartData_g, setChartData_g] = useState([]);
  const [cResp_g, setCResp_g] = useState({});
  const [tableData_g, setTableData_g] = useState({});
  const [interval_g, setInterval_g] = useState('hourly');

  const update_g = (change, what) => {
    switch(what) {
      case "interval":
        setInterval_g(change);
        break;
      case "tableData":
        setTableData_g(change);
        break;
      case "coin":
        setCoin_g(change);
        break;
      case "cResp":
        setCResp_g(change);
        break;
      case "resp":
        setResp_g(change);
        break;
      case "chartD":
        setChartData_g(change);
        break;
      default:
        // code block
    }
  }

  return (
      <UserContext.Provider value={{interval_g, update_g, tableData_g, cResp_g, coin_g, resp_g, chartData_g}}>
        <NavBarComp></NavBarComp>
        <TablePage/>
      </UserContext.Provider>
  );
}

export default App;
