import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Skeleton, Card, Button, Dropdown, Menu } from "antd";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { partnerBlock } from "../../../components/api/api";
import { setSelectedPartnerId } from "../../../store/actions/admin/partner/partnerSlice";
import ModalDetails from "../../../components/modal/details/ModalDetails";
import { RootState } from "../../../store/store";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import ModalCreate from "../../../components/modal/create/ModalCreate";
import ModalDisable from "../../../components/modal/disable/ModalDisable";
import { fetchPartner, fetchPartnerById } from "../../../store/actions/admin/partner/partnerActions";
import "./style.scss";

interface Partner {
  name: string;
  email: string;
  phone: string;
  is_blocked: boolean;
  id: number;
  avatar?: string;
}

function Partners() {
  const dispatch = useAppDispatch();
  const partners = useSelector((state: RootState) => state.partner.partners);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleBlock, setIsModalVisibleBlock] = useState(false);
  const [isModalVisibleDetails, setIsModalVisibleDetails] = useState(false);
  useEffect(() => {
    dispatch(fetchPartner());
  }, [dispatch]);

  const handleMenuClick = async (e: any, record: Partner) => {
    switch (e.key) {
      case "view":
        dispatch(setSelectedPartnerId(record.id));
        dispatch(fetchPartnerById(record.id));
        setIsModalVisibleDetails(true);
        break;
      case "block":
        confirmBlockUnblock(record);
        break;
      default:
        console.log("No action selected");
    }
  };

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
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
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
      render: (isBlocked: boolean) => (
        <span style={{ color: isBlocked ? "#FC5757" : "#56CC8D" }}>
          {isBlocked ? "Blocked" : "Active"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Partner) => (
        <Dropdown
          menu={{
            onClick: (e) => handleMenuClick(e, record),
            items: [
              { key: "view", label: "View Details" },
              { key: "block", label: record.is_blocked ? "Unblock" : "Block" },
            ],
          }}
          trigger={["click"]}
        >
          <Button className="action-button" type="primary" icon={<FontAwesomeIcon icon={faEllipsis} />} />
        </Dropdown>
      ),
    },
  ];

  const paginationConfig = {
    pageSize: 10,
    showTotal: (total: any, range: any) => `Results ${range[0]}-${range[1]} of ${total}`,
    showLessItems: true,
    showSizeChanger: false,
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

  const handleOkBlock = async () => {
    if (selectedPartner) {
      const updatedStatus = !selectedPartner.is_blocked;
      try {
        const data = {
          email: selectedPartner.email,
          is_blocked: updatedStatus,
        };
        await partnerBlock(data);
        dispatch(fetchPartner());
        console.log(updatedStatus ? "Blocked" : "Unblocked", "partner:", selectedPartner.name);
      } catch (error) {
        console.error("Failed to update partner status:", error);
      }
    }
    setIsModalVisibleBlock(false);
  };

  const handleCancelBlock = () => {
    setIsModalVisibleBlock(false);
  };

  const handleDetails = () => {
    setIsModalVisibleDetails(true);
  };

  const handleCancelDetails = () => {
    setIsModalVisibleDetails(false);
  };

  const confirmBlockUnblock = (record: Partner) => {
    setSelectedPartner(record);
    setIsModalVisibleBlock(true);
  };

  return (
    <div className="flex-1 flex bg-[#f4f4f4]">
      <div className="flex-1 admin_partners container">
        <div className="flex flex-col h-full items-start p-12 bg-gray-100 flex-1">
          <div className="font-medium text-4xl mb-8">Partner Management</div>
          {!partners ? (
            <Card bordered={false} className="w-full">
              <Skeleton active paragraph={{ rows: 4 }} />
            </Card>
          ) : (
            <>
              <Button
                className="bg-[#FB7E00] px-3 py-2 text-white rounded-lg mb-6"
                onClick={() => handleAddPartner()}
                type="primary"
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
          title={selectedPartner?.is_blocked ? "Are you sure you want \n to unblock this partner?" : "Are you sure you want \n to block this partner?"}
          onOk={handleOkBlock}
          onCancel={handleCancelBlock}
          visible={isModalVisibleBlock}
        />
        <ModalCreate
          onCancel={handleCancel}
          visible={isModalVisible}
        />

        <ModalDetails visible={isModalVisibleDetails} onClose={handleCancelDetails} />
      </div>
    </div>
  );
}

export default Partners;
