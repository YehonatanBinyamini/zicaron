import React, { useState, useEffect } from "react";
import "./header.css";
import logo from "../../assets/images/rashi-logo.png";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("אורח");

  useEffect(()=>{
    if (auth.authIsConnected){
      setUserName(auth.firstName+" "+auth.lastName);
    } else {
      setUserName("אורח");
    }
  },[auth])

  function loginHandler() {
    //console.log(userName);
  }

  function logoutHandler(){
    dispatch(authActions.setAuth({firstName:"", lastName: "", uid: "", authIsConnected: false }));
    // navigate("./Login");
  }

  return (
    <header className="header">
      <div className="connect-header">
    <label className="userName-header-shalom">שלום {userName}</label>
    <label className="userName-header">|</label>
    { !auth.authIsConnected ? 
    <NavLink className="userName-header" to="./Login" onClick={loginHandler}>
      התחבר
    </NavLink> :
    <NavLink className="userName-header" to="./Login" onClick={logoutHandler}>התנתק</NavLink>
    }
  </div>
  <nav className="nav">
    <NavLink to="./ContactUs">צור קשר</NavLink>
    <NavLink to="./List">רשימה</NavLink>
    <NavLink to="./">לוח שנה</NavLink>
  </nav>
    <div className="logo-container">
      <Link to="./">
        <img className="logo" src={logo} alt="logo" />
      </Link>
    </div>
  
</header>

  );
}

export default Header;
