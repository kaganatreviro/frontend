/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode.react";
import "./style.scss";
import { Establishment, fetchEstablishmentsList } from "../../../store/actions/partner/establishemntsSlice";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import EstablishmentSwitcher from "../../../components/establishment/switcher/Switcher";
import { fetchEstablishments } from "../../../components/api/api";
import { Card, Skeleton, Button } from "antd";

const QRCodes: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const qrRef = useRef<HTMLDivElement>(null);

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
  const name = establishment ? `${establishment.name}` : "";

  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = `${name}_QRCode.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
  };

  const printQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const url = canvas.toDataURL("image/png");
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`<img src="${url}" onload="window.print();window.close()" />`);
          printWindow.document.close();
        }
      }
    }
  };

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
                <div className="qr-frames" ref={qrRef}>
                  <QRCode value={url} size={300} bgColor="rgba(0,0,0,0)" fgColor="#000000" />
                </div>

                <div className="text-gray-400 text-3xl pt-12">
                  Scan QR code to view the menu
                </div>
                <div className="flex gap-4">
                  <button onClick={downloadQRCode} className="mt-4 text-xl bg-[#FB7E00] rounded-lg text-white px-8 py-2">
                    Download
                  </button>
                  <button onClick={printQRCode} className="mt-4 text-xl bg-[#FB7E00] rounded-lg text-white px-8 py-2">
                    Print
                  </button>
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