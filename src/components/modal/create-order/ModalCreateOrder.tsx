import React, { useEffect } from "react";
import { Modal, Form, Select, Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../store/actions/admin/users/usersSlice";
import { getCategories, getMenu } from "../../../store/actions/partner/menu";
import { RootState } from "../../../store/store";
import { createOrder, fetchOrders } from "../../../store/actions/partner/orderActions";
import { useAppDispatch } from "../../../helpers/hooks/hook";

const { Option } = Select;

function ModalCreateOrder({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.partnerMenu.items);
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    dispatch(getMenu());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCreateOrder = async (values: any) => {
    try {
      await dispatch(createOrder(values)).unwrap();
      await dispatch(fetchOrders()).unwrap();
      form.resetFields();
      onClose();
    } catch (error: any) {
      console.error("Failed to create order:", error);
      notification.error({
        message: "Error",
        description: error.non_field_errors[0],
      });
    }
  };

  return (
    <Modal
      title="Create Order"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleCreateOrder}
      >
        <Form.Item
          name="client_email"
          label="Client"
          rules={[{ required: true, message: "Please select a client!" }]}
        >
          <Select
            showSearch
            placeholder="Select a client"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())}
          >
            {users.map((user: any) => (
              <Option key={user.id} value={user.email}>{user.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="beverage"
          label="Beverage"
          rules={[{ required: true, message: "Please select a beverage!" }]}
        >
          <Select placeholder="Select a beverage">
            {data.map((item: any) => (
              <Option key={item.id} value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item className="flex justify-center">
          <Button type="primary" className="modal-confirm-btn" htmlType="submit">
            Create Order
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalCreateOrder;
