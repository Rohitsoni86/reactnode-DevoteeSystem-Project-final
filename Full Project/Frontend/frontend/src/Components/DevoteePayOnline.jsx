import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DonationSuccessModal from "./DonationSuccessModal";

export default function DevoteePayOnline() {
  const [userlgid, setUserLoginId] = useState("");
  const userToken = localStorage.getItem("Token"); //get token from localstorage
  const [showconfirmationModal, setshowConfirmationModal] = useState(false);

  useEffect(() => {
    getDevoteeUserIDData();
  }, []);

  const getDevoteeUserIDData = () => {
    const userToken = localStorage.getItem("Token"); //get token from localstorage
    const config = {
      method: "get",
      url: `http://localhost:3000/getuserloginid`,
      headers: { token: userToken, "Content-Type": "application/json" },
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data.userID);
        const userIDLogined = response.data.userID;
        setUserLoginId(userIDLogined);
      })
      .catch(function (error) {
        console.log(error);
        // console.log(userToken);
        alert(error);
      });
  };

  // Setting Months Dataa
  const [months] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [year, setYearData] = useState([]);

  useEffect(() => {
    generateYears();
  }, []);

  /// GENERATE UPCOMING YEARS
  const generateYears = () => {
    let startingYear = 2023;
    let upyears = 20;
    let generatedYears = [];
    for (let i = 0; i <= upyears; i++) {
      generatedYears.push(startingYear + i);
    }
    setYearData(generatedYears);
  };

  const [donationAmount, setDonationAmount] = useState(0);
  const [getmonth, setMonth] = useState("");
  // const [montherror, setMonthError] = useState("");
  const [getyear, setYear] = useState("");
  // const [yearerror, setYearError] = useState("");
  const [getmonthnum, setMonthNum] = useState("");
  const [amountError, setAmountError] = useState("");

  useEffect(() => {
    if (
      getmonth == "" ||
      getmonthnum == undefined ||
      getmonth == "Select Month" ||
      getyear == "" ||
      getyear == "Select Year" ||
      donationAmount <= 100
    ) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [getmonth, getmonthnum, getyear, donationAmount]);

  const [disablebtn, setDisableBtn] = useState(true);

  const getYearFromUser = (event) => {
    setYear(event.target.value);
  };

  //get Month From USer
  const getMonthFromUser = (event) => {
    const monthData = event.target.value.split("-");
    setMonth(monthData[0]);
    setMonthNum(monthData[1]);
  };

  const getAmountValue = (event) => {
    const amountEntered = Number(event.target.value);
    if (amountEntered == "") {
      setAmountError("Please enter Correct Digit Amount !!");
      setDonationAmount(0);
      setDisableBtn(true);
    }
    if (amountEntered <= 100) {
      setAmountError("Please Enter Amount Greater Than 100");
      setDonationAmount(0);
      setDisableBtn(true);
    }
    if (isNaN(amountEntered)) {
      setAmountError(`Your Donation Amount is Not A Number`);
      setDisableBtn(true);
    } else {
      setAmountError(`Your Donation Amount is ${amountEntered}`);
      setDonationAmount(amountEntered);
      setDisableBtn(false);
    }
  };

  const collectUserDonation = (e) => {
    e.preventDefault();

    let userDonObj = {
      UserID: userlgid,
      YearofDonation: getyear,
      MonthofDonation: getmonthnum,
      NameMonthofDonation: getmonth,
      AmountPaid: donationAmount,
    };

    let dataS = JSON.stringify(userDonObj);

    let config = {
      method: "post",
      url: "http://localhost:3000/paydonation",
      headers: { token: userToken, "Content-Type": "application/json" },
      data: dataS,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setshowConfirmationModal(true);
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });

    alert(`Your Donation Matters Alot ! \n Thank You For Your Contribution !!`);
  };
  return (
    <>
      <div className="bg-blue-400 min-h-screen flex flex-col py-24">
        <div className="container  lg:max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center ">
          <div className="bg-white shadow-black rounded shadow-lg text-black w-full">
            <form
              onSubmit={collectUserDonation}
              className="Container p-32 flex flex-col gap-10
            "
            >
              <div className="title">
                <h2 className="mb-8 rounded-md font-semibold w-full text-2xl text-center">
                  Pay Your Donation Here !!
                </h2>
              </div>
              <div className="monthDropDown">
                <select
                  onChange={getMonthFromUser}
                  required
                  className="w-full p-2.5 text-gray-500 bg-white border-2 rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                >
                  <option defaultValue={"Select Month"} value="Select Month">
                    Select-Month
                  </option>
                  {months.map((month, index) => {
                    return (
                      <option name={month} id={index + 1} key={`${month}`}>
                        {month}-{index + 1}
                      </option>
                    );
                  })}
                </select>
                {/* {montherror} */}
              </div>
              <div className="yearDropDown">
                <select
                  required
                  onChange={getYearFromUser}
                  className="w-full p-2.5 text-gray-500 bg-white border-2 rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                >
                  <option defaultValue={"Select Year"} value="Select Year">
                    Select Year
                  </option>
                  {year.map((year, index) => {
                    return (
                      <option name={year} id={index} key={`${year}`}>
                        {year}
                      </option>
                    );
                  })}
                </select>
                {/* {yearerror} */}
              </div>
              <div className="amountPaidBox">
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    onChange={getAmountValue}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Enter Amont To Pay
                  </label>
                  {amountError}
                </div>
              </div>
              <div className="btnContainer flex justify-center gap-10 my-4">
                {/* <button
                  type="submit"
                  className="w-72 text-center text-lg py-3 rounded bg-green-600 text-black hover:bg-green-700 focus:outline-none my-1"
                >
                  Pay
                </button> */}

                <button
                  type="submit"
                  className={
                    disablebtn
                      ? `w-72 text-center text-lg py-3 rounded opacity-50 bg-slate-600 text-black cursor-not-allowed pointer-events-none focus:outline-none my-1`
                      : `w-72 text-center text-lg py-3 rounded bg-green-600 text-black hover:bg-green-700 focus:outline-none my-1`
                  }
                >
                  Pay
                </button>
                <Link
                  to="/devoteehome"
                  className="w-72 text-center text-lg py-3 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none my-1"
                >
                  Back To Home
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showconfirmationModal ? <DonationSuccessModal /> : ""}
    </>
  );
}
