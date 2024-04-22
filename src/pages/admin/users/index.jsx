import React, { useState, useEffect } from "react";
import { Table, Skeleton, Divider, Card } from "antd";
import Navigation from "../../../components/common/Navigation";
import "./style.scss";

function Users() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { key: 1, name: "Иван Иванов", email: "ivanov@gmail.com", birthdate: "1990-01-01" },
        { key: 2, name: "Петр Петров", email: "petrov@yahoo.com", birthdate: "1985-05-15" },
        { key: 3, name: "Мария Маринина", email: "marina@mail.ru", birthdate: "1992-07-23" },
        { key: 4, name: "Алексей Алексеев", email: "alekseev@outlook.com", birthdate: "1989-09-10" },
        { key: 5, name: "София Смирнова", email: "sofia@live.com", birthdate: "1991-12-01" },
        { key: 6, name: "Елена Еленова", email: "elena@gmail.com", birthdate: "1993-03-05" },
        { key: 7, name: "Николай Николаев", email: "nikolay@yahoo.com", birthdate: "1988-08-20" },
        { key: 8, name: "Ольга Ольгина", email: "olga@mail.ru", birthdate: "1990-11-11" },
        { key: 9, name: "Максим Максимов", email: "maxim@gmail.com", birthdate: "1987-01-25" },
        { key: 10, name: "Виктория Викторовна", email: "viktoria@live.com", birthdate: "1992-05-30" },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const columns = [
    { title: "User", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: "Email",
      dataIndex: "email",
      key: "email",
      filters: [
        { text: "gmail.com", value: "gmail.com" },
        { text: "yahoo.com", value: "yahoo.com" },
      ],
      onFilter: (value, record) => record.email.includes(value),
    },
    { title: "Date of Birth", dataIndex: "birthdate", key: "birthdate", sorter: (a, b) => new Date(a.birthdate) - new Date(b.birthdate) },
  ];

  const paginationConfig = {
    pageSize: 6,
    showSizeChanger: true,
    pageSizeOptions: ["6", "12", "18", "24"],
    showTotal: (total, range) => `Results ${range[0]}-${range[1]} of ${total}`,
  };

  return (
    <div className="flex admin_users flex-1">
      <Navigation />
      <div className="flex flex-col items-start p-12 bg-gray-100 flex-1">
        <div className="font-medium text-xl">User Management</div>
        <Divider />
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
