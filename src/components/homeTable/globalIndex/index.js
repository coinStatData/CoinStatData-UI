import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import * as CSDIndexActions from '../../../redux/actions/CSDIndex';
import ErrorSpinner from '../../spinner/error';
import LoadingSpinner from '../../spinner/loading';
import { convertNumberFormat, formatDate } from '../../../util';
import Tooltip from '@mui/material/Tooltip';
import './global.css';

const GlobalIndex = (props) => {

  const { screenWidth, fetchGlobalIndex, globalIndex } = props;
  const [isFullDigits, setIsFullDigits] = useState(false);
  const [isUnix, setIsUnix] = useState(false);

  useEffect(() => {
    if(globalIndex.data.length === 0) {
      const end = Math.floor(Date.now() / 1000);
      const start = end - 60 * 60 * 25; // last 25 hours
      fetchGlobalIndex({interval: 'hourly', start, end });
    }
  }, [])

  const TableRow = (item, index) => {
    return (
      <tr key={index}>
        <td className="datetime-td">
          {isUnix ? item.datetime : formatDate(new Date(item.datetime * 1000))}
        </td>
        <td>
          {isFullDigits ? item.none_stable_mc : convertNumberFormat(item.none_stable_mc)}
        </td>
        <td>
          {isFullDigits ? item.none_stable_vol : convertNumberFormat(item.none_stable_vol)}
        </td>
        {((screenWidth > 700 && screenWidth < 1000) || (screenWidth > 1250)) &&
          <>
            <td>
              {isFullDigits ? item.stable_mc : convertNumberFormat(item.stable_mc)}
            </td>
            <td>
              {isFullDigits ? item.stable_vol : convertNumberFormat(item.stable_vol)}
            </td>
          </>
        }
        {(screenWidth >= 500) &&
          <td>
            {isFullDigits ? item.total_mc : convertNumberFormat(item.total_mc)}
          </td>
        }
      </tr>
    );
  }
  
  const makeTable = (coinData) => {
    if(Array.isArray(coinData)) {
      const arr = coinData.map((item, index)=> {
        return TableRow(item, index);
      });
      return arr;
    }
  }

  return (
    <div className="global-index-cont">
      <Table className="home-table" hover responsive>
        <thead>
          <tr>
            <Tooltip title="In UTC timezone." arrow>
              <th>DateTime(UTC)</th>
            </Tooltip>
            <Tooltip title="Total market cap of CSD-50 Index (none-stable coins)." arrow>
              <th>CSD50 MC($)</th>
            </Tooltip>
            <Tooltip title="Total 24hr-volume of CSD-50 Index (none-stable coins)." arrow>
              <th>CSD50 Vol($)</th>
            </Tooltip>
            {((screenWidth > 700 && screenWidth < 1000) || (screenWidth > 1250)) &&
              <>
                <Tooltip title="Total market cap of CSD-10 Stable Index (stable coins)." arrow>
                  <th>CSD10 MC($)</th>
                </Tooltip>
                <Tooltip title="Total 24hr-volume of CSD-10 Stable Index (stable coins)" arrow>
                  <th>CSD10 Vol($)</th>
                </Tooltip>
              </>
            }
            {(screenWidth >= 500) &&
              <Tooltip title="Total market cap of CSD-60 Index (both stable + none-stable coins)." arrow>
                <th>Total MC($)</th>
              </Tooltip>
            }
          </tr>
        </thead>
        <tbody>
          {globalIndex.isError ? 
            <tr>
              <td colSpan="5">
                <ErrorSpinner />
                <br/><br/>
              </td>
            </tr>
            : 
            globalIndex.isLoading ? 
              <tr>
                <td colSpan="5">
                  <LoadingSpinner />
                </td>
              </tr>
              : 
              makeTable(globalIndex.data)
          }
        </tbody>
      </Table>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    globalIndex: state.CSD_GlobalIndex
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGlobalIndex: ({ interval, start, end }) => dispatch(CSDIndexActions.fetchCSDGlobalIndex({ interval, start, end })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalIndex);
