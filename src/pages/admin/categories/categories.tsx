/* eslint-disable */
import { useAppDispatch } from "../../../helpers/hooks/hook";
import React, { useEffect, useState } from "react";
import {
  fetchCategoriesList
} from "../../../store/actions/admin/categories/categories";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { Button, Modal, Input, Form, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { createCategory, deleteCategory, updateCategory } from "../../../components/api/api";
import "./style.scss"

const CategoryCard: React.FC<{
  category: any;
  onDelete: (id: number) => void;
  onEdit: (id: number, newName: string) => void;
}> = ({ category, onDelete, onEdit }) => {

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(
    null
  );

  const showDeleteModal = (categoryId: number) => {
    setDeletingCategoryId(categoryId);
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setDeletingCategoryId(null);
  };

  const handleDeleteConfirm = () => {
    if (deletingCategoryId !== null) {
      onDelete(deletingCategoryId);
      setDeleteModalVisible(false);
      setDeletingCategoryId(null);
    }
  };
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedCategoryName, setEditedCategoryName] = useState("");

  const showEditModal = () => {
    setEditedCategoryName(category.name);
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

const handleEditConfirm = async () => {
  if (editedCategoryName.trim() === "") {
    message.error("Category name cannot be empty");
    return;
  }

  onEdit(category.id, editedCategoryName);
  setEditModalVisible(false);
};
    const [form] = Form.useForm();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-[240px] border border-gray-300 ">
      <div>
        <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
        <div className="text-gray-600 mb-4">
          Beverages: {category.beverages.length}
        </div>
        <div className="flex justify-between">
          <button onClick={showEditModal} className="text-[#FF9328]">
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
          <button
            onClick={() => showDeleteModal(category.id)}
            className="text-red-600"
          >
            <FontAwesomeIcon icon={faTrash} /> Delete
          </button>
        </div>
        <Modal
          title="Delete Category"
          visible={deleteModalVisible}
          onCancel={handleDeleteCancel}
          width={300}
          footer={null}
        >
          <p className="text-lg my-10 text-center">
            Are you sure you want to delete this category?
          </p>
          <div className="flex justify-between">
            <button
              key="cancel"
              className="cancel-btn w-[100px]"
              onClick={handleDeleteCancel}
            >
              No
            </button>
            <Button
              key="delete"
              className="btn w-[100px]"
              onClick={handleDeleteConfirm}
            >
              Yes
            </Button>
          </div>
        </Modal>
        <Modal
          title="Edit Category"
          visible={editModalVisible}
          onCancel={handleEditCancel}
          width={300}
          footer={null}
        >
          <Form
            form={form}
            onFinish={handleEditConfirm}
            initialValues={{ name: editedCategoryName }}
          >
            <Form.Item
              className="text-lg mt-10 mb-12"
              name="name"
              rules={[
                { required: true, message: "Please enter a category name" },
              ]}
            >
              <Input
                placeholder="Category Name"
                onChange={(e) => setEditedCategoryName(e.target.value)}
              />
            </Form.Item>
            <div className="flex justify-between">
              <Button
                key="cancel"
                onClick={handleEditCancel}
                className="cancel-btn w-[100px]"
              >
                Cancel
              </Button>
              <Button
                key="edit"
                className="btn"
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

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchCategoriesList());
  }, [dispatch]);

  const categories =
    useSelector((state: RootState) => state.category.categories) || [];
  console.log(categories);

  const handleAddCategory = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values: { name: string }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      await createCategory(formData);
      message.success("Category added successfully!");
      setIsModalVisible(false);
      form.resetFields();
      dispatch(fetchCategoriesList());
    } catch (error) {
      console.error("Failed to add category:", error);
      message.error("Failed to add category.");
    }
  };

  const handleDelete = async (categoryId: number) => {
    try {
      await deleteCategory(categoryId);
      dispatch(fetchCategoriesList());
      message.success("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      message.error("Failed to delete category.");
    }
  };

  const handleEdit = async (categoryId: number, newName: string) => {
    try {
      const formData = new FormData();
      formData.append("name", newName);
      await updateCategory(categoryId, formData);
      dispatch(fetchCategoriesList());
      message.success("Category name updated successfully!");
    } catch (error) {
      console.error("Error updating category name:", error);
      message.error("Failed to update category name.");
    }
  };

  return (
    <div className="flex-1 flex bg-[#f4f4f4] categories">
      <div className="flex-1 admin_partners container">
        <div className="flex flex-col h-full items-start p-12 bg-gray-100 flex-1">
          <div className="font-medium text-4xl mb-8">Category Management</div>
          <div className="w-full">
            <Button
              className="bg-[#FB7E00] px-3 py-2 text-white rounded-lg mb-6"
              onClick={handleAddCategory}
              type="primary"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="self-center mr-2 w-4 h-4"
              />
              <div className="text-white rounded-lg">Add New</div>
            </Button>
            <div className="flex flex-wrap gap-10">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Add Category"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={300}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            className="text-lg mt-10 mb-12"
            name="name"
            rules={[
              { required: true, message: "Please enter a category name" },
            ]}
          >
            <Input placeholder="Category Name" />
          </Form.Item>
          <div className="flex justify-between">
            <button
              className="cancel-btn w-[100px]"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="btn  w-[100px]"
              type="submit"
            >
              Submit
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;