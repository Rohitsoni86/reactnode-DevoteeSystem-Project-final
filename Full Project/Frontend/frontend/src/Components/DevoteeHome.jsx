import { useEffect, useState } from "react";
import axios from "axios";
export default function DevoteeHome() {
  const userToken = localStorage.getItem("Token"); //get token from localstorage
  const [userid, setUserId] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    getDevoteeUserIDData();
  }, []);

  const getDevoteeUserIDData = () => {
    const config = {
      method: "get",
      url: `http://localhost:3000/getuserloginid`,
      headers: { token: userToken, "Content-Type": "application/json" },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.userID);
        const userIDLogined = response.data.userID;
        setUserId(userIDLogined);

        const getDevoteeData = () => {
          const config = {
            method: "get",
            url: `http://localhost:3000/getdevoteedonationdetails/${userIDLogined}`,
            headers: { token: userToken, "Content-Type": "application/json" },
          };

          axios(config)
            .then(function (response) {
              // console.log(response.data);
              setData(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        };

        getDevoteeData();
      })
      .catch(function (error) {
        console.log(error);
        console.log(userid);
        console.log(userToken);
      });
  };

  // now Fetch Devotee Donation Details

  return (
    <>
      <div className="bg-blue-400 min-h-screen flex flex-col py-24">
        <div className="container  lg:max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center ">
          <div className="bg-white shadow-black rounded shadow-lg text-black w-full">
            <div className="headingContainer">
              <h1 className="mb-8 py-4 rounded-md font-semibold w-full text-2xl text-center">
                Your Donation Information
              </h1>
            </div>
            <div className="tableContainer">
              <div className="antialiased bg-gray-100 text-gray-600 ">
                <div className="flex flex-col justify-center h-full ">
                  {/* <!-- Table --> */}
                  <div className="w-full max-w-4xl bg-white shadow-lg rounded-sm border">
                    <header className="px-5 py-4 border-b border-gray-100">
                      <h2 className="text-lg font-semibold text-black">
                        Year & Month Wise Data
                      </h2>
                    </header>
                    <div className="p-3">
                      <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                              <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-center">
                                  <h2 className="text-xl text-black">Year </h2>
                                </div>
                              </th>
                              <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-center">
                                  <h2 className="text-xl text-black"> Month</h2>
                                </div>
                              </th>
                              <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-center">
                                  <h2 className="text-xl text-black">
                                    {" "}
                                    Amount Paid
                                  </h2>
                                </div>
                              </th>
                              <th className="p-2 whitespace-nowrap"></th>
                            </tr>
                          </thead>
                          <tbody className="text-sm divide-y divide-gray-100">
                            {data.map((element) => {
                              return (
                                <tr
                                  key={element._id.year + element.totalDonation}
                                >
                                  <td className="p-2 ">
                                    <div className="font-medium text-center text-gray-800">
                                      <h2 className="text-lg text-black">
                                        {element._id.year}
                                      </h2>
                                    </div>
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    <div className="text-center">
                                      <h2 className="text-lg text-black">
                                        {element._id.NameMonthofDonation}--
                                        {element._id.MonthofDonation}
                                      </h2>
                                    </div>
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    <div className="text-center font-medium">
                                      <h2
                                        className="inline-block w-44 py-2 px-3 text-lg text-black rounded"
                                        style={
                                          element.totalDonation > 10000
                                            ? { backgroundColor: "#86efac" }
                                            : { backgroundColor: "#a5b4fc" }
                                        }
                                      >
                                        {element.totalDonation}
                                      </h2>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
