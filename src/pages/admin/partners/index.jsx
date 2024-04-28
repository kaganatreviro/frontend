/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Table, Skeleton, Card, Avatar, Dropdown, Menu } from "antd";
import starbucks from "../../../assets/icons/starbucks.png";
import Navigation from "../../../components/common/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

function Partners() {
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setPartners([
        {
          key: 1,
          name: "StarBucks",
          email: "starbucks@gmail.com",
          phone: "+996555555555",
          avatar: starbucks,
          blocked: false,
        },
        {
          key: 2,
          name: "McDonald's",
          email: "mcdonalds@gmail.com",
          phone: "+996555555556",
          avatar: starbucks,
          blocked: true,
        },
        {
          key: 3,
          name: "Burger King",
          email: "burgerking@gmail.com",
          phone: "+996555555557",
          avatar: starbucks,
          blocked: false,
        },
        {
          key: 4,
          name: "KFC",
          email: "kfc@gmail.com",
          phone: "+996555555558",
          avatar: starbucks,
          blocked: false,
        },
        {
          key: 5,
          name: "Pizza Hut",
          email: "pizzahut@gmail.com",
          phone: "+996555555559",
          avatar: starbucks,
          blocked: false,
        },
        {
          key: 6,
          name: "Subway",
          email: "subway@gmail.com",
          phone: "+996555555560",
          avatar: starbucks,
          blocked: false,
        },
        {
          key: 7,
          name: "Domino's Pizza",
          email: "dominos@gmail.com",
          phone: "+996555555561",
          avatar: starbucks,
          blocked: false,
        },
        {
          key: 8,
          name: "Wendy's",
          email: "wendys@gmail.com",
          phone: "+996555555562",
          avatar: starbucks,
          blocked: false,
        },
        {
          key: 9,
          name: "Taco Bell",
          email: "tacobell@gmail.com",
          phone: "+996555555563",
          avatar: starbucks,
          blocked: false,
        },
        {
          key: 10,
          name: "Dunkin'",
          email: "dunkin@gmail.com",
          phone: "+996555555564",
          avatar: starbucks,
          blocked: false,
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const handleMenuClick = (e, record) => {
    if (e.key === "view") {
      console.log("View details for partner:", record);
    } else if (e.key === "block") {
      const actionText = record.blocked ? "Unblock Partner" : "Block Partner";
      console.log(actionText, ":", record);
    }
  };

  const columns = [
    {
      title: "Partner",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center ">
          <Avatar src={record.avatar} style={{ marginRight: 8 }} />
          <span className="text-grey-1000">{text}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => <span className="text-gray-600">{email}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => <span className="text-gray-600">{phone}</span>,
    },
    {
      title: "Status",
      dataIndex: "blocked",
      key: "blocked",
      render: (blocked) =>
        blocked ? (
          <span className="text-red-400 ml-2">Blocked</span>
        ) : (
          <span className="text-green-500 ml-2">Active</span>
        ), // Отображение статуса
    },
    {
      title: "Action",
      dataIndex: "name",
      key: "action",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu onClick={(e) => handleMenuClick(e, record)}>
              <Menu.Item key="view">View Details</Menu.Item>
              <Menu.Item key="block">
                {record.blocked ? "Unblock" : "Block"}
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <button className="ml-5">
            <FontAwesomeIcon
              icon={faEllipsis}
              className={"self-center mr-2 w-4 h-4"}
            />
          </button>
        </Dropdown>
      ),
    },
  ];

  const paginationConfig = {
    pageSize: 10,
    showTotal: (total, range) => `Results ${range[0]}-${range[1]} of ${total}`,
  };
  const handleAddPartner = () => {
    console.log("Create Partner modal opened");
  };

  return (
    <div className="flex admin_partners">
      <Navigation />
      <div className="flex flex-col items-start p-12 bg-gray-100 flex-1">
        <div className="font-medium text-4xl mb-8">Partner Management</div>
        {loading ? (
          <Card bordered={false} className="w-full">
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        ) : (
          <div className="w-full max-w-[1440px]">
            <button
              className="bg-[#FB7E00] hover:bg-[#D56A00] px-3 py-2 text-white rounded-lg mb-6"
              onClick={() => handleAddPartner()}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className={"self-center mr-2 w-4 h-4"}
              />
              Add New
            </button>
            <div className="table-wrapper">
              <Table
                columns={columns}
                dataSource={partners}
                pagination={paginationConfig}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Partners;
