import { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

export default function TableRow() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDevoteeData();
  }, []);

  const getDevoteeData = () => {
    const userToken = localStorage.getItem("Token");
    const config = {
      method: "get",
      url: "http://localhost:3000/getalluserdevoteedata",
      headers: { token: userToken, "Content-Type": "application/json" },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
        console.log(userToken);
      });
  };

  const deleteDevotee = (userIDF) => {
    const userToken = localStorage.getItem("Token");
    const selectedUserID = userIDF;
    const config = {
      method: "delete",
      url: `http://localhost:3000/deleteuserdevoteedata/${selectedUserID}`,
      headers: { token: userToken, "Content-Type": "application/json" },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        alert(response.data);
        getDevoteeData();
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  };

  const editDevotee = (userIDF) => {
    const selectedUserID = userIDF;
    alert(selectedUserID);
    navigate(`/adminupdatedevoteeuser/${selectedUserID}`);
  };

  return (
    <>
      {data.map((devoteeUser) => {
        //Converting Name To upper Case
        function returnName(aF, bM, cL) {
          let name = `${aF} ${bM} ${cL}`;
          return name.toUpperCase();
        }
        const FullName = returnName(
          devoteeUser.FirstName,
          devoteeUser.MiddleName,
          devoteeUser.LastName
        );

        return (
          <>
            <tr key={devoteeUser._id} className="text-center">
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p className="text-md font-bold">{devoteeUser.UserLoginId}</p>
              </td>
              <td className="border-b text-center border-gray-200 bg-white px-5 py-5 text-sm">
                <div className="flex flex-col gap-2 text-center items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      className="h-full w-full rounded-full"
                      src={devoteeUser.ProfilePhoto}
                      alt="profilePhoto"
                    />
                  </div>
                  <div className=" text-center">
                    <p className="text-md text-center font-bold text-black">
                      {FullName}
                    </p>
                  </div>
                </div>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p className="whitespace-no-wrap text-md text-black">
                  {devoteeUser.Email}
                </p>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p className="whitespace-no-wrap text-md text-black">
                  {devoteeUser.InitiationDate.slice(0, 10)}
                </p>
              </td>

              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <span className="px-3 py-1 text-xs font-semibold text-green-900">
                  <h2>{devoteeUser.Address.FlatNumber},</h2>
                  {devoteeUser.Address.Area},
                  {devoteeUser.Address.State.stateName},
                  {devoteeUser.Address.City.cityName}
                </span>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <div className="btnContainer  flex flex-wrap w-full h-full justify-center gap-2">
                  <button
                    id={devoteeUser._id}
                    value={devoteeUser._id}
                    onClick={() => editDevotee(devoteeUser._id)}
                    className="px-5 mx-2 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                  >
                    <FiEdit2 className="text-xl" />
                  </button>
                  <button
                    id={devoteeUser._id}
                    value={devoteeUser._id}
                    onClick={() => deleteDevotee(devoteeUser._id)}
                    className="px-5 mx-2 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
                  >
                    <MdDeleteOutline className="text-xl" />
                  </button>
                </div>
              </td>
            </tr>
          </>
        );
      })}
    </>
  );
}
