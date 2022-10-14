import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../hooks/userContext';
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
import Divider from '@mui/material/Divider';
import './style.css';

function Table2(props) {
  const { resp_g, coin_g } = useContext(UserContext);
  const [tableD, setTableD] = useState();
  const [isLambda, setIsLambda] = useState();
  const dispatch = useDispatch()
  const sDate = useSelector((state) => state.search.startDate);
  const eDate = useSelector((state) => state.search.endDate);
  const lineData = useSelector((state) => state.lineData);
  const coin = useSelector((state) => state.search.coin);
  
  useEffect(() => {
    //this is for lambda resp
    setTableD(resp_g)
    setIsLambda(true);
    if(Array.isArray(resp_g) && resp_g.length > 0) {
      dispatch(update_startDate(formatDate(new Date(resp_g[0].datetime * 1000))));
      dispatch(update_endDate(formatDate(new Date(resp_g[resp_g.length-1].datetime * 1000))));
    }
  }, [resp_g]);

  useEffect(() => {
    //this is coinGecko Resp
    setTableD(lineData.resp.data);
    setIsLambda(false);
    if(Array.isArray(lineData.resp.data.prices) && lineData.resp.data.prices.length>5) {
      dispatch(update_startDate(formatDate(new Date(lineData.resp.data.prices[0][0]))));
      dispatch(update_endDate(formatDate(new Date(lineData.resp.data.prices[lineData.resp.data.prices.length-1][0]))));
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
                  <th>DateTime</th>
                  <th>Price</th>
                  {props.screenWidth > 450 &&
                    <th>{isLambda? "Market Cap":"24_HR_Vol"}</th>
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

function TableRow(item) {
  return (
    <tr key={item.datetime}>
      <td>{item.coin}</td>
      <td>{formatDate(new Date(item.datetime * 1000))}</td>
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
      <td>{formatDate(new Date(priceItem[0]))}</td>
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

export default Table2;
