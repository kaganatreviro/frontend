/* eslint-disable */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Input, Form, message } from "antd";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import { updateEstablishment } from "../../../components/api/api";
import { fetchEstablishmentsList } from "../../../store/actions/partner/establishemntsSlice";
import { RootState } from "store/store";
import PhoneInput from "./PhoneInput";
import Map from "./map";
import ImageUploader from "./ImageUploader";
import TimeRangePickers from "./TimePicker";

interface EditModalProps {
  isEditOpen: boolean;
  onClose: () => void;
  establishmentId: number | null;
}

const EditModal: React.FC<EditModalProps> = ({
  isEditOpen,
  onClose,
  establishmentId,
}) => {
  const establishment = useSelector((state: RootState) =>
    state.establishments.establishments.find(
      (est) => est.id === establishmentId
    )
  );

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [input, setInput] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<File | string | null>(
    null
  );
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (establishment) {
      setPhoneNumber(establishment.phone_number || "");
      setDescription(establishment.description || "");
      setName(establishment.name || "");
      setEmail(establishment.email || "");
      setStartTime(establishment.happyhours_start || "");
      setEndTime(establishment.happyhours_end || "");
      setLongitude(establishment.location.coordinates[0] || null);
      setLatitude(establishment.location.coordinates[1] || null);
      setInput(establishment.address || "");
      setUploadedImage(establishment.logo || null);
    }
  }, [establishment]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append(
        "location",
        JSON.stringify({ type: "Point", coordinates: [longitude, latitude] })
      );
      formData.append("description", description);
      formData.append("phone_number", phoneNumber);
      formData.append("email", email);
      formData.append("address", input);
      if (startTime !== null) {
        formData.append("happyhours_start", startTime);
      }
      if (endTime !== null) {
        formData.append("happyhours_end", endTime);
      }

      if (uploadedImage instanceof File) {
        formData.append("logo", uploadedImage);
      } else if (typeof uploadedImage === "string") {
        formData.append("logoUrl", uploadedImage);
      }

      const response = await updateEstablishment(
        establishmentId as number,
        formData
      );
      console.log("Response:", response);
      message.success("Establishment updated successfully!");
      dispatch(fetchEstablishmentsList());
      onClose();
    } catch (error) {
      console.error("Failed to update establishment:", error);
      message.error("Failed to update establishment.");
    }
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

  const handleImageUploadInModal = (file: File | null) => {
    setUploadedImage(file);
  };

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  if (!isEditOpen) return null;

  return (
    isEditOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-[750px] rounded-md overflow-hidden shadow-lg pt-4 px-10 h-[820px]">
          <div className="flex justify-between pt-2 mb-4">
            <div className="text-2xl">Edit Establishment's Profile:</div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FontAwesomeIcon icon={faXmark} className="w-8 h-8" />
            </button>
          </div>

          <Form
            name="editForm"
            onFinish={handleUpdate}
            encType="multipart/form-data"
            initialValues={{
              name: establishment?.name,
              email: establishment?.email,
              phone: establishment?.phone_number,
              description: establishment?.description,
            }}
          >
            <div className="flex gap-20 ">
              <div>
                <ImageUploader
                  image={uploadedImage}
                  onUpload={handleImageUploadInModal}
                  defaultValue={establishment?.logo}
                />
              </div>

              <div>
                <div className="mb-3 h-[90px]">
                  <h1 className="text-md font-bold mb-2">Name:</h1>
                  <Form.Item
                    name="name"
                    initialValue={name}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the establishment's name",
                      },
                    ]}
                  >
                    <Input
                      onChange={handleNameChange}
                      className="text-lg w-[350px] h-[46px] border-gray-300 placeholder:text-gray-300"
                      placeholder="Enter establishment's name"
                    />
                  </Form.Item>
                </div>

                <div className="mb-3 h-[90px]">
                  <h1 className="text-md font-bold mb-2">Email:</h1>
                  <Form.Item
                    name="email"
                    initialValue={email}
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                      {
                        required: true,
                        message: "Please enter the email",
                      },
                    ]}
                  >
                    <Input
                      onChange={handleEmailChange}
                      className="text-lg w-[350px] h-[46px] border-gray-300 placeholder:text-gray-300"
                      placeholder="Enter email"
                    />
                  </Form.Item>
                </div>

                <div>
                  <div className="mb-3 h-[75px]">
                  <h1 className="text-md mb-2 font-bold">Phone Number:</h1>
                  <Form.Item
                    name="phone"
                    initialValue={phoneNumber}
                    rules={[
                      {
                        required: true,
                        message: "Please enter a valid phone number",
                      },
                    ]}
                  >
                    <PhoneInput
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                    />
                  </Form.Item>
                  </div>
                  <div className="mb-3 h-[75px]">
                    <div className="mb-2 text-md font-bold">Time:</div>
                    <TimeRangePickers
                      onStartTimeChange={handleStartTimeChange}
                      onEndTimeChange={handleEndTimeChange}
                      defaultValue={[
                        establishment?.happyhours_start ?? null,
                        establishment?.happyhours_end ?? null,
                      ]}
                    />
                  </div>
                  <div className="mb-3 h-[105px]">
                    <div className="mb-2 text-md font-bold">Location:</div>

                    <Form.Item name="location">
                      <Map
                        onLocationSelect={handleLocationSelect}
                        loc={{
                          lat: establishment?.location.coordinates[1],
                          lng: establishment?.location.coordinates[0],
                          address: establishment?.address,
                        }}
                      />
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
                        defaultValue={description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter description"
                        maxLength={1000}
                        className="w-[350px] border-gray-300 placeholder-gray-300 text-lg"
                        style={{ height: "100px" }}
                      />
                    </Form.Item>
                  </div>
                  <div className="mt-8 flex justify-end">
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

export default EditModal;