/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Input, Form, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "store/store";
import { createSubscription, deleteSubscription, updateSubscription } from "../../../components/api/api";
import SubscriptionCard from "./SubscriptionCard";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import { fetchSubscriptionsList } from "../../../store/actions/admin/subscriptions/subscriptionActions";

const Subscriptions: React.FC = () => {
    const dispatch = useAppDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
    const [isPriceDisabled, setIsPriceDisabled] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<number | null>(null);
    const [isFreeTrialDaysDisabled, setIsFreeTrialDaysDisabled] = useState(false);

    useEffect(() => {
        dispatch(fetchSubscriptionsList());
    }, [dispatch]);

    const subscriptions =
        useSelector((state: RootState) => state.subscription.subscriptions) || [];
    console.log(subscriptions);

    const handleAddSubscription = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setIsPriceDisabled(false);
        setIsFreeTrialDaysDisabled(false);
        setSelectedDuration(null);
    };

    const handleSubmit = async (values: any) => {
        try {
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                formData.append(key, values[key]);
            });
            await createSubscription(formData);
            message.success("Subscription added successfully!");
            setIsModalVisible(false);
            form.resetFields();
            dispatch(fetchSubscriptionsList());
        } catch (error) {
            console.error("Failed to add subscription:", error);
            message.error("Failed to add subscription.");
        }
    };

    const handleDelete = (subscriptionId: number) => {
        setSelectedSubscriptionId(subscriptionId);
        setDeleteModalVisible(true);
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
        setSelectedSubscriptionId(null);
    };

    const handleDeleteConfirm = async () => {
        if (selectedSubscriptionId) {
            try {
                await deleteSubscription(selectedSubscriptionId);
                dispatch(fetchSubscriptionsList());
                message.success("Subscription deleted successfully!");
            } catch (error) {
                console.error("Error deleting subscription:", error);
                message.error("Failed to delete subscription.");
            } finally {
                setDeleteModalVisible(false);
                setSelectedSubscriptionId(null);
            }
        }
    };


    const handleEdit = async (subscriptionId: number, updatedSubscription: any) => {
        try {
            const formData = new FormData();
            Object.keys(updatedSubscription).forEach(key => {
                formData.append(key, updatedSubscription[key]);
            });
            await updateSubscription(subscriptionId, formData);
            dispatch(fetchSubscriptionsList());
            message.success("Subscription updated successfully!");
        } catch (error) {
            console.error("Error updating subscription:", error);
            message.error("Failed to update subscription.");
        }
    };

    const handleDurationClick = (duration: string) => {
        setSelectedDuration(duration);
        form.setFieldsValue({ duration, free_trial_days: 0 });
        setIsFreeTrialDaysDisabled(true);
        setIsPriceDisabled(false);
    };

    const handleFreeTrialClick = () => {
        setSelectedDuration("FT");
        form.setFieldsValue({ duration: "FT", price: 0 });
        setIsPriceDisabled(true);
        setIsFreeTrialDaysDisabled(false);
    };

    return (
        <div className="flex-1 flex bg-[#f4f4f4] subscriptions">
            <div className="flex-1 admin_partners container">
                <div className="flex flex-col h-full items-start p-12 bg-gray-100 flex-1">
                    <div className="font-medium text-4xl mb-8">Subscription Management</div>
                    <div className="w-full">
                        <Button
                            className="bg-[#FB7E00] px-6 py-5 text-white rounded-lg mb-6"
                            onClick={handleAddSubscription}
                            type="primary"
                        >
                            <FontAwesomeIcon
                                icon={faPlus}
                                className="self-center mr-2 w-6 h-6"
                            />
                            <div className="text-white text-xl rounded-lg">Add New</div>
                        </Button>
                        <div className="flex flex-wrap gap-10">
                            {subscriptions.map((subscription) => (
                                <SubscriptionCard
                                    key={subscription.id}
                                    subscription={subscription}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="Add Subscription"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                centered={true}
                width={350}
            >
                <Form form={form} onFinish={handleSubmit} requiredMark={false}>
                    <Form.Item
                        className="text-lg mt-4 mb-6"
                        name="name"
                        label="Name:"
                        labelCol={{ span: 24 }}
                        colon={false}
                        rules={[
                            { required: true, message: "Please enter a subscription name" },
                            { max: 30, message: "Subscription name cannot exceed 30 characters" }
                        ]}
                    >
                        <Input placeholder="Subscription Name" />
                    </Form.Item>
                    <Form.Item
                        className="text-lg "
                        name="duration"
                        label="Subscription type:"
                        labelCol={{ span: 24 }}
                        colon={false}
                        rules={[
                            { required: true, message: "Please choose subscription type" },
                        ]}
                    >
                        <div className="flex gap-2 mt-2 flex-wrap">
                            <Button
                                onClick={() => handleDurationClick("1M")}
                                type={selectedDuration === "1M" ? "primary" : "default"}
                            >
                                1 Month
                            </Button>
                            <Button
                                onClick={() => handleDurationClick("3M")}
                                type={selectedDuration === "3M" ? "primary" : "default"}
                            >
                                3 Months
                            </Button>
                            <Button
                                onClick={() => handleDurationClick("6M")}
                                type={selectedDuration === "6M" ? "primary" : "default"}
                            >
                                6 Months
                            </Button>
                            <Button
                                onClick={handleFreeTrialClick}
                                type={selectedDuration === "FT" ? "primary" : "default"}
                            >
                                Free Trial
                            </Button>
                        </div>
                    </Form.Item>
                    <Form.Item
                        className="text-lg mb-6"
                        name="price"
                        label="Price:"
                        labelCol={{ span: 24 }}
                        colon={false}
                        rules={[
                            { required: true, message: "Please enter a price" },
                            { pattern: /^(\d{1,5})$/, message: "Please enter a valid price" },
                        ]}
                    >
                        <Input placeholder="Price" type="number" min="0" disabled={isPriceDisabled} />
                    </Form.Item>
                    <Form.Item
                        className="text-lg mb-6"
                        name="description"
                        label="Description:"
                        labelCol={{ span: 24 }}
                        colon={false}
                        rules={[
                            { required: true, message: "Please enter a description" },
                        ]}
                    >
                        <Input.TextArea placeholder="Description" />
                    </Form.Item>
                    <Form.Item
                        className="text-lg mb-8"
                        name="free_trial_days"
                        label="Free trial days:"
                        labelCol={{ span: 24 }}
                        colon={false}
                        rules={[
                            { required: true, message: "Please enter free trial days" },
                        ]}
                    >
                        <Input placeholder="Free Trial Days" disabled={isFreeTrialDaysDisabled} />
                    </Form.Item>
                    <div className="flex justify-between">
                        <button
                            className="bg-gray-400 text-white w-[100px]  py-1 rounded-md"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-[#FB7E00] text-white hover:bg-[#df8226] w-[100px]  py-1 rounded-md ml-4"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </Modal>
            <Modal
                title="Delete Subscription"
                visible={deleteModalVisible}
                onCancel={handleDeleteCancel}
                footer={null}
                width={300}
            >
                <p className="text-lg my-10 text-center">
                    Are you sure you want to delete this subscription?
                </p>
                <div className="flex justify-between">
                    <button
                        className="cancel-btn w-[100px]"
                        onClick={handleDeleteCancel}
                    >
                        No
                    </button>
                    <Button
                        className="btn w-[100px]"
                        onClick={handleDeleteConfirm}
                    >
                        Yes
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default Subscriptions;
