import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/userContext';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { update_gecko_resp } from '../../redux/slices/coinGeckoResp';
import { update_tableData } from '../../redux/slices/tableData';
import { COIN_LIST } from '../../util/constants/coins'
import './style.css';

function SearchBar(props) {

  const {update_g, coin_g } = useContext(UserContext);
  const [start, setStart] = useState('2022.04.30');
  const [end, setEnd] = useState("2022.09.07" );
  const [coinName, setCoinName] = useState("bitcoin");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [days, setDays] = useState(90);
  const [interval, setInterval] = useState("hourly");
  const [volprice, setVolprice] = useState("prices");
  const msg1 = "We could not find the coin. Please try another!";
  const msg2 = "Oopse, something went wrong. Please try again later!";
  const dispatch = useDispatch()

  // useEffect(() => {
  //   //for lambda
  //   async function fetchData2() {
  //     let resp = await fetchDataLambda(coin_g, start, end);
  //     console.log("### resp = == ", resp);
  //     if(resp.count > 0) {
  //       update_g(resp.Items, "resp");
  //     }
  //   }
  //   fetchData2();
  // }, []);

  useEffect(() => {
    async function fetchData2() {
      let resp = await fetchDataGecko(coin_g, days, interval);
      if(resp) {
        dispatch(update_gecko_resp(resp));
      } else {
        setErrorMessage(msg1);
        setShowAlert(true);
      }
    }
    fetchData2();
  }, []);

  const handleSubmitDates = async (e) => {
    //for lambda
    e.preventDefault();
    update_g(coinName, "coin");
    let resp = await fetchDataLambda(coin_g, start, end);
    if(resp.count > 0) {
      update_g(resp.Items, "resp");
    } else {
      setErrorMessage(msg1);
      setShowAlert(true);
    }
  }

  const handleSubmitDays = async (e) => {
    e.preventDefault();
    update_g(coinName, "coin");
    dispatch(update_tableData([]));
    dispatch(update_gecko_resp([]));
    let resp = await fetchDataGecko(coinName, days, interval);
    setCoinName("");
    if(resp) {
      dispatch(update_gecko_resp(resp));
    } else {
      setErrorMessage(msg1);
      setShowAlert(true);
    }
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
      setInterval("daily");
      update_g("daily", "interval");
    } else {
      setInterval("hourly");
      update_g("hourly", "interval");
    }
  }
  const handleIntervalChange = (e) => {
    setInterval(e.target.value);
    update_g(e.target.value, "interval");
    if(e.target.value == "hourly") {
      setDays(90);
    } else {
      setDays(100);
    }
  }
  const handleVolOrPriceChange = (e) => {
    if(e.target.value == "price") {
      setVolprice("prices");
    } else {
      setVolprice("total_volumes");
    }
  }

  const fetchDataLambda = async (coin, startTime, endTime) => {
    let data = {
      coin: coin,
      beginDateTime: startTime,
      endDateTime: endTime
    }
    let api_url = process.env['REACT_APP_LAMBDA_HOURLY_FETCH_URL'];
    try {
      let resp = await axios.post(api_url, JSON.stringify(data), {
        headers: {
          'Content-Type': 'text/plain'
        },
      });
      return resp.data;
    } catch(e) {
      console.log(e.message);
      setErrorMessage(msg2);
      setShowAlert(true);
    }
  }

  const fetchDataGecko = async (coin1, days1, interval1) => {
    //interval = daily / hourly
    //days = hourly:<90 / daily:any:
    //market_caps/prices/total_volumes
    let api_url = process.env['REACT_APP_GECKO_FETCH_HOST'] + `/${coin1}/market_chart?vs_currency=usd&days=${days1}&interval=${interval1}`;
    try {
      let resp = await axios.get(api_url,  {
        headers: {
          'Content-Type': 'text/plain'
        },
      });
      dispatch(update_tableData(resp.data))
      return resp.data[volprice];
    } catch(e) {
      console.log(e.message);
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
          <Form.Select onChange={(e)=>handleCoinChange(e)}>
            {
              COIN_LIST.map((record => {
                return <option>{record}</option>
              }))
            }
          </Form.Select>
          <div className="input-or">or</div>
          <input onChange={(e)=>handleCoinChange(e)} type="text" className="form-control" placeholder="custom coin search" aria-label="coin" aria-describedby="basic-addon1"></input>
          <br/>
          <hr className="hr-input"/>
          <Form.Label className="input-text-box">Past Number of Days</Form.Label>
          <Form.Control type='number' value={days} onChange={(e)=>handleDaysChange(e)} placeholder={interval=="hourly"? "90 or less":"91 or greater"} />
          <Form.Label className="input-text-box">Interval</Form.Label>
          <Form.Select value={interval} onChange={(e)=>handleIntervalChange(e)}>
            <option>daily</option>
            <option>hourly</option>
          </Form.Select>
          <Form.Label className="input-text-box">Volumn or Price</Form.Label>
          <Form.Select onChange={(e)=>handleVolOrPriceChange(e)}>
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
