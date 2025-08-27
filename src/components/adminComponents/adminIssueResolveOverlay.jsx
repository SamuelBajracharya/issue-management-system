import React, {useState} from 'react'
import {useResolveIssue} from "../../hooks/useAdminIssues.js";
import {Button, Form, Input, Select} from "antd";
import {useResolveOverlay} from "../../store/overlayStore.js";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import ToastMessage from "../toastMessage.jsx";

const AdminIssueResolveOverlay = () => {
  const {mutate, isLoading} = useResolveIssue();
  const selectedIssueId = useResolveOverlay(state => state.selectedIssueId)
  const closeResolveOverlay = useResolveOverlay(state => state.closeResolveOverlay);
  const [toast, setToast] = useState(null);
  const {Option} = Select;

  const handleSubmit = async (values) => {
    mutate(
      {
        id: selectedIssueId, resolveValue: {
          resolution: values.resolution,
          message: values.message || ""
        }
      },
      {
        onSuccess: () => {
          setToast({
            alertMessage: values.message,
            alertDescription: "Your issue has been successfully resolved.",
            alertType: "success",
          });
          setTimeout(() => {
            closeResolveOverlay();
          }, 1000);
        },
        onError: (err) => {
          setToast({
            alertMessage: "Issue Resolve Failed",
            alertDescription: err?.response?.data?.message || "Something went wrong. Please try again.",
            alertType: "error",
          });
        },
      }
    )
  }
  return (
    <div className="popup-overlay">
      <div className="resolve-issue-overlay">
        <Form
          name="resolve-issue"
          onFinish={handleSubmit}
          layout="vertical"
          disabled={isLoading}
        >
          {/* header */}
          <div className="resolve-issue-header">
            <h1>Resolve Issue</h1>
            <div>
              <button
                className="cancel-button"
                onClick={closeResolveOverlay}
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
          {/* form */}
          <div className="resolve-issue-form">
            <Form.Item
              name="resolution"
              rules={[{required: true, message: "Please select resolution!"}]}
            >
              <Select className="issues-filter">
                <Option value="RESOLVED">Resolved</Option>
                <Option value="CLOSED">Closed</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="message"
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
  )
}
export default AdminIssueResolveOverlay
