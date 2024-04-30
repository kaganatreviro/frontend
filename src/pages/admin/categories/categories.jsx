import React, { useState } from "react";
import { Button } from "antd";
import ModalAdd from "../../../components/modal/add/ModalAdd.tsx";
import ModalDisable from "../../../components/modal/disable/ModalDisable.tsx";
import Navigation from "../../../components/common/Navigation";

function Categories() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (value) => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Navigation />
      <Button onClick={showModal}>Добавить категорию</Button>
      <ModalDisable
        title="Are you sure you want
          to block this partner?"
        onOk={handleOk}
        onCancel={handleCancel}
        visible={isModalVisible}
        text="This action cannot be undone."
      />
    </div>
  );
}

export default Categories;
