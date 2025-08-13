import React from 'react'
import {Alert, Button, Form, Input, Select, Upload} from "antd";
import {CheckOutlined, CloseOutlined, ConsoleSqlOutlined} from "@ant-design/icons";
import {useUpdateIssue} from "../../hooks/useUserIssues.js";
import {useEditOverlay} from "../../store/overlayStore.js";

const EditIssueOverlay = ({issueId, title, description}) => {
  const {mutate, isLoading, isError, error} = useUpdateIssue();
  const closeEditOverlay = useEditOverlay(state => state.closeEditOverlay);

  const handleSubmit = async (values) => {
    mutate({id: issueId, issueData: values},
      {
        onSuccess: () => closeEditOverlay(),
        onError: (err) => {
          console.error("Update failed:", err.response?.data || err.message);
        },
      });
  }
  return (
    <div className="popup-overlay">
      <div className="edit-issue-overlay">
        <Form
          name="add-issue"
          onFinish={handleSubmit}
          layout="vertical"
          disabled={isLoading}
          initialValues={{title, description}}
        >

          {/* Header */}
          <div className="edit-issue-header">
            <h1>Edit Issue</h1>
            <div>
              <button className="cancel-button" onClick={closeEditOverlay} disabled={isLoading}>
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
        {isError && (
          <Alert
            message="Failed to update issue"
            description={error?.response?.data?.message || "Something went wrong. Please try again."}
            type="error"
            showIcon
            style={{marginBottom: 16}}
          />

        )}
      </div>


    </div>

  )
}
export default EditIssueOverlay
