/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Button, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const SubscriptionCard: React.FC<{
    subscription: any;
    onDelete: (id: number) => void;
    onEdit: (id: number, updatedSubscription: any) => void;
}> = ({ subscription, onDelete, onEdit }) => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedSubscription, setEditedSubscription] = useState<any>({});

    useEffect(() => {
        setEditedSubscription(subscription);
    }, [subscription]);

    const showEditModal = () => {
        setEditModalVisible(true);
    };

    const handleEditCancel = () => {
        setEditModalVisible(false);
    };

    const handleEditConfirm = async () => {
        try {
            // Perform validation if needed
            onEdit(subscription.id, editedSubscription);
            setEditModalVisible(false);
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };

    const handleDurationChange = (duration: string) => {
        setEditedSubscription((prevState: any) => ({
            ...prevState,
            duration: duration,
            price: duration === "FT" ? 0 : prevState.price,
            free_trial_days: duration !== "FT" ? 0 : prevState.free_trial_days
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedSubscription({ ...editedSubscription, [name]: value });
    };
    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + "...";
        } else {
            return text;
        }
    };

    return (
        <div className="bg-white shadow-xl rounded-xl p-8 w-[290px] border border-gray-300">
            <div>
                <div className="flex flex-col justify-between h-[270px]">
                    <div className="flex items-center flex-col mb-4">
                        <div className="uppercase text-2xl font-semibold mb-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {truncateText(subscription.name, 12)}
                        </div>
                        <div className="flex mb-4">
                            <div className="self-start font-semibold text-xl ">KGS</div>
                            <div className="text-5xl font-semibold">{parseInt(subscription.price)}</div>
                            <div className="font-semibold self-center mt-3">
                                /
                                {subscription.duration === "FT"
                                    ? `${subscription.free_trial_days} days`
                                    : subscription.duration === "1M"
                                        ? "1 month"
                                        : subscription.duration === "3M"
                                            ? "3 months"
                                            : subscription.duration === "6M"
                                                ? "6 months"
                                                : subscription.duration}
                            </div>
                        </div>
                        <hr className="border w-[290px] border-gray-300" />
                        <div className="text-center mt-4">{truncateText(subscription.description, 100)}</div>
                    </div>
                    <div className="flex justify-between ">
                        <button onClick={showEditModal} className="text-[#FF9328]">
                            <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                        <button onClick={() => onDelete(subscription.id)} className="text-red-600">
                            <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                    </div>
                </div>
                <Modal
                    title="Edit Subscription"
                    visible={editModalVisible}
                    onCancel={handleEditCancel}
                    centered={true}
                    width={350}
                    footer={null}
                >
                    <Form
                        initialValues={editedSubscription}
                        onFinish={handleEditConfirm}
                        labelCol={{ span: 24 }}
                        colon={false}
                        requiredMark={false}
                    >
                        <Form.Item
                            name="name"
                            label="Name:"
                            rules={[{ required: true, message: "Please enter a subscription name" }]}
                        >
                            <Input
                                placeholder="Subscription Name"
                                name="name"
                                value={editedSubscription.name}
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Duration:"
                            name="duration"
                            rules={[{ required: true, message: "Please choose a duration" }]}
                        >
                            <div className="flex gap-2 mt-2 flex-wrap">
                                <Button
                                    onClick={() => handleDurationChange("1M")}
                                    type={editedSubscription.duration === "1M" ? "primary" : "default"}
                                >
                                    1 Month
                                </Button>
                                <Button
                                    onClick={() => handleDurationChange("3M")}
                                    type={editedSubscription.duration === "3M" ? "primary" : "default"}
                                >
                                    3 Months
                                </Button>
                                <Button
                                    onClick={() => handleDurationChange("6M")}
                                    type={editedSubscription.duration === "6M" ? "primary" : "default"}
                                >
                                    6 Months
                                </Button>
                                <Button
                                    onClick={() => handleDurationChange("FT")}
                                    type={editedSubscription.duration === "FT" ? "primary" : "default"}
                                >
                                    Free Trial
                                </Button>
                            </div>
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label="Price:"
                            rules={[
                                { required: true, message: "Please enter a price" },
                                { pattern: /^\d{1,5}(\.\d{1,2})?$/, message: "Please enter a valid price" },
                            ]}
                        >
                            <Input
                                placeholder="Price"
                                name="price"
                                value={editedSubscription.price}
                                onChange={handleInputChange}
                                disabled={editedSubscription.duration === "FT"}
                            />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Description:"
                            rules={[{ required: true, message: "Please enter a description" }]}
                        >
                            <Input.TextArea
                                placeholder="Description"
                                name="description"
                                value={editedSubscription.description}
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item
                            name="free_trial_days"
                            label="Free Trial Days:"
                            rules={[
                                { required: true, message: "Please enter free trial days" },
                            ]}
                        >
                            <Input
                                placeholder="Free Trial Days"
                                name="free_trial_days"
                                value={editedSubscription.free_trial_days}
                                onChange={handleInputChange}
                                disabled={editedSubscription.duration !== "FT"}
                            />
                        </Form.Item>
                        <div className="flex justify-end">
                            <Button onClick={handleEditCancel} className="mr-4">
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default SubscriptionCard;