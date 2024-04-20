import React from "react";
import { Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/icons/Happy_Hours_Logo.png";
import NavigationIcons from "../../utils/NavigationIcons";

function Navigation() {
  const menuItems = [
    { name: "Users", path: "/users" },
    { name: "Partners", path: "/partners" },
    { name: "Categories", path: "/categories" },
    { name: "Feedback", path: "/feedback" },
  ];

  const location = useLocation();

  return (
    <div className="flex flex-col items-center w-[280px] py-8 h-screen">
      <div className="text-[#B2C1C0] text-2xl">Admin Dashboard</div>
      <hr className="border-1 border-[#ADADAD] mt-4 w-full" />
      <div className="pt-10 flex flex-col h-full w-full">
        <div className="flex items-center pl-4">
          <img src={Logo} alt="Happy Hours Logotip" />
          <div className="ml-2 text-2xl font-medium">HAPPY HOURS</div>
        </div>
        <div className="pt-4">
          {menuItems.map((item, index) => (
            <div
              className={` pl-4 flex text-[#B2C1C0] my-6 py-4
              ${
                location.pathname === item.path
                  ? "bg-[#FFE8E8] text-[#F34749] border-r-4 border-[#F5484A]"
                  : ""
              }
              `}
              /* eslint-disable-next-line react/no-array-index-key */
              key={index}
            >
              <img
                className="self-center mr-2"
                src={NavigationIcons[item.name].icon}
                alt=""
              />
              <NavLink
                /* eslint-disable-next-line react/no-array-index-key */
                to={item.path}
                className="block  text-2xl "
              >
                {item.name}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <Button danger type="primary" className="w-[200px] text-xl h-[45px]">
        Log out
      </Button>
    </div>
  );
}

export default Navigation;
