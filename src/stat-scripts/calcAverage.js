export const calAvg = (chartD, interval) => {
  console.log("########", chartD)
  let avgReturn = 0;
  let avgMReturn = 0;
  let avgSumData = 0;
  let avgSumMData = 0;

  if(Array.isArray(chartD) && chartD.length>0) {
    const dObj = {};
    const mObj = {};
    const mdic = {};
    const dic = {};
    const weekDic = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday"
    };
    for(let i=0; i<chartD.length-2; i++) {
      let time = "";
      let mday = "";
      if(interval === "daily") {
        time = weekDic[(new Date(chartD[i]["name"]).getDay())];
        mday = new Date(chartD[i]["name"]).getDate();
        //month dates
        mObj[mday] = 0;
        mObj[mday+"_count"] = 0;
        mObj[mday+"_avg"] = 0;
        mdic[mday] = mday;
      } else {
        time = chartD[i]["name"].slice(-8);
      }
      //hourly and weekdays
      dObj[time] = 0;
      dObj[time+"_count"] = 0;
      dObj[time+"_avg"] = 0;
      dic[time] = time;
    }
    for(let i=0; i<chartD.length-2; i++) {
      let time = "";
      let mday = "";
      if(interval === "daily") {
        time = weekDic[(new Date(chartD[i]["name"]).getDay())];
        mday = new Date(chartD[i]["name"]).getDate();
        //month dates
        mObj[mday] += parseFloat(chartD[i].hourlyReturn);
        mObj[mday+"_count"] += 1;
        mObj[mday+"_avg"] = mObj[mday] / mObj[mday+"_count"];
      } else {
        time = chartD[i]["name"].slice(-8);
      }
      dObj[time] += parseFloat(chartD[i].hourlyReturn);
      dObj[time+"_count"] += 1;
      dObj[time+"_avg"] = dObj[time] / dObj[time+"_count"];
    }
    avgReturn = dObj;
    avgMReturn = mObj;
    const avgSumDataTemp = [];
    //hourly and days of week
    for(let d in dic) {
      const temp = {
        name: dic[d],
        avg: dObj[d+"_avg"],
        count: dObj[d+"_count"],
        sum: dObj[d],
      }
      avgSumDataTemp.push(temp);
    }
    avgSumData = avgSumDataTemp;

    if(interval === "daily") {
      //month days
      let marr = [];
      for(const d in mdic) {
        const temp = {
          name: mdic[d],
          avg: mObj[d+"_avg"].toFixed(5),
          count: mObj[d+"_count"],
          sum: mObj[d].toFixed(5),
        }
        marr.push(temp);
      }
      avgSumMData = marr;
    }
    return {
      avgReturn: avgReturn,
      avgMReturn: avgMReturn,
      avgSumData: avgSumData,
      avgSumMData: avgSumMData
    }
  }
}