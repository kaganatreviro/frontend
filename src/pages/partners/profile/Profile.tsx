import React, { useEffect } from "react";
import { Form, Input, Button, Card, Alert, message, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { editProfile, fetchProfile } from "../../../store/actions/partner/profileSlice";
import { useAppDispatch } from "../../../helpers/hooks/hook";

export default function Profile() {
  const dispatch = useAppDispatch();
  const profile = useSelector((state: RootState) => state.partnerProfile.profile);
  const status = useSelector((state: RootState) => state.partnerProfile.status);
  const error = useSelector((state: RootState) => state.partnerProfile.error);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const onFinish = (values: any) => {
    dispatch(editProfile(values))
      .unwrap()
      .then(() => {
        message.success("Profile updated successfully!");
      })
      .catch((error) => {
        message.error(`Failed to update profile: ${error.message}`);
      });
  };

  if (status === "loading") {
    return (
      <Card bordered={false} className="w-full">
        <Skeleton active paragraph={{ rows: 4 }} />
      </Card>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div className="flex-1 flex bg-[#f4f4f4]">
      <div className="container justify-start items-start flex-1 p-12">
        <div className="font-medium text-4xl mb-8">Partner Management</div>
        <Card bordered={false} className="w-full flex max-w-3xl bg-white shadow-sm">
          <Form
            name="profileForm"
            initialValues={{
              name: profile?.name || "",
              email: profile?.email || "",
              maxEstablishment: profile?.max_establishments || "",
              phone_number: profile?.phone_number || "",
            }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            className="flex flex-col h-full"
            requiredMark={false}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: "email", message: "The input is not valid E-mail!" },
                { required: true, message: "Please input your E-mail!" },
              ]}
            >
              <Input placeholder="Email" disabled />
            </Form.Item>

            <Form.Item
              label="Max establishment"
              name="maxEstablishment"
            >
              <Input placeholder="1" disabled />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone_number"
              rules={[
                { required: true, message: "Please input your phone number!" },
                {
                  pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
                  message: "Please enter a valid phone number!",
                },
              ]}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" className="modal-confirm-btn" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
