function formatDates(date, month, year) {
  console.log(date);
  console.log(month);
  console.log(year);
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

export { formatDates };
