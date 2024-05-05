import { Modal, Button, Form, Input, notification } from "antd";
import { useState } from "react";
import { createPartner } from "../../api/api";
import "./style.scss";

interface ModalCreateProps {
  onCancel: () => void;
  visible: boolean;
}

function ModalCreate({ onCancel, visible }: ModalCreateProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      console.log("Form Values:", values);
      const response = await createPartner(values);
      console.log("Response:", response);
      form.resetFields();
      setLoading(false);
      onCancel();
      notification.success({ message: "Partner created successfully!" });
    } catch (error: any) {
      console.error("Failed to create partner:", error);
      setLoading(false);
      notification.error({ message: "Failed to create partner", description: error.message || "Unexpected error" });
    }
  };

  return (
    <Modal
      open={visible}
      title="Create a Partner"
      onCancel={onCancel}
      className="modal-create"
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          loading={loading}
          block
          className="modal-confirm-btn"
        >
          Create
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="createPartnerForm"
        className="content"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>

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
          name="max_establishments"
          label="Max establishments"
          rules={[{ required: true, message: "Please enter max establishments" }]}
        >
          <Input placeholder="1" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          name="password_confirm"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The two passwords that you entered do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalCreate;
