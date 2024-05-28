import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Skeleton, Table, Dropdown, Statistic } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useSelector } from "react-redux";
import { fetchOrders } from "../../../store/actions/partner/orderActions";
import { refreshToken } from "../../../components/api/api";
import { RootState } from "../../../store/store";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import ModalCreateOrder from "../../../components/modal/create-order/ModalCreateOrder";
import "./style.scss";
import EstablishmentSwitcher from "../../../components/establishment/switcher/Switcher";
import { fetchCategoriesList } from "store/actions/admin/categories/categories";
import { getMenu } from "store/actions/partner/menu";

const { Countdown } = Statistic;

export default function Orders() {
  const dispatch = useAppDispatch();
  const { orders, loading } = useSelector((state: RootState) => state.orders);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const token = useRef<string | null>(sessionStorage.getItem("accessToken"));
  const currentEstablishment = useSelector((state: RootState) => state.establishments.currentEstablishment);

  useEffect(() => {
    if (!currentEstablishment?.id) return;

    fetchData();
  }, [currentEstablishment?.id]);

  const fetchData = async () => {
    try {
      if (currentEstablishment?.id) {
        await dispatch(fetchOrders(currentEstablishment?.id));
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    if (token.current) {
      connectWebSocket(token.current);
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const connectWebSocket = (accessToken: string) => {
    ws.current = new WebSocket(`wss://happyhours.zapto.org/ws/orders/?token=${accessToken}`);

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("event", event);
      console.log("message", message);
      if (message) {
        if (!currentEstablishment?.id) return;

        fetchData();
      }
    };

    ws.current.onclose = async () => {
      console.log("WebSocket connection closed");
      const newToken = await refreshToken();
      if (newToken) {
        token.current = newToken;
        connectWebSocket(newToken);
      }
    };

    ws.current.onerror = (error) => {
      console.log("WebSocket error:", error);
    };
  };

  const handleAction = (e: any, record: any) => {
    const newStatus = e.key;
    const message = {
      type: "update_order",
      order_id: record.id,
      status: newStatus,
    };
    console.log("message", message);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      console.log("array?");
      ws.current.send(JSON.stringify(message));
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return { color: "#56CC8D" };
      case "cancelled":
        return { color: "#FC5757" };
      case "pending":
        return { color: "#A1A1A1" };
      case "in_preparation":
        return { color: "#FF9328" };
      default:
        return {};
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string, record: any) => `ID${record.id} ${moment(record.order_date).format("h:mm A, MMMM D, YYYY")}`,
    },
    {
      title: "Beverage Name",
      dataIndex: "beverage_name",
      key: "beverage_name",
    },
    {
      title: "Customer",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <span style={getStatusStyle(status)}>{status}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Dropdown
          menu={{
            items: menuItems,
            onClick: (e) => handleAction(e, record),
          }}
          trigger={["click"]}
        >
          <Button className="action-button" type="primary" icon={<FontAwesomeIcon icon={faEllipsis} />} />
        </Dropdown>
      ),
    },
  ];

  const menuItems = [
    { key: "pending", label: "Pending" },
    { key: "in_preparation", label: "In Preparation" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const happyHoursStart = moment(currentEstablishment?.happyhours_start, "HH:mm:ss");
  const currentTime = moment();
  const timeUntilHappyHours = happyHoursStart.isAfter(currentTime)
    ? happyHoursStart.diff(currentTime)
    : moment.duration(1, "days").add(happyHoursStart.diff(currentTime)).asMilliseconds();

  return (
    <div className="flex-1 flex bg-[#f4f4f4]">
      <div className="flex-1 order_partners admin_partners container">
        <div className="flex flex-col content h-full items-start p-12 bg-gray-100 flex-1">
          <EstablishmentSwitcher title="Orders" />
          {loading ? (
            <Card bordered={false} className="w-full">
              <Skeleton active paragraph={{ rows: 4 }} />
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between w-full">
                <Button className="modal-confirm-btn" type="primary" onClick={showModal}>
                  <FontAwesomeIcon icon={faPlus} className="self-center mr-2 w-4 h-4" />
                  <div className="text-white rounded-lg">Make order</div>
                </Button>
                <Countdown title="До счастливых часов" value={Date.now() + timeUntilHappyHours} format="HH:mm:ss" />
              </div>
              <Table columns={columns} dataSource={orders} pagination={{ pageSize: 10 }} rowKey="id" className="w-full h-full" />
              <ModalCreateOrder visible={isModalVisible} onClose={hideModal} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
