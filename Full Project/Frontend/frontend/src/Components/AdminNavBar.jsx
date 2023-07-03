import { NavLink, useNavigate } from "react-router-dom";

export default function AdminNavBar() {
  const navigate = useNavigate();

  const clearLocalStorageAndNvg = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="mainHeader shadow-lg flex justify-evenly items-center p-5 absolute inset-x-0 top-0 z-50 px-12 bg-white border-black shadow-black-500/50 xl:px-60 gap-4">
        <NavLink
          to="/adminhome/home"
          className="Home px-4 py-2 rounded-lg text-lg border-red-500 font-semibold hover:text-red-400 border-2"
        >
          Home
        </NavLink>
        <NavLink
          to="/adminhome/createuserpage"
          className="CreateUser px-4 py-2 rounded-lg text-lg border-red-500 font-semibold hover:text-red-400 border-2"
        >
          Create User
        </NavLink>
        <NavLink
          to="/adminhome/donationcheck"
          className="Donation px-4 py-2 rounded-lg text-lg border-red-500 font-semibold hover:text-red-400 border-2"
        >
          Donation of User
        </NavLink>
        <button
          onClick={() => clearLocalStorageAndNvg()}
          className="Logout px-4 py-2 rounded-lg text-lg border-red-500 font-semibold hover:text-red-400 border-2"
        >
          Logout
        </button>
      </div>
    </>
  );
}
