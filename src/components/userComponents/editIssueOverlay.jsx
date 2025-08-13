import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {useUpdateIssue} from "../../hooks/useUserIssues.js";
import {useEditOverlay} from "../../store/overlayStore.js";
import ToastMessage from "../../components/toastMessage.jsx";

const EditIssueOverlay = ({issueId, title, description}) => {
  const {mutate, isLoading} = useUpdateIssue();
  const closeEditOverlay = useEditOverlay(state => state.closeEditOverlay);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (values) => {
    mutate(
      {id: issueId, issueData: values},
      {
        onSuccess: () => {
          setToast({
            alertMessage: "Issue Updated",
            alertDescription: "Your issue has been successfully updated.",
            alertType: "success",
          });
          setTimeout(() => {
            closeEditOverlay();
          }, 1000);
        },
        onError: (err) => {
          setToast({
            alertMessage: "Update Failed",
            alertDescription: err?.response?.data?.message || "Something went wrong. Please try again.",
            alertType: "error",
          });
        },
      }
    );
  };

  return (
    <div className="popup-overlay">
      <div className="edit-issue-overlay">
        <Form
          name="edit-issue"
          onFinish={handleSubmit}
          layout="vertical"
          disabled={isLoading}
          initialValues={{title, description}}
        >
          {/* Header */}
          <div className="edit-issue-header">
            <h1>Edit Issue</h1>
            <div>
              <button
                className="cancel-button"
                onClick={closeEditOverlay}
                disabled={isLoading}
              >
                <CloseOutlined/>
              </button>
              <Button
                block
                className="submit-button"
                htmlType="submit"
                loading={isLoading}
              >
                <CheckOutlined/>
              </Button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="edit-issue-form">
            <Form.Item
              name="title"
              rules={[{required: true, message: 'Please input your title!'}]}
            >
              <Input placeholder="Enter title of the issue"/>
            </Form.Item>

            <Form.Item
              name="description"
              rules={[{required: true, message: 'Please input your description!'}]}
            >
              <Input.TextArea
                placeholder="Enter description of the issue"
                autoSize={{minRows: 4, maxRows: 8}}
              />
            </Form.Item>
          </div>
        </Form>

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

export default EditIssueOverlay;
