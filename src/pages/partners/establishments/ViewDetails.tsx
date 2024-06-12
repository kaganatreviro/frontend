/* eslint-disable */
import React, { useEffect } from "react";
import { Modal } from "antd";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import { fetchEstablishmentsList } from "../../../store/actions/partner/establishemntsSlice";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface EstablishmentDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  establishmentId: number | null;
}

const EstablishmentDetails: React.FC<EstablishmentDetailsProps> = ({
  isOpen,
  onClose,
  establishmentId,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEstablishmentsList());
  }, [dispatch]);

  const establishments = useSelector((state: RootState) =>
    state.establishments.establishments.filter(
      (establishment) => establishment.id === establishmentId
    )
  );

  return (
    <div
      className={`fixed z-10 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${isOpen ? "block" : "hidden"}`}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {establishments.length > 0 && (
          <div>
            <div className="flex justify-between items-center">
              <div className="font-medium text-4xl mb-8">View Details:</div>
              <button onClick={onClose} className="self-start">
                <FontAwesomeIcon icon={faTimes} className="w-8 h-8 " />
              </button>
            </div>
            <div className="flex gap-10 items-start text-lg">
              <img
                src={establishments[0].logo}
                className="w-[200px] h-[200px]"
                alt=""
              />
              <div className="w-[300px]">
                
                <div className="mb-2">
                  <p className="font-bold">Name:</p>
                  <p>{establishments[0].name}</p>
                </div>
                <div className="mb-2">
                  <p className="font-bold">Email:</p>
                  <p>{establishments[0].email}</p>
                </div>
                <div className="mb-2">
                  <p className="font-bold">Number:</p>
                  <p>+{establishments[0].phone_number}</p>
                </div>
                <div className="mb-2">
                  <p className="font-bold">Time:</p>
                  <p>
                    {establishments[0].happyhours_start.slice(0, 5)}-
                    {establishments[0].happyhours_end.slice(0, 5)}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="font-bold">Address:</p>
                  <p>{establishments[0].address}</p>
                </div>
                <div className="mb-4">
                  <p className="font-bold">Description:</p>
                  <p>{establishments[0].description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EstablishmentDetails;
