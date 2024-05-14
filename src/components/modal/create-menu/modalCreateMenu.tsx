import React from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import { addItem } from "../../../store/actions/partner/menu";

interface MenuItem {
  id?: number;
  name: string;
  price: number;
  description: string;
  availability_status?: boolean;
  category: string;
  establishment?: string;
}

interface ModalCreateMenuProps {
  isVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: MenuItem) => void;
  categories: Array<{ label: string; value: string }>;
}

function ModalCreateMenu({ isVisible, onCancel, onSubmit, categories }: ModalCreateMenuProps) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleFinish = (values: MenuItem) => {
    dispatch(addItem(values)); // Dispatch добавления элемента
    form.resetFields();
  };

  return (
    <Modal
      title="Add Item"
      open={isVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Confirm
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label="Item Name"
          rules={[{ required: true, message: "Please input the name of the item!" }]}
        >
          <Input placeholder="Enter item name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>
        <Form.Item
          name="category"
          label="Set Category"
        >
          <Select placeholder="Choose category">
            {categories.map((category) => (
              <Select.Option key={category.value} value={category.value}>
                {category.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="price"
          label="Set Price"
          rules={[{ required: true, message: "Please set the price!" }]}
        >
          <Input type="number" prefix="$" placeholder="Enter price" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalCreateMenu;
