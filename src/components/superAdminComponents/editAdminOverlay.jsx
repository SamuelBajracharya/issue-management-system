import React, {useState} from "react";
import {useEditOverlay} from "../../store/overlayStore.js";
import {CloseOutlined} from "@ant-design/icons";
import {useEditAdmin} from "../../hooks/useSuperAdmin.js";
import {Button, Form, Input} from "antd";
import ToastMessage from "../../components/toastMessage.jsx";

const EditAdminOverlay = ({adminId}) => {
  const {mutate: editAdmin, isLoading} = useEditAdmin();
  const closeEditOverlay = useEditOverlay((state) => state.closeEditOverlay);

  const [toast, setToast] = useState(null);

  const handleSubmit = async (values) => {
    editAdmin(
      {adminId: adminId, newPassword: values.password},
      {
        onSuccess: () => {
          setToast({
            alertMessage: "Password Updated",
            alertDescription: "Admin password has been successfully changed.",
            alertType: "success",
          });

          setTimeout(() => {
            closeEditOverlay();
          }, 1000);
        },
        onError: (err) => {
          setToast({
            alertMessage: "Update Failed",
            alertDescription:
              err.response?.data?.message ||
              "Something went wrong. Please try again.",
            alertType: "error",
          });
        },
      }
    );
  };

  return (
    <div className="popup-overlay">
      <div className="edit-admin-overlay">
        <Form
          name="edit-admin"
          onFinish={handleSubmit}
          layout="vertical"
          disabled={isLoading}
        >
          {/* Header */}
          <div className="edit-admin-header">
            <h2>Edit Admin</h2>
            <Button
              type="text"
              icon={<CloseOutlined/>}
              onClick={closeEditOverlay}
              disabled={isLoading}
              className="cancel-overlay"
            />
          </div>

          {/* Form */}
          <div className="edit-form">
            <Form.Item
              className="password-ant-input"
              name="password"
              label="New Password"
              rules={[{required: true, message: "Please enter new password!"}]}
            >
              <Input.Password placeholder="new password"/>
            </Form.Item>

            {/* Actions */}
            <div className="edit-actions-bottom">
              <Button
                type="default"
                onClick={closeEditOverlay}
                disabled={isLoading}
                className="cancel-overlay"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="confirm-overlay"
                loading={isLoading}
              >
                Save
              </Button>
            </div>
          </div>
        </Form>

        {/* Toast */}
        {toast && (
          <ToastMessage
            alertMessage={toast.alertMessage}
            alertDescription={toast.alertDescription}
            alertType={toast.alertType}
          />
        )}
      </div>
    </div>
  );
};

export default EditAdminOverlay;
