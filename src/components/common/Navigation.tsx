import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ModalDisable from "../modal/disable/ModalDisable";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Logo from "../../assets/icons/Happy_Hours_Logo.png";
import NavigationIcons from "../../utils/NavigationIcons";

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  const adminMenuItems = [
    { name: "Users", path: "/users" },
    { name: "Partners", path: "/partners" },
    { name: "Categories", path: "/categories" },
    { name: "Feedback", path: "/admin/feedback" },
  ];

  const partnerMenuItems = [
    { name: "Profile", path: "/profile" },
    { name: "Menu", path: "/menu" },
    { name: "Orders", path: "/orders" },
    { name: "Establishments", path: "/establishments" },
    { name: "QR", path: "/qrcode" },
    { name: "Feedback", path: "/feedback" },
  ];

  const menuItems = userType === "admin" ? adminMenuItems : partnerMenuItems;

  const handleLogout = () => {
    setIsModalVisible(true);
  };

  const confirmLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    if (userType === "admin") {
      navigate("/admin/login");
    } else {
      navigate("/login");
    }
  };

  const cancelLogout = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="sticky top-0 flex flex-col items-center w-[280px] py-8 h-screen bg-white z-10">
      <div className="text-[#B2C1C0] text-2xl">{userType === "admin" ? "Admin Dashboard" : "Partner Dashboard"}</div>
      <hr className="border-1 border-[#ADADAD] mt-2 w-full" />
      <div className="pt-6 flex flex-col h-full w-full">
        <div className="flex items-center pl-8">
          <img src={Logo} className="w-9" alt="Happy Hours Logotip" />
          <div className="ml-2 text-2xl font-medium">HAPPY HOURS</div>
        </div>
        <div className="pt-10">
          {menuItems.map((item, i) => (
            <NavLink to={item.path} key={item.path} className="block text-2xl">
              <div
                className={`pl-8 flex text-[#B2C1C0] my-6 py-4
                ${location.pathname.startsWith(item.path) ? "bg-[#FFE4C3] text-[#FB7E00] border-r-4 border-[#FB7E00]" : ""}
                `}
              >
                <FontAwesomeIcon
                  icon={NavigationIcons[item.name].icon}
                  className={`self-center mr-3 ${location.pathname.startsWith(item.path) ? "text-[#FB7E00]" : ""}`}
                />
                <div>{item.name}</div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="text-[#FB7E00] flex items-center gap-2 border-none text-xl pb-8 hover:"
        type="button"
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        <div>Log Out</div>
      </button>

      <ModalDisable
        visible={isModalVisible}
        onOk={confirmLogout}
        onCancel={cancelLogout}
        title="Are you sure you want
to Log Out?"
      />
    </div>
  );
}

export default Navigation;
