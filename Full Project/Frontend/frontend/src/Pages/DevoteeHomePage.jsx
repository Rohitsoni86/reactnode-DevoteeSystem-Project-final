import React from "react";
import { Outlet } from "react-router-dom";
import DevoteeNavBar from "../Components/DevoteeNavBar";

export default function DevoteeHomePage() {
  return (
    <>
      <div className="headerContainer">
        <DevoteeNavBar />
        <div className="OutletContainer">
          <Outlet />
        </div>
      </div>
    </>
  );
}
