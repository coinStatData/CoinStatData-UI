import React, { useState } from 'react';
import pythonLambdaService from '../../services/pythonLambda.service';
import { CSD_INDEX } from '../../util/constants/coins';
import { RESP, MenuProps, INIT_COINS, HELPER_TEXTS } from './constants';
import ErrorModal from '../../components/alertModal/error';
import StatTabNav from './tabNav/statistic';
const graphImage = require('../../assets/graphs/efficientFrontier.jpg');
import useErrorHandle from '../../hooks/useErrorHandle';
import useSpinners from '../../hooks/useSpinners';

//mau stylesheet
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import './portfolio.css';

const getStyles = (name, chosenCoins, theme) => {
  return {
    fontWeight:
      chosenCoins.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const PortfolioOptimization = (props) => {
  const theme = useTheme();
  const [chosenCoins, setChosenCoins] = useState(INIT_COINS);
  const [days, setDays] = useState(300);
  const [isOver100, setIsOver100] = useState(true);
  const [isOver1000, setIsOver1000] = useState(true);
  const [numOfPorts, setNumOfPorts] = useState(5000);
  const [portResp, setPortResp] = useState(RESP);
  const [imageSrc, setImageSrc] = useState(graphImage);
  const { errorResponse, errorMessage, showAlert, setShowAlert } = useErrorHandle();
  const { isLoading, isError, setIsError, setIsLoading, Spinners } = useSpinners();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsError(false);
      const payload = {
        cryptos: chosenCoins,
        days: Number(days),
        portCount: Number(numOfPorts)
      }
      const resp = await pythonLambdaService().invokePost("PORTFOLIO_OPT", payload);
      setIsLoading(false);
      setImageSrc("data:image/jpeg;base64, " + resp?.images?.efficientFrontier);
      delete resp?.images;
      setPortResp(resp);
    } catch (e) {
      console.error(e.message);
      setPortResp({});
      setIsError(true);
      errorResponse(e);
      setIsLoading(false);
    }
  }

  const handleCoinSelectionChange = (event) => {
    const { target: { value } } = event;
    setChosenCoins(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleDaysChange = (e) => {
    let tempDays = Number(e.target.value);
    if(tempDays >= 100 && tempDays <= 600) {
      setIsOver100(true)
      setDays(tempDays);
    } else {
      setIsOver100(false);
      setDays(tempDays);
    }
  }

  const handleNumOfSimulationsChange = (e) => {
    let tempNum = Number(e.target.value);
    if(tempNum >= 1000 && tempNum <= 7000) {
      setIsOver1000(true)
      setNumOfPorts(tempNum);
    } else {
      setIsOver1000(false);
      setNumOfPorts(tempNum);
    }
  }

  return (
    <>
    <ErrorModal errorMessage={errorMessage} setShowAlert={setShowAlert} showAlert={showAlert} />
    <div className="portfolioOpt-outer-cont">
      <div className="search-cont">
        <h5>Efficient Frontier</h5>
        <form>
          <FormControl sx={{ width: "100%", my:2 }} size="small">
            <InputLabel id="multi-coins-label">Choose Coins</InputLabel>
            <Select
              id="multi-coins-select"
              multiple
              value={chosenCoins}
              onChange={handleCoinSelectionChange}
              input={<OutlinedInput label="Choose Coins" />}
              MenuProps={MenuProps}
            >
              {CSD_INDEX.map((coin) => (
                <MenuItem
                  key={coin}
                  value={coin}
                  style={getStyles(coin, chosenCoins, theme)}
                >
                  {coin}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: "100%", my:2 }} size="small">
            <TextField
              error={isOver100? false : true}
              type="number"
              id="past-days-select"
              value={days}
              label="Past # of Days"
              onChange={handleDaysChange}
              size="small" variant="outlined"
              helperText={isOver100? "" : HELPER_TEXTS.daysSelectWarning}
            >
            </TextField>
          </FormControl>

          <FormControl sx={{ width: "100%", my:2 }} size="small">
            <TextField
              error={isOver1000? false : true}
              type="number"
              id="port-count-select"
              value={numOfPorts}
              label="Number of Simulations"
              onChange={handleNumOfSimulationsChange}
              size="small" variant="outlined"
              helperText={isOver1000? HELPER_TEXTS.simSelectInfo : HELPER_TEXTS.simSelectWarning}
            >
            </TextField>
          </FormControl>
          <Button onClick={handleSubmit} variant="contained" endIcon={<SmartToyIcon />}>
            Calculate
          </Button>
        </form>
      </div>
      {isError || isLoading ? 
        <Spinners />
        :
        <div className="graph-cont">
          <StatTabNav imageSrc={imageSrc} portResp={portResp}></StatTabNav>
        </div>
      }
    </div>
    </>
  );
}

export default PortfolioOptimization;
