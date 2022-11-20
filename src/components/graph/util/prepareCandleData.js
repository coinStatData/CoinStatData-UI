const prepCandleData = () => {

  const _returnCandleData = (data, width, title) => {
    let height = width /3;
    if(width < 800) {
      height = width/2;
    }
    const _CandleStickOptions = {
      series: [{
        data: data,
      }],
      chart: {
        type: 'candlestick',
        height: height,
        width: width
      },
      title: {
        text: title,
        align: 'left'
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 700,
          options: {
            yaxis: {
              labels: {
                show: false
              }
            },
          }
        },
        {
          breakpoint: 800,
          options: {
            yaxis: {
              labels: {
                show: true
              }
            },
          }
        },
      ]
    };
    return _CandleStickOptions;
  }

 // data = [{open, high, low, close, volume, period}]
  const _mutateCandleData = (rawRespData, timezone) => {
    const data = [];
    rawRespData.forEach((item) => {
      data.push({ 
        x: new Date(new Date(item.period).toLocaleString('en', {timeZone: timezone})),
        y: [
          Number(item.open).toFixed(5), 
          Number(item.high).toFixed(5), 
          Number(item.low).toFixed(5), 
          Number(item.close).toFixed(5)
        ]
      });
    });
    return data;
  }

  return {
    mutateData: _mutateCandleData,
    returnData: _returnCandleData
  }
}

export default prepCandleData;



