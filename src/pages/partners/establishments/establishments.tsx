/* eslint-disable */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEllipsis,
  faList,
  faPenToSquare,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Menu, Card, Skeleton, Modal, Button, message } from "antd";
import {
  deleteEstablishment,
  fetchEstablishments,
} from "../../../components/api/api";
import "./style.scss";
import CreateModal from "./Modal";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import { fetchEstablishmentsList } from "../../../store/actions/partner/establishemntsSlice";
import { useSelector } from "react-redux";
import EstablishmentSwitcher from "../../../components/establishment/switcher/Switcher";
import { RootState } from "store/store";
import EstablishmentDetails from "./ViewDetails";
import EditModal from "./EditModal";

interface EstablishmentProps {
  name: string;
}

const Establishment: React.FC<EstablishmentProps> = ({ name }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedEst, setSelectedEst] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const [isEditDetailsModalOpen, setIsEditDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEstablishmentsList());
  }, [dispatch]);

  const establishments =
    useSelector((state: RootState) => state.establishments.establishments) ||
    [];

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

  const toggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const handleMenuClick = (e: any) => {
    if (e.key === "delete") {
    } else if (e.key === "edit") {
    }
  };

  const confirmDelete = (estId: number) => {
    setSelectedEst(estId);
    setIsDeleteModalOpen(true);
    
  };

  const handleDelete = async () => {
    if (selectedEst !== null) {
      try {
        await deleteEstablishment(selectedEst);
        dispatch(fetchEstablishmentsList());
        setIsDeleteModalOpen(false);
        message.success("Establishment deleted successfully!");
      } catch (error) {
        console.error("Error deleting establishment:", error);
      }
    }
  };

  const toggleViewDetailsModal = () => {
    setIsViewDetailsModalOpen(!isViewDetailsModalOpen);
  };

  const toggleEditDetailsModal = () => {
    setIsEditDetailsModalOpen(!isEditDetailsModalOpen);
  };

  const menu = (estId: number) => (
    <Menu onClick={handleMenuClick} className="text-md">
      <Menu.Item
        key="edit"
        onClick={() => {
          setSelectedEst(estId);
          toggleEditDetailsModal();
        }}
      >
        <div className="flex items-center">
          <FontAwesomeIcon icon={faPenToSquare} className="w-4 h-4 mr-2" />
          <div>Edit details</div>
        </div>
      </Menu.Item>
      <Menu.Item
        key="view"
        onClick={() => {
          setSelectedEst(estId);
          toggleViewDetailsModal();
        }}
      >
        <div className="flex items-center">
          <FontAwesomeIcon icon={faList} className="w-4 h-4 mr-2" />
          <div>View details</div>
        </div>
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => confirmDelete(estId)}>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faXmark} className="w-4 h-4 mr-2" />
          <div>Delete item</div>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex-1 flex partner_establishments bg-[#f4f4f4]">
      <div className=" flex-1 p-12">
        <EstablishmentSwitcher title="Establishments" />
        {loading ? (
          <Card bordered={false} className="w-full">
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        ) : (
          <>
            <div>
              <button
                className="bg-[#FB7E00] hover:bg-[#D56A00] text-white rounded-lg py-2 px-6 text-2xl flex items-center"
                onClick={toggleCreateModal}
              >
                <FontAwesomeIcon icon={faPlus} />
                <div className="ml-2">Create New</div>
              </button>
            </div>

            <div className="mt-16 flex gap-8 flex-wrap">
              {establishments.length === 0 ? (
                <div className="mt-24 text-3xl w-full flex justify-center items-center">
                  You need to add your establishments
                </div>
              ) : (
                <>
                  {establishments.map((establishment, index) => (
                    <div
                      key={index}
                      className="bg-white w-[300px] rounded-md overflow-hidden shadow-lg p-4"
                    >
                      <div className="">
                        <img
                          src={establishment.logo}
                          className="w-[270px] h-[250px] rounded-md"
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
                              Time: {establishment.happyhours_start.slice(0, 5)}
                              -{establishment.happyhours_end.slice(0, 5)}
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
                </>
              )}
            </div>
            <CreateModal isModalOpen={isCreateModalOpen} onClose={toggleCreateModal} />
            <EstablishmentDetails
              isOpen={isViewDetailsModalOpen}
              onClose={toggleViewDetailsModal}
              establishmentId={selectedEst}
            />
            <EditModal
              isEditOpen={isEditDetailsModalOpen}
              onClose={toggleEditDetailsModal}
              establishmentId={selectedEst}
            />
            <Modal
              title="Confirm Deletion"
              visible={isDeleteModalOpen}
              onOk={handleDelete}
              onCancel={() => setIsDeleteModalOpen(false)}
              footer={[
                <Button key="back" onClick={() => setIsDeleteModalOpen(false)}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  danger
                  onClick={handleDelete}
                >
                  Delete
                </Button>,
              ]}
            >
              <p>Are you sure you want to delete this establishment?</p>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default Establishment;