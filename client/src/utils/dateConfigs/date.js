import { convertNumToMonth } from "./converNumToDates";

const dates = [];

for (let i = 1; i <= 31; ++i) {
  dates.push(i);
}

const months = [];

for (let i = 1; i <= 12; ++i) {
  months.push(convertNumToMonth(i));
}

const years = [];

for (let i = 2025; i >= 1900; --i) {
  years.push(i);
}

export { dates, months, years };
