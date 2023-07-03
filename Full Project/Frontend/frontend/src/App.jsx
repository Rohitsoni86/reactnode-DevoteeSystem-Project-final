import { Routes, Route } from "react-router-dom";
import OtpVerification from "./Pages/OtpVerification";
import LoginPage from "./Pages/LoginPage";
import AdminCreateUserPage from "./Components/AdminCreateUserPage";
import DevoteeHomePage from "./Pages/DevoteeHomePage";
import AdminHomePage from "./Pages/AdminHomePage";
import AdminDonationCheckPage from "./Components/AdminDonationCheckPage";
import DevoteeHome from "./Components/DevoteeHome";
import DevoteePayOnline from "./Components/DevoteePayOnline";
import DevoteeProfile from "./Components/DevoteeProfile";
import AdminHomeComp from "./Components/AdminHomeComp";
import EditDevoteeForm from "./Pages/EditDevoteeUserDetailsPage";
import DevoteeLoginPage from "./Pages/DevoteeLoginPage";
import "./App.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LoginPage />}></Route>
        <Route path="/otpverification" element={<OtpVerification />} />
        {/* Admin Routes */}
        <Route path="/adminhome" element={<AdminHomePage />}>
          <Route path="/adminhome/home" element={<AdminHomeComp />} />
          <Route
            path="/adminhome/createuserpage"
            element={<AdminCreateUserPage />}
          />
          <Route
            path="/adminhome/donationcheck"
            element={<AdminDonationCheckPage />}
          />
        </Route>
        <Route
          path="/adminupdatedevoteeuser/:id"
          element={<EditDevoteeForm />}
        />
        {/* Admin Routes */}
        {/* Devotee Route */}
        <Route
          exact
          path="/universaldevoteelogin"
          element={<DevoteeLoginPage />}
        />
        <Route exact path="/devoteehome" element={<DevoteeHomePage />}>
          <Route index path="/devoteehome/home" element={<DevoteeHome />} />
          <Route path="/devoteehome/payonline" element={<DevoteePayOnline />} />
          <Route path="/devoteehome/profile" element={<DevoteeProfile />} />
        </Route>
        {/* Devotee Route */}
      </Routes>
    </>
  );
}
