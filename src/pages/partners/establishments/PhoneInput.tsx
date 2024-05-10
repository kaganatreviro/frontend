/* eslint-disable */
import React from "react";
import PhoneInput from "react-phone-input-2";
import { Form, Input } from "antd";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const handlePhoneChange = (phone: string) => {
    onChange(phone);
  };
  console.log(value)

  return (
    <Form.Item
      name="phone"
      rules={[
        {
          required: true,
          message: "Please enter a valid phone number",
        },
        {
          pattern:
            /^996\d{9}$/,
          message: "Please enter a valid phone number",
        },
      ]}
    >
      <PhoneInput
        country={"kg"}
        value={value}
        onChange={handlePhoneChange}
        inputStyle={{
          width: "100%",
          height: "40px",
          borderRadius: "4px",
          border: "1px solid #d9d9d9",
          paddingLeft: "8px",
        }}
        placeholder="Enter your phone"
        inputProps={{
          required: true,
        }}
      />
    </Form.Item>
  );
};

export default CustomPhoneInput;