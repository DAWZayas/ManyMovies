export function formatDate(date) {
  date = new Date(date);
  return `${monthToString(date.getMonth())} ${date.getDate()}, ${date.getFullYear()} ${getFormatedHour(date)}`;
}

function monthToString(month){
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[month];
}

function getFormatedHour(date){
  let hour = date.getHours();
  const min = date.getMinutes();
  const meridiem = hour < 12 ? 'AM' : 'PM';
  hour = hour === 0 ? 12 : hour;
  hour = hour < 12 ? hour : hour - 12;
  return `${hour}:${min} ${meridiem}`;
}
