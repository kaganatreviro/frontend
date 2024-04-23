import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/admin/login");
  };

  return (
    <div className="sticky top-0 flex flex-col items-center w-[280px] py-8 h-screen bg-white z-10">
      <div className="text-[#B2C1C0] text-2xl">Admin Dashboard</div>
      <hr className="border-1 border-[#ADADAD] mt-2 w-full" />
      <div className="pt-6 flex flex-col h-full w-full">
        <div className="flex items-center pl-8">
          <img src={Logo} alt="Happy Hours Logotip" />
          <div className="ml-2 text-2xl font-medium">HAPPY HOURS</div>
        </div>
        <div className="pt-10">
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              /* eslint-disable-next-line react/no-array-index-key */
              key={index}
              className="block  text-2xl "
            >
              <div
                className={` pl-8 flex text-[#B2C1C0] my-6 py-4
              ${
                location.pathname === item.path
                  ? "bg-[#FFE8E8] text-[#F34749] border-r-4 border-[#F5484A]"
                  : ""
              }
              `}
              >
                <FontAwesomeIcon
                  icon={NavigationIcons[item.name].icon}
                  className={`self-center mr-3
                  ${location.pathname === item.path ? "text-[#F34749]" : ""}
                `}
                />
                <div>{item.name}</div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="text-[#F34749] flex items-center gap-2 border-none text-xl pb-8 hover:"
        type="button"
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        <div>Log Out</div>
      </button>
    </div>
  );
}

export default Navigation;