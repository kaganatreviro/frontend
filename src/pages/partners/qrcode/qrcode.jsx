import React, { useEffect, useState } from "react";
import { Card, Skeleton, Image } from "antd";
import Navigation from "../../../components/common/Navigation";
import "./style.scss";

function QRCode() {
  return (
    <div className="flex-1 flex bg-[#f4f4f4]">
      <div className=" container flex-1 p-12">
        <div className="font-medium text-4xl mb-8 ml-6 absolute">QR Code</div>
        <div className="flex justify-center items-center flex-col h-full">
          <div className="w-[500px] flex flex-col items-center">
            <div className="qr-frames">
              <img
                className="cursor-pointer w-[300px]"
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/QR_Code_example.png"
                alt="QR Code"
              />
            </div>

            <div className="text-gray-400 text-3xl pt-12">
              Scan QR code to view the menu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRCode;