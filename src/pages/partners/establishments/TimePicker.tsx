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



  return (
    <div>
      <div className="flex gap-4">
        <input
          type="time"
          value={startTime || ""}
          onChange={(e) => handleChange("start", e.target.value)}
          className={`w-full h-10 border ${error ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
        />
        <input
          type="time"
          value={endTime || ""}
          onChange={(e) => handleChange("end", e.target.value)}
          className={`w-full h-10 border ${error ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
        />
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default TimeRangePickers;
