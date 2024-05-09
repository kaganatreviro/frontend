/* eslint-disable */
import React, { useState } from "react";
import { Button, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

interface Venue {
  id: string;
  name: string;
}

function ChooseEstablishment() {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const handleMenuClick = (venueId: string) => {
    const venues: Venue[] = [];
    const selected = venues.find((venue) => venue.id === venueId);
    if (selected) {
      setSelectedVenue(selected);
    }
  };

  const menu = <Menu onClick={({ key }) => handleMenuClick(key)}></Menu>;

  return (
    <Dropdown overlay={menu}>
      <Button>
        {selectedVenue ? selectedVenue.name : "Выберите заведение"}{" "}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}

export default ChooseEstablishment;
