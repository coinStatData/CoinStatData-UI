import { formatDate } from '../../../util'

export const mutateResp = (resp, interval, coin) => {
  if(Array.isArray(resp) && resp.length>1) {
    let max = 0;
    let min = Number.MAX_SAFE_INTEGER;
    let hmax = -100;
    let hmin = 100;
    let chartD = resp.map((item, index) => {
      if(index < resp.length-2) {
        let ch = (resp[index+1][1] - item[1])/item[1] * 100;
        let row = {
          name: interval == "hourly"? formatDate(new Date(item[0])).toLocaleString() : new Date(item[0]).toLocaleString(),
          [coin]: item[1],
          hourlyReturn: ch.toFixed(5)
        }
        max = max < item[1] ? item[1] : max;
        min = min > item[1] ? item[1] : min;
        hmax = hmax < row.hourlyReturn ? row.hourlyReturn : hmax;
        hmin = hmin > row.hourlyReturn ? row.hourlyReturn : hmin;
        return row;
      }
    });
    return {
      chart: chartD,
      minMax: {
        max: max,
        min: min,
        hMaxReturn: hmax,
        hMinReturn: hmin
      }
    }
  }
}