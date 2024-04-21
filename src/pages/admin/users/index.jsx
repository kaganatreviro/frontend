import React, { useState, useEffect } from "react";
import { Table, Skeleton, Divider } from "antd";
import Navigation from "../../../components/common/Navigation";

function Users() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        {
          key: 1,
          name: "Иван Иванов",
          email: "ivanov@gmail.com",
          birthdate: "1990-01-01",
        },
        {
          key: 2,
          name: "Петр Петров",
          email: "petrov@yahoo.com",
          birthdate: "1985-05-15",
        },
        {
          key: 3,
          name: "Мария Маринина",
          email: "marina@mail.ru",
          birthdate: "1992-07-23",
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const columns = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      filters: [
        { text: "gmail.com", value: "gmail.com" },
        { text: "yahoo.com", value: "yahoo.com" },
      ],
      onFilter: (value, record) => record.email.includes(value),
    },
    {
      title: "Date of Birth",
      dataIndex: "birthdate",
      key: "birthdate",
      sorter: (a, b) => new Date(a.birthdate) - new Date(b.birthdate),
    },
  ];

  return (
    <div className="flex">
      <Navigation />
      <div className="flex flex-col items-start p-12 bg-gray-100 flex-1">
        <div className="font-medium text-xl40">User Management</div>
        <Divider />
        {loading ? (
          <Skeleton active />
        ) : (
          <Table columns={columns} dataSource={users} />
        )}
        {/* <CustomPagination /> */}
      </div>
    </div>
  );
}

export default Users;
