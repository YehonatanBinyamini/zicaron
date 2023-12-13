import React, { useEffect} from "react";
import "./calendar.css";
import Day from "../day/Day";
import { useSelector, useDispatch } from "react-redux";
import { monthsActions } from "../../store/months";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { fetchData } from '../../store/jewishCalendar'

const daysOfWeek = [
  "יום א",
  "יום ב",
  "יום ג",
  "יום ד",
  "יום ה",
  "יום ו",
  "שבת",
];

const months = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];

export default function Calendar() {
  const monthState = useSelector((state) => state.months);
  const jewishCalendar = useSelector((state) => state.jewishCalendar.data);
  const daysArray = monthState.currentMonthArray;
  const displayingTimestamp = monthState.displayingTimestamp;
  const heMonthsTitle = monthState.heMonthsTitle;
  const displayingDate = new Date(displayingTimestamp);
  const todayDate = new Date();
  const today = {year: todayDate.getFullYear(), month: todayDate.getMonth()+1 , date: todayDate.getDate()}
  const dispatch = useDispatch();
    

  useEffect(()=>{
    dispatch(fetchData(today.year))
  },[dispatch])
  
  function nextMonthHandle() {
    if (displayingDate.getMonth() > 8){
      dispatch(fetchData(displayingDate.getFullYear()+1))
    }
    dispatch(monthsActions.setNextMonth());
  }

  function previousMonthHandle() {
    if (displayingDate.getMonth() < 3){
      dispatch(fetchData(displayingDate.getFullYear()-1))
    }
    dispatch(monthsActions.setPreviousMonth());
  }

  const filterEventsByDate = (enDate) => {
    const { year, month, date } = enDate;
    if (jewishCalendar[year]){
      const targetDateString = `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      const filteredEvents = 
      jewishCalendar[year].filter(event => event.date.startsWith(targetDateString));

      return filteredEvents;
    }
    return []
  };
  

  return (
    <div className="calendar-container">
      <div className="buttons-and-enTitle">
        <div className="empty-div"></div>
        <label className="en-date-title">
        {months[displayingDate.getMonth()] + " " + displayingDate.getFullYear()}
        </label>
        <div className="buttons"> 
          <button className="btn" onClick={nextMonthHandle}>
            <ArrowBackIosNewIcon />
          </button>
          <button className="btn" onClick={previousMonthHandle}>
            <ArrowForwardIosIcon />
          </button>
        </div>
      
      </div>
        <label className="he-date-title">
          {heMonthsTitle}
        </label>
      <div className="week-days">
        {daysOfWeek.map((day, index) => (
          <label key={index} className="label-text">
            {day}
          </label>
        ))}
      </div>
      <div className="calendar-board">
        {jewishCalendar && daysArray.map((item) => (
          <Day
            key={item.id}
            heDate={item.heDate}
            enDate={item.enDate}
            isDay={item.isDay}
            today={today}
            events={item.isDay ? filterEventsByDate(item.enDate) : ""}
          />
        ))}
      </div>
    </div>
  );
}
