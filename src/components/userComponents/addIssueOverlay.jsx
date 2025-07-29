import React, {useState} from 'react';
import {Button, Form, Input, Select, Upload} from "antd";
import {CheckOutlined, CloseOutlined, FileOutlined, UploadOutlined} from "@ant-design/icons";
import {useAddIssueOverlay} from "../../store/overlayStore.js";
import ImgCrop from 'antd-img-crop';


const AddIssueOverlay = () => {
  const closeAddOverlay = useAddIssueOverlay(state => state.closeAddOverlay);

  const [fileList, setFileList] = useState([]); // state to manage uploaded files

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
        <Form name="add-issue" initialValues={{remember: true}} layout="vertical">

          {/* Header */}
          <div className="add-issue-header">
            <h1>Create New Issue</h1>
            <div>
              <button className="cancel-button" onClick={closeAddOverlay}>
                <CloseOutlined/>
              </button>
              <Button block className="submit-button" htmlType="submit">
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

            <Form.Item style={{border: "none"}} label="Attachments">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                showUploadList={{showRemoveIcon: true}}
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
              />
            </Form.Item>

            <ImgCrop rotationSlider>
              <Upload
                listType="picture"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={() => false}
                showUploadList={false}
              >
                <Button className="file-upload" icon={<FileOutlined/>}>Choose files from device</Button>
              </Upload>
            </ImgCrop>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddIssueOverlay;
