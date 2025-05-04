import { convertNumToMonth } from "./converNumToDates";

function formatDate(date, month, year) {
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

function getTimeInDay(date) {
  let dateOject = new Date(Number(date));

  let hourString = String(dateOject.getHours());
  let minuteString = String(dateOject.getMinutes());

  if (hourString.length === 1) {
    hourString = "0" + hourString;
  }

  if (minuteString.length === 1) {
    minuteString = "0" + minuteString;
  }

  return hourString + ":" + minuteString;
}

function getDayInYear(date) {
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
  const monthNumber = Number(monthString); // "05->5"

  return convertNumToMonth(monthNumber) + " " + dayString + " " + yearString;
}
export { formatDate, getTimeInDay, getDayInYear, formatDateString };
