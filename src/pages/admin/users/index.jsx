import React, { useState, useEffect } from "react";
import { Table, Skeleton, Card, Avatar } from "antd";

import japarom from "../../../assets/icons/japarov.svg";
import Navigation from "../../../components/common/Navigation";
import "./style.scss";

function Users() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        {
          key: 1,
          name: "Садыр Асанов",
          email: "prisident@gmail.com",
          birthdate: "1968-01-01",
          avatar: japarom,
        },
        {
          key: 2,
          name: "Петр Петров",
          email: "petrov@yahoo.com",
          birthdate: "1985-05-15",
          avatar: japarom,
        },
        {
          key: 3,
          name: "Мария Маринина",
          email: "marina@mail.ru",
          birthdate: "1992-07-23",
          avatar: japarom,
        },
        {
          key: 4,
          name: "Алексей Алексеев",
          email: "alekseev@outlook.com",
          birthdate: "1989-09-10",
          avatar: japarom,
        },
        {
          key: 5,
          name: "София Смирнова",
          email: "sofia@live.com",
          birthdate: "1991-12-01",
          avatar: japarom,
        },
        {
          key: 6,
          name: "Елена Еленова",
          email: "elena@gmail.com",
          birthdate: "1993-03-05",
          avatar: japarom,
        },
        {
          key: 7,
          name: "Николай Николаев",
          email: "nikolay@yahoo.com",
          birthdate: "1988-08-20",
          avatar: japarom,
        },
        {
          key: 8,
          name: "Ольга Ольгина",
          email: "olga@mail.ru",
          birthdate: "1990-11-11",
          avatar: japarom,
        },
        {
          key: 9,
          name: "Максим Максимов",
          email: "maxim@gmail.com",
          birthdate: "1987-01-25",
          avatar: japarom,
        },
        {
          key: 10,
          name: "Виктория Викторовна",
          email: "viktoria@live.com",
          birthdate: "1992-05-30",
          avatar: japarom,
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
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={record.avatar} style={{ marginRight: 8 }} />
          <span className="text-grey-1000">{text}</span>
        </div>
      ),
      // sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => <span className="text-gray-600">{email}</span>,
      // filters: [
      //   { text: "gmail.com", value: "gmail.com" },
      //   { text: "yahoo.com", value: "yahoo.com" },
      // ],
      // onFilter: (value, record) => record.email.includes(value),
    },
    {
      title: "Date of Birth",
      dataIndex: "birthdate",
      key: "birthdate",
      render: (date) => <span className="text-gray-600">19.02.2000</span>,
      // sorter: (a, b) => new Date(a.birthdate) - new Date(b.birthdate)
    },
  ];

  const paginationConfig = {
    pageSize: 6,
    // showSizeChanger: true,
    // pageSizeOptions: ["6", "12", "18", "24"],
    showTotal: (total, range) => `Results ${range[0]}-${range[1]} of ${total}`,
  };

  return (
    <div className="flex admin_users ">
      <Navigation />
      <div className="flex flex-col items-start p-12 bg-gray-100 flex-1">
        <div className="font-medium text-4xl mb-8">User Management</div>
        {loading ? (
          <Card bordered={false} className="w-full">
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        ) : (
          <Table
            columns={columns}
            dataSource={users}
            pagination={paginationConfig}
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  );
}

export default Users;
