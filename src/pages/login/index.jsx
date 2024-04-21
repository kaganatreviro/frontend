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
      setErrors({ invalidCredentials: "Invalid credentials" });
    } else {
      window.location.href = "/profile";
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [errors, setErrors] = useState({});

  return (
    <div className="bg-[#F3F3F3] h-screen py-8 px-12 flex flex-col">
      <div className="relative">
        <div className="absolute mt-2">
          <div className="flex">
            <img src={Logo} alt="Logo" />
            <div className="ml-2 text-2xl font-medium">HAPPY HOURS</div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center h-full">
        <div className="bg-white w-[400px] pt-12 pb-20 px-12 rounded-lg">
          <div className="text-center text-3xl mb-10 text-medium">Log In</div>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <InputField
              label="Email Address:"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="relative">
              <div className="absolute text-red-500 w-[250px] right-[-125px] top-[-45px] text-xs">
                {errors.username || ""}
              </div>
            </div>
            <InputField
              label="Password:"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
            />
            <div className="relative">
              <div className="absolute text-red-500 w-[250px] right-[-125px] top-[-45px] text-xs">
                {errors.password || ""}
              </div>
            </div>
            {errors.invalidCredentials && (
              <div className="relative">
                 <div className="absolute text-red-500 w-[250px] right-[-125px] top-[-45px] text-md">
                 {errors.invalidCredentials}
                 </div>
              </div>
            )}
            <button
              type="submit"
              className="bg-[#F34749] w-[250px] text-white rounded-md py-3 text-xl"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const InputField = ({
  label,
  type,
  value,
  onChange,
  errorMessage,
  showPassword,
  toggleShowPassword,
}) => {
  return (
    <div className="w-[250px] mb-12">
      <div className="font-semibold text-sm">{label}</div>
      <div className="relative">
        <input
          className="border-2 border-[#B3C2C1] w-full py-2 px-3 rounded-md outline-none focus:border-[#F34749]"
          type={type}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={toggleShowPassword}
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="text-[#B3C2C1]"
            />
          </div>
        )}
      </div>
      {errorMessage && (
        <div className="text-red-500 text-xs mt-1">{errorMessage}</div>
      )}
    </div>
  );
};

export default Login;
