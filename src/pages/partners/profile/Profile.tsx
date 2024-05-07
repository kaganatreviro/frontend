import React, { useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import { fetchProfile } from "store/actions/partner/profileSlice";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useAppDispatch } from "../../../helpers/hooks/hook";

export default function Profile() {
  const dispatch = useAppDispatch();
  const profile = useSelector((state: RootState) => state.partnerProfile.profile);
  const status = useSelector((state: RootState) => state.partnerProfile.status);
  const error = useSelector((state: RootState) => state.partnerProfile.error);

  // useEffect(() => {
  //   dispatch(fetchProfile());
  // }, [dispatch]);

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="flex-1 flex bg-[#f4f4f4]">
      <div className="container justify-start items-start flex-1 p-12">
        <div className="font-medium text-4xl mb-8">Partner Management</div>
        <Card bordered={false} className="w-full flex max-w-3xl bg-white shadow-sm">
          <Form
            name="profileForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            className="flex flex-col h-full"
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
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Max establishment"
              name="maxEstablishment"
              rules={[{ required: true, message: "Please input the maximum number of establishments!" }]}
            >
              <Input placeholder="1" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true, message: "Please input your phone number!" }]}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>

            {/* <Form.Item */}
            {/*   name="description" */}
            {/* > */}
            {/*   <Input.TextArea placeholder="Description" rows={4} /> */}
            {/* </Form.Item> */}

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
