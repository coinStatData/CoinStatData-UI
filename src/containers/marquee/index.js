import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMarquee } from '../../redux/actions/marquee';
import Entry from './entry';
import CSDEntry from './CSDEntry';
import { MARQUEE_COINS } from './constants';
import { update_coin } from '../../redux/slices/search';
import Marquee from "react-fast-marquee";
import './marquee.css';

const CoinMarquee = ({ fetchMarquee, marquee, updateCoin }) => {

  useEffect(() => {
    if(marquee.data.length === 0) {
      fetchMarquee(MARQUEE_COINS);
    }
  }, []);

  return (
    <div className="marquee-cont">
      <Marquee
        pauseOnHover={true}
        speed={60}
        gradient={true}
        gradientColor={[255, 255, 255]}
        gradientWidth={5}
      >
        <CSDEntry/>
        {(!marquee.isError && !marquee.isLoading) &&
          marquee.data.map((data) => {
            return (
              <Entry 
                key={data.name}
                id={data.id} 
                name={data.name} 
                change={data.price_change_percentage_24h}
                updateCoin={updateCoin}
              />
            );
          })
        }
      </Marquee>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    marquee: state.marquee
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMarquee: (coins) => dispatch(fetchMarquee(coins)),
    updateCoin: (coin) => dispatch(update_coin(coin)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinMarquee);
