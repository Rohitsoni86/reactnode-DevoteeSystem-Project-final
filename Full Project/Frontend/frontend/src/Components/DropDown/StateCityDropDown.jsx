import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StateCityDropDown() {
  const [statedata, setStateData] = useState([]);
  const [citydata, setCityData] = useState([]);

  const [selectedstate, setSelectedState] = useState("Choose an Option");

  // Fetching State Data
  useEffect(() => {
    const config = {
      method: "get",
      url: "http://localhost:3000/fetchstatelist",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setStateData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const stateSelection = (event) => {
    setSelectedState(event.target.value);
  };

  const getCities = (selectedstate) => {
    const config = {
      method: "get",
      url: `http://localhost:3000/fetchcitieslist/${selectedstate}`,
      headers: {},
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

  // Fetching City Data

  useEffect(() => {
    getCities(selectedstate);
  }, [selectedstate]);

  return (
    <>
      <div className="stateContainer">
        <label
          htmlFor="state"
          className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
        >
          State
        </label>

        <div className="relative w-full lg:max-w-sm">
          <select
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
          <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
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
    </>
  );
}
