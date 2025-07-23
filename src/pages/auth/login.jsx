import React from 'react';
import {useNavigate} from 'react-router-dom';
import {gsap} from 'gsap';
import {MorphSVGPlugin} from 'gsap/MorphSVGPlugin';
import {GoogleCircleFilled, LockOutlined, MailOutlined} from "@ant-design/icons";
import {Button, Divider, Form, Input} from "antd";
import Logo from "../../components/logo.jsx";

gsap.registerPlugin(MorphSVGPlugin);

const Login = () => {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate('/');
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

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
          onFinish={handleFinish}
        >
          <Form.Item
            label="Email or Phone"
            name="username"
            rules={[{required: true, message: 'Please input your Username!'}]}
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
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
      <p>Don't have an account? <Button type="link" onClick={goToSignUp}>Sign Up</Button></p>
    </div>
  );
};

export default Login;
