# Datetime Cheatsheet

1. How to validate a date string is a valid date?

- Date format
- Valid date. Eg: we don't have date 29/02/1999

There is a funny things about [parsing date from string](https://nextjsvietnam.com/post/javascript-numeric-precision-issue/)

**Javascript is so smart!!**

```js
const d = new Date("1985-13-29");
console.log(d);

// and we got
// Fri Mar 01 1985 07:00:00 GMT+0700 (Indochina Time)
```

## Let's pick some library and see how

1. [Dayjs](https://day.js.org/docs/en/installation/node-js)

```bash
npm install dayjs
```

```js
const dayjs = require("dayjs");

console.log(dayjs("1999-02-29", "YYYY-MM-DD").isValid()); // true
console.log(dayjs("1999-02-29", "YYYY-MM-DD", true).isValid()); // true
console.log(dayjs("1999-02-29", "YYYY-MM-DD", "es", true).isValid()); // true
```

2. Write your own code

```js
export function dateIsValid(val: string) {
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
```
