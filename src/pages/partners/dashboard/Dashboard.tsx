import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Button, Card, Skeleton, Space, DatePicker } from "antd";
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { RootState } from "store/store";
import isBetween from "dayjs/plugin/isBetween";
import duration from "dayjs/plugin/duration";
import { fetchStatisticsById } from "../../../store/actions/partner/orderActions";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import EstablishmentSwitcher from "../../../components/establishment/switcher/Switcher";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "./style.scss";

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(duration);

const { RangePicker } = DatePicker;

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { orderStatistics } = useSelector((state: RootState) => state.orders);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const currentEstablishment = useSelector((state: RootState) => state.establishments.currentEstablishment);

  useEffect(() => {
    if (currentEstablishment?.id) {
      fetchStatistics(currentEstablishment?.id);
    }
  }, [currentEstablishment?.id]);

  const fetchStatistics = (establishmentId: number, startDate?: string, endDate?: string) => {
    dispatch(fetchStatisticsById({ establishmentId, startDate, endDate }));
  };

  const handleDateChange = (dates: any, dateStrings: any) => {
    setDateRange(dates);
    if (currentEstablishment?.id) {
      fetchStatistics(currentEstablishment.id, dateStrings[0], dateStrings[1]);
    }
  };

  const handleFilterAllTime = () => {
    setDateRange([null, null]);
    if (currentEstablishment?.id) {
      fetchStatistics(currentEstablishment.id);
    }
  };

  const formatNumber = (num: any) => num.toLocaleString();

  const fillMissingData = (data: any, categories: any) => {
    const filledData = categories.map((category: any) => {
      const existingData = data.find((d: any) => d.category === category);
      return existingData || { category, total_orders: 0 };
    });
    return filledData;
  };

  const categories = ["National drinks", "Imported drinks", "Food", "Snacks"];
  const hasValidData = orderStatistics && orderStatistics.orders_by_category && orderStatistics.orders_by_category.length === 4;
  const filledData = hasValidData ? orderStatistics.orders_by_category : fillMissingData(orderStatistics ? orderStatistics.orders_by_category : [], categories);

  console.log("Order Statistics: ", orderStatistics);
  console.log("Filled Data: ", filledData);

  return (
    <div className="flex-1 partner_dashboard flex bg-[#f4f4f4]">
      <div className="container justify-start items-start flex-1 p-10">
        <EstablishmentSwitcher title="Dashboard" />

        <div className="filter-container mb-4">
          <Space direction="horizontal" size={12}>
            <RangePicker onChange={handleDateChange} value={dateRange} />
            <Button onClick={handleFilterAllTime}>All Time</Button>
          </Space>
        </div>
        {orderStatistics ? (
          <>
            <Space direction="horizontal" size={12}>
              <Card bordered={false} className="mb-4 custom-card">
                <div className="ant-statistic-title">Total Orders</div>
                <div className="ant-statistic-content">{orderStatistics.total_orders}</div>
              </Card>
              <Card bordered={false} className="mb-4 custom-card">
                <div className="ant-statistic-title">Total Prices</div>
                <div className="ant-statistic-content">{Math.round(orderStatistics.total_sum_prices)}</div>
              </Card>
            </Space>

            <Card bordered={false} className="">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={filledData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="total_orders" stroke="#fb7e00" dot={{ r: 5 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </>
        ) : (
          <Skeleton active paragraph={{ rows: 4 }} />
        )}
      </div>
    </div>
  );
}
