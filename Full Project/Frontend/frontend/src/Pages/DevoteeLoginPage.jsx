import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DevoteeLoginPage() {
  const [formdata, setFormData] = useState({});
  const [formerror, setFormError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const emailValidation = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };
  const passwordValidation = (upassword) => {
    if (upassword.length <= 8) {
      setPasswordError("Password Length Must be greater then 8 !!!");
      return false;
    }
    if (upassword.length >= 15) {
      setPasswordError("Password Length Must be less then 15 !!!");
      return false;
    }
    if (upassword == "") {
      setPasswordError("Please Enter Some Password To Continue !!!");
      return false;
    }
    if (upassword.length > 8 && upassword.length < 15) {
      const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      const testedP = passRegex.test(upassword);
      console.log("testing Inside");
      console.log(testedP);
      if (!testedP) {
        setPasswordError(
          "Password must contain at least one number \n and both lower and uppercase letters and special characters"
        );
        return false;
      }
    }

    return true;
  };

  const getforminput = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    //check email first
    if (event.target.name == "Email") {
      const emailValue = event.target.value;
      let validationBe = emailValidation(emailValue);
      console.log(validationBe);
      if (validationBe) {
        // setFormError("Your Email is Correct !!!");
        setEmailError("");
        setFormData({
          ...formdata,
          [event.target.name]: event.target.value,
        });
      } else {
        setEmailError("Please Enter Correct Email Address !!!");
      }
    }

    // check Password Then

    if (event.target.name == "Password") {
      const validationBe = passwordValidation(event.target.value);
      if (validationBe) {
        setPasswordError("");
        setFormData({
          ...formdata,
          [event.target.name]: event.target.value,
        });
      }
    }
  };

  const loginuser = (event) => {
    if (emailError.length == 0 && passwordError.length == 0) {
      event.preventDefault();
      console.log("Form Submited !!");
      console.log(formdata);

      //axios

      const data = JSON.stringify(formdata);

      const config = {
        method: "post",
        url: "http://localhost:3000/logindevoteeuser",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setFormError("");
          console.log(JSON.stringify(response.data));
          navigate("/otpverification");
        })
        .catch(function (error) {
          console.log(error.response.data);
          alert(error.response.data);
          setFormError(error.response.data);
        });
    } else {
      alert("Please Enter Correct Data To Login !!");
      event.preventDefault();
      event.target.reset();
      setEmailError("");
      setPasswordError("");
      setFormError("");
    }
  };

  return (
    <>
      <div className="LoginpageContainer bg-blue-400 h-screen w-screen flex justify-center items-center">
        <div className="w-full max-w-xl p-12">
          <form
            onSubmit={loginuser}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4 p-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border-2 border-teal-500  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="Email"
                required
                onChange={getforminput}
                placeholder="Email"
              />
              <p className="text-red-500 text-xs italic">{emailError}</p>
            </div>
            <div className="mb-6 p-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border-2 border-teal-500  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="Password"
                type="password"
                required
                onChange={getforminput}
                placeholder="*************"
              />
              <p className="text-red-500 text-xs italic">{passwordError}</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            <div className="errorContainer py-4">
              <p className="text-red-500 text-lg italic">{formerror}</p>
            </div>
          </form>
          <p className="text-center text-gray-800 text-xs">
            &copy;2023 Rohit Corp. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
