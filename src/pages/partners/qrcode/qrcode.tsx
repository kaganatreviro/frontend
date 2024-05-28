/* eslint-disable */
import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import "./style.scss";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import EstablishmentSwitcher from "../../../components/establishment/switcher/Switcher";
import { fetchEstablishmentsList } from "../../../store/actions/partner/establishemntsSlice";
import { Card, Skeleton } from "antd";

const QRCodes: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentEstablishment, setCurrentEstablishment] = useState<any>(null);

  const dispatch = useAppDispatch();
  const establishments = useSelector((state: RootState) => state.establishments.establishments) || [];

  useEffect(() => {
    dispatch(fetchEstablishmentsList());
  }, [dispatch]);

  useEffect(() => {
    if (establishments.length > 0 && !currentEstablishment) {
      setCurrentEstablishment(establishments[0]);
    }
  }, [establishments, currentEstablishment]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    console.log("Current Establishment updated: ", currentEstablishment);
  }, [currentEstablishment]);

  return (
    <div className="flex-1 flex bg-[#f4f4f4]">
      <div className="container flex-1 p-12">
        <EstablishmentSwitcher
          title="QR Code"
          currentEstablishment={currentEstablishment}
          onEstablishmentChange={setCurrentEstablishment}
        />
        {loading ? (
          <Card bordered={false} className="w-full">
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        ) : (

          <div className="flex justify-center items-center flex-col h-full">
            <div className="w-[500px] flex flex-col items-center">
              <div className="qr-frames">
                <QRCode value={currentEstablishment ? `${currentEstablishment.id}` : "1"} size={300} />
              </div>
              <div className="text-gray-400 text-3xl pt-12">
                Scan QR code to view the menu
              </div>
            </div>
          </div>

        )}
      </div>
    </div>
  );
};

export default QRCodes;
