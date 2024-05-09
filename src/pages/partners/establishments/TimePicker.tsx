/* eslint-disable */
import React, { useState } from "react";
import { TimePicker, Form } from "antd";
import dayjs from "dayjs";
import { RangePickerProps } from "antd/lib/date-picker";

const TimeRangePickers: React.FC = () => {
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleChange: RangePickerProps["onChange"] = (dates, dateStrings) => {
    if (dates && dates[0]) {
      setStartTime(dates[0].format("HH:mm"));
    } else {
      setStartTime(null);
    }
    if (dates && dates[1]) {
      setEndTime(dates[1].format("HH:mm"));
    } else {
      setEndTime(null);
    }
  };

  const validateEndTime = (_: any, value: string[]) => {
    if (!value || (value && value.length === 0)) {
      return Promise.reject("");
    }
    const end = dayjs(value[1], "HH:mm");
    const start = dayjs(value[0], "HH:mm");
    if (end.isAfter(start)) {
      return Promise.resolve();
    }
    return Promise.reject("End time must be after start time!");
  };

  return (
      <Form.Item
        label="Time Range"
        name="timeRange"
        rules={[
          {
            type: "array",
            required: true,
            message: "Please select time range!",
          },
          { validator: validateEndTime },
        ]}
      >
        <TimePicker.RangePicker onChange={handleChange} format="HH:mm" />
      </Form.Item>
  );
};

export default TimeRangePickers;