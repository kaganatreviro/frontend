import React, { useEffect, useState } from "react";
import { Card, Skeleton, Image } from "antd";
import Navigation from "../../../components/common/Navigation";
import "./style.scss";

function QRCode() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex">
      <Navigation />
      <div className="bg-[#f4f4f4] flex-1 p-12">
        <div className="font-medium text-4xl mb-8 ml-6 absolute">QR Code</div>
        {loading ? (
          <Card bordered={false} className="w-full">
            <Skeleton active />
          </Card>
        ) : (
          <div className="flex justify-center items-center flex-col h-full">
            <div className="w-[400px] flex flex-col items-center">
              <div className="qr-frames">
                <img
                  className="cursor-pointer w-[300px]"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/QR_Code_example.png"
                  alt="QR Code"
                />
              </div>

              <div className="text-gray-400 text-2xl pt-12">
                Scan QR code to view the menu
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QRCode;
