/* eslint-disable */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import { RootState } from "../../../store/store";
import { fetchEstablishmentsList } from "../../../store/actions/partner/establishemntsSlice";
import { Select, Avatar } from "antd";
import "./style.scss";

const { Option } = Select;

interface EstablishmentSwitcherProps {
  title: string;
  currentEstablishment?: any;
  onEstablishmentChange?: (establishment: any) => void;
}

function EstablishmentSwitcher({ title, currentEstablishment, onEstablishmentChange }: EstablishmentSwitcherProps) {
  const dispatch = useAppDispatch();
  const establishments = useSelector((state: RootState) => state.establishments.establishments);

  useEffect(() => {
    dispatch(fetchEstablishmentsList()).then((action) => {
      if (fetchEstablishmentsList.fulfilled.match(action)) {
        const savedEstablishmentId = localStorage.getItem("currentEstablishmentId");
        const defaultEstablishment = action.payload[0];
        if (savedEstablishmentId) {
          const savedEstablishment = action.payload.find((est: any) => est.id === Number(savedEstablishmentId));
          if (savedEstablishment) {
            onEstablishmentChange?.(savedEstablishment);
          } else if (defaultEstablishment) {
            onEstablishmentChange?.(defaultEstablishment);
            localStorage.setItem("currentEstablishmentId", defaultEstablishment.id.toString());
          }
        } else if (defaultEstablishment) {
          onEstablishmentChange?.(defaultEstablishment);
          localStorage.setItem("currentEstablishmentId", defaultEstablishment.id.toString());
        }
      }
    });
  }, [dispatch, onEstablishmentChange]);

  const handleSelectChange = (value: number) => {
    const selectedEstablishment = establishments.find((est) => est.id === value);
    if (selectedEstablishment) {
      onEstablishmentChange?.(selectedEstablishment);
      localStorage.setItem("currentEstablishmentId", value.toString());
    }
  };

  return (
    <div className="switcher">
      <div className="font-medium text-4xl">{title}</div>
      <Select
        style={{ width: 300, height: 48 }}
        placeholder="Select an establishment"
        value={currentEstablishment?.id}
        onChange={handleSelectChange}
      >
        {establishments.map((est) => (
          <Option key={est.id} value={est.id}>
            <Avatar src={est.logo} style={{ marginRight: 8 }} />
            {est.name}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default EstablishmentSwitcher;