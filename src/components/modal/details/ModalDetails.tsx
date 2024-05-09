import React from "react";
import { Modal, Tabs, Divider, Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import "./style.scss";

interface ModalDetailsProps {
  visible: boolean;
  onClose: () => void;
}

function ModalDetails({ onClose, visible }: ModalDetailsProps) {
  const partner = useSelector((state: RootState) => state.partner.currentPartnerDetails);

  const modalFooter = (
    <div>
      <Button onClick={onClose} type="primary" className="modal-confirm-btn">Back</Button>
    </div>
  );

  const tabsItems = [
    {
      label: "Partner Info",
      key: "1",
      children: (
        <div>
          <div className="flex gap-8">
            <div className="title">Name:</div>
            <div>{partner?.name}</div>
          </div>
          <Divider />
          <div className="flex gap-8">
            <div className="title">Email:</div>
            <div>{partner?.email}</div>
          </div>
          <Divider />
          <div className="flex gap-8">
            <div className="title">Phone:</div>
            <div>{partner?.phone_number ? partner?.phone_number : "empty"}</div>
          </div>
          <Divider />
          <div className="flex gap-8">
            <div className="title">Status:</div>
            <div>{partner?.isBlocked ? "Blocked" : "Active"}</div>
          </div>
        </div>
      ),
    },
    {
      label: "Establishments",
      key: "2",
      children: (
        <div>establishments</div>
      ),
    },
  ];

  return (
    <Modal
      className="modal_details_admin"
      open={visible}
      onCancel={onClose}
      footer={[]}
    >
      <Tabs defaultActiveKey="1" className="tab" items={tabsItems} />
    </Modal>
  );
}

export default ModalDetails;
