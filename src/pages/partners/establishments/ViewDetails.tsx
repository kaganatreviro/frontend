/* eslint-disable */
import React, { useEffect } from "react";
import { Modal } from "antd";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import { fetchEstablishmentsList } from "../../../store/actions/partner/establishemntsSlice";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

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

  console.log(establishments);

  return (
    <Modal visible={isOpen} onCancel={onClose} title="" footer={null}>
      {establishments.length > 0 && (
        <div>
          <img src={establishments[0].logo} alt="" />
          <p>Name: {establishments[0].name}</p>
          <p>Description: {establishments[0].description}</p>
          <p>Phone Number: +{establishments[0].phone_number}</p>
          <p>
            Time: {establishments[0].happyhours_start}:
            {establishments[0].happyhours_end}
          </p>
          <p>Address: {establishments[0].address}</p>
        </div>
      )}
    </Modal>
  );
};

export default EstablishmentDetails;
