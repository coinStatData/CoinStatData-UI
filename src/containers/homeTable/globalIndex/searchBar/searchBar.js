import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import './searchBar.css';

const SearchBar = ({ fetchGlobalIndex }) => {

  const [isInteger, setIsInteger] = useState(true);
  const [days, setDays] = useState(1);

  const handleDaysChange = (e) => {
    setDays(e.target.value);
    if(Number.isInteger(Number(e.target.value))) {
      setIsInteger(true);
    } else {
      setIsInteger(false);
    }
  }

  const handleSubmitDays = (e) => {
    e.preventDefault();
    const end = Math.floor(Date.now() / 1000);
    const start = end - 60 * 60 * days * 24;
    fetchGlobalIndex({ interval: "hourly", start, end });
  }

  return (
    <div className="global-search-cont">
      <div className="days-input-bar">
        <FormControl sx={{ width: "100%", my:"15px"}} size="small">
          <TextField
            error={isInteger? false : true}
            id="global-past-days-select"
            value={days}
            label="Past # of Days"
            onChange={handleDaysChange}
            size="small" variant="outlined"
            helperText={isInteger? "" : "Must be an integer."}
          >
          </TextField>
        </FormControl>
      </div>
      <div className="days-submit-btn">
        <Button onClick={handleSubmitDays} variant="contained" endIcon={<SmartToyIcon />}>
          Submit
        </Button>
      </div>

    </div>
  );
}
export default SearchBar;
