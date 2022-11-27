import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store'
import { Provider } from 'react-redux'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

  console.log(
    "%c Welcome to CoinStatData!", 
    "color:gold; font-size:30px; font-weight:bold; text-shadow: 3px 3px 3px orange , 6px 6px 6px blue;"
  );
  console.log(
    `
    /$$$$$$$$                /$$     /$$                  
    |__  $$__/               | $$    | $$                 
      | $$  /$$$$$$        /$$$$$$  | $$$$$$$   /$$$$$$   
      | $$ /$$__  $$      |_  $$_/  | $$__  $$ /$$__  $$  
      | $$| $$  \ $$        | $$    | $$  \ $$| $$$$$$$$  
      | $$| $$  | $$        | $$ /$$| $$  | $$| $$_____/  
      | $$|  $$$$$$/        |  $$$$/| $$  | $$|  $$$$$$$  
      |__/ \______/          \___/  |__/  |__/ \_______/  
                                                                                                                                                                                              
    `
  );
  console.log(
    `
      /$$      /$$                                  /$$
      | $$$    /$$$                                 | $$
    | $$$$  /$$$$  /$$$$$$   /$$$$$$  /$$$$$$$    | $$
    | $$ $$/$$ $$ /$$__  $$ /$$__  $$| $$__  $$   | $$
    | $$  $$$| $$| $$  \ $$| $$  \ $$| $$  \ $$   |__/
    | $$\  $ | $$| $$  | $$| $$  | $$| $$  | $$       
    | $$ \/  | $$|  $$$$$$/|  $$$$$$/| $$  | $$    /$$
    |__/     |__/ \______/  \______/ |__/  |__/   |__/
    `
  );
  console.log(
    "%c Luke 1:37", 
    "color:gold; font-weight:bold;"
  );
  console.log(
    "%c Philippians 4:13", 
    "color:gold; font-weight:bold;"
  );

  root.render(
    <Provider store={store}>
      <App></App>
    </Provider>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
