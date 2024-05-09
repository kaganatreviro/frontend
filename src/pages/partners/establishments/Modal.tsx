/* eslint-disable */
import React, { useState } from "react";
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

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
  };
  const handleTimeChange = (value: Date | null) => {
    setSelectedTime(value);
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

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
  };
  const [form] = Form.useForm();
  
  const onFinish = (values: any) => {
    console.log("Received values:", values);
    console.log("Saved!");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-[750px] rounded-md overflow-hidden shadow-lg pt-10 px-10">
          <div className="flex justify-between pt-2 mb-12">
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div className="flex mb-10 gap-20 ">
              <div>
                <ImageUploader onUpload={handleImageUpload} />
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
                    <TimeRangePickers />
                  </div>
                  <div className="mb-3">
                    <div className="mb-2 text-lg font-bold">Location:</div>
                    <Map />
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
                        style={{ height: "200px" }}
                      />
                    </Form.Item>
                  </div>
                  <div className=" mt-8 flex justify-end">
                    <Form.Item>
                      {" "}
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
