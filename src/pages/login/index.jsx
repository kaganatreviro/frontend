/* eslint-disable */
import React, { useState } from "react";
import Logo from "../../assets/icons/Happy_Hours_Logo.png";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import login from "../../assets/Logo/Login.png";
import "./style.scss";

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (value) => {
    console.log(value);
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
          errors: ["Invalid email or password"],
        },
        {
          name: "password",
          errors: ["Invalid email or password"],
        },
      ]);
    } else {
      navigate("/users");
    }
  };

  return (
    <div className=" bg-white h-screen flex items-center justify-center">
      <div className="w-1/2 flex items-center flex-col">
        <div className=" border-[#FFE4C3] border-4 w-[400px] pt-20 pb-20 px-12 rounded-lg flex flex-col items-center">
          <div className="flex">
            <img src={Logo} alt="Happy Hours Logo" className="mb-8 w-9" />
            <div className="ml-2 text-3xl font-medium mb-6">HAPPY HOURS</div>
          </div>
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
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                {
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
              label="Email Address:"
            >
              <Input
                placeholder="Enter your email"
                style={{
                  height: "40px",
                  width: "250px",
                }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password:"
              style={{ width: "250px", height: "80px" }}
              rules={[
                { required: true, message: "Please enter your password" },
                {
                  min: 8,
                  message: "Password must be at least 8 characters",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                style={{
                  height: "40px",
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  backgroundColor: "#FB7E00",
                  height: "40px",
                  width: "250px",
                  marginTop: "20px",
                }}
              >
                <div>Log in</div>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="bg-[#FFC68E] h-full flex items-center justify-center w-1/2">
        <div className="rounded-3xl  items-center flex flex-col py-10">
          <img src={login} alt="" />
          <div className="text-[#B25900] text-[64px] font-light text-center">
            Welcome Back!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
