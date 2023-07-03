import { Outlet } from "react-router-dom";
import AdminNavBar from "../Components/AdminNavBar";

export default function AdminHomePage() {
  return (
    <>
      <div className="headerContainer">
        <AdminNavBar />
        <div className="OutletContainer">
          <Outlet />
        </div>
      </div>
    </>
  );
}
