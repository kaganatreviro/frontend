/* eslint-disable */
import React, { useState } from "react";
import { createEstablishment } from "../../../components/api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PhoneInput from "./PhoneInput";
import CustomTimePicker from "./TimePicker";
import Map from "./map";
import { Input, Form, Button, message } from "antd";
import ImageUploader from "./ImageUploader";
import TimeRangePickers from "./TimePicker";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isModalOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [longitude, setLongitude] = React.useState<number | null>(null);
  const [latitude, setLatitude] = React.useState<number | null>(null);
  const [input, setInput] = React.useState<string>("");

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleImageUploadInModal = (file: File | null) => {
    setUploadedImage(file);
    console.log(file instanceof File);
  };

  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const handleStartTimeChange = (time: string | null) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time: string | null) => {
    setEndTime(time);
  };

  const handleLocationSelect = (
    location: { lat: number; lng: number },
    address: string
  ) => {
    setLongitude(location.lng);
    setLatitude(location.lat);
    setInput(address);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append(
        "location",
        JSON.stringify({ type: "Point", coordinates: [longitude, latitude] })
      );
      formData.append("description", description);
      formData.append("phone_number", phoneNumber);
      formData.append("email", "Sierra@gmail.com");
      formData.append("address", input);
      if (startTime !== null) {
        formData.append("happyhours_start", startTime);
      }
      if (endTime !== null) {
        formData.append("happyhours_end", endTime);
      }

      if (uploadedImage !== null) {
        formData.append("logo", uploadedImage);
      }

      const response = await createEstablishment(formData);
      console.log("Response:", response);
      localStorage.setItem("establishmentId", response.id);
      message.success("Establishment created successfully!");
      onClose();
      console.log(localStorage);

    } catch (error) {
      console.error("Failed to create establishment:", error);
      message.error("Failed to create establishment.");
    }
  };

  return (
    isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-[750px] rounded-md overflow-hidden shadow-lg pt-8 px-10">
          <div className="flex justify-between pt-2 mb-10">
            <div className="text-3xl">Establishment's Profile:</div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FontAwesomeIcon icon={faXmark} className="w-8 h-8" />
            </button>
          </div>

          <Form
            form={form}
            name="profileForm"
            onFinish={handleSave}
            onFinishFailed={onFinishFailed}
            encType="multipart/form-data"
          >
            <div className="flex gap-20 ">
              <div>
                <ImageUploader
                  image={uploadedImage}
                  onUpload={handleImageUploadInModal}
                />
              </div>

              <div>
                <div className="mb-3">
                  <h1 className="text-xl font-bold mb-2">Name:</h1>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your name",
                      },
                    ]}
                  >
                    <Input
                      onChange={handleNameChange}
                      className="text-lg w-[350px] h-[46px] border-gray-300 placeholder:text-gray-300"
                      placeholder="Enter establishment's name"
                    />
                  </Form.Item>
                  <div className="mb-3">
                    <h1 className="text-lg mb-2 font-bold">Phone Number:</h1>
                    <PhoneInput
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="mb-2 text-lg font-bold">Time:</div>
                    <TimeRangePickers
                      onStartTimeChange={handleStartTimeChange}
                      onEndTimeChange={handleEndTimeChange}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="mb-2 text-lg font-bold">Location:</div>
                    <Map onLocationSelect={handleLocationSelect} />
                  </div>

                  <div>
                    <h1 className="mb-2 text-lg font-bold">Description:</h1>
                    <Form.Item
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your description",
                        },
                      ]}
                    >
                      <Input.TextArea
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter description"
                        maxLength={1000}
                        className="w-[350px] border-gray-300 placeholder-gray-300 text-lg"
                        style={{ height: "100px" }}
                      />
                    </Form.Item>
                  </div>
                  <div className=" mt-8 flex justify-end">
                    <Form.Item>
                      <button className="bg-[#FB7E00] hover:bg-[#D56A00] w-[120px] justify-center text-white rounded-lg py-2 px-6 text-xl flex items-center">
                        Save
                      </button>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    )
  );
};

export default Modal;
