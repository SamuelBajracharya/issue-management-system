import React from 'react'
import {useEditOverlay} from "../../store/overlayStore.js";
import {CloseOutlined} from "@ant-design/icons";
import {useEditAdmin} from "../../hooks/useSuperAdmin.js";
import {Form, Input} from "antd";

const EditAdminOverlay = ({adminId}) => {
  const {mutate: editAdmin, isLoading, isError, error} = useEditAdmin();
  const closeEditOverlay = useEditOverlay(state => state.closeEditOverlay);

  const handleSubmit = async (values) => {
    editAdmin({adminId: adminId, newPassword: values},
      {
        onSuccess: () => closeEditOverlay(),
        onError: (err) => {
          console.error("Update failed:", err.response?.data || err.message);
        },
      });
  }
  return (
    <div className="popup-overlay">
      <div className="edit-admin-overlay">
        <Form
          name="edit-issue"
          onFinish={handleSubmit}
          layout="vertical"
          disabled={isLoading}
        >
          <div className="edit-admin-header">
            <h2>Edit Admin</h2>
            <button className="cancel-button" onClick={closeEditOverlay} disabled={isLoading}>
              <CloseOutlined/>
            </button>
          </div>
        </Form>
        <div className="edit-form">
          <Form.Item
            name="password"
            label="New Password"
            rules={[{required: true, message: 'Please enter new password!'}]}
          >
            <Input placeholder="new password"/>
          </Form.Item>
        </div>
      </div>
    </div>
  )
}
export default EditAdminOverlay
