import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Modal,
  Tabs,
  Divider,
  InputNumber,
  notification,
  Spin,
  Card,
  Descriptions,
  Avatar,
  Button,
  Carousel, Skeleton, Collapse,
} from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import debounce from "lodash/debounce";
import moment from "moment";
import { CarouselRef } from "antd/es/carousel";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import { editPartnerById, fetchPartnerEstablishment } from "../../../store/actions/admin/partner/partnerActions";
import { Partner, Establishment } from "../../../store/actions/admin/partner/partnerSlice";
import "./style.scss";

interface ModalDetailsProps {
  visible: boolean;
  onClose: () => void;
}

function ModalDetails({ onClose, visible }: ModalDetailsProps) {
  const dispatch = useAppDispatch();
  const carouselRef = useRef<CarouselRef>(null);
  const partner = useSelector((state: RootState) => state.partner.currentPartnerDetails);
  const establishments = useSelector((state: RootState) => state.partner.establishments);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (partner) {
      dispatch(fetchPartnerEstablishment(partner.id));
    }
  }, [partner, dispatch]);

  const updateMaxEstablishments = useCallback(debounce(async (value: number | null) => {
    if (partner && value !== null) {
      const updatedPartner: Partner = { ...partner, max_establishments: value };
      try {
        await dispatch(editPartnerById(updatedPartner)).unwrap();
        notification.success({ message: "Max establishments updated successfully!" });
      } catch (error: any) {
        notification.error({ message: "Failed to update max establishments", description: error.message });
        console.error("Failed to update max establishments:", error);
      }
    }
  }, 500), [partner, dispatch]);

  const handleMaxEstablishmentsChange = (value: number | null) => {
    updateMaxEstablishments(value);
  };

  const handleTabChange = (key: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500); // Имитация задержки для демонстрации
  };
  const { Panel } = Collapse;
  const renderEstablishmentDetails = (establishment: Establishment) => {
    const happyHours = `${moment(establishment.happyhours_start, "HH:mm").format("HH:mm")} - ${moment(establishment.happyhours_end, "HH:mm").format("HH:mm")}`;

    return (
      <Card key={establishment.id} className="establishment-card">
        <Descriptions
          title={(
            <div className="flex gap-2 items-center justify-center">
              <Avatar src={establishment.logo} alt={`${establishment.name} logo`} />
              <div className="">{establishment.name}</div>
            </div>
        )}
          bordered
        >
          <Descriptions.Item label="Address">{establishment.address}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">{establishment.phone_number}</Descriptions.Item>
          <Descriptions.Item label="Email">{establishment.email}</Descriptions.Item>
          <Descriptions.Item label="Happy Hours">{happyHours}</Descriptions.Item>
        </Descriptions>
        <Collapse bordered={false}>
          <Panel header="View Description" key="1">
            {establishment.description}
          </Panel>
        </Collapse>
      </Card>
    );
  };

  // const carouselRef = React.useRef<typeof Carousel>(null);

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const tabsItems = [
    {
      label: "Partner Info",
      key: "1",
      children: (
        loading ? (
          <Card bordered={false} className="w-full max-w-3xl">
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        ) : (
          <div>
            <div className="flex gap-8">
              <div className="title">Name:</div>
              <div>{partner?.name}</div>
            </div>
            <Divider />
            <div className="flex gap-8">
              <div className="title">Email:</div>
              <div>{partner?.email}</div>
            </div>
            <Divider />
            <div className="flex gap-8">
              <div className="title">Phone:</div>
              <div>{partner?.phone_number ? partner?.phone_number : "empty"}</div>
            </div>
            <Divider />
            <div className="flex gap-8">
              <div className="title">Status:</div>
              <div>{partner?.is_blocked ? "Blocked" : "Active"}</div>
            </div>
            <Divider />
            <div className="flex gap-8">
              <div className="title">Max Establishments:</div>
              <InputNumber
                min={1}
                value={partner?.max_establishments}
                onChange={handleMaxEstablishmentsChange}
              />
            </div>

          </div>
        )
      ),
    },
    {
      label: "Establishments",
      key: "2",
      children: (
        loading ? (
          <Card bordered={false} className="w-full max-w-3xl">
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        ) : (
          <div className="carousel-container">
            <Carousel ref={carouselRef} dots>
              {establishments.map(renderEstablishmentDetails)}
            </Carousel>
            <div className="carousel-buttons">
              <Button
                shape="circle"
                icon={<LeftOutlined />}
                onClick={handlePrev}
                style={{ width: 48, height: 48 }}
              />
              <Button
                shape="circle"
                icon={<RightOutlined />}
                onClick={handleNext}
                style={{ width: 48, height: 48 }}
              />
            </div>
          </div>
        )
      ),
    },
  ];

  return (
    <Modal
      className="modal_details_admin"
      open={visible}
      onCancel={onClose}
      footer={[]}
    >
      <Tabs defaultActiveKey="1" className="tab" onChange={handleTabChange} items={tabsItems} />
    </Modal>
  );
}

export default ModalDetails;
