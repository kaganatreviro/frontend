import { useState } from "react";
import { Modal, Input } from "antd";

interface ModalAddProps {
  title: string;
  onOk: (value: string | undefined) => void;
  onCancel: () => void;
  visible: boolean;
}

function ModalAdd({ title, onOk, onCancel, visible }: ModalAddProps) {
  const [value, setValue] = useState<string | undefined>();
  
  const handleOk = () => {
    onOk(value);
  };

  return (
    <Modal
      title={title}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="OK"
      cancelText="Cancel"
    >
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </Modal>
  );
}

export default ModalAdd;
