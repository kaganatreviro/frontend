import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Switch, Button } from "antd";
import { CloseOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { fetchEstablishmentsList } from "../../../store/actions/partner/establishemntsSlice";
import { deleteMenuId } from "../../../components/api/api";
import ModalDisable from "../../../components/modal/disable/ModalDisable";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import { RootState } from "../../../store/store";
import { getMenu, setCorrectMenuId } from "../../../store/actions/partner/menu";
import ModalCreateMenu from "../../../components/modal/create-menu/modalCreateMenu";
import { fetchCategoriesList } from "../../../store/actions/admin/categories/categories";
import "./style.scss";

function Menu() {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.partnerMenu.items);
  const currentId = useSelector((state: RootState) => state.partnerMenu.correctMenuId);
  const error = useSelector((state: RootState) => state.partnerMenu.error);
  const status = useSelector((state: RootState) => state.partnerMenu.status);
  const establishments = useSelector((state: RootState) => state.establishments.establishments)
    || [];
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleBlock, setIsModalVisibleBlock] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  console.log("establishments", establishments[0]?.id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCategoriesList());
        const establishments = await dispatch(fetchEstablishmentsList()).unwrap();
        if (establishments[0]?.id) {
          await dispatch(getMenu(establishments[0].id));
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const onChange = (id: number, checked: boolean) => {
    console.log(`Switch for item ${id} is ${checked ? "ON" : "OFF"}`);
    // Here you can handle the update to the availability status
  };

  const handleAddItem = () => {
    setEditingItem(null); // Clear editing item
    setModalVisible(true);
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item); // Set current item for editing
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSubmit = (values: any) => {
    console.log("Submitted values:", values);
    setModalVisible(false);
    dispatch(getMenu(establishments[0].id));
  };

  const handleOk = async () => {
    if (currentId) {
      try {
        await deleteMenuId(currentId);
        dispatch(getMenu(establishments[0].id));
      } catch (error) {
        console.error("Failed status:", error);
      }
      setIsModalVisibleBlock(false);
    }
  };

  const handleCancelBlock = () => {
    setIsModalVisibleBlock(false);
  };

  const confirmDelete = (id: number) => {
    dispatch(setCorrectMenuId(id));
    setIsModalVisibleBlock(true);
  };

  return (
    <div className="flex-1 flex bg-[#f4f4f4]">
      <div className="flex-1 partner_menu container">
        <div className="flex flex-col h-full items-start p-12 bg-gray-100 flex-1">
          <div className="font-medium text-4xl mb-8">Menu Manager</div>
          <div className="text-sm text-gray-400 mb-6">Manage your menu easily with adding, editing, and removing beverages.</div>
          <Button type="primary" icon={<PlusOutlined />} className="modal-confirm-btn" onClick={handleAddItem} style={{ marginBottom: 16 }}>
            Add New
          </Button>
          {status === "failed" ? (<div className="font-medium text-3xl">Empty menu</div>) : (
            <div className="cards_container">
              {data.map((item: any) => (
                <Card
                  title={(
                    <div>
                      <div>{item.name}</div>
                      <div className="text-sm text-gray-400 description">{item.description}</div>
                    </div>
                  )}
                  bordered={false}
                  style={{ width: 300 }}
                  key={item.id}
                  extra={<CloseOutlined onClick={() => confirmDelete(item.id)} style={{ color: "#B2C1C0", cursor: "pointer" }} />}
                >
                  <div>
                    <span className="text-sm text-gray-400">Price:</span>
                    {" "}
                    <span>
                      {Math.round(item.price)}
                      {" "}
                      som
                    </span>
                  </div>
                  <div className="content">
                    <div className="flex gap-1 text-[#FB7E00]" onClick={() => handleEditItem(item)}>
                      <EditOutlined className="text-[#FB7E00]" />
                      <div>Edit</div>
                    </div>
                    <div className="flex gap-2">
                      <div>Availability</div>
                      <Switch
                        className="custom-switch"
                        defaultChecked={item.availability_status}
                        onChange={(checked) => onChange(item.id, checked)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <ModalDisable
        title={"Are you sure you want \n to delete this beverage?"}
        onOk={handleOk}
        onCancel={handleCancelBlock}
        visible={isModalVisibleBlock}
      />

      <ModalCreateMenu
        isVisible={isModalVisible}
        onCancel={handleModalClose}
        onSubmit={handleSubmit}
        initialValues={editingItem || undefined} // Pass initial values for editing
      />
    </div>
  );
}

export default Menu;
