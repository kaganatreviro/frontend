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
import { Dropdown, Menu, Card, Skeleton } from "antd";
import { deleteEstablishment, fetchEstablishments } from "../../../components/api/api";
import "./style.scss";
import Modal from "./Modal";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import { fetchEstablishmentsList } from "../../../store/actions/partner/establishemntsSlice";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import EstablishmentDetails from "./ViewDetails";

interface EstablishmentProps {
  name: string;
}

const Establishment: React.FC<EstablishmentProps> = ({ name }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedEst, setSelectedEst] = useState<number | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(fetchEstablishmentsList());
    }, [dispatch]);
  const establishments = useSelector((state: RootState) => state.establishments.establishments) || [];


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  useEffect(() => {
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

const handleDelete = async (estId: number) => {
  try {
    await deleteEstablishment(estId);
    dispatch(fetchEstablishmentsList());
  } catch (error) {
    console.error("Error deleting establishment:", error);
  }
};

  const toggleViewDetailsModal = () => {
    setIsViewDetailsModalOpen(!isViewDetailsModalOpen);
  };

  const menu = (estId: number) => (
    <Menu onClick={handleMenuClick} className="text-lg">
      <Menu.Item key="edit">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faPenToSquare} className="w-6 h-6 mr-2" />
          <div>Edit details</div>
        </div>
      </Menu.Item>
      <Menu.Item key="view" onClick={() => {
        setSelectedEst(estId);
        toggleViewDetailsModal();
      }}>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faPenToSquare} className="w-6 h-6 mr-2" />
          <div>View details</div>
        </div>
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDelete(estId)}>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faXmark} className="w-6 h-6 mr-2" />
          <div>Delete item</div>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex-1 flex partner_establishments bg-[#f4f4f4]">
      <div className=" flex-1 p-12">
        <div className="flex justify-between">
          <div className="font-medium text-4xl mb-8">Establishments</div>
        </div>
        {loading ? (
          <Card bordered={false} className="w-full">
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        ) : (
          <>
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

            <div className="mt-16 flex gap-8 flex-wrap">
              {establishments.map((establishment, index) => (
                <div
                  key={index}
                  className="bg-white w-[300px] rounded-md overflow-hidden shadow-lg p-4"
                >
                  <div className="">
                    <img
                      src={establishment.logo}
                      className="w-[250px] h-[250px] rounded-md"
                      alt=""
                    />
                    <div className="text-xl mt-3">{establishment.name}</div>
                    <div className="flex items-center justify-between text-[#FB7E00]">
                      <div className="flex items-center text-sm ">
                        <FontAwesomeIcon
                          icon={faClock}
                          className="w-3 h-3 mr-2"
                        />
                        <div>
                          Time: {establishment.happyhours_start.slice(0, 5)}:
                          {establishment.happyhours_end.slice(0, 5)}
                        </div>
                      </div>
                      <Dropdown
                        overlay={menu(establishment.id)}
                        trigger={["click"]}
                        overlayClassName="dropdown-wrapper"
                      >
                        <FontAwesomeIcon
                          icon={faEllipsis}
                          className="w-5 h-5  mr-3 cursor-pointer text-gray-500"
                        />
                      </Dropdown>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Modal isModalOpen={isModalOpen} onClose={toggleModal} />
            <EstablishmentDetails
              isOpen={isViewDetailsModalOpen}
              onClose={toggleViewDetailsModal}
              establishmentId={selectedEst}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Establishment;
