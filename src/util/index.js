const moment = require("moment-timezone");

Number.prototype.padLeft = function (base, chr) {
  let len = String(base || 10).length - String(this).length + 1;
  return len > 0 ? new Array(len).join(chr || '0') + this : this;
};

export const dragElement = (elmnt, id) => {
  const _elementDrag = (e) => {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
  const _closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  }
  const _dragMouseDown = (e) => {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = _closeDragElement;
    document.onmousemove = _elementDrag;
  }
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(id)) {
    document.getElementById(id).onmousedown = _dragMouseDown;
  } else {
    elmnt.onmousedown = _dragMouseDown;
  }
}

//date<int>: unix timestamp
export function formatDate(date, format="default", timezone="UTC", pattern="") {
  const strDate = String(date);
  const unixStamp = strDate.length > 10 ? Number(strDate.slice(0, 10)) : date;
  if(format === "default") {
    //let newDate = new Date(new Date(date).toLocaleString('en', {timeZone: timezone}));
    const newDate = moment.unix(unixStamp).tz(timezone);
    const formatedDate = [
      (newDate.month() + 1).padLeft(), 
      newDate.date().padLeft(), 
      newDate.year()
    ].join('/');
    let hours = newDate.hour();
    let minutes = newDate.minute();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = '00';
    //let strTime = formatedDate + ' - ' + hours + ':' + minutes + ' ' + ampm;
    const strTime = formatedDate + ' - ' + hours + ' ' + ampm;
    return strTime;
  } else if(format === "ISO") {
    //new Date(date).toLocaleString('en', {timeZone: timezone});
    const newDate = moment.unix(unixStamp).tz(timezone).format("YYYY-MM-DDTHH:mm");
    return newDate;
  } else if(format === "Unix") {
    return date;
  } else if(format === "custom") {
    const newDate = moment.unix(unixStamp).tz(timezone).format(pattern);
    return newDate;
  } else {
    throw new Error("Invalid Date format: " + format);
  }
}


export const calculateGraphWidth = (newWidth) => {
  let newGraphWidth = 0;
  let newGraphWidthBar = 0;
  let histogramWidth = 500;
  let histogramHeight = 300
  if(newWidth < 650) {
    newGraphWidth = newWidth * .90;
    newGraphWidthBar = newWidth * .90;
    histogramWidth = 350;
    histogramHeight = 160;
  } else if(1000 >= newWidth && newWidth >= 650) {
    newGraphWidth = newWidth * .85;
    newGraphWidthBar = newWidth * .80;
    histogramWidth = 500;
    histogramHeight = 300;
  } else if (1000 < newWidth && newWidth < 1200){
    newGraphWidth = 800;
    newGraphWidthBar = 800;
  } else if (1200 < newWidth){
    newGraphWidth = 1000;
    newGraphWidthBar = 800;
  }
  return [newGraphWidth, newGraphWidthBar, histogramWidth, histogramHeight];
}

export const checkIfSameArray = (a, b) => {
  //this is to prevent double render/calculation
  //a = original array, b = new array
  try {
    const aLen = a.length - 1;
    const bLen = b.length - 1;
    if (aLen !== bLen) return false;
    if(a[0][0] !== b[0][0] || a[0][1] !== b[0][1]) return false;
    if(a[aLen][0] !== b[bLen][0] || a[aLen][1] !== b[bLen][1]) return false;
    const bhalf = Math.floor(bLen/2);
    const ahalf = Math.floor(aLen/2);
    if(a[ahalf][0] !== b[bhalf][0] || a[ahalf][1] !== b[bhalf][1]) return false;
  } catch(e) {
    return false;
  }
  return true;
}

export const checkIfSameArrayCandle = (a, b) => {
  //this is to prevent double render/calculation
  //a = original array, b = new array
  try {
    const aLen = a.length - 1;
    const bLen = b.length - 1;
    if (aLen !== bLen) return false;
    if(a[0]['open'] !== b[0]['open'] || a[0]['high'] !== b[0]['high']) return false;
    if(a[aLen]['open'] !== b[bLen]['open'] || a[aLen]['high'] !== b[bLen]['high']) return false;
    const bhalf = Math.floor(bLen/2);
    const ahalf = Math.floor(aLen/2);
    if(a[ahalf]['open'] !== b[bhalf]['open'] || a[ahalf]['high'] !== b[bhalf]['high']) return false;
  } catch(e) {
    return false;
  }
  return true;
}

export const checkIfSameArrayCandleV2 = (a, b) => {
  //this is to prevent double render/calculation
  //a = original array, b = new array
  try {
    const aLen = a.length - 1;
    const bLen = b.length - 1;
    if (aLen !== bLen) return false;
    if(a[0] !== b[0] || a[0] !== b[0]) return false;
    if(a[aLen] !== b[bLen] || a[aLen] !== b[bLen]) return false;
    const bhalf = Math.floor(bLen/2);
    const ahalf = Math.floor(aLen/2);
    if(a[ahalf] !== b[bhalf] || a[ahalf] !== b[bhalf]) return false;
  } catch(e) {
    return false;
  }
  return true;
}

export const convertNumberFormat = (labelValue) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+9

  ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
  // Six Zeroes for Millions 
  : Math.abs(Number(labelValue)) >= 1.0e+6

  ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
  // Three Zeroes for Thousands
  : Math.abs(Number(labelValue)) >= 1.0e+3

  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

  : Math.abs(Number(labelValue));

}