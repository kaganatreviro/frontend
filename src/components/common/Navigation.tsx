import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ModalDisable from "../modal/disable/ModalDisable";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Logo from "../../assets/icons/Happy_Hours_Logo.png";
import NavigationIcons from "../../utils/NavigationIcons";
import { useAppDispatch } from "../../helpers/hooks/hook";
import { clearTokens } from "../../store/actions/token/tokenSlice";
import "./style.scss";

function Navigation() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  const adminMenuItems = [
    { name: "Users", path: "/users" },
    { name: "Partners", path: "/partners" },
    { name: "Categories", path: "/categories" },
    { name: "Feedback", path: "/admin/feedback" },
    { name: "Subscriptions", path: "/subscriptions" },
    { name: "Statistics", path: "/subscription/statistics" },
  ];

  const partnerMenuItems = [
    { name: "Profile", path: "/profile" },
    { name: "Dashboard", path: "/dashboard" },
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
    dispatch(clearTokens());
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
    <div className="sticky partner_navigation top-0 flex flex-col items-center w-[250px] py-8 h-screen bg-white z-10">
      <div className="text-[#B2C1C0] text-xl">{userType === "admin" ? "Admin Dashboard" : "Partner Dashboard"}</div>
      <hr className="border-1 border-[#ADADAD] mt-2 w-full" />
      <div className="pt-6 flex flex-col h-full w-full">
        <div className="flex items-center pl-8 mb-2">
          <img src={Logo} className="w-6" alt="Happy Hours Logotip" />
          <div className="ml-2 text-xl font-medium">HAPPY HOURS</div>
        </div>
        <div className="pt-5">
          {menuItems.map((item, i) => (
            <NavLink to={item.path} key={item.path} className="block mb-4">
              <div
                className={`pl-8 flex text-[#B2C1C0] py-2 hover text-xl
                ${location.pathname.startsWith(item.path) ? "bg-[#FFE4C3] text-[#FB7E00] border-r-4 border-[#FB7E00]" : ""}
                `}
              >
                <FontAwesomeIcon
                  icon={NavigationIcons[item.name].icon}
                  className={`self-center mr-3 ${location.pathname.startsWith(item.path) ? "text-[#FB7E00]" : ""}`}
                />
                <div className="title text-xl">{item.name}</div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="text-[#FB7E00] flex items-center gap-2 border-none pb-8 hover:"
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
