import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { update_coin, update_interval } from '../../redux/slices/search';
import { COIN_LIST } from '../../util/constants/coins';
import './style.css';


function SearchBar({ fetchCandleData, fetchLineData }) {

  const [start, setStart] = useState('2022.04.30');
  const [end, setEnd] = useState("2022.09.07" );
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [days, setDays] = useState(100);
  const [volprice, setVolprice] = useState("prices");
  const msg1 = "We could not find the coin. Please try another!";
  const msg2 = "Oopse, something went wrong. Please try again later!";
  const coin = useSelector((state) => state.search.coin);
  const interval = useSelector((state) => state.search.interval);
  const [tempInterval, setTempInterval] = useState(interval);
  const [coinName, setCoinName] = useState(coin);
  const dispatch = useDispatch()

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

  useEffect(() => {
    // console.log("SEARCHBAR useEffect call candledata , ", candleData);
    fetchDataGecko(coin, days, tempInterval);
    // fetchCandleData(coin, days);
  }, []);

  useEffect(() => {
    console.log("SEARCHBAR useEffect call candledata , ", interval);
  });

  const handleSubmitDates = async (e) => {
    //for lambda
    e.preventDefault();
    dispatch(update_coin(coinName));
    const resp = await fetchDataLambda(coin, start, end);
    if(resp.count > 0) {
      //update_g(resp.Items, "resp");
    } else {
      setErrorMessage(msg1);
      setShowAlert(true);
    }
  }

  const handleSubmitDays = (e) => {
    e.preventDefault();
    if(coinName !== coin) {
      dispatch(update_coin(coinName));
    }
    if(tempInterval !== interval) {
      dispatch(update_interval(tempInterval));
    }
    fetchDataGecko(coin, days, tempInterval);
    fetchCandleData(coin, days);
  }

  const handleCoinChange = (e) => {
    setCoinName(e.target.value.toLowerCase());
  }
  const handleStartChange = (e) => {
    setStart(e.target.value);
  }
  const handleEndChange = (e) => {
    setEnd(e.target.value);
  }

  const handleDaysChange = (e) => {
    setDays(e.target.value);
    if(e.target.value > 90) {
      setTempInterval("daily");
    } else {
      setTempInterval("hourly");
    }
  }
  const handleIntervalChange = (e) => {
    setTempInterval(e.target.value);
    if(e.target.value === "hourly") {
      setDays(90);
    } else {
      setDays(100);
    }
  }
  const handleVolOrPriceChange = (e) => {
    if(e.target.value === "price") {
      setVolprice("prices");
    } else {
      setVolprice("total_volumes");
    }
  }

  const fetchDataLambda = async (coin, startTime, endTime) => {
    const data = {
      coin: coin,
      beginDateTime: startTime,
      endDateTime: endTime
    }
    const api_url = process.env['REACT_APP_LAMBDA_HOURLY_FETCH_URL'];
    try {
      const resp = await axios.post(api_url, JSON.stringify(data), {
        headers: {
          'Content-Type': 'text/plain'
        },
      });
      return resp.data;
    } catch(e) {
      console.log(e.message);
      errorResponse(e);
    }
  }

  const fetchDataGecko = async (coin1, days1, interval1) => {
    //interval = daily / hourly
    //days = hourly:<90 / daily:any:
    //market_caps/prices/total_volumes
    try {
      await fetchLineData(coin1, days1, interval1);
    } catch(e) {
      console.log(e.message);
      errorResponse(e);
    }
  }

  return (
    <div className="search-bar">
      <form className="form-horizontal">
      {showAlert && 
        <div className="alert-box">
          <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>Sorry!</Alert.Heading>
            <p>
              {errorMessage}
            </p>
          </Alert>
        </div>
      }
        <h4 className="search-title">Search By Days into the Past</h4>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="input-text-box">Coin Name</Form.Label>
          <Form.Select onChange={(e) => handleCoinChange(e)}>
            <option>{coin}</option>
            {
              COIN_LIST.map((record => {
                return <option key={record}>{record}</option>
              }))
            }
          </Form.Select>
          <div className="input-or">or</div>
          <input onChange={(e) => handleCoinChange(e)} type="text" className="form-control" placeholder="custom coin search" aria-label="coin" aria-describedby="basic-addon1"></input>
          <br/>
          <hr className="hr-input"/>
          <Form.Label className="input-text-box">Past Number of Days</Form.Label>
          <Form.Control type='number' value={days} onChange={(e) => handleDaysChange(e)} placeholder={interval == "hourly"? "90 or less" : "91 or greater"} />
          <Form.Label className="input-text-box">Interval</Form.Label>
          <Form.Select value={tempInterval} onChange={(e) => handleIntervalChange(e)}>
            <option>daily</option>
            <option>hourly</option>
          </Form.Select>
          <Form.Label className="input-text-box">Volume or Price</Form.Label>
          <Form.Select onChange={(e) => handleVolOrPriceChange(e)}>
            <option>price</option>
            <option>volume</option>
          </Form.Select>
        </Form.Group>
        <Button onClick={handleSubmitDays} variant="primary" type="button">Submit</Button>
        {/* <hr/> */}
        {/* <h4>Search By Date Range </h4>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="input-text-box">Coin Name</Form.Label>
          <Form.Select onChange={(e)=>handleCoinChange(e)}>
            <option>bitcoin</option>
            <option>ethereum</option>
            <option>solana</option>
            <option>dogecoin</option>
            <option>tether</option>
          </Form.Select>
          <Form.Label className="input-text-box">Start Date</Form.Label>
          <Form.Control type='text' onChange={(e)=>handleStartChange(e)} placeholder="2022.04.30" />
          <Form.Label className="input-text-box">End Date</Form.Label>
          <Form.Control type='text' onChange={(e)=>handleEndChange(e)}  placeholder="2022.09.05" />
        </Form.Group>
        <Button onClick={handleSubmitDates} variant="primary" type="button">Submit</Button> */}
      </form>
    </div>
  );
}

export default SearchBar;
