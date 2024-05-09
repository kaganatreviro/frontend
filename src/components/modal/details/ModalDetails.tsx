import React from "react";
import { Modal, Tabs, Divider, Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import "./style.scss";

interface ModalDetailsProps {
  visible: boolean;
  onClose: () => void;
  // partner: Partner;
  // establishments: Establishment[];
}

const { TabPane } = Tabs;

function ModalDetails({ onClose, visible }: ModalDetailsProps) {
  const partner = useSelector((state: RootState) => state.partner.currentPartnerDetails);

  const modalFooter = (
    <div>
      <Button onClick={onClose} type="primary" className="modal-confirm-btn">Back</Button>
    </div>
  );

  return (
    <Modal
      className="modal_details_admin"
      open={visible}
      // closable={false}
      onCancel={onClose}
      // footer={modalFooter}
      footer={[]}
    >
      <Tabs defaultActiveKey="1" className="tab">
        <TabPane tab="Partner Info" key="1">
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
        </TabPane>
        <TabPane tab="Establishments" key="2">
          <div>establishments</div>
        </TabPane>
      </Tabs>
    </Modal>
  );
}

export default ModalDetails;
