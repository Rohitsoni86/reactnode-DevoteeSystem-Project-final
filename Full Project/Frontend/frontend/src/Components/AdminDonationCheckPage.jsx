import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDonationCheckPage() {
  const userToken = localStorage.getItem("Token");
  const [userdata, setData] = useState();
  const [notpaidusers, setNotPaidUsers] = useState();

  useEffect(() => {
    const config = {
      method: "get",
      url: `http://localhost:3000/getdonationrecordadmin`,
      headers: { token: userToken, "Content-Type": "application/json" },
    };

    axios(config)
      .then(function (response) {
        const dataFetched = response.data;
        setData(dataFetched);
        console.log(dataFetched);
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  }, []);

  useEffect(() => {
    const config = {
      method: "get",
      url: `http://localhost:3000/getdevoteedonationfilter`,
      headers: { token: userToken, "Content-Type": "application/json" },
    };

    axios(config)
      .then(function (response) {
        const dataFetched = response.data;
        setNotPaidUsers(dataFetched);
        console.log(dataFetched);
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  }, []);

  return (
    <>
      <div className="bg-orange-400 min-h-screen flex flex-col py-24">
        <div className="container  lg:max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center ">
          <div className="bg-white shadow-black rounded shadow-lg text-black w-full">
            <div className="headingContainer">
              <h1 className=" py-12 rounded-md font-semibold w-full text-2xl text-center">
                Donation Information of Users
              </h1>
            </div>
            <div className="tableContainer">
              <div className="antialiased bg-gray-100 text-gray-600 ">
                <div className="flex flex-col justify-center h-full ">
                  {/* <!-- Table --> */}
                  <div className="w-full max-w-4xl bg-white shadow-lg rounded-sm border">
                    <header className="px-5 bg-slate-300 p-4 py-4 border-b border-gray-100">
                      <h2 className="text-xl  font-semibold text-black">
                        Devotee Paid Donation
                      </h2>
                    </header>
                    <div className="p-3">
                      <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                              <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-center">
                                  <h2 className="text-xl text-black">
                                    UserID{" "}
                                  </h2>
                                </div>
                              </th>
                              <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-center">
                                  <h2 className="text-xl text-black">
                                    Month Of Donation
                                  </h2>
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
                              <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-center">
                                  <h2 className="text-xl text-black">Year</h2>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-sm divide-y divide-gray-100">
                            {userdata && (
                              <>
                                {userdata.map((element, index) => {
                                  return (
                                    <>
                                      <tr
                                        key={
                                          element._id.MonthofDonation + index
                                        }
                                      >
                                        <td className="p-2 whitespace-nowrap">
                                          <div className="flex items-center">
                                            <div className="font-medium text-gray-800">
                                              <h2 className="text-md text-black">
                                                {element._id.UserID.slice(
                                                  0,
                                                  10
                                                )}
                                              </h2>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                          <div className="text-center">
                                            <h2 className="text-md text-black">
                                              {element._id.NameMonthofDonation}
                                              --{element._id.MonthofDonation}
                                            </h2>
                                          </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                          <div className="text-center font-medium text-green-500">
                                            <h2 className="text-md text-green-500">
                                              {" "}
                                              ₹{element.totalDonation}
                                            </h2>
                                          </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                          <div className="text-lg text-center">
                                            {element._id.year}
                                          </div>
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })}
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* Table  */}

                  {/* <!-- Table --> */}
                  <div className="w-full max-w-4xl bg-white shadow-lg rounded-sm border">
                    <header className="px-5 bg-slate-300 p-4 py-4 border-b border-gray-100">
                      <h2 className="text-xl font-semibold text-black">
                        Devotee Not Paid Donation For This Month
                      </h2>
                    </header>
                    <div className="p-3">
                      <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                              <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-center">
                                  <h2 className="text-xl text-black">
                                    UserID{" "}
                                  </h2>
                                </div>
                              </th>
                              <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-center">
                                  <h2 className="text-xl text-black">Name</h2>
                                </div>
                              </th>
                              <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-center">
                                  <h2 className="text-xl text-black">Email</h2>
                                </div>
                              </th>
                              <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-center">
                                  <h2 className="text-xl text-black">
                                    Nationality
                                  </h2>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-sm divide-y divide-gray-100">
                            {notpaidusers && (
                              <>
                                {notpaidusers.map((element) => {
                                  return (
                                    <>
                                      <tr key={element.Password.slice(0, 4)}>
                                        <td className="p-2 whitespace-nowrap">
                                          <div className="flex items-center">
                                            <div className="font-medium text-gray-800">
                                              <h2 className="text-md text-black">
                                                {element._id.slice(0, 10)}
                                              </h2>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                          <div className="text-center">
                                            <h2 className="text-md text-black">
                                              {element.FirstName}{" "}
                                              {element.LastName}
                                            </h2>
                                          </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                          <div className="text-center font-medium text-green-500">
                                            <h2 className="text-md text-red-500">
                                              {" "}
                                              {element.Email}
                                            </h2>
                                          </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                          <div className="text-lg text-center">
                                            {element.Nationality}
                                          </div>
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })}
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* Table  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
