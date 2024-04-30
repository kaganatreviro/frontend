import { Modal, Button, Form, Input } from "antd";
import "./style.scss";

interface ModalCreateProps {
  onOk: (values: { email: string; password: string }) => void;
  onCancel: () => void;
  visible: boolean;
}

function ModalCreate({ onOk, onCancel, visible }: ModalCreateProps) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        onOk(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      open={visible}
      title="Create a Partner"
      onCancel={onCancel}
      onOk={handleOk}
      okText="Create"
      cancelText="Cancel"
      className="modal-create"
      footer={[]}
    >
      <Form
        form={form}
        layout="vertical"
        name="createPartnerForm"
        className="content"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { type: "email", message: "The input is not valid E-mail!" },
            { required: true, message: "Please input your E-mail!" },
          ]}
        >
          <Input placeholder="hello@example.com" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password placeholder="12345" />
        </Form.Item>

        <Button key="submit" type="primary" onClick={handleOk} className="modal-confirm-btn font-normal">
          Create
        </Button>
      </Form>
    </Modal>
  );
}

export default ModalCreate;
