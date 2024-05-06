import React, { useState, useEffect } from "react";
import { Table, Skeleton, Card, Avatar, Dropdown, Menu, Button } from "antd";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../../store/store";
import Navigation from "../../../components/common/Navigation";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import ModalCreate from "../../../components/modal/create/ModalCreate";
import ModalDisable from "../../../components/modal/disable/ModalDisable";
import { fetchPartner } from "../../../store/actions/admin/partner/partnerActions";
import "./style.scss";

interface Partner {
  name: string;
  email: string;
  phone: string;
  blocked: boolean;
  avatar?: string;
}

function Partners() {
  const dispatch = useAppDispatch();
  const partners = useSelector((state: RootState) => state.partner.partners);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleBlock, setIsModalVisibleBlock] = useState(false);
  useEffect(() => {
    dispatch(fetchPartner());
  }, [dispatch]);

  const handleMenuClick = (e: any, record: Partner) => {
    if (e.key === "view") {
      console.log("View details for partner:", record);
    } else if (e.key === "block") {
      const actionText = record.blocked ? "Unblock Partner" : "Block Partner";
      console.log(actionText, ":", record);
    }
  };

  // const columns: any = [
  //   {
  //     title: "Partner",
  //     dataIndex: "name",
  //     key: "name",
  //     render: (text: any, record: any) => (
  //       <div className="flex items-center ">
  //         <Avatar src={record.avatar} style={{ marginRight: 8 }} />
  //         <span className="text-grey-1000">{text}</span>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Email",
  //     dataIndex: "email",
  //     key: "email",
  //     render: (email: any) => <span className="text-gray-600">{email}</span>,
  //   },
  //   {
  //     title: "Phone",
  //     dataIndex: "phone",
  //     key: "phone",
  //     render: (phone: any) => <span className="text-gray-600">{phone}</span>,
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "blocked",
  //     key: "blocked",
  //     render: (blocked: any) => (blocked ? (
  //       <span className="text-red-400 ml-2">Blocked</span>
  //     ) : (
  //       <span className="text-green-500 ml-2">Active</span>
  //     )),
  //   },
  //   {
  //     title: "Action",
  //     dataIndex: "action",
  //     key: "action",
  //     render: (text: any, record: any) => (
  //       <Dropdown
  //         overlay={(
  //           <Menu onClick={(e) => handleMenuClick(e, record)}>
  //             <Menu.Item key="view">View Details</Menu.Item>
  //             <Menu.Item key="block" onClick={handleBlockPartner}>
  //               {record.blocked ? "Unblock" : "Block"}
  //             </Menu.Item>
  //           </Menu>
  //         )}
  //         trigger={["click"]}
  //       >
  //         <Button className="ml-5">
  //           <FontAwesomeIcon
  //             icon={faEllipsis}
  //             className="self-center mr-2 w-4 h-4"
  //           />
  //         </Button>
  //       </Dropdown>
  //     ),
  //   },
  // ];
  const columns: any = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Max Establishments",
      dataIndex: "max_establishments",
      key: "max_establishments",
    },
    {
      title: "Status",
      dataIndex: "is_blocked",
      key: "is_blocked",
      render: (isBlocked: boolean) => (isBlocked ? "Blocked" : "Active"),
    },
  ];

  const paginationConfig = {
    pageSize: 6,
    showTotal: (total: any, range: any) => `Results ${range[0]}-${range[1]} of ${total}`,
  };
  const handleAddPartner = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBlockPartner = () => {
    setIsModalVisibleBlock(true);
  };

  const handleOkBlock = () => {
    setIsModalVisibleBlock(false);
  };

  const handleCancelBlock = () => {
    setIsModalVisibleBlock(false);
  };

  return (
    <div className="flex admin_partners container">
      <div className="flex flex-col items-start p-12 bg-gray-100 flex-1">
        <div className="font-medium text-4xl mb-8">Partner Management</div>
        {!partners ? (
          <Card bordered={false} className="w-full">
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        ) : (
          <>
            <Button
              className="bg-[#FB7E00] hover:bg-[#D56A00] px-3 py-2 text-white rounded-lg mb-6"
              onClick={() => handleAddPartner()}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="self-center mr-2 w-4 h-4"
              />
              <div className="text-white rounded-lg">Add New</div>
            </Button>
            <Table
              columns={columns}
              dataSource={partners}
              pagination={paginationConfig}
              className="w-full h-full"
            />
          </>
        )}
      </div>
      <ModalDisable
        title={"Are you sure you want \n to block this partner?"}
        onOk={handleOkBlock}
        onCancel={handleCancelBlock}
        visible={isModalVisibleBlock}
      />
      <ModalCreate
        onCancel={handleCancel}
        visible={isModalVisible}
      />
    </div>
  );
}

export default Partners;
