import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as settingReducers from '../../../redux/slices/userSettings';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

const determineExDate = (timeFormat) => {
  switch (timeFormat) {
    case 'default':
      return '07/07/2022 - 07 AM'
    case 'ISO':
      return '7/7/2022, 7:00:00 AM';
    case 'Unix':
      return '177700000000'
  }
}

export default function ModalContent(props) {

  const dispatch = useDispatch();
  const timezone = useSelector((state) => state.userSettings.timezone);
  const timeFormat = useSelector((state) => state.userSettings.timeFormat);
  const [exDate, setExDate] = React.useState(determineExDate(timeFormat));

  React.useEffect(() => {
    setExDate(determineExDate(timeFormat))
  }, [timeFormat])

  const handleTimeZoneChange = (e) => {
    let newTimezone = e.target.value;
    dispatch(settingReducers.update_timezone(newTimezone));
    if(timeFormat === "Unix" && newTimezone !== "UTC") {
      dispatch(settingReducers.update_timeFormat("default"));
    }
  }
  
  const handleTimeFormatChange = (e) => {
    dispatch(settingReducers.update_timeFormat(e.target.value));
    if(e.target.value === "Unix") {
      dispatch(settingReducers.update_timezone("UTC"));
    }
  }
  
  const handleNumberFormatChange = (e) => {
    dispatch(settingReducers.update_numberFormat(e.target.value));
  }

  return (
    <div>
      <div>
        <FormControl sx={{ mt: 3, minWidth: 250 }} size="small">
          <InputLabel id="timezone-select">Timezone</InputLabel>
          <Select
            labelId="timezone-select"
            id="timezone-select"
            value={timezone}
            label="Timezone"
            onChange={handleTimeZoneChange}
          >
            <MenuItem value={"UTC"}>UTC</MenuItem>
            <MenuItem value={"EST"}>EST</MenuItem>
            <MenuItem value={"PST"}>PST</MenuItem>
            <MenuItem value={"AST"}>AST</MenuItem>
            <MenuItem value={"CST"}>CST</MenuItem>
            <MenuItem value={"HST"}>HST</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ mt: 3, minWidth: 250 }} size="small">
          <InputLabel id="timeFormat-select">Time Format</InputLabel>
          <Select
            labelId="timeFormat-select"
            id="timeFormat-select"
            value={timeFormat}
            label="Time Format"
            onChange={handleTimeFormatChange}
          >
            <MenuItem value={"default"}>MM/DD/YYYY - hh</MenuItem>       
            <MenuItem value={"ISO"}>MM/DD/YYYY, hh:mm:ss</MenuItem>
            <MenuItem value={"Unix"}>Unix Timestamp</MenuItem>
          </Select>
          <FormHelperText>i.e. {exDate}</FormHelperText>
        </FormControl>
      </div>
    </div>
  );
}