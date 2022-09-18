
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
        // type: 'category',
        // labels: {
        //   formatter: function(val) {
        //     return dayjs(val).format('MMM DD HH:mm')
        //   }
        // }
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 200,
          options: {
            yaxis: {
              labels: {
                show: false
              }
            },
          }
        },
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
  const _mutateCandleData = (rawRespData) => {
    const data = [];
    rawRespData.forEach((item) => {
      data.push({
        x: new Date(item.period),
        y: [item.open, item.high, item.low, item.close]
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



