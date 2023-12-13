import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import "./home.css";
import Calendar from "../../components/calendar/Calendar";


export default function Home() {

  return <div className="home-container">
    <Calendar />
  </div>
}
