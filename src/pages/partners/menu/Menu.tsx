import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Switch, Button } from "antd";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import { RootState } from "../../../store/store";
import { getMenu } from "../../../store/actions/partner/menu";
import ModalCreateMenu from "../../../components/modal/create-menu/modalCreateMenu";
import "./style.scss";

function Menu() {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.partnerMenu.items);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  const onChange = (id: number, checked: boolean) => {
    console.log(`Switch for item ${id} is ${checked ? "ON" : "OFF"}`);
    // Here you can handle the update to the availability status
  };

  const handleAddItem = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSubmit = (values: any) => {
    console.log("Submitted values:", values);
    setModalVisible(false);
    // Handle the submit action (e.g., API call to add item)
  };

  return (
    <div className="flex-1 flex bg-[#f4f4f4]">
      <div className="flex-1 partner_menu container">
        <div className="flex flex-col h-full items-start p-12 bg-gray-100 flex-1">
          <div className="font-medium text-4xl mb-8">Menu Manager</div>
          <div className="title">Manage your menu easily with adding, editing, and removing beverages.</div>
          <Button type="primary" onClick={handleAddItem} style={{ marginBottom: 16 }}>
            Add New Item
          </Button>
          <div className="cards_container">
            {data.map((item: any) => (
              <Card title={item.name} bordered={false} style={{ width: 300 }} key={item.id}>
                <p>
                  Price: $
                  {item.price}
                </p>
                <p>
                  Category:
                  {item.category}
                </p>
                <p>
                  Establishment:
                  {item.establishment}
                </p>
                <Switch
                  checkedChildren="Available"
                  unCheckedChildren="Unavailable"
                  defaultChecked={item.availability_status}
                  onChange={(checked) => onChange(item.id, checked)}
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
      <ModalCreateMenu
        isVisible={isModalVisible}
        onCancel={handleModalClose}
        onSubmit={handleSubmit}
        categories={[
          { label: "Soft Drinks", value: "soft_drinks" },
          { label: "Hot Drinks", value: "hot_drinks" },
          { label: "Alcoholic Beverages", value: "alcoholic_beverages" },
        ]}
      />
    </div>
  );
}

export default Menu;
