import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import { addItem, updateItem, getMenu } from "../../../store/actions/partner/menu";
import { RootState } from "../../../store/store";
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
  initialValues?: Menu | null;
}

// eslint-disable-next-line react/require-default-props
function ModalCreateMenu({ isVisible, onCancel, onSubmit, initialValues }: ModalCreateMenuProps) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const categories = useSelector((state: RootState) => state.category.categories);
  const currentEstablishment = useSelector((state: RootState) => state.establishments.currentEstablishment);

  useEffect(() => {
    if (isVisible) {
      form.resetFields();
      if (initialValues) {
        const category = categories.find((cat) => cat.name === initialValues.category)?.id;
        form.setFieldsValue({ ...initialValues, category, price: Math.round(initialValues.price) });
      }
    }
  }, [isVisible, initialValues, categories, form]);

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleFinish = async (values: Menu) => {
    try {
      if (!currentEstablishment?.id) {
        throw new Error("No establishment selected");
      }

      const valuesWithEstablishment = { ...values, establishment: currentEstablishment?.id };
      if (initialValues && initialValues.id) {
        const result = await dispatch(updateItem({ id: initialValues.id, data: valuesWithEstablishment })).unwrap();
        if (result) {
          message.success("Item successfully updated!");
        } else {
          throw new Error("Failed to update item");
        }
      } else {
        const result = await dispatch(addItem(valuesWithEstablishment)).unwrap();
        if (result) {
          message.success("Item successfully added!");
        } else {
          throw new Error("Failed to add item");
        }
      }

      form.resetFields();
      await dispatch(getMenu(currentEstablishment.id));
      handleCancel();
    } catch (error: any) {
      console.log("error", error);
      message.error(`An error occurred: ${error.message || error}`);
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit Item" : "Add Item"}
      open={isVisible}
      onCancel={handleCancel}
      className="partner_modal_menu"
      footer={[
        <Button key="back" className="btn grey" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" className="btn" type="primary" onClick={() => form.submit()}>
          {initialValues ? "Update" : "Submit"}
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
          rules={[
            { required: true, message: "Please input the name of the item!" },
            { max: 99, message: "Item name cannot be longer than 99 characters!" },
          ]}
        >
          <Input placeholder="Enter item name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description of the item!" }]}
        >
          <Input.TextArea className="description" placeholder="Enter description" />
        </Form.Item>
        <div className="content">
          <Form.Item
            name="category"
            label="Set Category"
            rules={[{ required: true, message: "Please choose a category!" }]}
          >
            <Select placeholder="Choose category">
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Set Price"
            rules={[
              { type: "number", min: 50, max: 999, transform: (value) => Number(value), message: "Price must be between 50 and 999!" },
            ]}
          >
            <Input type="number" className="price" placeholder="Enter price" />
          </Form.Item>

        </div>

      </Form>
    </Modal>
  );
}

export default ModalCreateMenu;
