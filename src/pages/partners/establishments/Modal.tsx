/* eslint-disable */
import React, { useEffect, useState } from "react";
import { createEstablishment } from "../../../components/api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PhoneInput from "./PhoneInput";
import Map from "./map";
import { Input, Form, message } from "antd";
import ImageUploader from "./ImageUploader";
import TimeRangePickers from "./TimePicker";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import { fetchEstablishmentsList } from "../../../store/actions/partner/establishemntsSlice";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isModalOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<number | undefined>(undefined);
  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [input, setInput] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const profile = useSelector(
    (state: RootState) => state.partnerProfile.profile
  );

  const [form] = Form.useForm();
  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleImageUploadInModal = (file: File | null) => {
    setUploadedImage(file);
    form.setFieldsValue({ logo: file });
  
    form.validateFields(['logo']);
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
    form.setFieldsValue({ location: address });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append(
        "location",
        JSON.stringify({ type: "Point", coordinates: [longitude, latitude] })
      );
      formData.append("description", values.description);
      formData.append("phone_number", phoneNumber);
      formData.append("email", values.email);
      formData.append("address", values.location);
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
      dispatch(fetchEstablishmentsList());
      onClose();
      console.log(localStorage);
    } catch (error) {
      console.error("Failed to create establishment:", error);
      message.error("Failed to create establishment.");
    }
  };
  useEffect(() => {
    if (!isModalOpen) {
      setInput("");
      setLatitude(undefined);
      setLongitude(undefined);
    }
  }, [isModalOpen]);

  return (
    isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-[750px] rounded-md overflow-hidden shadow-lg pt-4 px-10 h-[820px]">
          <div className="flex justify-between pt-2 mb-4">
            <div className="text-2xl">Establishment's Profile:</div>
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
                <Form.Item
                  name="logo"
                  rules={[
                    {
                      required: true,
                      message: "Please upload an image",
                    },
                  ]}
                >
                  <ImageUploader
                    image={uploadedImage}
                    onUpload={handleImageUploadInModal}
                  />
                </Form.Item>
              </div>

              <div>
                <div className="mb-3">
                  <div className="h-[600px]">

                    <div className="h-[90px]">
                      <h1 className="text-md font-bold mb-2">Name:</h1>
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
                          className="text-md w-[350px] h-10 border-gray-300 placeholder:text-gray-300"
                          placeholder="Enter establishment's name"
                        />
                      </Form.Item>
                    </div>
                    <div className="h-[90px]">
                      <h1 className="text-md font-bold mb-2">Email:</h1>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            type: 'email',
                            message: "Please enter a valid email address",
                          },
                        ]}
                      >
                        <Input
                          onChange={handleEmailChange}
                          className="text-lg w-[350px] h-10 border-gray-300 placeholder:text-gray-300"
                          placeholder="Enter email"
                        />
                      </Form.Item>
                    </div>
                    <div className="mb-3 h-[75px]">
                      <h1 className="text-md mb-2 font-bold">Phone Number:</h1>
                      <PhoneInput
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                      />
                    </div>
                    <div className="mb-3 h-[75px]">
                      <div className="mb-2 text-md font-bold">Time:</div>
                      <TimeRangePickers
                        onStartTimeChange={handleStartTimeChange}
                        onEndTimeChange={handleEndTimeChange}
                      />
                    </div>
                    <div className="mb-3 h-[105px]">
                      <div className="mb-2 text-md font-bold">Location:</div>
                      <Form.Item
                        name="location"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your location",
                          },
                        ]}
                      >
                        <Map onLocationSelect={handleLocationSelect} loc={{ address: input, lat: latitude, lng: longitude }} />

                      </Form.Item>
                    </div>

                    <div className="h-[125px]">
                      <h1 className="mb-2 text-md font-bold">Description:</h1>
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
                          style={{ height: "80px" }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className=" mt-16 flex justify-end">
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