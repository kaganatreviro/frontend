/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { fetchSubStatistics } from "../../../store/actions/admin/subscriptions/subscriptionActions";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import { DatePicker, Button, Space, Skeleton } from "antd";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

interface Filter {
  start_from?: string;
  start_to?: string;
  end_from?: string;
  end_to?: string;
}

export default function SubscriptionStatistics() {
  const dispatch = useAppDispatch();
  const [startDateRangeStart, setStartDateRangeStart] = useState<Dayjs | null>(null);
  const [startDateRangeEnd, setStartDateRangeEnd] = useState<Dayjs | null>(null);
  const [endDateRangeStart, setEndDateRangeStart] = useState<Dayjs | null>(null);
  const [endDateRangeEnd, setEndDateRangeEnd] = useState<Dayjs | null>(null);
  const subscriptionStatistics = useSelector((state: RootState) => state.subscription.statistics);

  useEffect(() => {
    fetchSubStatisticsData();
  }, [startDateRangeStart, startDateRangeEnd, endDateRangeStart, endDateRangeEnd]);

  const fetchSubStatisticsData = () => {
    const filters: Filter = {};

    if (startDateRangeStart) {
      filters.start_from = startDateRangeStart.format("YYYY-MM-DD");
    }
    if (startDateRangeEnd) {
      filters.start_to = startDateRangeEnd.format("YYYY-MM-DD");
    }
    if (endDateRangeStart) {
      filters.end_from = endDateRangeStart.format("YYYY-MM-DD");
    }
    if (endDateRangeEnd) {
      filters.end_to = endDateRangeEnd.format("YYYY-MM-DD");
    }

    dispatch(fetchSubStatistics(filters));
  };

  const handleStartDateChange = (dates: any, dateStrings: any) => {
    setStartDateRangeStart(dates[0]);
    setStartDateRangeEnd(dates[1]);
  };

  const handleEndDateChange = (dates: any, dateStrings: any) => {
    setEndDateRangeStart(dates[0]);
    setEndDateRangeEnd(dates[1]);
  };

  const handleFilterAllTime = () => {
    setStartDateRangeStart(null);
    setStartDateRangeEnd(null);
    setEndDateRangeStart(null);
    setEndDateRangeEnd(null);
  };



  const colors = ["#ea25e7", "#01AFB0", "#589B34", "#F58726", "#FDF001", "#20429C", "#F4D03F", "#EB984E", "#7D3C98", "#AF7AC5"];

  const pieChartData = subscriptionStatistics?.most_popular_plans.map((plan, index) => ({
    name: plan.plan__name || "Deleted",
    value: plan.count,
    color: colors[index % colors.length]
  }));



  return (
    <div className="flex-1 flex bg-[#f4f4f4] subscriptions">
      <div className="flex-1 admin_partners container">
        <div className="flex flex-col h-full items-start p-12 bg-gray-100 flex-1">
          <div className="font-medium text-4xl mb-8">Subscription Statistics</div>
          {subscriptionStatistics ? (
            <div className="w-full">
              <div className="flex gap-4 mb-8">
              <div>
                <div>Subscriptions starts range:</div>
                <Space direction="horizontal" size={12}>
                  <RangePicker onChange={handleStartDateChange} value={[startDateRangeStart, startDateRangeEnd]} />
                </Space>
              </div>
              <div>
                <div>Subscriptions ends range:</div>
                <Space direction="horizontal" size={12}>
                  <RangePicker onChange={handleEndDateChange} value={[endDateRangeStart, endDateRangeEnd]} />
                </Space>
              </div>
              <button className="self-end bg-[#FB7E00] text-white rounded-md py-1 px-8 hover:bg-[#c86400]" onClick={handleFilterAllTime}>All Time</button>
            </div>
              <div className="flex gap-4 mb-12">

                <div className="w-[300px] rounded-lg bg-white border-xl py-8 px-8 border">
                  <div className="flex mb-3 justify-between">
                    <div className="text-3xl font-bold">{subscriptionStatistics.active_subscriptions}</div>
                    <div className=" border rounded-lg h-1- w-10 shadow-sm flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.8499 12C3.8499 7.4989 7.49878 3.85002 11.9999 3.85002C12.8908 3.85002 13.7467 3.99266 14.547 4.2557C14.993 4.40228 15.4733 4.15958 15.6199 3.71361C15.7665 3.26764 15.5238 2.78728 15.0778 2.6407C14.1084 2.32206 13.0734 2.15002 11.9999 2.15002C6.5599 2.15002 2.1499 6.56002 2.1499 12C2.1499 17.44 6.5599 21.85 11.9999 21.85C17.4399 21.85 21.8499 17.44 21.8499 12C21.8499 11.5306 21.4693 11.15 20.9999 11.15C20.5305 11.15 20.1499 11.5306 20.1499 12C20.1499 16.5011 16.501 20.15 11.9999 20.15C7.49878 20.15 3.8499 16.5011 3.8499 12ZM19.6022 7.59976C19.9335 7.2671 19.9323 6.72891 19.5996 6.39768C19.267 6.06646 18.7288 6.06762 18.3976 6.40029L12.0495 12.776L9.62083 10.1781C9.30024 9.83514 8.76236 9.81703 8.41943 10.1376C8.0765 10.4582 8.05839 10.9961 8.37898 11.339L11.4093 14.5805C11.5668 14.749 11.7861 14.8463 12.0168 14.8499C12.2475 14.8536 12.4698 14.7633 12.6325 14.5998L19.6022 7.59976Z" fill="#56CC8D" />
                      </svg>
                    </div>

                  </div>
                  <div className="text-xl text-gray-500">Active Subscriptions</div>
                </div>
                <div className="w-[300px] rounded-lg bg-white border-xl py-8 px-8 border">
                  <div className="flex mb-3 justify-between">
                    <div className="text-3xl font-bold">{subscriptionStatistics.inactive_subscriptions}</div>
                    <div className=" border rounded-lg h-1- w-10 shadow-sm flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8019 0.014281C7.64918 0.352574 4.79248 1.8608 2.78152 4.25704C1.36727 5.9391 0.488645 7.8467 0.0986688 10.0832C0.00939702 10.5953 0 10.8444 0 12.0096C0 13.1748 0.00939702 13.4238 0.0986688 13.936C0.540329 16.4732 1.60219 18.5734 3.35474 20.3917C5.15427 22.2617 7.42365 23.4458 10.0736 23.9109C10.5857 24.0002 10.8348 24.0096 12 24.0096C13.4706 24.0096 13.9123 23.9626 15.0681 23.6666C19.2122 22.5953 22.5857 19.2218 23.657 15.0777C23.953 13.9219 24 13.4802 24 12.0096C24 10.5389 23.953 10.0973 23.657 8.94145C22.5857 4.80206 19.2122 1.42383 15.0681 0.352574C14.0016 0.0800602 13.4988 0.0189795 12.1879 0.00488397C11.5301 -0.00451305 10.9052 0.000185462 10.8019 0.014281ZM13.3391 2.07693C17.0791 2.59376 20.2553 5.20144 21.4816 8.76761C22.0877 10.5249 22.1864 12.4653 21.7635 14.2884C20.9225 17.925 17.9154 20.9321 14.2788 21.7731C12.8175 22.1114 11.1825 22.1114 9.72122 21.7731C6.08457 20.9321 3.07753 17.925 2.23649 14.2884C1.8982 12.8271 1.8982 11.192 2.23649 9.7308C3.06343 6.15524 5.97651 3.19048 9.55208 2.28366C10.7502 1.98296 12.1128 1.90778 13.3391 2.07693Z" fill="#F93232" />
                        <path d="M10.8019 0.014281C7.64918 0.352574 4.79248 1.8608 2.78152 4.25704C1.36727 5.9391 0.488645 7.8467 0.0986688 10.0832C0.00939702 10.5953 0 10.8444 0 12.0096C0 13.1748 0.00939702 13.4238 0.0986688 13.936C0.540329 16.4732 1.60219 18.5734 3.35474 20.3917C5.15427 22.2617 7.42365 23.4458 10.0736 23.9109C10.5857 24.0002 10.8348 24.0096 12 24.0096C13.4706 24.0096 13.9123 23.9626 15.0681 23.6666C19.2122 22.5953 22.5857 19.2218 23.657 15.0777C23.953 13.9219 24 13.4802 24 12.0096C24 10.5389 23.953 10.0973 23.657 8.94145C22.5857 4.80206 19.2122 1.42383 15.0681 0.352574C14.0016 0.0800602 13.4988 0.0189795 12.1879 0.00488397C11.5301 -0.00451305 10.9052 0.000185462 10.8019 0.014281ZM13.3391 2.07693C17.0791 2.59376 20.2553 5.20144 21.4816 8.76761C22.0877 10.5249 22.1864 12.4653 21.7635 14.2884C20.9225 17.925 17.9154 20.9321 14.2788 21.7731C12.8175 22.1114 11.1825 22.1114 9.72122 21.7731C6.08457 20.9321 3.07753 17.925 2.23649 14.2884C1.8982 12.8271 1.8982 11.192 2.23649 9.7308C3.06343 6.15524 5.97651 3.19048 9.55208 2.28366C10.7502 1.98296 12.1128 1.90778 13.3391 2.07693Z" fill="#F93232" />
                        <path d="M7.57849 6.95871C7.01467 7.13725 6.73745 7.81854 7.00527 8.36826C7.04286 8.44344 7.8604 9.29857 8.8189 10.2571L10.5667 12.0096L8.8189 13.7575C7.8604 14.7207 7.04286 15.5711 7.00527 15.651C6.72806 16.2195 7.01467 16.8914 7.61138 17.0652C7.87919 17.1404 8.11412 17.1216 8.35844 17.0041C8.43832 16.9665 9.28875 16.149 10.2519 15.1905L11.9998 13.4427L13.7523 15.1905C14.7108 16.149 15.566 16.9665 15.6411 17.0041C16.2097 17.2813 16.8815 16.9947 17.0554 16.398C17.1306 16.1302 17.1118 15.8953 16.9943 15.651C16.9567 15.5711 16.1392 14.7207 15.1807 13.7575L13.4328 12.0096L15.1807 10.2571C16.1392 9.29857 16.9567 8.44344 16.9943 8.36826C17.1118 8.12394 17.1306 7.88902 17.0554 7.6212C16.8815 7.02449 16.2097 6.73788 15.6411 7.01509C15.566 7.05268 14.7108 7.87022 13.7523 8.82872L11.9998 10.5766L10.2519 8.82872C9.28875 7.87022 8.43362 7.05268 8.35844 7.01509C8.13761 6.90703 7.82281 6.88353 7.57849 6.95871Z" fill="#F93232" />
                      </svg>

                    </div>

                  </div>
                  <div className="text-xl text-gray-500">Inactive Subscriptions</div>
                </div>
                <div className="w-[300px] rounded-lg bg-white border-xl py-8 px-8 border">
                  <div className="flex mb-3 justify-between">
                    <div className="text-3xl font-bold">{subscriptionStatistics.trial_subscriptions}</div>
                    <div className=" border rounded-lg h-1- w-10 shadow-sm flex items-center justify-center">
                      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.252 0.0149058C7.96789 0.367294 4.99217 1.93836 2.89742 4.43444C1.42424 6.1866 0.509005 8.17368 0.10278 10.5034C0.00978857 11.0368 0 11.2962 0 12.51C0 13.7238 0.00978857 13.9832 0.10278 14.5167C0.562843 17.1596 1.66895 19.3473 3.49452 21.2414C5.36903 23.1893 7.73297 24.4227 10.4933 24.9072C11.0268 25.0002 11.2862 25.01 12.5 25.01C14.0319 25.01 14.492 24.9611 15.696 24.6527C20.0127 23.5368 23.5268 20.0227 24.6427 15.706C24.9511 14.502 25 14.0419 25 12.51C25 10.9781 24.9511 10.518 24.6427 9.31404C23.5268 5.00218 20.0127 1.48319 15.696 0.367294C14.585 0.0834258 14.0613 0.0198001 12.6958 0.00511723C12.0106 -0.00467133 11.3596 0.000222948 11.252 0.0149058ZM14.3354 1.24827C16.7482 1.65938 18.8283 2.73613 20.5511 4.45891C22.0243 5.93209 23.0227 7.65978 23.5317 9.62238C23.8205 10.7432 23.8792 11.2179 23.8792 12.51C23.8792 13.8021 23.8205 14.2768 23.5317 15.3976C23.0227 17.3602 22.0243 19.0879 20.5511 20.5611C18.7989 22.3133 16.6748 23.3949 14.1885 23.8011C13.4299 23.9235 11.5701 23.9235 10.8115 23.8011C8.32518 23.3949 6.20106 22.3133 4.4489 20.5611C2.69675 18.809 1.61511 16.6848 1.20889 14.1985C1.08653 13.4399 1.08653 11.5801 1.20889 10.8215C1.61511 8.33519 2.69675 6.21107 4.4489 4.45891C6.36746 2.54036 8.60415 1.48319 11.4722 1.1357C11.5652 1.12591 12.1182 1.12101 12.6958 1.1308C13.4789 1.14059 13.8998 1.16996 14.3354 1.24827Z" fill="#18CCE4" />
                        <path d="M11.6926 3.25981C9.76916 3.436 7.98274 4.17994 6.48999 5.43287C6.0495 5.80484 5.43282 6.44599 5.25173 6.72007C5.07064 6.98925 5.17342 7.44442 5.43772 7.56189C5.58944 7.63041 5.83905 7.62551 5.97609 7.5521C6.03971 7.51784 6.23548 7.32696 6.41657 7.1214C7.62057 5.78037 9.11822 4.91408 10.9095 4.51764C11.3353 4.42465 11.5458 4.40997 12.5002 4.40997C13.4546 4.40997 13.665 4.42465 14.0908 4.51764C15.8576 4.90918 17.3847 5.78526 18.5397 7.07735C18.9557 7.54231 19.0536 7.61572 19.2641 7.61572C19.6262 7.61572 19.8416 7.40527 19.8416 7.04309C19.8416 6.81795 19.7682 6.70049 19.313 6.20127C18.1971 4.97281 16.5722 3.98906 14.9375 3.55347C13.8999 3.27939 12.6764 3.16682 11.6926 3.25981Z" fill="#18CCE4" />
                        <path d="M4.63989 9.81816C4.58116 9.83774 4.48817 9.92094 4.42944 9.99436C4.32666 10.1216 4.32666 10.1461 4.32666 12.5149V14.9082L4.4637 15.055C4.70352 15.3242 5.14401 15.2998 5.33978 15.011C5.41319 14.9033 5.42787 14.7516 5.44256 13.9979L5.46213 13.112L5.81942 13.0827C6.22564 13.0533 6.35289 12.9897 6.45567 12.7743C6.54866 12.5785 6.54866 12.4415 6.45567 12.2457C6.35289 12.0304 6.22564 11.9668 5.81452 11.9374L5.45235 11.908V11.4039V10.8949H6.30885C7.22897 10.8949 7.3709 10.8655 7.52752 10.6404C7.65967 10.4544 7.6303 10.1363 7.4639 9.9552L7.32196 9.79369L6.02987 9.7839C5.32509 9.77901 4.69373 9.79369 4.63989 9.81816Z" fill="#18CCE4" />
                        <path d="M8.99536 9.81329C8.93663 9.83776 8.84364 9.92096 8.78491 9.99438C8.68213 10.1216 8.68213 10.1461 8.68213 12.5149V14.9082L8.81917 15.0551C8.98557 15.2459 9.27923 15.2998 9.49947 15.1872C9.72461 15.0697 9.80781 14.8397 9.80781 14.3405V13.9098L10.4588 14.551C10.8454 14.9327 11.1586 15.2068 11.2418 15.2264C11.6285 15.3243 11.9613 15.0697 11.9613 14.6782C11.9613 14.4531 11.9564 14.4482 11.2761 13.7581L10.5909 13.068L10.8454 12.9848C11.2321 12.8624 11.5551 12.5883 11.7606 12.2213C11.9075 11.9521 11.9319 11.8493 11.9515 11.5116C11.9662 11.1935 11.9515 11.0613 11.8634 10.8362C11.7264 10.4691 11.3936 10.1021 11.0412 9.93075C10.772 9.79861 10.7328 9.79371 9.93017 9.78392C9.475 9.77413 9.0492 9.78882 8.99536 9.81329ZM10.5175 10.9634C10.8601 11.1103 10.9237 11.5508 10.6349 11.7955C10.5077 11.9031 10.4392 11.9227 10.1455 11.9227H9.80781V11.4088V10.8949H10.077C10.2287 10.8949 10.4245 10.9243 10.5175 10.9634Z" fill="#18CCE4" />
                        <path d="M13.3518 9.81814C13.2931 9.83771 13.2001 9.92092 13.1414 9.99433C13.0386 10.1216 13.0386 10.1461 13.0386 12.5149V14.9082L13.1805 15.0648L13.3224 15.2263H14.6782H16.0339L16.1758 15.0648C16.3765 14.8397 16.3765 14.5362 16.1758 14.3111L16.0339 14.1496L15.0991 14.1349L14.1643 14.1202V13.6161V13.112L14.5264 13.0826C14.7222 13.0679 14.9327 13.0288 14.9865 12.9945C15.2263 12.8428 15.3095 12.4708 15.1627 12.2212C15.0452 12.0206 14.9229 11.9667 14.5264 11.9374L14.1643 11.908V11.4039V10.8998L15.0991 10.8851L16.0339 10.8704L16.1758 10.7089C16.3765 10.4838 16.3765 10.1803 16.1758 9.95518L16.0339 9.79366L14.7418 9.78388C14.037 9.77898 13.4056 9.79366 13.3518 9.81814Z" fill="#18CCE4" />
                        <path d="M17.7073 9.81814C17.6485 9.83771 17.5556 9.92092 17.4968 9.99433C17.394 10.1216 17.394 10.1461 17.394 12.5149V14.9082L17.536 15.0648L17.6779 15.2263H19.0336H20.3893L20.5313 15.0648C20.7319 14.8397 20.7319 14.5362 20.5313 14.3111L20.3893 14.1496L19.4545 14.1349L18.5197 14.1202V13.6161V13.112L18.8819 13.0826C19.0777 13.0679 19.2881 13.0288 19.342 12.9945C19.5818 12.8428 19.665 12.4708 19.5182 12.2212C19.4007 12.0206 19.2783 11.9667 18.8819 11.9374L18.5197 11.908V11.4039V10.8998L19.4545 10.8851L20.3893 10.8704L20.5313 10.7089C20.7319 10.4838 20.7319 10.1803 20.5313 9.95518L20.3893 9.79366L19.0973 9.78388C18.3925 9.77898 17.7611 9.79366 17.7073 9.81814Z" fill="#18CCE4" />
                        <path d="M5.90245 18.0063C5.692 18.1237 5.58432 18.3831 5.63327 18.6474C5.6871 18.9019 6.7198 19.8269 7.54204 20.3555C9.01032 21.2952 10.6695 21.77 12.4999 21.77C14.996 21.77 17.1593 20.8939 18.9653 19.1564C19.4156 18.7208 19.4694 18.5691 19.2883 18.1971C19.2198 18.0503 19.0093 17.9426 18.7989 17.9426C18.6129 17.9426 18.3633 18.1041 18.0794 18.4076C17.6683 18.8432 16.6601 19.548 16.0238 19.8416C14.8052 20.3996 13.7725 20.6345 12.4999 20.6345C11.2274 20.6345 10.1947 20.3996 8.97606 19.8416C8.33981 19.548 7.33158 18.8432 6.92046 18.4076C6.51424 17.972 6.19122 17.8496 5.90245 18.0063Z" fill="#18CCE4" />
                      </svg>

                    </div>

                  </div>
                  <div className="text-xl text-gray-500">Trial Subscriptions</div>
                </div>

              </div>
              <div className="flex gap-12">
                <div className="relative w-[535px] h-[470px] bg-white rounded-lg py-8 px-8">
                  <div className="text-2xl text-gray-500">Subscription Types</div>
                  <PieChart width={300} height={350}>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      innerRadius={100}
                    >
                      {pieChartData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />

                  </PieChart>
                  <div className="absolute top-20 right-10  p-4">
                    {pieChartData?.map((entry, index) => (
                      <div key={`legend-${index}`} className="flex items-center mb-2">
                        <div className="w-4 h-4 rounded-full mr-3 self-start" style={{ backgroundColor: entry.color }}></div>
                        <div>
                          <div>{entry.name}</div>
                          <div>{entry.value} {entry.value > 1 ? "users" : "user"}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="w-[350px] rounded-lg bg-white border-xl py-8 px-8 border">
                    <div className="flex mb-3 justify-between">
                      <div className="text-3xl font-bold">{subscriptionStatistics.total_price} KGS</div>
                      <div className=" border rounded-lg h-1- w-10 shadow-sm flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.791 0.307962C11.5393 0.544338 10.6421 0.931136 9.6966 1.62952C8.43951 2.56428 7.50475 3.89659 7.05348 5.38468C6.79562 6.23886 6.72578 6.81369 6.76338 7.83977C6.80636 9.09149 7.08034 10.08 7.66591 11.1114C8.692 12.9004 10.2822 14.093 12.3343 14.6141C12.8554 14.7484 12.9844 14.7592 13.9997 14.7592C15.0151 14.7592 15.144 14.7484 15.6651 14.6141C17.7173 14.093 19.3074 12.9004 20.3335 11.1114C20.9191 10.08 21.1931 9.09149 21.2361 7.83977C21.2737 6.81369 21.2038 6.23886 20.946 5.38468C20.1831 2.85438 18.1202 0.947253 15.5039 0.361684C14.9613 0.238123 13.3121 0.20589 12.791 0.307962ZM13.1939 2.88124V3.82137L12.8608 3.99866C11.6951 4.61646 11.2384 6.02397 11.8132 7.22734C12.1893 8.01706 12.8984 8.49518 13.8493 8.58651C14.263 8.62949 14.494 8.74767 14.6444 8.99479C15.0043 9.58574 14.4134 10.3271 13.7633 10.1122C13.484 10.0209 13.2637 9.74153 13.2208 9.42994C13.1563 8.88198 12.8984 8.60262 12.431 8.56502C12.1141 8.54353 11.8831 8.65635 11.6682 8.94644C11.4587 9.23117 11.5822 10.1337 11.9046 10.6602C12.0926 10.9718 12.5492 11.3908 12.8769 11.5466L13.1939 11.697V12.3846V13.0777L12.9683 13.0401C12.56 12.9702 11.8885 12.7392 11.4479 12.5136C10.0458 11.7883 9.05731 10.5742 8.5953 9.01091C8.39116 8.3179 8.35355 7.14676 8.51472 6.38928C8.96061 4.27264 10.5454 2.59652 12.6191 2.05392C13.2476 1.88739 13.1939 1.8068 13.1939 2.88124ZM15.3589 2.04855C17.4379 2.58577 19.0388 4.26189 19.4847 6.38928C19.6459 7.14676 19.6083 8.3179 19.4041 9.01091C18.9421 10.5742 17.9537 11.7883 16.5515 12.5136C16.111 12.7392 15.4395 12.9702 15.0366 13.0401L14.8056 13.0777V12.3846V11.6916L15.0742 11.5681C15.8639 11.2135 16.4172 10.311 16.4172 9.38696C16.4172 8.67246 16.154 8.07078 15.6382 7.59802C15.1655 7.16825 14.8861 7.06081 13.8493 6.91038C13.4464 6.85129 13.1402 6.37317 13.2476 5.97562C13.3175 5.73387 13.3927 5.64255 13.6237 5.4975C14.1233 5.19666 14.6874 5.5351 14.7733 6.18514C14.8593 6.84592 15.4663 7.18437 16.0143 6.87278C16.1379 6.80294 16.2722 6.67401 16.3205 6.56656C16.5085 6.19588 16.3957 5.43303 16.0788 4.89044C15.8907 4.56811 15.4234 4.14371 15.0903 3.98254L14.8109 3.85361L14.8056 2.89736C14.8056 2.13988 14.8217 1.94648 14.8754 1.94648C14.9184 1.94648 15.1333 1.99483 15.3589 2.04855Z" fill="#FAB106" />
                          <path d="M9.43352 16.0861C8.81572 16.1345 8.10659 16.3279 7.51027 16.6126C6.97305 16.8704 6.70982 17.0477 6.06515 17.5903L5.57091 18.0093H3.16417C0.897105 18.0093 0.746684 18.0147 0.601635 18.1114C0.521052 18.1651 0.402864 18.2833 0.349142 18.3639C0.252443 18.5143 0.24707 18.6809 0.24707 22.0385C0.24707 25.3961 0.252443 25.5626 0.349142 25.7131C0.402864 25.7937 0.521052 25.9118 0.601635 25.9656C0.746684 26.0623 0.897105 26.0676 3.22864 26.0676H5.69984L10.379 26.8735C14.059 27.5074 15.1656 27.6793 15.5363 27.6793H16.0145L21.6606 23.5266C24.7604 21.2488 27.3605 19.3309 27.4357 19.2718C27.6775 19.073 27.7527 18.9172 27.7527 18.5949C27.7527 18.3156 27.7312 18.2618 27.5056 17.9556C27.0274 17.3271 26.1786 16.7737 25.3513 16.5535C24.7443 16.3923 23.7934 16.3923 23.2186 16.5535C22.5954 16.7254 22.2408 16.9242 20.6453 17.9825L19.2055 18.9334L18.953 18.697C18.6576 18.423 18.4051 18.2618 18.0774 18.1329C17.8786 18.0577 17.5616 18.0362 16.1219 18.0147L14.4028 17.9825L14.1825 17.8213C14.059 17.73 13.7581 17.499 13.511 17.2948C12.3667 16.3762 10.9861 15.9625 9.43352 16.0861ZM10.8733 17.8267C11.432 17.9449 12.1089 18.3048 12.7106 18.7991C13.6937 19.6156 13.5916 19.5834 15.6921 19.621C17.2877 19.6479 17.422 19.6532 17.5885 19.7553C18.1042 20.0669 18.1042 20.7868 17.5885 21.0984C17.4166 21.2004 17.293 21.2058 13.9193 21.2327C10.7497 21.2595 10.4166 21.2703 10.2984 21.3508C10.0728 21.512 9.97074 21.7215 9.97074 22.0385C9.97074 22.3716 10.0782 22.5757 10.3253 22.7422C10.4757 22.8389 10.6423 22.8443 14.0643 22.8443C17.3951 22.8443 17.6637 22.8389 17.9646 22.7476C18.7811 22.4898 19.4258 21.7806 19.5977 20.9587L19.6622 20.6417L21.3329 19.5458C23.2239 18.2994 23.2938 18.2565 23.7934 18.1383C24.0996 18.0631 24.2232 18.0577 24.5777 18.106C24.943 18.1598 25.5662 18.3854 25.6253 18.4875C25.6468 18.5251 15.6008 25.9172 15.4289 25.9817C15.3429 26.0139 13.9676 25.7937 10.7443 25.2403L6.18334 24.456H4.02372H1.85873V22.0385V19.621H4.03447C6.51642 19.621 6.23706 19.6747 6.90859 19.0784C7.48341 18.5734 7.78963 18.3478 8.19791 18.1437C9.0306 17.7246 9.89015 17.6225 10.8733 17.8267Z" fill="#FAB106" />
                        </svg>

                      </div>

                    </div>
                    <div className="text-xl text-gray-500">Total Revenue</div>
                  </div>
                  <div className="w-[350px] rounded-lg bg-white border-xl py-8 px-8 border">
                    <div className="flex mb-3 justify-between">
                      <div className="text-3xl font-bold">{subscriptionStatistics.all_subscriptions}</div>
                      <div className=" border rounded-lg h-1- w-10 shadow-sm flex items-center justify-center">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.4692 6.24719C6.87371 6.24719 5.58031 7.54059 5.58031 9.13608C5.58031 10.7316 6.87372 12.025 8.46922 12.025C10.0647 12.025 11.3581 10.7316 11.3581 9.13608C11.3581 7.54059 10.0647 6.24719 8.4692 6.24719ZM11.7126 12.7942C12.722 11.8986 13.3581 10.5916 13.3581 9.13608C13.3581 6.43602 11.1693 4.24719 8.4692 4.24719C5.76914 4.24719 3.58031 6.43602 3.58031 9.13608C3.58031 10.5916 4.21642 11.8986 5.2258 12.7942C4.54302 13.1374 3.91282 13.5898 3.36234 14.1403C3.11821 14.3844 2.89332 14.6443 2.68869 14.9175C2.23006 15.5298 2.0141 16.2122 2.05213 16.9009C2.08957 17.579 2.3685 18.1861 2.76726 18.6762C3.55195 19.6407 4.86767 20.2472 6.247 20.2472L10.6914 20.2472C12.0708 20.2472 13.3865 19.6407 14.1712 18.6762C14.57 18.1861 14.8489 17.579 14.8863 16.9009C14.9243 16.2122 14.7084 15.5298 14.2498 14.9175C14.0451 14.6443 13.8202 14.3844 13.5761 14.1403C13.0256 13.5898 12.3954 13.1374 11.7126 12.7942ZM8.46922 14.025C7.0842 14.025 5.75591 14.5752 4.77655 15.5545C4.59996 15.7311 4.43736 15.919 4.28944 16.1165C4.08587 16.3883 4.03934 16.6141 4.04908 16.7906C4.05941 16.9777 4.13853 17.1926 4.31866 17.414C4.69175 17.8726 5.4172 18.2472 6.247 18.2472L10.6914 18.2472C11.5213 18.2472 12.2467 17.8726 12.6198 17.414C12.7999 17.1926 12.879 16.9777 12.8894 16.7906C12.8991 16.6141 12.8526 16.3883 12.649 16.1165C12.5011 15.919 12.3385 15.7311 12.1619 15.5545C11.1825 14.5752 9.85424 14.025 8.46922 14.025ZM21.9541 9.54009C22.3446 9.93061 22.3446 10.5638 21.9541 10.9543L18.9541 13.9543C18.5636 14.3448 17.9304 14.3448 17.5399 13.9543L16.0399 12.4543C15.6494 12.0638 15.6494 11.4306 16.0399 11.0401C16.4304 10.6496 17.0636 10.6496 17.4541 11.0401L18.247 11.833L20.5399 9.54009C20.9304 9.14956 21.5636 9.14956 21.9541 9.54009Z" fill="#FB7E00" />
                        </svg>

                      </div>

                    </div>
                    <div className="text-xl text-gray-500">Total Subscriptions</div>
                  </div>
                  <div className="w-[350px] rounded-lg bg-white border-xl py-8 px-8 border">
                    <div className="flex mb-3 justify-between">
                      <div className="text-3xl font-bold">{subscriptionStatistics.all_subscriptions}</div>
                      <div className=" border rounded-lg h-1- w-10 shadow-sm flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.8499 7.99999C6.8499 6.2603 8.26021 4.84999 9.9999 4.84999C11.7396 4.84999 13.1499 6.2603 13.1499 7.99999C13.1499 9.73969 11.7396 11.15 9.9999 11.15C8.26021 11.15 6.8499 9.73969 6.8499 7.99999ZM9.9999 3.14999C7.32132 3.14999 5.1499 5.32141 5.1499 7.99999C5.1499 10.6786 7.32132 12.85 9.9999 12.85C12.6785 12.85 14.8499 10.6786 14.8499 7.99999C14.8499 5.32141 12.6785 3.14999 9.9999 3.14999ZM4.8499 17.9167C4.8499 17.5136 5.17855 16.9979 6.21827 16.5388C7.2078 16.1018 8.58414 15.85 9.9999 15.85C11.3956 15.85 12.7708 16.1431 13.7678 16.6047C14.2668 16.8357 14.6327 17.0912 14.8629 17.3378C15.0845 17.5752 15.1475 17.7656 15.1498 17.9085C15.1418 17.93 15.105 17.9981 14.9626 18.1088C14.7442 18.2786 14.3796 18.4616 13.8649 18.627C12.8445 18.9549 11.4362 19.15 9.9999 19.15C8.3014 19.15 6.90326 18.9521 5.9612 18.6316C5.48754 18.4704 5.18096 18.2955 5.00759 18.1425C4.84883 18.0024 4.84976 17.9286 4.8499 17.9174L4.8499 17.9167ZM15.1518 17.901C15.152 17.901 15.1518 17.903 15.1505 17.9068C15.1509 17.9029 15.1516 17.901 15.1518 17.901ZM9.9999 14.15C8.41567 14.15 6.792 14.427 5.53154 14.9837C4.32125 15.5181 3.1499 16.4607 3.1499 17.9167C3.1499 18.5456 3.46745 19.0507 3.88284 19.4172C4.2876 19.7744 4.82476 20.0406 5.4136 20.241C6.59654 20.6435 8.1984 20.85 9.9999 20.85C11.5636 20.85 13.1553 20.6406 14.385 20.2455C14.9952 20.0494 15.5682 19.7913 16.0059 19.451C16.4403 19.1133 16.8499 18.6034 16.8499 17.9167C16.8499 17.2271 16.536 16.6389 16.1057 16.1778C15.6796 15.7213 15.108 15.3518 14.482 15.062C13.229 14.4819 11.6042 14.15 9.9999 14.15ZM16.1538 11.9185C16.1989 11.4512 16.6142 11.1089 17.0814 11.1539C18.2956 11.2709 19.4221 11.5865 20.2733 12.0788C21.0977 12.5555 21.8499 13.32 21.8499 14.3733C21.8499 14.9192 21.641 15.417 21.2348 15.8126C20.8518 16.1855 20.3291 16.4349 19.7317 16.6043C19.2801 16.7323 18.8102 16.47 18.6821 16.0183C18.5541 15.5667 18.8164 15.0968 19.2681 14.9687C19.7157 14.8418 19.9429 14.6978 20.0487 14.5947C20.1313 14.5143 20.1499 14.4536 20.1499 14.3733C20.1499 14.2166 20.0327 13.9034 19.4223 13.5504C18.8388 13.213 17.9652 12.947 16.9184 12.8461C16.4511 12.801 16.1088 12.3857 16.1538 11.9185ZM17.9999 3.14999C17.5305 3.14999 17.1499 3.53055 17.1499 3.99999C17.1499 4.46944 17.5305 4.84999 17.9999 4.84999C18.9112 4.84999 19.6499 5.58872 19.6499 6.49999C19.6499 7.41126 18.9112 8.14999 17.9999 8.14999C17.5305 8.14999 17.1499 8.53055 17.1499 8.99999C17.1499 9.46944 17.5305 9.84999 17.9999 9.84999C19.8501 9.84999 21.3499 8.35015 21.3499 6.49999C21.3499 4.64984 19.8501 3.14999 17.9999 3.14999Z" fill="#000000" />
                        </svg>


                      </div>

                    </div>
                    <div className="text-xl text-gray-500">Total Users</div>
                  </div>
                </div>
              </div>
            </div>
          ): (<Skeleton active paragraph={{ rows: 4 }} />)}
        </div>
      </div>
    </div>
  );
}