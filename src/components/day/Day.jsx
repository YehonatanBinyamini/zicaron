import React, { useEffect, useState } from "react";
import "./day.css";
import candle from "../../assets/images/candle.png";
import { useSelector } from "react-redux";
import Niftar from "../../models/Niftar";
import { setEvents } from "../../assets/helpers";

export default function Day({ heDate, enDate, isDay, today, events }) {
  const [isToday, setIsToday] = useState(false);
  const [displayingEvents, setDisplayingEvents] = useState(null);
  const niftarim = useSelector(state => state.niftarim.list);
  let azcaraToday = null;
  let todayObjs = null;
  if (isDay && niftarim[heDate.month]){
    azcaraToday = niftarim[heDate.month].filter(item => item.deathDate.date === heDate.date)
    if (heDate.month === "אדר"){
      const adar1 = niftarim["אדר א"] ? niftarim["אדר א"].filter(item => item.deathDate.date === heDate.date) : []
      const adar2 = niftarim["אדר ב"] ? niftarim["אדר ב"].filter(item => item.deathDate.date === heDate.date) : []
      azcaraToday = [...azcaraToday, ...adar1, ...adar2];
    }
    if (heDate.month === "אדר ב"){
      const adar2 = niftarim["אדר"] ? niftarim["אדר"].filter(item => item.deathDate.date === heDate.date) : []
      azcaraToday = [...azcaraToday, ...adar2];
    }
    todayObjs = azcaraToday.map(item => new Niftar(item.firstName, item.lastName, item.parentsName, item.isMale, item.deathDate ))
  }
  
  useEffect(()=>{
    if (isDay && today.year === enDate.year && today.month === enDate.month && today.date === enDate.date){
      setIsToday(true)
    }
  },[isDay, today, isToday])

  useEffect(()=>{
    setDisplayingEvents(setEvents(events))
    // console.log(events)
  },[events])

  function handlePressDay(){
    console.log(enDate)
    console.log(heDate)
  }


  return isDay ? (
    <div className={`cube ${isToday ? "today" : ""}`} onClick={handlePressDay}>
      <div className="text-cube">
        <label>{enDate.date}</label>
        <label>{heDate.date}</label>
      </div>
      <div className="day-content">
      <div className="candle-container">
      {azcaraToday && azcaraToday.length > 0 && (
        <>
          <img className="candleImg" src={candle} alt={"candle"} />
          <div className="tooltip">
            {todayObjs && todayObjs.map((item, index) => (
              <React.Fragment key={index}>
                <label>{item.tooltipString()}</label>
              </React.Fragment>
            ))}
          </div>
        </>
        )}
        </div>
      {/* {events && events.map((event) => (
        <label key={new Date(event.date).getTime()} className="event-text">
        {event.hebrew}
        </label>
      ))} */}
      <div className="events-container">
      {displayingEvents && displayingEvents.slice().reverse().map((event, index) => (
        <div key={index} 
          className={displayingEvents.length > 2 || displayingEvents.length > 1 
                      && azcaraToday 
                      && azcaraToday.length > 0 ? "event-small-text" :"event-text"}>
          <label>{event.description}</label>
          <label>{event.time}</label>
        </div>
      ))}
      </div>
      <div className="third-div"></div>
         
      </div>
    </div>
  ) : (
    <div className="empty-cube"></div>
  );
}
