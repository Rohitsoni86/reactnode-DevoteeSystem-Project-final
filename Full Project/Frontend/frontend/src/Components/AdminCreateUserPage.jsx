import { useState, useEffect } from "react";
import axios from "axios";
import ConfirmationModal from "./SuccessModal";

export default function AdminCreateUserPage() {
  const userToken = localStorage.getItem("Token");
  const [formdata, setFormData] = useState({});

  const [addressData, setAddressData] = useState({});

  const [showconfirmationModal, setshowConfirmationModal] = useState(false); // Success Modal
  // const [showerrormodal, setshowErrorModal] = useState(false);  // Show Errors On Submiting Form

  const getInput = (event) => {
    setFormData({
      ...formdata,
      [event.target.name]: event.target.value,
    });
  };

  const getflatnumber = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  };
  const getArea = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  };

  const getCity = (e) => {
    let cityObject = { [e.target.name]: e.target.value };
    setAddressData({
      ...addressData,
      ...cityObject,
    });
  };
  const getPincode = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  };

  // State City Mang

  const [statedata, setStateData] = useState([]);
  const [citydata, setCityData] = useState([]);

  // Fetching State Data
  useEffect(() => {
    const config = {
      method: "get",
      url: "http://localhost:3000/fetchstatelist",
      headers: { token: userToken, "Content-Type": "application/json" },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setStateData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setDateMinVal();
  }, []);

  //Date Picker Functions

  const [initDateMin, setInitiationDateMin] = useState("");

  // Date Picker Validation
  const setDateMinVal = () => {
    let objectDate = new Date();
    let day = objectDate.getDate();
    if (day < 10) {
      day = "0" + day;
    }

    let month = objectDate.getMonth() + 1; // getting correct Month
    let monthAgo = month - 2; // reducing 2 months
    if (monthAgo < 10) {
      monthAgo = "0" + monthAgo;
    }
    let year = objectDate.getFullYear();

    let formatDateFormate = year + "-" + monthAgo + "-" + day;

    setInitiationDateMin(formatDateFormate);
  };

  const stateSelection = (event) => {
    setAddressData({
      ...addressData,
      [event.target.name]: event.target.value,
    });
    getCities(event.target.value);
  };

  const getCities = (selectedstate) => {
    const config = {
      method: "get",
      url: `http://localhost:3000/fetchcitieslist/${selectedstate}`,
      headers: { token: userToken, "Content-Type": "application/json" },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setCityData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // SUBMIT DATA

  const createUserAccount = (e) => {
    e.preventDefault();

    console.log("Form Submitted !!");

    // Gethered All Data
    const formDataSub = {
      ...formdata,
      Address: {
        ...addressData,
      },
    };

    // StringiFy User Data

    const userData = JSON.stringify(formDataSub);

    // Send User Data

    const config = {
      method: "post",
      url: "http://localhost:3000/createdevoteeuser",
      headers: { token: userToken, "Content-Type": "application/json" },
      data: userData,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setshowConfirmationModal(true);
      })
      .catch(function (error) {
        console.log(error);
        alert(error.response.data);
        // setshowErrorModal(true);
      });
  };

  return (
    <>
      <div className="bg-orange-400 min-h-screen flex flex-col pt-12">
        <div className="container  lg:max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white shadow-black px-6 py-4 rounded shadow-lg text-black w-full">
            <div className="headingContainer">
              <h1 className="mb-8 bg-blue-400 p-2 rounded-md font-semibold w-full text-2xl text-center">
                Create Devotee Account
              </h1>
            </div>
            <div className="formContainer">
              <form method="post" onSubmit={createUserAccount}>
                <div className="upperFormContainer grid grid-cols-2 gap-2">
                  <div className="leftSide">
                    <label
                      htmlFor="Username"
                      className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="block border-2 border-grey-light w-full p-3 rounded mb-4"
                      name="FirstName"
                      required
                      onChange={getInput}
                      placeholder="First Name"
                    />
                    <label
                      htmlFor="Username"
                      className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="block border-2 border-grey-light w-full p-3 rounded mb-4"
                      name="LastName"
                      onChange={getInput}
                      required
                      placeholder="Last Name"
                    />
                    <label
                      htmlFor="Email"
                      className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="block border-2 border-grey-light w-full p-3 rounded mb-4"
                      name="Email"
                      onChange={getInput}
                      required
                      placeholder="Email"
                    />
                    <label
                      htmlFor="InitiationDate"
                      className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      Initiation Date
                    </label>
                    <input
                      type="date"
                      className="block border-2 border-grey-light w-full p-3 rounded mb-4"
                      name="InitiationDate"
                      min={initDateMin}
                      onChange={getInput}
                      required
                      placeholder="Initiation Date"
                    />
                  </div>
                  <div className="rightSide">
                    <label
                      htmlFor="MiddleName"
                      className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      Middle Name
                    </label>
                    <input
                      type="text"
                      className="block border-2 border-grey-light w-full p-3 rounded mb-4"
                      name="MiddleName"
                      onChange={getInput}
                      placeholder="Middle Name"
                    />
                    <label
                      htmlFor="Phone"
                      className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      className="block border-2 border-grey-light w-full p-3 rounded mb-4"
                      name="Phone"
                      onChange={getInput}
                      required
                      placeholder="Phone"
                    />
                    <label
                      htmlFor="Nationality"
                      className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      Nationality
                    </label>
                    <input
                      type="text"
                      className="block border-2 border-grey-light w-full p-3 rounded mb-4"
                      name="Nationality"
                      required
                      onChange={getInput}
                      placeholder="Nationality"
                    />
                  </div>
                </div>

                {/* Address  */}
                <div className="addressFs">
                  <h2 className="text-md font-semibold py-4">Address :</h2>
                  <div className="fieldContainer grid grid-cols-3 gap-2">
                    <div className="FlatNumber">
                      <label
                        htmlFor="FlatNumber"
                        className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                      >
                        Flat Number
                      </label>
                      <input
                        type="text"
                        className="block border-2 border-grey-light w-full p-3 rounded mb-4"
                        name="FlatNumber"
                        onChange={getflatnumber}
                        placeholder="Flat Number"
                      />
                    </div>
                    <div className="pincodeContainer">
                      <label
                        htmlFor="pincode"
                        className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                      >
                        Area Pincode
                      </label>
                      <input
                        type="number"
                        className="block border-2 border-grey-light w-full p-3 rounded mb-4"
                        name="Pincode"
                        required
                        onChange={getPincode}
                        placeholder="Pincode"
                      />
                    </div>
                    <div className="AreaContainer">
                      <label
                        htmlFor="Area"
                        className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                      >
                        Area
                      </label>
                      <input
                        type="text"
                        className="block border-2 border-grey-light w-full p-3 rounded mb-4"
                        name="Area"
                        required
                        onChange={getArea}
                        placeholder="Area"
                      />
                    </div>

                    {/* STATE CITY  */}
                    <div className="stateContainer">
                      <label
                        htmlFor="state"
                        className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                      >
                        State
                      </label>

                      <div className="relative w-full lg:max-w-sm">
                        <select
                          name="State"
                          onChange={stateSelection}
                          className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                        >
                          {statedata.map((state) => {
                            return (
                              <option
                                value={state._id}
                                name={state._id}
                                id={state._id}
                                key={state._id}
                              >
                                {state.stateName}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="cityContainer">
                      <label
                        htmlFor="city"
                        className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                      >
                        City
                      </label>
                      <div className="relative w-full lg:max-w-sm">
                        <select
                          name="City"
                          onClick={getCity}
                          className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                        >
                          {citydata.map((city) => {
                            return (
                              <option
                                value={city._id}
                                name={city._id}
                                id={city._id}
                                key={city._id}
                              >
                                {city.cityName}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* STATE CITY  */}
                {/* Address  */}
                <div className="btnContainer">
                  <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                className="underline text-grey-dark mx-1 hover:text-red-800"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and
              <a
                className="underline text-grey-dark mx-1 hover:text-red-800"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {showconfirmationModal ? <ConfirmationModal /> : ""}
      {/* {showErrorModal ? <ErrorModal /> : ""} */}
    </>
  );
}
