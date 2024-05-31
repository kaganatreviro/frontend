import { Modal, Button } from "antd";
import "./style.scss";

interface ModalDisableProps {
  title?: string;
  text?: string;
  onOk: () => void;
  onCancel: () => void;
  visible: boolean;
}

function ModalDisable({
  title = "Default Title",
  text = "",
  onOk,
  onCancel,
  visible,
}: ModalDisableProps) {
  return (
    <Modal
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Confirm"
      cancelText="Cancel"
      className="modal-disable"
      footer={[
        <div key="footer" className="content">
          <Button onClick={onCancel} className="modal-cancel-btn">Cancel</Button>
          <Button type="primary" onClick={onOk} className="modal-confirm-btn">Confirm</Button>
        </div>,
      ]}
    >
      <div className="flex justify-center pt-10 pb-5 flex-col gap-3.5 items-center">
        <div className="text-2xl text-center w-72 font-normal">{title}</div>
        <div className="text-base font-normal text-gray-600">{text}</div>
      </div>
    </Modal>
  );
}

export default ModalDisable;
