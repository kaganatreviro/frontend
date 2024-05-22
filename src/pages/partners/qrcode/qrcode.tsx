/* eslint-disable */
import React, { useEffect } from "react";
import QRCode from "qrcode.react";
import "./style.scss";
import { fetchEstablishmentsList } from "../../../store/actions/partner/establishemntsSlice";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useAppDispatch } from "../../../helpers/hooks/hook";

const QRCodes: React.FC = () => {
  

  const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(fetchEstablishmentsList());
    }, [dispatch]);
    const establishments =
      useSelector((state: RootState) => state.establishments.establishments) ||
      [];
      console.log(establishments)
      const url = establishments ? `${establishments[0].id}` : "1";
  return (
    <div className="flex-1 flex bg-[#f4f4f4]">
      <div className="container flex-1 p-12">
        <div className="font-medium text-4xl mb-8 ml-6 absolute">QR Code</div>
        <div className="flex justify-center items-center flex-col h-full">
          <div className="w-[500px] flex flex-col items-center">
            <div className="qr-frames">
              <QRCode value={url} size={300} />
            </div>
            <div className="text-gray-400 text-3xl pt-12">
              Scan QR code to view the menu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodes;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

