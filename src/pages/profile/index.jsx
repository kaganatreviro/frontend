import React from "react";
import "./style.scss";
import { Card } from "antd";
import MenuNav from "../../components/menu-nav";

function Profile() {
  return (
    <div className="container profile">
      <MenuNav />
      <div className="main_content back">
        <Card title="Menu Management" bordered={false}>
          <p>Interface for updating beverage menus, prices, and descriptions.</p>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
