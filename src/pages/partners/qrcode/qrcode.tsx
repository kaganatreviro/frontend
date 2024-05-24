/* eslint-disable */
import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import "./style.scss";
import { fetchEstablishmentsList } from "../../../store/actions/partner/establishemntsSlice";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import EstablishmentSwitcher from "../../../components/establishment/switcher/Switcher";
import { fetchEstablishments } from "../../../components/api/api";
import { Card, Skeleton } from "antd";

const QRCodes: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEstablishments()
      .then((data) => console.log("Establishments fetched:", data))
      .catch((error) => console.error("Error fetching establishments:", error));
  }, []);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchEstablishmentsList());
  }, [dispatch]);

  const establishments =
    useSelector((state: RootState) => state.establishments.establishments) ||
    [];
  console.log(establishments, "aaa");

  const url = establishments ? `$}` : "1";

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flex-1 flex bg-[#f4f4f4]">
      {loading ? (
        <Card bordered={false} className="w-full">
          <Skeleton active paragraph={{ rows: 4 }} />
        </Card>
      ) : (
        <div className="container flex-1 p-12">
          <EstablishmentSwitcher title="QR Code" />
          <div className="flex justify-center items-center flex-col h-full">
            <div className="w-[500px] flex flex-col items-center">
              <div className="qr-frames">
                <QRCode value={`${establishments[0].id}` || "1"} size={300} />
              </div>
              <div className="text-gray-400 text-3xl pt-12">
                Scan QR code to view the menu
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodes;
