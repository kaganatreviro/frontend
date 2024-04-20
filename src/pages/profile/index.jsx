import React from "react";
import { Card } from "antd";
import MenuNav from "../../components/common/Navigation";

function Profile() {
  return (
    <div className="">
      <MenuNav />
      <div className="">
        <Card title="Menu Management" bordered={false}>
          <p>
            Interface for updating beverage menus, prices, and descriptions.
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
