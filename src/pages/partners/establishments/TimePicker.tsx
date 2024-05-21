/* eslint-disable */
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

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

  useEffect(() => {
    if (props.defaultValue) {
      setStartTime(props.defaultValue[0]);
      setEndTime(props.defaultValue[1]);
    }
  }, [props.defaultValue]);

  const handleChange = (type: "start" | "end", value: string) => {
    if (type === "start") {
      setStartTime(value);
      props.onStartTimeChange(value);
    } else {
      setEndTime(value);
      props.onEndTimeChange(value);
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
    <div>
      <input
        type="time"
        value={startTime || ""}
        onChange={(e) => handleChange("start", e.target.value)}
      />
      <br />
      <input
        type="time"
        value={endTime || ""}
        onChange={(e) => handleChange("end", e.target.value)}
      />
    </div>
  );
};

export default TimeRangePickers;