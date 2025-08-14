import React, {useState} from 'react';
import {Button, Form, Input, Select, Upload} from "antd";
import {CheckOutlined, CloseOutlined, FileOutlined} from "@ant-design/icons";
import {useAddOverlay} from "../../store/overlayStore.js";
import {useCreateIssue} from "../../hooks/useUserIssues.js";
import ToastMessage from "../../components/toastMessage.jsx";
import {useDarkToggleStore} from "../../store/uiStore.js";

const AddIssueOverlay = () => {
  const closeAddOverlay = useAddOverlay(state => state.closeAddOverlay);
  const [fileList, setFileList] = useState([]);
  const [toast, setToast] = useState(null);

  const isDarkMode = useDarkToggleStore(state => state.isDarkMode);
  const {mutate, isLoading} = useCreateIssue();

  const handleSubmit = async (values) => {
    mutate(values, {
      onSuccess: () => {
        setToast({
          alertMessage: "Issue Created",
          alertDescription: "Your issue has been successfully submitted.",
          alertType: "success",
        });
        setTimeout(() => {
          closeAddOverlay();
        }, 1000);
      },
      onError: (err) => {
        setToast({
          alertMessage: "Failed to Create Issue",
          alertDescription: err?.response?.data?.message || "Something went wrong. Please try again.",
          alertType: "error",
        });
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
          disabled={isLoading}
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
                loading={isLoading}
              >
                <CheckOutlined/>
              </Button>
            </div>
          </div>

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

            {/*<Form.Item style={{border: "none"}} label="Attachments">*/}
            {/*  <Upload*/}
            {/*    listType="picture-card"*/}
            {/*    fileList={fileList}*/}
            {/*    onChange={onChange}*/}
            {/*    onPreview={onPreview}*/}
            {/*    showUploadList={{showRemoveIcon: true}}*/}
            {/*    disabled={isLoading}*/}
            {/*  />*/}
            {/*</Form.Item>*/}
          </div>

          <div className="add-issue-footer">
            <Form.Item
              name="impact"
              rules={[{required: true, message: 'Please select impact!'}]}
            >
              <Select
                defaultValue="Impact"
                className="issues-filter"
                style={{
                  border: isDarkMode ? '1px solid var(--text-secondary)' : undefined,
                }}
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
                className="issues-filter"
                style={{
                  border: isDarkMode ? '1px solid var(--text-secondary)' : undefined,
                }}
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

export default AddIssueOverlay;
