import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { update_coin, update_interval } from '../../redux/slices/search';
import { CSD_INDEX } from '../../util/constants/coins';
import ErrorModal from '../alertModal/error';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import useErrorHandle from '../../hooks/useErrorHandle';
import './style.css';

function SearchBar({ fetchCandleData, fetchLineData }) {

  const [start, setStart] = useState('2022.04.30');
  const [isInteger, setIsInteger] = useState(true);
  const [end, setEnd] = useState("2022.09.07" );
  const [days, setDays] = useState(100);
  const [tempVolprice, setTempVolprice] = useState("price");
  const [volprice, setVolprice] = useState("prices");
  const coin = useSelector((state) => state.search.coin);
  const interval = useSelector((state) => state.search.interval);
  const timezone = useSelector((state) => state.userSettings.timezone);
  const [tempInterval, setTempInterval] = useState(interval);
  const [coinName, setCoinName] = useState(coin);
  const dispatch = useDispatch();
  const { errorResponse, errorMessage, showAlert, setErrorMessage, setShowAlert } = useErrorHandle();

  useEffect(() => {
    fetchDataGecko(coin, days, tempInterval);
    fetchCandleData(coin, days);
  }, []);

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
    fetchDataGecko(coinName, days, tempInterval);
    fetchCandleData(coinName, days);
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
    if(Number.isInteger(Number(e.target.value))) {
      setIsInteger(true);
      if(e.target.value > 90) {
        setTempInterval("daily");
      } else {
        setTempInterval("hourly");
      }
    } else {
      setIsInteger(false);
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
      setTempVolprice("price");
      setVolprice("prices");
    } else {
      setTempVolprice("volume");
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
      await fetchLineData(coin1, days1, interval1, timezone);
    } catch(e) {
      console.log(e.message);
      errorResponse(e);
    }
  }

  return (
    <div className="search-bar">
      <form className="form-horizontal">
        <ErrorModal errorMessage={errorMessage} setShowAlert={setShowAlert} showAlert={showAlert} />
          <Typography variant="h6">Search Bar</Typography>
          <Divider sx={{ mt:"10px", color:'text.secondary'}}>Coin Name</Divider>
          <FormControl sx={{ width: "100%", my:"10px"}} size="small">
            <InputLabel id="coin-select-label">Coin</InputLabel>
            <Select
              id="coin-select"
              value={coinName}
              label="Coin"
              onChange={(e) => handleCoinChange(e)}
            >            
              {
                CSD_INDEX.map((record => <MenuItem key={record} value={record}>{record}</MenuItem>))
              }
            </Select>
          </FormControl>
          <div className="input-or">OR</div>
          <FormControl sx={{ width: "100%", my:"10px"}} size="small">
            <TextField
              onChange={(e) => handleCoinChange(e)} 
              label="Custom coin search" 
              size="small" variant="outlined"
            />
          </FormControl>
          <Divider sx={{ mt:"10px", color:'text.secondary'}}>Meta Params</Divider>
          <FormControl sx={{ width: "100%", my:"15px"}} size="small">
            <TextField
              error={isInteger? false : true}
              id="past-days-select"
              value={days}
              label="Past # of Days"
              onChange={handleDaysChange}
              size="small" variant="outlined"
              helperText={isInteger? "" : "Must be an integer."}
            >
            </TextField>
          </FormControl>
          <FormControl sx={{ width: "100%", my:"15px"}} size="small">
            <InputLabel id="interval-label">Interval</InputLabel>
            <Select
              id="interval-select"
              value={tempInterval}
              label="Interval"
              onChange={handleIntervalChange}
            >
              <MenuItem value={"daily"}>daily</MenuItem>
              <MenuItem value={"hourly"}>hourly</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: "100%", my:"15px"}} size="small">
            <InputLabel id="volPrice-label">Volume or Price</InputLabel>
            <Select
              id="volPrice-select"
              label="Volume or Price"
              onChange={handleVolOrPriceChange}
              value={tempVolprice}
              disabled={true}
            >
              <MenuItem value={"price"}>price</MenuItem>
              <MenuItem value={"volume"}>volume</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleSubmitDays} variant="contained" endIcon={<SmartToyIcon />}>
            Submit
          </Button>
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
