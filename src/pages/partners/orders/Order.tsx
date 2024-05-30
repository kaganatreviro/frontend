import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Skeleton, Table, Dropdown, Statistic, Tabs, DatePicker, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import duration from "dayjs/plugin/duration";
import { useSelector } from "react-redux";
import { fetchHistoryById, fetchOrders, fetchStatisticsById } from "../../../store/actions/partner/orderActions";
import { refreshToken } from "../../../components/api/api";
import { RootState } from "../../../store/store";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import ModalCreateOrder from "../../../components/modal/create-order/ModalCreateOrder";
import EstablishmentSwitcher from "../../../components/establishment/switcher/Switcher";
import "./style.scss";

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(duration);

const { Countdown } = Statistic;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

export default function Orders() {
  const dispatch = useAppDispatch();
  const { orders, loading, orderHistory, orderStatistics } = useSelector((state: RootState) => state.orders);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const token = useRef<string | null>(sessionStorage.getItem("accessToken"));
  const currentEstablishment = useSelector((state: RootState) => state.establishments.currentEstablishment);
  const currentEstablishmentRef = useRef(currentEstablishment);
  const [filterType, setFilterType] = useState("all");
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);

  useEffect(() => {
    if (!currentEstablishment?.id) return;

    fetchData();
    // dispatch(fetchHistoryById(currentEstablishment.id));
    // fetchStatistics(currentEstablishment.id);
    currentEstablishmentRef.current = currentEstablishment;
  }, [currentEstablishment?.id]);

  const fetchData = async () => {
    try {
      if (currentEstablishment?.id) {
        await dispatch(fetchOrders(currentEstablishment?.id));
        await dispatch(fetchHistoryById(currentEstablishment?.id));
        fetchStatistics(currentEstablishment?.id);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchStatistics = (establishmentId: number, startDate?: string, endDate?: string) => {
    dispatch(fetchStatisticsById({ establishmentId, startDate, endDate }));
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null], dateStrings: [string, string]) => {
    setDateRange(dates);
    setFilterType("dateRange");
    if (currentEstablishment?.id) {
      fetchStatistics(currentEstablishment.id, dateStrings[0], dateStrings[1]);
    }
  };

  const handleFilterAllTime = () => {
    setDateRange([null, null]);
    setFilterType("all");
    if (currentEstablishment?.id) {
      fetchStatistics(currentEstablishment.id);
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
  console.log("id", currentEstablishment?.id);
  const connectWebSocket = (accessToken: string) => {
    ws.current = new WebSocket(`wss://happyhours.zapto.org/ws/orders/?token=${accessToken}`);

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("event", event);
      console.log("message", message);
      // if (message) {
      //   console.log("currentEstablishment?.id", currentEstablishment?.id);
      //   // if (!currentEstablishment?.id) return;
      //   console.log("currentEstablishment?.id 123", currentEstablishment?.id);
      //   fetchData();
      // }
      console.log("currentEstablishment?.id", currentEstablishment?.id);
      if (message && currentEstablishmentRef.current?.id) {
        console.log("currentEstablishmentRef.current.id 123", currentEstablishmentRef.current?.id);
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

  const formatStatus = (status: string) => status.replace(/_/g, " ");

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string, record: any) => `ID${record.id} ${dayjs(record.order_date).format("h:mm A, MMMM D, YYYY")}`, // Использование dayjs для форматирования даты
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
      render: (status: string) => <span style={getStatusStyle(status)}>{formatStatus(status)}</span>,
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

  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const happyHoursStart = dayjs(currentEstablishment?.happyhours_start, "HH:mm:ss"); // Использование dayjs для парсинга времени
  const happyHoursEnd = dayjs(currentEstablishment?.happyhours_end, "HH:mm:ss");
  const currentTime = dayjs();

  let countdownTime;
  let countdownTitle;

  if (currentTime.isBetween(happyHoursStart, happyHoursEnd)) { // Использование isBetween из dayjs
    countdownTime = happyHoursEnd.diff(currentTime);
    countdownTitle = "До окончания счастливых часов";
  } else if (currentTime.isBefore(happyHoursStart)) {
    countdownTime = happyHoursStart.diff(currentTime);
    countdownTitle = "До начала счастливых часов";
  } else {
    countdownTime = dayjs.duration(1, "days").add(happyHoursStart.diff(currentTime)).asMilliseconds(); // Использование duration из dayjs
    countdownTitle = "До начала счастливых часов";
  }
  const isHappyHours = currentTime.isBetween(happyHoursStart, happyHoursEnd);

  const historyColumns = columns.filter((column) => column.key !== "action");

  const tabItems = [
    {
      key: "1",
      label: "Dashboard",
      children: (
        <>
          <div className="flex items-center justify-between mb-2 w-full">
            <Button className="modal-confirm-btn" type="primary" onClick={showModal} disabled={!isHappyHours}>
              <FontAwesomeIcon icon={faPlus} className="self-center mr-2 w-4 h-4" />
              <div className="text-white rounded-lg">Make order</div>
            </Button>
            <Countdown title={countdownTitle} value={Date.now() + countdownTime} format="HH:mm:ss" />
          </div>
          <Table columns={columns} dataSource={orders} pagination={{ pageSize: 10 }} rowKey="id" />
          <ModalCreateOrder visible={isModalVisible} onClose={hideModal} />
        </>
      ),
    },
    {
      key: "2",
      label: "History",
      children: (
        <Table columns={historyColumns} dataSource={orderHistory} pagination={{ pageSize: 10 }} rowKey="id" className="w-full h-full" />
      ),
    },
    {
      key: "3",
      label: "Statistics",
      children: (
        <>
          <div className="filter-container mb-4">
            <Space direction="vertical" size={12}>
              <RangePicker onChange={handleDateChange} value={dateRange} />
              <Button onClick={handleFilterAllTime}>All Time</Button>
            </Space>
          </div>
          {orderStatistics ? (
            <>
              <Card bordered={false} className="mb-4">
                <Statistic title="Total Orders" value={orderStatistics.total_orders} />
              </Card>
              <Table
                columns={[
                  { title: "Category", dataIndex: "category", key: "category" },
                  { title: "Total Orders", dataIndex: "total_orders", key: "total_orders" },
                ]}
                dataSource={orderStatistics.orders_by_category}
                pagination={false}
                rowKey="category"
                className="w-full h-full"
              />
            </>
          ) : (
            <Skeleton active paragraph={{ rows: 4 }} />
          )}
        </>
      ),
    },
  ];

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
            <Tabs
              activeKey={activeTabKey}
              onChange={handleTabChange}
              className="tab_order"
              items={tabItems}
            />
          )}
        </div>
      </div>
    </div>
  );
}