/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { fetchSubStatistics } from "../../../store/actions/admin/subscriptions/subscriptionActions";
import { useAppDispatch } from "../../../helpers/hooks/hook";


export default function SubscriptionStatistics() {
  const dispatch = useAppDispatch();
  const subscriptionStatistics = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(fetchSubStatistics());
}, [dispatch]);

  console.log("Filled Data: ", subscriptionStatistics.subscription);

  return (
    <div className="flex-1 flex bg-[#f4f4f4] subscriptions">
      <div className="flex-1 admin_partners container">
        <div className="flex flex-col h-full items-start p-12 bg-gray-100 flex-1">
          <div className="font-medium text-4xl mb-8">Subscription Statistics</div>
          <div className="w-full">

          </div>
        </div>
      </div>
    </div>
  );
}
