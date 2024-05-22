import React, { useEffect } from "react";
import { Form, Input, Button, Card, Alert, message, Skeleton } from "antd";
import PhoneInput from "react-phone-input-2";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { editProfile, fetchProfile } from "../../../store/actions/partner/profileSlice";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import "./style.scss";

export default function Profile() {
  const dispatch = useAppDispatch();
  const profile = useSelector((state: RootState) => state.partnerProfile.profile);
  const isLoading = useSelector((state: RootState) => state.partnerProfile.isLoading);
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

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div className="flex-1 partner_profile flex bg-[#f4f4f4]">
      <div className="container justify-start items-start flex-1 p-12">
        <div className="font-medium text-4xl mb-8">Partner Management</div>
        {isLoading ? (
          <Card bordered={false} className="w-full max-w-3xl">
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        ) : (
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
                label="Phone Number"
                name="phone_number"
                rules={[
                  { required: true, message: "Please input your phone number!" },
                  {
                    pattern: /^(?:\+996)?(?:\s*\d\s*){9}$/,
                    message: "Phone number must have exactly 9 digits!",
                  },
                ]}
              >
                <Input
                  type="number"
                  addonBefore="+996"
                  placeholder="700 123 456"
                />
              </Form.Item>

              {/* <Form.Item */}
              {/*   label="Phone Number" */}
              {/*   name="phone_number" */}
              {/*   rules={[ */}
              {/*     { */}
              {/*       required: true, */}
              {/*       message: "Please enter a valid phone number", */}
              {/*     }, */}
              {/*     { */}
              {/*       pattern: */}
              {/*         /^996\d{9}$/, */}
              {/*       message: "Please enter a valid phone number", */}
              {/*     }, */}
              {/*   ]} */}
              {/* > */}
              {/*   <PhoneInput */}
              {/*     country="kg" */}
              {/*     inputStyle={{ */}
              {/*       width: "100%", */}
              {/*       height: "32px", */}
              {/*       borderRadius: "6px", */}
              {/*       border: "1px solid #d9d9d9", */}
              {/*       paddingLeft: "8px", */}
              {/*     }} */}
              {/*     placeholder="Enter your phone" */}
              {/*     disableCountryCode */}
              {/*     disableDropdown */}
              {/*     inputProps={{ */}
              {/*       required: true, */}
              {/*     }} */}
              {/*   /> */}
              {/* </Form.Item> */}
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

              <Form.Item>
                <Button type="primary" className="modal-confirm-btn" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        )}
      </div>
    </div>
  );
}
