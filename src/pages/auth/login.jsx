import React from 'react';
import {useNavigate} from 'react-router-dom';
import {gsap} from 'gsap';
import {MorphSVGPlugin} from 'gsap/MorphSVGPlugin';
import {GoogleCircleFilled, LockOutlined, MailOutlined} from "@ant-design/icons";
import {Button, Divider, Form, Input} from "antd";
import AuthNavbar from "../../components/authComponents/authNavbar.jsx";
import {useLogin} from "../../hooks/useAuth.js";
import {useProfileData} from "../../store/authStore.js";

gsap.registerPlugin(MorphSVGPlugin);

const Login = () => {
  const {mutate, isLoading, isError, error} = useLogin();
  const loginUserSet = useProfileData(state => state.login);

  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup');
  };

  const handleSignIn = async (values) => {

    mutate(values);
    loginUserSet(values.email);
  }

  return (
    <div className="auth-container">
      <AuthNavbar/>
      <div className="login-container">
        <h1>Welcome Back!</h1>
        <Button className="google-button"><GoogleCircleFilled/>Continue With Google</Button>
        <Divider variant="solid" plain>Or</Divider>
        <Form
          name="login"
          initialValues={{remember: true}}
          style={{maxWidth: 500}}
          layout="vertical"
          onFinish={handleSignIn}
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
            <Button block type="primary" className="main-button" htmlType="submit" loading={isLoading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
        {isError && (
          <p style={{color: 'red', textAlign: 'center'}}>
            {error?.response?.data?.message || "Login failed"}
          </p>
        )}
      </div>
      <p>Don't have an account? <Button type="link" onClick={goToSignUp}>Sign Up</Button></p>
    </div>
  );
};

export default Login;
