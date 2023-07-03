import { useEffect, useState } from "react";
import axios from "axios";

export default function DevoteeProfile() {
  const userToken = localStorage.getItem("Token"); //get token from localstorage
  const [userdata, setData] = useState();

  useEffect(() => {
    const config = {
      method: "get",
      url: `http://localhost:3000/getuserloginid`,
      headers: { token: userToken, "Content-Type": "application/json" },
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data.userID);
        const userIDLogined = response.data.userID;

        // now Fetch Devotee Donation Details
        const config = {
          method: "get",
          url: `http://localhost:3000/getdevoteedetails/${userIDLogined}`,
          headers: { token: userToken, "Content-Type": "application/json" },
        };

        axios(config)
          .then(function (response) {
            // console.log(response.data);
            setData(response.data);
          })
          .catch(function (error) {
            console.log(error);
            console.log(userToken);
            alert(error);
          });
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  }, [userToken]);

  return (
    <>
      {userdata && (
        <div className=" bg-slate-700 min-h-screen flex flex-col px-24">
          <div className="bg-white rounded-lg shadow-md shadow-black pb-8">
            <div className="absolute right-12 mt-4 rounded">
              <button
                className="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20"
                title="Settings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  ></path>
                </svg>
              </button>
              <div className="bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl hidden">
                <div className="py-2 border-b">
                  <p className="text-gray-400 text-xs px-6 uppercase mb-1">
                    Settings
                  </p>
                  <button className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      ></path>
                    </svg>
                    <span className="text-sm text-gray-700">Share Profile</span>
                  </button>
                  <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      ></path>
                    </svg>
                    <span className="text-sm text-gray-700">Block User</span>
                  </button>
                  <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span className="text-sm text-gray-700">More Info</span>
                  </button>
                </div>
                <div className="py-2">
                  <p className="text-gray-400 text-xs px-6 uppercase mb-1">
                    Feedback
                  </p>
                  <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      ></path>
                    </svg>
                    <span className="text-sm text-gray-700">Report</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full h-[250px]">
              <img
                src="https://images.unsplash.com/photo-1636955860106-9eb89e576026?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                className="w-full h-full rounded-tl-lg rounded-tr-lg"
              />
            </div>
            <div className="flex flex-col items-center -mt-20">
              <img
                src={userdata.ProfilePhoto}
                className="w-40 border-4 border-white rounded-full"
              />
              <div className="flex items-center space-x-2 mt-2">
                <p className="text-2xl">
                  {`${userdata.FirstName} ${userdata.MiddleName} ${userdata.LastName}
              `.toUpperCase()}
                </p>
                <span className="bg-blue-500 rounded-full p-1" title="Verified">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-100 h-2.5 w-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
              </div>
              <p className="text-gray-700">{userdata.Role}</p>
            </div>
            <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
              <div className="flex items-center space-x-4 mt-2">
                <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                  </svg>
                  <span>Contact Admin</span>
                </button>
                {/* <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Message</span>
                </button> */}
              </div>
            </div>
          </div>

          <div className="my-4 flex flex-col 2xl:flex-row  shadow-md shadow-black space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="w-full flex flex-col ">
              <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                <h4 className="text-xl text-gray-900 font-bold">
                  Personal Info
                </h4>
                <ul className="mt-2 text-gray-700">
                  <li className="flex border-y py-2">
                    <span className="font-bold w-24">Full name:</span>
                    <span className="text-gray-700">
                      {`${userdata.FirstName} ${userdata.MiddleName} ${userdata.LastName}
              `.toUpperCase()}
                    </span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Initiation Date:</span>
                    <span className="text-gray-700">
                      {userdata.InitiationDate}
                    </span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Joined:</span>
                    <span className="text-gray-700">
                      {userdata.InitiationDate}
                    </span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Email:</span>
                    <span className="text-gray-700">{userdata.Email}</span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Location:</span>
                    <span className="text-gray-700">
                      {userdata.Address.City.cityName},
                      {userdata.Address.State.stateName}
                    </span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Nationality:</span>
                    <span className="text-gray-700">
                      {userdata.Nationality}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
