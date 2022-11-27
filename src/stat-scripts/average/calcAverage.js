const moment = require("moment-timezone");
const { 
  WEEK_DICT, 
  DAY_DICT, 
  MONTH_DICT, 
  MONTH_DATA_DICT, 
  DAY_DATA_DICT, 
  HOUR_DATA_DICT, 
  HOUR_DICT 
} = require("./constants");

export const calAvg = (chartD, interval, timezone="UTC") => {
  let avgReturn = 0;
  let avgMReturn = 0;
  let avgSumData = 0;
  let avgSumMData = 0;
  const monthData = Object.assign({}, MONTH_DATA_DICT);
  const dayData = Object.assign({}, DAY_DATA_DICT)
  const hourData = Object.assign({}, HOUR_DATA_DICT)

  if(Array.isArray(chartD) && chartD.length > 0) {
    for(let i=0; i<chartD.length-1; i++) {
      const newDate = moment.unix(chartD[i]["name"]).tz(timezone);
      console.log()
      if(interval === "daily") {
        const time = WEEK_DICT[newDate.day()];
        const mday = newDate.date();
        //month dates
        monthData[mday] += parseFloat(chartD[i].return);
        monthData[mday+"_count"] += 1;
        monthData[mday+"_avg"] = monthData[mday] / monthData[mday+"_count"];
        //week days
        dayData[time] += parseFloat(chartD[i].return);
        dayData[time + "_count"] += 1;
        dayData[time + "_avg"] = dayData[time] / dayData[time+"_count"];
      } else {
        //hourly
        const time = newDate.hour();
        hourData[time] += parseFloat(chartD[i].return);
        hourData[time + "_count"] += 1;
        hourData[time + "_avg"] = hourData[time] / hourData[time+"_count"];
      }
    }
    avgReturn = interval === "hourly" ? hourData : dayData;
    avgMReturn = monthData;
    const avgSumDataTemp = [];

    if(interval === "hourly") {
      for(let d in HOUR_DICT) {
        const temp = {
          name: HOUR_DICT[d],
          avg: hourData[d+"_avg"],
          count: hourData[d+"_count"],
          sum: hourData[d],
        }
        avgSumDataTemp.push(temp);
      }
      avgSumData = avgSumDataTemp;
    }

    if(interval === "daily") {
      //month days
      const marr = [];
      for(const d in MONTH_DICT) {
        const temp = {
          name: MONTH_DICT[d],
          avg: monthData[d+"_avg"].toFixed(5),
          count: monthData[d+"_count"],
          sum: monthData[d].toFixed(5),
        }
        marr.push(temp);
      }
      avgSumMData = marr;

      for(let d in DAY_DICT) {
        const temp = {
          name: DAY_DICT[d],
          avg: dayData[d+"_avg"],
          count: dayData[d+"_count"],
          sum: dayData[d],
        }
        avgSumDataTemp.push(temp);
      }
      avgSumData = avgSumDataTemp;
    }
    return {
      avgReturn: avgReturn,
      avgMReturn: avgMReturn,
      avgSumData: avgSumData,
      avgSumMData: avgSumMData
    }
  }
}