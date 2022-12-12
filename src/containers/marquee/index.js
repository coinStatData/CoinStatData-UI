import React from 'react';
import { connect } from 'react-redux';
import Entry from './entry';
import CSDEntry from './CSDEntry';
import { update_coin } from '../../redux/slices/search';
import Marquee from "react-fast-marquee";
import './marquee.css';

const CoinMarquee = ({ updateCoin, coinIndex }) => {

  return (
    <>
      {coinIndex.data.length > 15 && 
        <div className="marquee-cont">
          <Marquee
            pauseOnHover={true}
            gradient={true}
            gradientColor={[255, 255, 255]}
            gradientWidth={5}
          >
            {
              coinIndex.data.slice(0, 13).map((data) => {
                return (
                  <Entry 
                    key={data[1].id}
                    id={data[1].id} 
                    name={data[1].id} 
                    change={data[1].price_24hr_change}
                    updateCoin={updateCoin}
                  />
                );
              })
            }
            <CSDEntry/>
          </Marquee>
        </div>
      }
    </>
  );
}

function mapStateToProps(state) {
  return {
    coinIndex: state.coinIndex
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateCoin: (coin) => dispatch(update_coin(coin)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinMarquee);
