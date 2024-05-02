import { Modal, Button, Form, Input } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import createModerator from "./createModerator";

interface ModalCreateProps {
  onCancel: () => void;
  visible: boolean;
}

function ModalCreate({ onCancel, visible }: ModalCreateProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector((state) => state.auth.accessToken);
  console.log(accessToken);

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        try {
          await createModerator(values.email, values.password, accessToken);
          form.resetFields();
          onCancel();
        } catch (error) {
          console.error("Failed to create moderator:", error);
        } finally {
          setLoading(false);
        }
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
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          loading={loading}
        >
          Create
        </Button>,
      ]}
      className="modal-create"
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
            { type: "email", message: "This email is not valid" },
            { required: true, message: "Please enter your email" },
          ]}
        >
          <Input placeholder="hello@example.com" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your Password!" }]}
        >
          <Input.Password placeholder="12345" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalCreate;
