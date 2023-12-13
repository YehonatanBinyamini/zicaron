import HebrewDate from "hebrew-date";
import Day from "../models/Day";
import { hebrewLetters } from "./helpers";


const hebrewMonths = [
  "תשרי",
  "חשון",
  "כסלו",
  "טבת",
  "שבט",
  "אדר",
  "אדר ב",
  "ניסן",
  "אייר",
  "סיוון",
  "תמוז",
  "אב",
  "אלול",
];

function getHebrewYear(number) {
  if (typeof number !== "number" || number < 1000 || number > 9999) {
    throw new Error("Input must be a four-digit number");
  }

  const numberString = number.toString();

  const hundredsLetters = { 5: "תק", 6: "תר", 7: "תש", 8: "תת" };
  const tensLetters = {
    1: "י",
    2: "כ",
    3: "ל",
    4: "מ",
    5: "נ",
    6: "ס",
    7: "ע",
    8: "פ",
    9: "צ",
  };

  const hundreds = parseInt(numberString[1], 10);
  const tens = parseInt(numberString[2], 10);
  const units = parseInt(numberString[3], 10);
  if (units !== 0 && tens !== 0) {
    return `${hundredsLetters[hundreds]}${tensLetters[tens]}"${hebrewLetters[units]}`;
  } else if (units === 0 && tens !== 0) {
    return `${hundredsLetters[hundreds]}"${tensLetters[tens]}`;
  } else if (units !== 0 && tens === 0) {
    return `${hundredsLetters[hundreds]}"${hebrewLetters[units]}`;
  } else if (units === 0 && tens === 0) {
    return `${hundredsLetters[hundreds][0]}"${hundredsLetters[hundreds][1]}`;
  } else return "";
}

function getHebrewMonthName(heDateObj, year, month, date) {
  if (heDateObj.month === 6) {
    const nextMonth = new Date(
      year,
      month + 1,
      heDateObj.date > 27 ? date - 2 : date + 2
    );
    const nextHeMonth = HebrewDate(
      nextMonth.getFullYear(),
      nextMonth.getMonth() + 1,
      nextMonth.getDate()
    );

    return nextHeMonth.month === 7 ? "אדר א" : "אדר";
  } else return hebrewMonths[heDateObj.month - 1];
}

export function getMonthInfo(fullYear, month) {
  function getHeMonthsTitle() {
    const heDateOfLastDayInMonth = HebrewDate(
      fullYear,
      month + 1,
      numberOfDaysInMonth
    );

    const heName1 = getHebrewMonthName(
      HebrewDate(fullYear, month + 1, 1),
      fullYear,
      month,
      1
    );
    const heName2 = getHebrewMonthName(
      heDateOfLastDayInMonth,
      fullYear,
      month,
      numberOfDaysInMonth
    );
    const returnVal = heName1 !== heName2 ? heName1 + " - " + heName2 : heName1;

    return returnVal + ` ${getHebrewYear(heDateOfLastDayInMonth.year)}`;
  }

  const firstDayOfMonth = new Date(fullYear, month, 1);
  const indexOfFirstDay = firstDayOfMonth.getDay();
  const numberOfDaysInMonth = new Date(fullYear, month + 1, 0).getDate();
  const DaysArray = [];
  for (let i = 0; i < indexOfFirstDay; i++) {
    //initial empty days at the beginning og month
    DaysArray.push({
      id: Day.id++,
      isDay: false,
      heDate: null,
      enDate: null,
    });
  }

  for (let i = 1; i <= numberOfDaysInMonth; i++) {
    //initial real days
    const heDateObj = HebrewDate(fullYear, month + 1, i);
    const hebrewDayDate = heDateObj.date;
    const heMonthName = getHebrewMonthName(heDateObj, fullYear, month, i);
    const displayingHebrewDate =
      hebrewDayDate === 1
        ? `${hebrewLetters[hebrewDayDate]} ${heMonthName}`
        : hebrewLetters[hebrewDayDate];

    DaysArray.push({
      id: Day.id++,
      isDay: true,
      heDate: {
        year: getHebrewYear(heDateObj.year),
        month: heMonthName,
        date: displayingHebrewDate,
      },
      enDate: { year: fullYear, month: month + 1, date: i },
    });
  }

  const restDays = 42 - numberOfDaysInMonth - indexOfFirstDay;

  for (let i = 0; i < restDays; i++) {
    //initial empty days until 42 days at the table
    DaysArray.push({
      id: Day.id++,
      isDay: false,
      heDate: null,
      enDate: null,
    });
  }

  const heMonthsTitle = getHeMonthsTitle();
  return { DaysArray: DaysArray, heMonthsTitle: heMonthsTitle };
}
