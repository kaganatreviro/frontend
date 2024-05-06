/* eslint-disable */

  // email: "happyadmin@mail.com"
  //   password: "kaganat1"

  import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import login from "../../assets/Logo/Login.png";
import Logo from "../../assets/icons/Happy_Hours_Logo.png";
import { setAccessToken, setRefreshToken, setUserType } from "../../store/actions/authActions";
import { loginAdmin, loginPartner } from "../../components/api/api";
import "./style.scss";

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = async (values) => {
    try {
      await form.validateFields(values);
      const response = await (location.pathname.startsWith("/admin/login") ? loginAdmin(values) : loginPartner(values));
      if (response) {
        sessionStorage.setItem("authToken", response.access);
        dispatch(setAccessToken(response.access));
        dispatch(setRefreshToken(response.refresh));
      }
      localStorage.setItem("userType", location.pathname.startsWith("/admin/login") ? "admin" : "partner");
      console.log("Logged in successfully!", response);
      navigate(location.pathname.startsWith("/admin/login") ? "/users" : "/qrcode");
    } catch (error) {
      console.log("Failed:", error);
      if (error.response && error.response.status) {
        form.setFields([
          {
            name: "email",
            errors: ["Invalid email or password"],
          },
          {
            name: "password",
            errors: ["Invalid email or password"],
          },
        ]);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <div className=" bg-white h-screen flex items-center justify-items-center gap-5 w-full">
      <div className="flex items-center flex-col w-1/2">
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
              name="email"
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

      <div className="bg-[#FF9328] h-full flex items-center justify-center w-1/2">
        <div className="rounded-3xl  items-center flex flex-col py-10">
          <img src={login} alt="" />
          <div className="text-[#321A01] text-[64px] font-light text-center">
            Welcome Back!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;