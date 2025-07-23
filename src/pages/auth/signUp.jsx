import React from 'react'
import Logo from "../../components/logo.jsx";
import {Button, Divider, Form, Input} from "antd";
import {GoogleCircleFilled, LockOutlined, MailOutlined} from "@ant-design/icons";

const SignUp = () => {
  return (
    <div className="auth-container">
      <div className="logo"><Logo/></div>
      <div className="login-container">
        <h1>Welcome Back!</h1>
        <Button className="google-button"><GoogleCircleFilled/>Continue With Google</Button>
        <Divider variant="solid" plain>Or</Divider>
        <Form
          name="login"
          initialValues={{remember: true}}
          style={{maxWidth: 500}}
          layout="vertical"
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{required: true, message: 'Please input your full name!'}]}
          >
            <Input prefix={<MailOutlined/>} placeholder="Full Name"/>
          </Form.Item>
          <Form.Item
            label="Email or Phone"
            name="email"
            rules={[{required: true, message: 'Please input your email or phone!'}]}
          >
            <Input prefix={<MailOutlined/>} placeholder="Email or phone"/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{required: true, message: 'Please input your Password!'}]}
          >
            <Input.Password prefix={<LockOutlined/>} placeholder="Password"/>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" className="main-button" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
      <p>Already have an account? <Button type="link">Log In</Button></p>
    </div>)
}
export default SignUp
