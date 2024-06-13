/* eslint-disable */
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Form } from "antd";

interface TimeRangePickersProps {
  onStartTimeChange: (time: string | null) => void;
  onEndTimeChange: (time: string | null) => void;
  defaultValue?: [string | null, string | null];
}

const TimeRangePickers: React.FC<TimeRangePickersProps> = (props) => {
  const defaultStartTime = props.defaultValue ? props.defaultValue[0] : null;
  const defaultEndTime = props.defaultValue ? props.defaultValue[1] : null;

  const [startTime, setStartTime] = useState<string | null>(defaultStartTime);
  const [endTime, setEndTime] = useState<string | null>(defaultEndTime);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (props.defaultValue) {
      setStartTime(props.defaultValue[0]);
      setEndTime(props.defaultValue[1]);
    }
  }, [props.defaultValue]);

  const handleChange = (type: "start" | "end", value: string) => {
    let newStartTime = startTime;
    let newEndTime = endTime;

    if (type === "start") {
      newStartTime = value;
      setStartTime(value);
      props.onStartTimeChange(value);
    } else {
      newEndTime = value;
      setEndTime(value);
      props.onEndTimeChange(value);
    }

    if (newStartTime && newEndTime) {
      const start = dayjs(newStartTime, "HH:mm");
      const end = dayjs(newEndTime, "HH:mm");

      if (end.isBefore(start)) {
        setStartTime(newEndTime);
        setEndTime(newStartTime);
        props.onStartTimeChange(newEndTime);
        props.onEndTimeChange(newStartTime);
      }
    }
  };

  const validateTime = (rule: any, value: any, callback: any) => {
    if (!startTime || !endTime) {
      setError("Please enter a valid time range.");
      callback("Please enter a valid time range.");
    } else {
      setError(null);
      callback();
    }
  };

  return (
    <Form.Item
      name="timeRange"
      validateStatus={error ? "error" : ""}
      help={error}
      rules={[
        {
          validator: validateTime,
        },
      ]}
    >
      <div>
        <div className="flex gap-4">
          <input
            type="time"
            value={startTime || ""}
            onChange={(e) => handleChange("start", e.target.value)}
            className={`w-full h-10 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
          />
          <input
            type="time"
            value={endTime || ""}
            onChange={(e) => handleChange("end", e.target.value)}
            className={`w-full h-10 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
          />
        </div>
      </div>
    </Form.Item>
  );
};

export default TimeRangePickers;