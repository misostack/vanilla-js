const dayjs = require("dayjs");

console.log(dayjs("1999-02-29", "YYYY-MM-DD").isValid()); // true
console.log(dayjs("1999-02-29", "YYYY-MM-DD", true).isValid()); // true
console.log(dayjs("1999-02-29", "YYYY-MM-DD", "es", true).isValid()); // true

function dateIsValid(val) {
  // date format: DD-MM-YYYY
  const dateSegments = val.split("-").map((s) => parseInt(s));
  const [date, month, year] = dateSegments;
  const d = new Date(year, month - 1, date);
  if (typeof d === "object" && d !== null && typeof d.getTime === "function") {
    // check valid date range

    return (
      d.getFullYear() === year &&
      d.getMonth() === month - 1 &&
      d.getDate() === date
    );
  }

  return false;
}

console.log(dateIsValid("29-02-1999")); //false
console.log(dateIsValid("29-02-1900")); //false
console.log(dateIsValid("29-02-2000")); //true
console.log(dateIsValid("31-02-2000")); //false
