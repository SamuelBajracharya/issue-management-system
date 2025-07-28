import React from 'react'
import Logo from "../../components/logo.jsx";
import {Button, Divider, Form, Input} from "antd";
import {GoogleCircleFilled, LockOutlined, MailOutlined} from "@ant-design/icons";
import AuthNavbar from "../../components/authComponents/authNavbar.jsx";
import {useSignUp} from "../../hooks/useAuth.js";
import {useProfileData} from "../../store/authStore.js";

const SignUp = () => {
  const {mutate, isLoading, isError, error} = useSignUp();
  const loginUserSet = useProfileData(state => state.login);

  const goToLogIn = () => {
    window.location.href = '/login';
  }
  const handleSignUp = async (values) => {
    let signUpData = {}
    const {fullName, email, password} = values;
    console.log(values);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (isEmail) {
      signUpData = {name: fullName, email, password}
      loginUserSet(email);
    } else {
      signUpData = {name: fullName, phone: email, password}
      loginUserSet(signUpData.phone);
    }
    mutate(signUpData);
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
          onFinish={handleSignUp}
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
            <Button block type="primary" className="main-button" htmlType="submit" loading={isLoading}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        {
          isError && (
            <p style={{color: 'red', textAlign: 'center'}}>{error}</p>
          )
        }
      </div>
      <p>Already have an account? <Button type="link" onClick={goToLogIn}>Log In</Button></p>
    </div>)
}
export default SignUp
