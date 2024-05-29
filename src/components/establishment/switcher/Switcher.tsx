import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import { RootState } from "../../../store/store";
import { fetchEstablishmentsList, setCurrentEstablishment } from "../../../store/actions/partner/establishemntsSlice";
import { Select, Typography, Avatar } from "antd";
import "./style.scss";

const { Option } = Select;
const { Title } = Typography;

interface EstablishmentSwitcherProps {
  title: string;
}

function EstablishmentSwitcher({ title }: EstablishmentSwitcherProps) {
  const dispatch = useAppDispatch();
  const establishments = useSelector((state: RootState) => state.establishments.establishments);
  const currentEstablishment = useSelector((state: RootState) => state.establishments.currentEstablishment);

  useEffect(() => {
    dispatch(fetchEstablishmentsList()).then((action) => {
      if (fetchEstablishmentsList.fulfilled.match(action)) {
        const savedEstablishmentId = localStorage.getItem("currentEstablishmentId");
        const defaultEstablishment = action.payload[0];
        if (savedEstablishmentId) {
          const savedEstablishment = action.payload.find((est: any) => est.id === Number(savedEstablishmentId));
          if (savedEstablishment) {
            dispatch(setCurrentEstablishment(savedEstablishment));
          } else if (defaultEstablishment) {
            dispatch(setCurrentEstablishment(defaultEstablishment));
            localStorage.setItem("currentEstablishmentId", defaultEstablishment.id.toString());
          }
        } else if (defaultEstablishment) {
          dispatch(setCurrentEstablishment(defaultEstablishment));
          localStorage.setItem("currentEstablishmentId", defaultEstablishment.id.toString());
        }
      }
    });
  }, [dispatch]);

  const handleSelectChange = (value: number) => {
    const selectedEstablishment = establishments.find((est) => est.id === value);
    if (selectedEstablishment) {
      dispatch(setCurrentEstablishment(selectedEstablishment));
      localStorage.setItem("currentEstablishmentId", value.toString());
    }
  };

  return (
    <div className="switcher">
      <div className="font-medium text-4xl">{title}</div>
      {establishments.length > 0 ? (
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
      ) : null}
    </div>
  );
}

export default EstablishmentSwitcher;
