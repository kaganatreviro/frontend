/* eslint-disable */
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Form, Input } from "antd";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handlePhoneChange = (phone: string) => {
    setInternalValue(phone);
    onChange(phone);
  };

  return (
    <Form.Item
      name="phone"
      rules={[
        {
          required: true,
          message: "Please enter a valid phone number",
        },
        {
          pattern: /^\d{12}$/,
          message: "Please enter a valid phone number",
        },
      ]}
    >
      <PhoneInput
        country={"kg"}
        value={internalValue}
        onChange={handlePhoneChange}
        countryCodeEditable={false}
        inputStyle={{
          width: "100%",
          height: "40px",
          borderRadius: "4px",
          border: "1px solid #d9d9d9",
          paddingLeft: "8px",
        }}
        placeholder="Enter your phone"
      />
    </Form.Item>
  );
};

export default CustomPhoneInput;
