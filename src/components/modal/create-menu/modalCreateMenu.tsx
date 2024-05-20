import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import { addItem, updateItem, getMenu } from "../../../store/actions/partner/menu";
import "./style.scss";

interface Menu {
  id?: number;
  name: string;
  price: number;
  description: string;
  availability_status?: boolean;
  category: any;
  establishment?: number;
}

interface ModalCreateMenuProps {
  isVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: Menu) => void;
  categories: Array<{ label: string; value: string }>;
  initialValues?: Menu | null;
}

// eslint-disable-next-line react/require-default-props
function ModalCreateMenu({ isVisible, onCancel, onSubmit, categories, initialValues }: ModalCreateMenuProps) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleFinish = async (values: Menu) => {
    const establishmentId = localStorage.getItem("establishmentId");
    const numericEstablishmentId = Number(establishmentId);
    if (establishmentId) {
      values.establishment = numericEstablishmentId;
    }

    try {
      if (initialValues && initialValues.id) {
        // Editing existing item
        await dispatch(updateItem({ id: initialValues.id, data: values })).unwrap();
        message.success("Item successfully updated!");
      } else {
        // Adding new item
        await dispatch(addItem(values));
        message.success("Item successfully added!");
      }

      form.resetFields();
      await dispatch(getMenu()).unwrap();
      handleCancel();
    } catch (error) {
      message.error(`An error occurred: ${error}`);
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit Item" : "Add Item"}
      open={isVisible}
      onCancel={handleCancel}
      className="partner_modal_menu"
      footer={[
        <Button key="back" className="modal-confirm-btn grey" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" className="modal-confirm-btn" type="primary" onClick={() => form.submit()}>
          {initialValues ? "Update" : "Confirm"}
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
        <div className="content">
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
            rules={[
              { required: true, message: "Please set the price!" },
              // { type: "number", min: 50, max: 999, message: "Price must be between 50 and 999!" },
            ]}
          >
            <Input type="number" placeholder="Enter price" />
          </Form.Item>
        </div>

      </Form>
    </Modal>
  );
}

export default ModalCreateMenu;
