import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import './rootLayout.css';

export default function RootLayout() {
  const location = useLocation();
  const [notLoginPage, setNotLoginPage] = useState(true);

  useEffect(() => {
    setNotLoginPage(location.pathname !== "/Login");
  }, [location]);

  return (
    <>
      {notLoginPage && <Header />}
      <Outlet />
    </>
  );
}
