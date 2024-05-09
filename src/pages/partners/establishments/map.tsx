/* eslint-disable */
"AIzaSyAkxqtXfwB-RgYwTwR38_3Vp6Fm88xH2OE";
import React, { useState, useRef, ReactNode, CSSProperties } from "react";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Form, Input } from "antd";

const containerStyle = {
  width: "680px",
  height: "720px",
};

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};


function Map() {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 42.8746,
    lng: 74.5698,
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const [showMapModal, setShowMapModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [submitted, setSubmitted] = useState(false);

const handlePlaceSelect = () => {
  if (searchValue.trim() === "") {
    setError("Please enter your location");
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
    } else {
      setError("Invalid location");
    }
  }
};
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePlaceSelect();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setError("");
  };

  const handleMapClick = (e: google.maps.MapMouseEvent | null) => {
    if (e && e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
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
          setSearchValue(results[0].formatted_address);
        }
      });
    }
  };

  const openMapModal = () => {
    setShowMapModal(true);
  };

  const closeMapModal = () => {
    setShowMapModal(false);
  };

  const modalStyles: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ffffff",
    width: "750px",
    height: "880px",
    zIndex: 100,
    paddingTop: "14px",
  };

  return (
    <div>
      <LoadScript
        googleMapsApiKey="AIzaSyAkxqtXfwB-RgYwTwR38_3Vp6Fm88xH2OE"
        libraries={["places"]}
      >
        <Form.Item
          validateStatus={
            searchValue.trim() === "" && !showMapModal && error ? "error" : ""
          }
          help={
            searchValue.trim() === "" && !showMapModal && error
              ? "Please enter your location"
              : ""
          }
        >
          <Autocomplete
            onLoad={(ac) => (autocompleteRef.current = ac)}
            onPlaceChanged={handlePlaceSelect}
          >
            <input
              type="text"
              placeholder="Enter your address"
              className="w-[350px] py-2 px-3 border-gray-300 placeholder:text-gray-300 h-[46px] rounded-lg border focus:outline-none focus:border-blue-500 hover:border-blue-500 transition ease-in-out delay-150"
              value={searchValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </Autocomplete>
        </Form.Item>

        <div
          className="ml-2 text-[#FB7E00] text-xl flex cursor-pointer mt-[-20px]"
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
                  center={selectedLocation}
                  zoom={13}
                  onClick={handleMapClick}
                  onLoad={(map) => {
                    mapRef.current = map;
                    const marker = new window.google.maps.Marker({
                      position: selectedLocation,
                      map: map,
                    });
                    markerRef.current = marker;
                  }}
                />
                <button
                  onClick={closeMapModal}
                  className="text-[#FB7E00] hover:text-[#c4874a] focus:outline-none flex items-center self-start mt-10 ml-12"
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
}

export default Map;
