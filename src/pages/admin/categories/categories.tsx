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
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"; // Import edit icon
import { createCategory, deleteCategory, updateCategory } from "../../../components/api/api";

const CategoryCard: React.FC<{
  category: any;
  onDelete: (id: number) => void;
  onEdit: (id: number, newName: string) => void; // Define onEdit prop
}> = ({ category, onDelete, onEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(category.name);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedName(category.name);
  };

  const handleSaveEdit = () => {
    onEdit(category.id, editedName);
    setEditMode(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      {editMode ? (
        <div>
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <Button onClick={handleSaveEdit}>Save</Button>
          <Button onClick={handleCancelEdit}>Cancel</Button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
          <div className="text-gray-600">Beverages: {category.beverages.length}</div>
          <Button type="link" onClick={() => onDelete(category.id)} className="text-red-500">
            <FontAwesomeIcon icon={faTrash} /> Delete
          </Button>
          <Button type="link" onClick={handleEdit} className="text-blue-500">
            <FontAwesomeIcon icon={faEdit} /> Edit
          </Button>
        </div>
      )}
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
    <div className="flex-1 flex bg-[#f4f4f4]">
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
      <Modal
        title="Add Category"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input placeholder="Category Name" />
          </Form.Item>
          <div className="flex justify-end">
            <Button type="default" onClick={handleCancel} className="mr-2">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;