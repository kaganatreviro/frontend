/* eslint-disable */
import React, { useState } from "react";
import { Modal, Input, Form, Button, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const SubscriptionCard: React.FC<{
    subscription: any;
    onDelete: (id: number) => void;
    onEdit: (id: number, updatedSubscription: any) => void;
}> = ({ subscription, onDelete, onEdit }) => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedSubscription, setEditedSubscription] = useState(subscription);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deletingSubscriptionId, setDeletingSubscriptionId] = useState<number | null>(null);
    const [form] = Form.useForm();

    const showEditModal = () => {
        setEditedSubscription(subscription);
        setEditModalVisible(true);
    };

    const handleEditCancel = () => {
        setEditModalVisible(false);
    };

    const handleEditConfirm = async () => {
        if (!editedSubscription.name.trim() || !editedSubscription.price.trim()) {
            message.error("Subscription name and price cannot be empty");
            return;
        }
        onEdit(subscription.id, editedSubscription);
        setEditModalVisible(false);
    };

    const showDeleteModal = (subscriptionId: number) => {
        setDeletingSubscriptionId(subscriptionId);
        setDeleteModalVisible(true);
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
        setDeletingSubscriptionId(null);
    };

    const handleDeleteConfirm = () => {
        if (deletingSubscriptionId !== null) {
            onDelete(deletingSubscriptionId);
            setDeleteModalVisible(false);
            setDeletingSubscriptionId(null);
        }
    };

    return (
        <div className="bg-white shadow-xl rounded-xl p-8 w-[290px] border border-gray-300 ">
            <div>
                <div className="flex items-center flex-col mb-4">
                    <div className="uppercase text-2xl font-semibold mb-4">{subscription.name}</div>
                    <div className="flex mb-4">
                        <div className="self-start font-semibold text-xl ">KGS</div>
                        <div className="text-5xl font-semibold">{parseInt(subscription.price)}</div>
                        <div className="font-semibold self-center mt-3">/{subscription.duration == "FT" ? (`${subscription.free_trial_days} days`) : 
                        (`${subscription.duration === "1M"
                            ? "1 month"
                            : subscription.duration === "3M"
                                ? "3 months"
                                : subscription.duration === "6M"
                                    ? "6 months"
                                    : subscription.duration}`)}</div>
                    </div>
                    <hr className="border w-[290px] border-gray-300" />
                    <div className="text-center mt-4">{subscription.description}</div>
                </div>
                <div className="flex justify-between">
                    <button onClick={showEditModal} className="text-[#FF9328]">
                        <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button
                        onClick={() => showDeleteModal(subscription.id)}
                        className="text-red-600"
                    >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                </div>
                <Modal
                    title="Delete Subscription"
                    open={deleteModalVisible}
                    onCancel={handleDeleteCancel}
                    centered={true}
                    width={300}
                    footer={null}
                >
                    <p className="text-lg my-10 text-center">
                        Are you sure you want to delete this subscription?
                    </p>
                    <div className="flex justify-between">
                        <Button
                            key="cancel"
                            className="bg-gray-400 text-white w-[100px]  py-1 rounded-md"
                            onClick={handleDeleteCancel}
                        >
                            No
                        </Button>
                        <Button
                            key="delete"
                            className="bg-[#FB7E00] text-white hover:bg-[#df8226]  py-1 rounded-md ml-4 w-[100px]"
                            onClick={handleDeleteConfirm}
                        >
                            Yes
                        </Button>
                    </div>
                </Modal>
                <Modal
                    title="Edit Subscription"
                    visible={editModalVisible}
                    onCancel={handleEditCancel}
                    centered={true}
                    width={300}
                    footer={null}
                >
                    <Form
                        form={form}
                        onFinish={handleEditConfirm}
                        initialValues={editedSubscription}
                    >
                        <Form.Item
                            className="text-lg mt-10 mb-12"
                            name="name"
                            rules={[
                                { required: true, message: "Please enter a subscription name" },
                            ]}
                        >
                            <Input
                                placeholder="Subscription Name"
                                onChange={(e) => setEditedSubscription({ ...editedSubscription, name: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item
                            className="text-lg mb-12"
                            name="duration"
                        >
                            <Input
                                placeholder="Duration"
                                onChange={(e) => setEditedSubscription({ ...editedSubscription, duration: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item
                            className="text-lg mb-12"
                            name="price"
                            rules={[
                                { required: true, message: "Please enter a price" },
                            ]}
                        >
                            <Input
                                placeholder="Price"
                                onChange={(e) => setEditedSubscription({ ...editedSubscription, price: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item
                            className="text-lg mb-12"
                            name="description"
                        >
                            <Input
                                placeholder="Description"
                                onChange={(e) => setEditedSubscription({ ...editedSubscription, description: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item
                            className="text-lg mb-12"
                            name="free_trial_days"
                        >
                            <Input
                                placeholder="Free Trial Days"
                                onChange={(e) => setEditedSubscription({ ...editedSubscription, free_trial_days: e.target.value })}
                            />
                        </Form.Item>
                        <div className="flex justify-between">
                            <Button
                                key="cancel"
                                onClick={handleEditCancel}
                                className="bg-gray-400 text-white w-[100px]  py-1 rounded-md"
                            >
                                Cancel
                            </Button>
                            <Button
                                key="edit"
                                className="bg-[#FB7E00] text-white hover:bg-[#df8226]  py-1 rounded-md ml-4 w-[100px]"
                                onClick={handleEditConfirm}
                            >
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
