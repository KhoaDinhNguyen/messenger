import { convertNumToMonth } from "./converNumToDates";

function formatDates(date, month, year) {
  let dateString = String(date);
  let monthString = String(month);
  let yearString = String(year);

  if (dateString.length === 1) {
    dateString = "0" + dateString;
  }
  if (monthString.length === 1) {
    monthString = "0" + monthString;
  }

  return monthString + "-" + dateString + "-" + yearString;
}

function getHoursMinute(date) {
  let inputDate = date;
  if (isNaN(Number(date))) {
    inputDate = new Date(date);
  } else {
    inputDate = new Date(Number(date));
  }
  let hourString = String(inputDate.getHours());
  let minuteString = String(inputDate.getMinutes());

  if (hourString.length === 1) {
    hourString = "0" + hourString;
  }

  if (minuteString.length === 1) {
    minuteString = "0" + minuteString;
  }

  return hourString + ":" + minuteString;
}

function getDate(date) {
  let monthString = String(date.getMonth() + 1);
  let dateString = String(date.getDate());
  if (monthString.length === 1) {
    monthString = "0" + monthString;
  }
  if (dateString.length === 1) {
    dateString = "0" + dateString;
  }
  return date.getFullYear() + "-" + monthString + "-" + dateString;
}

function formatDateString(dateString) {
  const yearString = dateString.substring(0, 4);
  const monthString = dateString.substring(5, 7);
  const dayString = dateString.substring(8);
  const monthNumber = Number(monthString);

  return convertNumToMonth(monthNumber) + " " + dayString + " " + yearString;
}
export { formatDates, getHoursMinute, getDate, formatDateString };
