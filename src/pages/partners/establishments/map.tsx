/* eslint-disable */
import React, { useState, useRef, ReactNode, CSSProperties, useEffect } from "react";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Form, Input } from "antd";

const containerStyle = {
  width: "650px",
  height: "600px",
};

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

interface MapProps {
  onLocationSelect: (
    location: { lat: number; lng: number },
    address: string
  ) => void;
  loc?: { lat: number | undefined; lng: number | undefined; address?: string };
}

const Map: React.FC<MapProps> = ({ onLocationSelect, loc }) => {
  const defaultLocation = loc || { lat: 42.8746, lng: 74.5698 };
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);
  const [searchValue, setSearchValue] = useState<string>(loc?.address || "");
  const [showMapModal, setShowMapModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [form] = Form.useForm();

  useEffect(() => {
    console.log("useEffect - searchValue changed:", searchValue);
    form.setFieldsValue({ location: searchValue });
    console.log("Form values after setFieldsValue:", form.getFieldsValue());
    form.validateFields(["location"]);
  }, [searchValue, form]);


  const handlePlaceSelect = () => {
    console.log("handlePlaceSelect called with searchValue:", searchValue);
    if (searchValue.trim() === "") {
      setError("Please enter your locationйцу");
      return;
    }
    setError("");

    if (autocompleteRef.current) {
      const addressObject = autocompleteRef.current.getPlace();
      if (
        addressObject &&
        addressObject.geometry &&
        addressObject.geometry.location
      ) {
        const lat = addressObject.geometry.location.lat();
        const lng = addressObject.geometry.location.lng();
        setSelectedLocation({ lat, lng });
        setSearchValue(addressObject.formatted_address || "");
        if (markerRef.current) {
          markerRef.current.setPosition({ lat, lng });
        }
        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
        }
        onLocationSelect({ lat, lng }, addressObject.formatted_address || "");

        form.setFieldsValue({ location: addressObject.formatted_address || "" });
        console.log("Form values after setFieldsValue in handlePlaceSelect:", form.getFieldsValue());
        form.validateFields(["location"]);
      } else {
        setError("Invalid location");
      }
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePlaceSelect();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleInputChange - new value:", e.target.value);
    setSearchValue(e.target.value);
    setError("");
    form.setFieldsValue({ location: e.target.value });
    console.log("Form values after setFieldsValue in handleInputChange:", form.getFieldsValue());
    form.validateFields(["location"]);
  };


  const handleMapClick = (e: google.maps.MapMouseEvent | null) => {
    if (e && e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      console.log("handleMapClick - new location:", { lat, lng });
      setSelectedLocation({ lat, lng });

      if (markerRef.current) {
        markerRef.current.setPosition({ lat, lng });
      }
      if (mapRef.current) {
        mapRef.current.panTo({ lat, lng });
      }
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (
          status === "OK" &&
          results &&
          results.length > 0 &&
          results[0].formatted_address
        ) {
          const address = results[0].formatted_address;
          console.log("geocoder result - address:", address);
          setSearchValue(address);
          onLocationSelect({ lat, lng }, address);

          form.setFieldsValue({ location: address });
          console.log("Form values after setFieldsValue in handleMapClick:", form.getFieldsValue());
          form.validateFields(["location"]);
        }
      });
    }
  };


  const openMapModal = () => {
    console.log("openMapModal called");
    setShowMapModal(true);
  };

  const closeMapModal = () => {
    console.log("closeMapModal called");
    setShowMapModal(false);
  };

  const modalStyles: CSSProperties = {
    position: "absolute",
    top: "-50%",
    left: "16%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ffffff",
    width: "750px",
    height: "800px",
    zIndex: 100,
    paddingTop: "30px",
  };

  return (
    <div className="">
      <LoadScript googleMapsApiKey={API_KEY || ""} libraries={["places"]}>
        <Form form={form} initialValues={{ location: searchValue }}>
          <Form.Item
            name="location"
            rules={[
              {
                required: true,
                message: "Please enter your address",
              },
            ]}
          >
            <div>
              <Autocomplete
                onLoad={(ac) => {
                  console.log("Autocomplete onLoad - autocomplete instance:", ac);
                  autocompleteRef.current = ac;
                }}
                onPlaceChanged={handlePlaceSelect}
              >
                <Input
                  type="text"
                  placeholder="Enter your address"
                  className="w-[350px] px-3 border-gray-300 placeholder:text-gray-300 h-10 rounded-lg border focus:outline-none focus:border-blue-500 hover:border-blue-500 transition ease-in-out delay-150"
                  value={searchValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
              </Autocomplete>
            </div>
          </Form.Item>
        </Form>

        <div
          className="ml-2 text-[#FB7E00] text-xl flex cursor-pointer mt-[-10px]"
          onClick={openMapModal}
        >
          <div>or choose it from the map</div>
          <FontAwesomeIcon icon={faArrowRight} className="w-6 h-6 ml-1 mt-1" />
        </div>
        {showMapModal && (
          <Modal onClose={closeMapModal}>
            <div onClick={(e) => e.stopPropagation()} style={modalStyles}>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold mb-6">
                  Pin your address on the map
                </div>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={{
                    lat: selectedLocation.lat || 42.8746,
                    lng: selectedLocation.lng || 74.5698,
                  }}
                  zoom={13}
                  onClick={handleMapClick}
                  onLoad={(map) => {
                    console.log("GoogleMap onLoad - map instance:", map);
                    mapRef.current = map;
                    const marker = new window.google.maps.Marker({
                      position: {
                        lat: selectedLocation.lat || 42.8746,
                        lng: selectedLocation.lng || 74.5698,
                      },
                      map,
                    });
                    markerRef.current = marker;
                  }}
                />
                <button
                  onClick={closeMapModal}
                  className="text-[#FB7E00] hover:text-[#c4874a] focus:outline-none flex items-center self-start mt-8 ml-12"
                >
                  <FontAwesomeIcon
                    icon={faArrowLeftLong}
                    className="w-7 h-7 mr-2"
                  />
                  <div className="text-3xl">Back</div>
                </button>
              </div>
            </div>
          </Modal>
        )}
      </LoadScript>
    </div>
  );
};

export default Map;