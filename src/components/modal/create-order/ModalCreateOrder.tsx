import React, { useEffect } from "react";
import { Modal, Form, Select, Button, notification } from "antd";
import { useSelector } from "react-redux";
import { fetchEstablishmentsList } from "../../../store/actions/partner/establishemntsSlice";
import { fetchUsers } from "../../../store/actions/admin/users/usersSlice";
import { getMenu } from "../../../store/actions/partner/menu";
import { RootState } from "../../../store/store";
import { createOrder, fetchOrders } from "../../../store/actions/partner/orderActions";
import { useAppDispatch } from "../../../helpers/hooks/hook";

const { Option } = Select;

function ModalCreateOrder({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.partnerMenu.items);
  const users = useSelector((state: RootState) => state.users.users);
  const currentEstablishment = useSelector((state: RootState) => state.establishments.currentEstablishment);

  useEffect(() => {
    if (!currentEstablishment?.id) return;
    fetchData();
  }, [currentEstablishment?.id]);
  const fetchData = async () => {
    try {
      await dispatch(fetchUsers());
      if (currentEstablishment) {
        await dispatch(getMenu(currentEstablishment?.id));
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const handleCreateOrder = async (values: any) => {
    try {
      await dispatch(createOrder(values)).unwrap();
      if (currentEstablishment) {
        await dispatch(fetchOrders(currentEstablishment?.id)).unwrap();
      }
      form.resetFields();
      onClose();
    } catch (error: any) {
      console.error("Failed to create order:", error);
      notification.error({
        message: "Error",
        description: error.non_field_errors,
      });
    }
  };

  return (
    <Modal
      title="Create Order"
      open={visible}
      onCancel={onClose}
      footer={null}
      // centered
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
