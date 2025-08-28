import React, {useState} from "react";
import {useAddAdmin} from "../../hooks/useSuperAdmin.js";
import {useAddOverlay} from "../../store/overlayStore.js";
import {Button, Form, Input} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import ToastMessage from "../toastMessage.jsx";

const AddAdminOverlay = () => {
  const {mutate: createAdmin, isLoading} = useAddAdmin();
  const closeAddOverlay = useAddOverlay((state) => state.closeAddOverlay);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (values) => {
    createAdmin(values, {
      onSuccess: () => {
        setToast({
          alertMessage: "Admin user Created",
          alertDescription: "Admin user has been successfully created.",
          alertType: "success",
        });

        setTimeout(() => {
          closeAddOverlay();
        }, 1000);
      },
      onError: (err) => {
        setToast({
          alertMessage: "Creating Failed",
          alertDescription:
            err.response?.data?.message ||
            "Something went wrong. Please try again.",
          alertType: "error",
        });
      },
    });
  };

  return (
    <div className="popup-overlay">
      <div className="edit-admin-overlay">
        <Form
          name="create-admin"
          onFinish={handleSubmit}
          layout="vertical"
          disabled={isLoading}
        >
          {/* Header */}
          <div className="edit-admin-header">
            <h2>Create Admin</h2>
            <Button
              type="text"
              icon={<CloseOutlined/>}
              onClick={closeAddOverlay}
              disabled={isLoading}
              className="cancel-button"
            />
          </div>

          {/* Form */}
          <div className="edit-form">
            <Form.Item
              name="email"
              label="Email"
              rules={[{required: true, message: "Please enter email!"}]}
            >
              <Input
                placeholder="enter email"
                style={{height: "50px"}}
                disabled={isLoading}
              />
            </Form.Item>

            <Form.Item
              name="name"
              label="Name"
              rules={[{required: true, message: "Please enter full name!"}]}
            >
              <Input
                placeholder="enter full name"
                style={{height: "50px"}}
                disabled={isLoading}
              />
            </Form.Item>

            <Form.Item
              className="password-ant-input"
              name="password"
              label="Password"
              rules={[{required: true, message: "Please enter new password!"}]}
            >
              <Input.Password placeholder="enter password"/>
            </Form.Item>

            {/* Actions */}
            <div className="edit-actions-bottom">
              <Button
                type="default"
                onClick={closeAddOverlay}
                disabled={isLoading}
                className="cancel-button"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="confirm-button"
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

export default AddAdminOverlay;
