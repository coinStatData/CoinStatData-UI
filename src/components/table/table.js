import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import { formatDate } from '../../util'
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from 'react-redux';
import { update_startDate, update_endDate } from '../../redux/slices/search';
import ErrorSpinner from '../spinner/error';
import LoadingSpinner from '../spinner/loading';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import './style.css';

function Table2(props) {
  const [tableD, setTableD] = useState();
  const [isLambda, setIsLambda] = useState();
  const dispatch = useDispatch()
  const lineData = useSelector((state) => state.lineData);
  const coin = useSelector((state) => state.search.coin);
  const timezone = useSelector((state) => state.userSettings.timezone);
  const timeFormat = useSelector((state) => state.userSettings.timeFormat);

  useEffect(() => {
    //this is linedata
    setTableD(lineData.resp.data);
    setIsLambda(false);
    if(Array.isArray(lineData.resp.data.prices) && lineData.resp.data.prices.length>3) {
      dispatch(update_startDate(formatDate(
        lineData.resp.data.prices[0][0]), 
        timeFormat, 
        timezone
      ));
      dispatch(update_endDate(formatDate(
        lineData.resp.data.prices[lineData.resp.data.prices.length-1][0],
        timeFormat,
        timezone
      )));
    }
  }, [lineData.resp.data]);

  const csvData = () => {
    const data = [];
    const cdata = props.lineData.price.chart.data;
    if(Array.isArray(cdata)){
      for(let i=0; i<cdata.length-2; i++)
        data.push({
          dateTime: cdata[i].name,
          price: cdata[i][coin]
        });
      return data;
    } else {
      return [];
    }
  }

  function TableRow(item) {
    return (
      <tr key={item.datetime}>
        <td>{item.coin}</td>
        <td>{formatDate(item.datetime, timeFormat, timezone)}</td>
        <td>{item.price}</td>
        <td>{Math.ceil(item.market_cap)}</td>
      </tr>
    )
  }
  
  function TableRowGecko(priceItem, volItem, coinname, props) {
    return (
      <tr key={priceItem[0]}>
        {props.screenWidth > 650 &&
          <td>{coinname}</td>
        }
        <td>{formatDate(priceItem[0], timeFormat, timezone)}</td>
        <td>{priceItem[1]>10? priceItem[1].toFixed(2):priceItem[1].toFixed(7)}</td>
        {props.screenWidth > 450 &&
          <td>{Math.ceil(volItem[1])}</td>
        }
      </tr>
    )
  }

  function makeTableGecko(priceAr, volAr, coinname, props) {
    let arr = priceAr.map((item, index)=> {
      return TableRowGecko(priceAr[index], volAr[index], coinname, props);
    })
    return arr;
  }
  
  return (
    <>
      {(lineData.resp.isLoading || lineData.resp.isError) ? (
        <div className="spinner-outer-cont">
          {lineData.resp.isLoading &&
            <LoadingSpinner />
          }
          {lineData.resp.isError &&
            <ErrorSpinner />
          }
        </div>
        ) : (
        <div className="table-cont">
          <div className="table">
          <Stack spacing={2} direction="row">
            <Box sx={{ width:"50%" }}>
              <Typography variant="h6">
                {coin.toUpperCase()}
              </Typography>
            </Box>
            <Box sx={{ width:"50%", textAlign:"right", pt:"20px"}}>
              <CSVLink data={csvData()}>
                {"CSV"}
                <DownloadIcon fontSize="small"/>
              </CSVLink>
            </Box>
          </Stack>
            {/* <p className="dateString">{sDate} ~ {eDate}</p> */}
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  {props.screenWidth > 650 &&
                    <th>Coin</th>
                  }
                  <th>DateTime({timezone})</th>
                  <th>Price($)</th>
                  {props.screenWidth > 450 &&
                    <th>{isLambda? "Market Cap($)":"24_HR_Vol($)"}</th>
                  }
                </tr>
              </thead>
              <tbody>
              {(isLambda && Array.isArray(tableD) && tableD.length > 0) &&
                tableD.map((item) => {
                  return TableRow(item);
                })
              }
              {(!isLambda && Array.isArray(tableD?.prices)) &&
                makeTableGecko(tableD.prices, tableD.total_volumes, coin, props)
              }
              </tbody>
            </Table>
          </div>
          {/* <CoinGecko></CoinGecko> */}
        </div>
        )
      }
    </>
  );
}

export default Table2;
