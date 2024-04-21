import React, { useState } from "react";
import Logo from "../../assets/icons/Happy_Hours_Logo.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/profile";
  };

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
            <div className="w-[250px] mb-12">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <div className="font-semibold text-sm">Email Address:</div>
              <input
                className="border-2 border-[#B3C2C1] w-[250px] py-2 px-3 rounded-md outline-none focus:border-[#F34749] focus:boder-2"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="w-[250px] mb-12">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <div className="font-semibold text-sm">Password:</div>
              <input
                className="border-2 border-[#B3C2C1] w-[250px] py-2 px-3 rounded-md outline-none focus:border-[#F34749] focus:boder-2"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
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

export default Login;
