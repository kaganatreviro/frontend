import React from "react";
import { Form, Input, Button } from "antd";
import Logo from "../../../assets/icons/Happy_Hours_Logo.png";

function Partners() {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      checkCredentials(values.username, values.password);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const checkCredentials = (username, password) => {
    const credentials = {
      email: "admin@gmail.com",
      password: "password12345",
    };

    if (username !== credentials.email || password !== credentials.password) {
      form.setFields([
        {
          name: "username",
          errors: ["Invalid email or password."],
        },
        {
          name: "password",
          errors: ["Invalid email or password."],
        },
      ]);
    } else {
      window.location.href = "/profile";
    }
  };

  return (
    <div className="bg-[#F3F3F3] h-screen flex flex-col items-center justify-center">
      <img src={Logo} alt="Happy Hours Logo" className="mb-8" />
      <Form
        form={form}
        name="login_form"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Email Address!" }]}
          label="Email Address"
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            placeholder="Enter your password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Partners;
