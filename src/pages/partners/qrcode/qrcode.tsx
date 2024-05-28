/* eslint-disable */
import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import "./style.scss";
import { Establishment, fetchEstablishmentsList } from "../../../store/actions/partner/establishemntsSlice";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import EstablishmentSwitcher from "../../../components/establishment/switcher/Switcher";
import { fetchEstablishments } from "../../../components/api/api";
import { Card, Skeleton } from "antd";

const QRCodes: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchEstablishments()
      .then((data) => {
        console.log("Establishments fetched:", data);
        setEstablishments(data);
      })
      .catch((error) => console.error("Error fetching establishments:", error));
  }, []);

  useEffect(() => {
    dispatch(fetchEstablishmentsList());
  }, [dispatch]);

  const establishment = useSelector((state: RootState) => state.establishments.currentEstablishment);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const url = establishment ? `${establishment.id}` : "1";

  return (
    <div className="flex-1 flex bg-[#f4f4f4]">
      <div className="container flex-1 p-12">
        <EstablishmentSwitcher title="QR Code" />
        {loading ? (
          <Card bordered={false} className="w-full">
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        ) : (
          <div className="flex justify-center items-center flex-col h-full">
            {establishments.length === 0 ? (
              <div className="text-gray-400 text-3xl pt-12">
                No establishments
              </div>
            ) : (
              <div className="w-[500px] flex flex-col items-center mb-20">
                <div className="qr-frames">
                  <QRCode value={url} size={300} />
                </div>
                <div className="text-gray-400 text-3xl pt-12">
                  Scan QR code to view the menu
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodes;