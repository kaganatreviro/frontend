import React, { useEffect } from "react";
import { Table, Skeleton, Card, Avatar } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { fetchUsers } from "../../../store/actions/admin/users/usersSlice";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import "./style.scss";

function Users() {
  const dispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.users.users) || [];
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const columns = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (text: any, record: any) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={record.avatar} style={{ marginRight: 8 }} />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: any) => <span>{email}</span>,
    },
    {
      title: "Date of Birth",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      render: (date: any) => <span>{moment(date).format("DD.MM.YYYY")}</span>,
    },
  ];

  const paginationConfig = {
    pageSize: 6,
    showTotal: (total: any, range: any) => `Results ${range[0]}-${range[1]} of ${total}`,
  };

  return (
    <div className="flex-1 flex bg-[#f4f4f4]">
      <div className="flex-1 admin_users container">
        <div className="flex flex-col h-full items-start p-12 bg-gray-100 flex-1">
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
              className="w-full h-full max-w-[1440px]"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
