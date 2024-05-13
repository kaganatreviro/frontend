/* eslint-disable */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEllipsis,
  faPenToSquare,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Menu } from "antd";
import "./style.scss";
import { fetchEstablishments } from "../../../components/api/api";

import Modal from "./Modal";

interface EstablishmentProps {
  name: string;
}

const Establishment: React.FC<EstablishmentProps> = ({ name }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("Fetching establishments...");
    fetchEstablishments()
      .then((data) => console.log("Establishments fetched:", data))
      .catch((error) => console.error("Error fetching establishments:", error));
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleMenuClick = (e: any) => {
    if (e.key === "delete") {
    } else if (e.key === "edit") {
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick} className="text-lg">
      <Menu.Item key="edit">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faPenToSquare} className="w-6 h-6 mr-2" />
          <div>Edit details</div>
        </div>
      </Menu.Item>
      <Menu.Item key="delete">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faXmark} className="w-6 h-6 mr-2" />
          <div>Delete item</div>
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="flex-1 flex partner_establishments bg-[#f4f4f4]">
      <div className="container flex-1 p-12">
        <div className="flex justify-between">
          <div className="font-medium text-4xl mb-8">Establishments</div>
        </div>
        <div>
          <div className="text-2xl text-gray-400 mb-6">
            You have 1 establishment left to add
          </div>
          <button className="bg-[#FB7E00] hover:bg-[#D56A00] text-white rounded-lg py-2 px-6 text-2xl flex items-center">
            <FontAwesomeIcon icon={faPlus} />
            <div className="ml-2" onClick={toggleModal}>
              Create New
            </div>
          </button>
        </div>

        <div className="mt-16 flex gap-8">
          <div className="bg-white w-[400px] rounded-md overflow-hidden shadow-lg p-4">
            <div className="">
              <img
                src="https://hh.ru/employer-logo/1701679.jpeg"
                className="w-full rounded-md"
                alt=""
              />
              <div className="text-3xl mb-2 mt-3">Sierra</div>
              <div className="flex items-center justify-between text-[#FB7E00]">
                <div className="flex items-center text-lg ">
                  <FontAwesomeIcon icon={faClock} className="w-5 h-5 mr-3" />
                  <div>Time: 10:00-11:00</div>
                </div>
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  overlayClassName="dropdown-wrapper"
                >
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    className="w-8 h-8  mr-3 cursor-pointer text-gray-500"
                  />
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="bg-white w-[400px] rounded-md overflow-hidden shadow-lg p-4">
            <div className="">
              <img
                src="https://hh.ru/employer-logo/1701679.jpeg"
                className="w-full rounded-md"
                alt=""
              />
              <div className="text-3xl mb-2 mt-3">Sierra</div>
              <div className="flex items-center justify-between text-[#FB7E00]">
                <div className="flex items-center text-lg ">
                  <FontAwesomeIcon icon={faClock} className="w-5 h-5 mr-3" />
                  <div>Time: 10:00-11:00</div>
                </div>
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  overlayClassName="dropdown-wrapper"
                >
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    className="w-8 h-8  mr-3 cursor-pointer text-gray-500"
                  />
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="bg-white w-[400px] rounded-md overflow-hidden shadow-lg p-4">
            <div className="">
              <img
                src="https://hh.ru/employer-logo/1701679.jpeg"
                className="w-full rounded-md"
                alt=""
              />
              <div className="text-3xl mb-2 mt-3">Sierra</div>
              <div className="flex items-center justify-between text-[#FB7E00]">
                <div className="flex items-center text-lg ">
                  <FontAwesomeIcon icon={faClock} className="w-5 h-5 mr-3" />
                  <div>Time: 10:00-11:00</div>
                </div>
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  overlayClassName="dropdown-wrapper"
                >
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    className="w-8 h-8  mr-3 cursor-pointer text-gray-500"
                  />
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        <Modal isModalOpen={isModalOpen} onClose={toggleModal} />
      </div>
    </div>
  );
};

export default Establishment;
