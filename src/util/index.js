Number.prototype.padLeft = function (base, chr) {
  var len = String(base || 10).length - String(this).length + 1;
  return len > 0 ? new Array(len).join(chr || '0') + this : this;
};

export function formatDate(date) {
  let formatedDate = [(date.getMonth() + 1).padLeft(), date.getDate().padLeft(), date.getFullYear()].join('/');
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours < 10 ? '0' + hours : hours;
  minutes = '00';
  let strTime = formatedDate + ' - ' + hours + ':' + minutes + ' ' + ampm;
  return strTime;
}