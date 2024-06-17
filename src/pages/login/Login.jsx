import React, { useState } from 'react';
import "./login.css";
import Loading from "../../components/loading/Loading";
import { signInWithFirebaseAuth } from '../../db/firebase';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayH2, setDisplayH2] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setErrorMessage("");
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setErrorMessage("");
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithFirebaseAuth(email, password, (error, user) => {
      if (error) {
        setIsLoading(false);
        setErrorMessage("שם משתמש או סיסמה אינם נכונים");
        console.error(error);
      } else {
        setUserName(user.firstName + " " + user.lastName);
        dispatch(authActions.setAuth({ ...user, authIsConnected: true }));
        setDisplayH2(true);
        setIsLoading(false);
        setTimeout(() => {
          setDisplayH2(false);
          navigate("../");
        }, 2500);
      }
    });
  };

  return (
    <div className="login-container">
      {!displayH2 ? (
        <div className="login-form">
          <div>
            <label htmlFor="email">שם משתמש</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">סיסמה</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {errorMessage && <label className="errMsg">{errorMessage}</label>}
          {isLoading ? (
            <div className="loading-container"><Loading /></div>
          ) : (
            <button type="submit" onClick={handleSubmit}>התחבר</button>
          )}
        </div>
      ) : (
        <div className="welcome-message">
          <h2>!ברוך הבא {userName}</h2>
        </div>
      )}
    </div>
  );
}
