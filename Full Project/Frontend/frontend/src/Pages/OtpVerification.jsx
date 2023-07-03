import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OtpVerification() {
  const [otp, setOtp] = useState({});
  const navigate = useNavigate();

  const getOTPNumber = (e) => {
    setOtp({
      ...otp,
      [e.target.name]: e.target.value,
    });
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    const otpEnteredbyUser = `${otp.Number_1}${otp.Number_2}${otp.Number_3}${otp.Number_4}`;
    console.log(otp);
    console.log(otpEnteredbyUser);

    const data = JSON.stringify({ OTP: otpEnteredbyUser });
    const config = {
      method: "post",
      url: "http://localhost:3000/loginuser/otpverification",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        let userToken = response.data.Token;
        let Flag = response.data.Flag;
        localStorage.setItem("Token", userToken); // setting User Token In Local Storage

        if (Flag === 86) {
          navigate("/adminhome/home");
        } else {
          navigate("/devoteehome/home");
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
        alert(error.response.data);
      });
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-600 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email</p>
              </div>
            </div>

            <div>
              <form onSubmit={verifyOTP}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-16 h-16 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        required
                        onChange={getOTPNumber}
                        maxLength={1}
                        name="Number_1"
                        id="Number_1"
                      />
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        required
                        onChange={getOTPNumber}
                        maxLength={1}
                        name="Number_2"
                        id="Number_2"
                      />
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        required
                        onChange={getOTPNumber}
                        maxLength={1}
                        name="Number_3"
                        id="Number_3"
                      />
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        required
                        onChange={getOTPNumber}
                        maxLength={1}
                        name="Number_4"
                        id="Number_4"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        type="submit"
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm hover:bg-blue-600"
                      >
                        Verify Account
                      </button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p> Did not recieve code?</p>{" "}
                      <a
                        className="flex flex-row items-center text-blue-600"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resend
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
