/* eslint-disable */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/icons/Happy_Hours_Logo.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    const errors = {};

    if (!trimmedUsername) {
      errors.username = "Email is required";
    } else if (!isValidEmail(trimmedUsername)) {
      errors.username = "Invalid email format";
    }

    if (!trimmedPassword) {
      errors.password = "Password is required";
    } else if (trimmedPassword.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      checkCredentials(trimmedUsername, trimmedPassword);
    }
  };

  const checkCredentials = (trimmedUsername, trimmedPassword) => {
    const credentials = {
      //temporary
      email: "admin@gmail.com",
      password: "password12345",
    };

    if (
      trimmedUsername !== credentials.email ||
      trimmedPassword !== credentials.password
    ) {
      setErrors({ invalidCredentials: "Invalid email or password" });
    } else {
      window.location.href = "/users";
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="bg-[#F3F3F3] h-screen py-8 px-12 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <div className="bg-white w-[400px] pt-12 pb-20 px-12 rounded-lg flex items-center flex-col">
          <div className="flex">
            <img src={Logo} className="self-start" alt="" />
            <div className="ml-2 text-3xl font-medium mb-6">HAPPY HOURS</div>
          </div>
          <div className="text-center text-3xl mb-10 text-medium">Log In</div>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="w-[250px] mb-12">
              <div className="font-semibold text-sm">Email Address:</div>
              <div className="relative">
                <input
                  className="border-2 border-[#B3C2C1] w-full py-2 px-3 rounded-md outline-none focus:border-[#F34749]"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              {errors.username && (
                <div className="relative">
                  <div className="text-red-500 text-xs mt-1 absolute">
                    {errors.username}
                  </div>
                </div>
              )}
            </div>
            <div className="w-[250px] mb-12">
              <div className="font-semibold text-sm">Password:</div>
              <div className="relative">
                <input
                  className="border-2 border-[#B3C2C1] w-full py-2 px-3 rounded-md outline-none focus:border-[#F34749]"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="text-[#B3C2C1]"
                  />
                </div>
              </div>
              {errors.password && (
                <div className="relative">
                  <div className="text-red-500 text-xs mt-1 absolute">
                    {errors.password}
                  </div>
                </div>
              )}
            </div>
            {errors.invalidCredentials && (
              <div className="relative">
                <div className="text-red-500 text-md mt-2 absolute top-[-50px] w-[250px] left-[-125px]">
                  {errors.invalidCredentials}
                </div>
              </div>
            )}
            <button
              type="submit"
              className="bg-[#F34749] w-[250px] text-white rounded-md py-3 text-xl mt-4"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
