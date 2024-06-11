import { Modal, Button, Form, Input, message } from "antd";
import { useState } from "react";
import { createPartner } from "../../api/api";
import { fetchPartner } from "../../../store/actions/admin/partner/partnerActions";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import "./style.scss";

interface ModalCreateProps {
  onCancel: () => void;
  visible: boolean;
}

function ModalCreate({ onCancel, visible }: ModalCreateProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      // console.log("Form Values:", values);
      const response = await createPartner(values);
      dispatch(fetchPartner());
      // console.log("Response:", response);
      form.resetFields();
      setLoading(false);
      onCancel();
      message.success("Partner created successfully!"); // Use message.success
    } catch (error: any) {
      console.error("Failed to create partner:", error);
      setLoading(false);
      message.error(`Failed to create partner: ${error.message || "Unexpected error"}`); // Use message.error
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
          className="btn"
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
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input placeholder="Name" autoComplete="off" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { type: "email",
              message: "This email is not valid",
            },
            {
              required: true,
              message: "Please enter your email",
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Email should contain only English letters, numbers, and basic symbols.",
            },
          ]}
        >
          <Input placeholder="hello@example.com" autoComplete="off" />
        </Form.Item>

        <Form.Item
          name="max_establishments"
          label="Max establishments"
          rules={[{ required: true, message: "Please enter max establishments" }]}
        >
          <Input placeholder="1" autoComplete="off" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" },
            { min: 8, message: "Password must be at least 8 characters long" }]}
        >
          <Input.Password placeholder="Enter your password" autoComplete="new-password" />
        </Form.Item>

        <Form.Item
          name="password_confirm"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            { min: 8, message: "Password must be at least 8 characters long" },
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
          <Input.Password placeholder="Confirm your password" autoComplete="new-password" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalCreate;
