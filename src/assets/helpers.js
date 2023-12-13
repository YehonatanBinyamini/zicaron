export const monthOrder = {
  1: "תשרי",
  2: "חשון",
  3: "כסלו",
  4: "טבת",
  5: "שבט",
  6: "אדר",
  7: "ניסן",
  8: "אייר",
  9: "סיון",
  10: "תמוז",
  11: "אב",
  12: "אלול",
};

const holidays = {
  "טו בשבט": true,
  'ל״ג בעומר': true,
  "פורים": true,
  "פורים קטן": true,
  "צום גדליה": true,
  "שמיני עצרת": true,
  "שושן פורים": true,
  "תענית בכורות": true,
  "יום השואה": true,
  "יום העצמאות": true,
  "יום הזכרון": true,
  "שבת הגדול": true,
  'ל"ג בעומר': true,
  "פסח שני": true,
  "יום ירושלים": true,
  "ערב שבועות": true,
  "שבועות": true,
  "טו באב": true,
  "ערב סוכות": true,
  "ערב פסח": true,
  "תשעה באב": true,
  "ערב ראש השנה": true,
}

function getTimeString(date) {
  const dateObject = new Date(date);

  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  return `${hours}:${String(minutes).padStart(2, "0")}`;
}

export function setEvents(events) {
  if (events.length === 0) return null;

  const newEvents = events.map((event) => {
   
     if (event.hebrew === "פרשת קורח") {
      return {
        description: 'קרח'
      };
    }  
    else if (event.category === "parashat") {
      return {
        description: event.hebrew.split(" ").slice(1).join(" "),
      };
    } else if (holidays[event.hebrew]) {
      return {
        description: event.hebrew
      };
    } else if (event.hebrew === "עשרה בטבת") {
      return {
        description: "צום י' בטבת"
      };
    } else if (event.hebrew === "שבת שקלים") {
      return {
        description: "שקלים"
      };
    } else if (event.hebrew === "שבת זכור") {
      return {
        description: "זכור"
      };
    } else if (event.hebrew === "ערב תשעה באב") {
      return {
        description: "ערב תשעה־באב"
      };
    } else if (event.hebrew === "שבת פרה") {
      return {
        description: "פרה"
      };
    } else if (event.hebrew === "שבת החדש") {
      return {
        description: "החודש"
      };
    } else if (event.hebrew === "שבת שירה") {
      return {
        description: "שירה"
      };
    } else if (event.hebrew === "צום תמוז") {
      return {
        description: 'צום י"ז בתמוז'
      };
    } else if (event.hebrew === "יום כפור") {
      return {
        description: 'יוה"כ'
      };
    } else if (event.hebrew === "ערב יום כפור") {
      return {
        description: 'ערב יוה"כ'
      };
    } else if (event.hebrew === "ערב פורים") {
      return {
        description: 'ערב־פורים'
      };
    } else if (event.hebrew === "תענית אסתר") {
      return {
        description: 'תענית־אסתר'
      };
    } else if (event.hebrew === "חנוכה: א' נר") {
      return null;
    } else if (event.hebrew.includes("חנוכה") && (event.hebrew.includes("נרות") || event.hebrew.includes("יום ח"))) {
      return {
        description: "חנוכה"
      };
    } else if (event.hebrew.includes("חנוכה") && (event.hebrew.includes("נר") || event.hebrew.includes("יום ח"))) {
      return {
        description: "ערב חנוכה"
      };
    } else if (event.hebrew.includes("פסח") && event.hebrew.includes(")")) {
      return {
        description: 'חוה"מ פסח'
      };
    } else if (event.hebrew.includes("פסח") && event.hebrew.includes("א")) {
      return {
        description: 'פסח'
      };
    } else if (event.hebrew.includes("פסח") && event.hebrew.includes("ז")) {
      return {
        description: 'שביעי של פסח'
      };
    } else if (event.hebrew.includes("ראש השנה") && !event.hebrew.includes("בהמה")) {
      return {
        description: "ראש השנה"
      };
    } else if (event.hebrew.includes("סוכות") && event.hebrew.includes('ז')) {
      return {
        description: 'הושענא רבה'
      };
    } else if (event.hebrew.includes("סוכות") && event.hebrew.includes(')')) {
      return {
        description: 'חוה"מ סוכות'
      };
    } else if (event.hebrew.includes("סוכות") && event.hebrew.includes('א')) {
      return {
        description: 'סוכות'
      };
    }  
 
    return null;
  }).filter(Boolean); // Filter out null values

  return newEvents.length > 0 ? newEvents : null;
}

export const hebrewMonths = [
  'תשרי',
  'חשון',
  'כסלו',
  'טבת',
  'שבט',
  'אדר',
  'אדר א',
  'אדר ב',
  'ניסן',
  'אייר',
  'סיוון',
  'תמוז',
  'אב',
  'אלול',
];

export const hebrewLetters = {
  1: "א",
  2: "ב",
  3: "ג",
  4: "ד",
  5: "ה",
  6: "ו",
  7: "ז",
  8: "ח",
  9: "ט",
  10: "י",
  11: "יא",
  12: "יב",
  13: "יג",
  14: "יד",
  15: "טו",
  16: "טז",
  17: "יז",
  18: "יח",
  19: "יט",
  20: "כ",
  21: "כא",
  22: "כב",
  23: "כג",
  24: "כד",
  25: "כה",
  26: "כו",
  27: "כז",
  28: "כח",
  29: "כט",
  30: "ל",
};




function compareHebrewDates(a, b) {
  const aIndex = Object.keys(hebrewLetters).findIndex((key) => hebrewLetters[key] === a.deathDate.date);
  const bIndex = Object.keys(hebrewLetters).findIndex((key) => hebrewLetters[key] === b.deathDate.date);

  return aIndex - bIndex;
}

export function updateListByMonth(niftarArray) {
  const result = {};

  niftarArray.forEach((niftar) => {
    const { month } = niftar.deathDate;

    if (!result[month]) {
      result[month] = [];
    }

    result[month].push(niftar);
  });

  // Sort each month's array using the custom comparator
  for (const month in result) {
    result[month].sort(compareHebrewDates);
  }

  return result;
}

// // Usage

// const nitarArray = [
//   {
//     deathDate: { date: 'יח', month: 'כסלו', year: '' },
//     firstName: 'אברהם',
//     isMale: true,
//     lastName: 'רודריגז',
//     parentsName: 'גרציה'
//   },
//   {
//     deathDate: { date: 'ג', month: 'כסלו', year: '' },
//     firstName: 'משה',
//     isMale: true,
//     lastName: 'בנימיני',
//     parentsName: 'שרה'
//   },
//   {
//     deathDate: { date: 'ה', month: 'כסלו', year: '' },
//     firstName: 'גיגי',
//     isMale: true,
//     lastName: 'גד',
//     parentsName: 'מימי'
//   }
// ]
// const sortedList = updateListByMonth(nitarArray);
//     console.log(sortedList);