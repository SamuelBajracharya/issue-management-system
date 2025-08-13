import React, {useState} from 'react';
import {Button, Form, Input, Select, Upload, Alert, Spin} from "antd";
import {CheckOutlined, CloseOutlined, FileOutlined} from "@ant-design/icons";
import {useAddOverlay} from "../../store/overlayStore.js";
import {useCreateIssue} from "../../hooks/useUserIssues.js";

const AddIssueOverlay = () => {
  const closeAddOverlay = useAddOverlay(state => state.closeAddOverlay);
  const [fileList, setFileList] = useState([]);

  const {mutate, isLoading, isError, error} = useCreateIssue();

  const handleSubmit = async (values) => {
    mutate(values, {
      onSuccess: () => closeAddOverlay(),
      onError: (err) => {
        console.error("Adding failed:", err.response?.data || err.message);
      },
    });
  };

  const onChange = ({fileList: newFileList}) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    if (imgWindow) {
      imgWindow.document.write(image.outerHTML);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="add-issue-overlay">
        <Form
          name="add-issue"
          onFinish={handleSubmit}
          layout="vertical"
          disabled={isLoading}  // disables all inputs when loading
        >

          {/* Header */}
          <div className="add-issue-header">
            <h1>Create New Issue</h1>
            <div>
              <button className="cancel-button" onClick={closeAddOverlay} disabled={isLoading}>
                <CloseOutlined/>
              </button>
              <Button
                block
                className="submit-button"
                htmlType="submit"
                loading={isLoading}  // shows spinner on button when loading
              >
                <CheckOutlined/>
              </Button>
            </div>
          </div>

          {/* Show error alert if there's an error */}
          {isError && (
            <Alert
              message="Failed to create issue"
              description={error?.message || "Something went wrong. Please try again."}
              type="error"
              showIcon
              style={{marginBottom: 16}}
            />
          )}

          {/* Form Fields */}
          <div className="add-issue-form">
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

            <Form.Item style={{border: "none"}} label="Attachments">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                showUploadList={{showRemoveIcon: true}}
                disabled={isLoading}
              />
            </Form.Item>
          </div>

          <div className="add-issue-footer">
            <Form.Item
              name="impact"
              rules={[{required: true, message: 'Please select impact!'}]}
            >
              <Select
                defaultValue="Impact"
                className="issues-filter"
                style={{width: 170, height: 40}}
                options={[
                  {value: 'HIGH', label: 'High'},
                  {value: 'MEDIUM', label: 'Medium'},
                  {value: 'LOW', label: 'Low'},
                ]}
                disabled={isLoading}
              />
            </Form.Item>

            <Form.Item
              name="urgency"
              rules={[{required: true, message: 'Please select urgency!'}]}
            >
              <Select
                defaultValue="Urgency"
                style={{width: 170, height: 40}}
                className="issues-filter"
                options={[
                  {value: 'HIGH', label: 'High'},
                  {value: 'MEDIUM', label: 'Medium'},
                  {value: 'LOW', label: 'Low'},
                ]}
                disabled={isLoading}
              />
            </Form.Item>

            <Upload
              listType="picture"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              beforeUpload={() => false}
              showUploadList={false}
              disabled={isLoading}
            >
              <Button className="file-upload" icon={<FileOutlined/>} disabled={isLoading}>
                Choose files from device
              </Button>
            </Upload>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddIssueOverlay;
