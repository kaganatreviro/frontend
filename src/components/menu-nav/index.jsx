import React from "react";
import { Button, Divider } from "antd";
import "./style.scss";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../logo";

function MenuNav() {
  const menuItems = [
    { name: "Profile", path: "/profile" },
    { name: "Menu", path: "/menu" },
    { name: "Order", path: "/order" },
    { name: "QR", path: "/qr" },
  ];

  const location = useLocation(); // Хук для получения текущего пути

  return (
    <div className="menu_nav">
      <div>
        <div className="name">Partner Dashboard</div>
        <Divider />
        <Logo />
      </div>
      <div className="menu_content">
        {menuItems.map((item, index) => (
          <NavLink
              /* eslint-disable-next-line react/no-array-index-key */
            key={index}
            to={item.path}
            className={`text ${location.pathname === item.path ? "active" : ""}`}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
      <Button danger type="primary">Log out</Button>
    </div>
  );
}

export default MenuNav;
