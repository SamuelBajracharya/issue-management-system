import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {gsap} from 'gsap';
import {MorphSVGPlugin} from 'gsap/MorphSVGPlugin';
import {GoogleCircleFilled, LockOutlined, MailOutlined} from "@ant-design/icons";
import {Button, Divider, Form, Input} from "antd";
import AuthNavbar from "../../components/authComponents/authNavbar.jsx";
import {useLogin} from "../../hooks/useAuth.js";
import {useProfileData} from "../../store/authStore.js";
import Cookies from "js-cookie";
import ToastMessage from "../../components/toastMessage.jsx";

gsap.registerPlugin(MorphSVGPlugin);

const Login = () => {
  const {mutate, isLoading} = useLogin();
  const loginUserSet = useProfileData(state => state.login);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup');
  };

  const handleSignIn = async (values) => {
    const {email, password} = values;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const loginData = isEmail ? {email, password} : {phone: email, password};

    isEmail ? loginUserSet(email) : loginUserSet(loginData.phone);
    mutate(loginData, {
      onSuccess: (data) => {
        Cookies.set('token', data.token, {
          expires: 1,
          secure: true,
          sameSite: 'strict',
        });

        setToast({
          alertMessage: "Login Successful",
          alertDescription: "Welcome back!",
          alertType: "success",
        });

        setTimeout(() => {
          if (data.role === 'admin') navigate("/admin/dashboard");
          else if (data.role === 'superAdmin') navigate("/superAdmin/dashboard");
          else if (data.role === 'user') navigate("/");
          else console.log("Unknown role");
        }, 1000);
      },
      onError: (err) => {
        setToast({
          alertMessage: "Login Failed",
          alertDescription: err.response?.data?.message || "Something went wrong. Please try again.",
          alertType: "error",
        })
      }
    });
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
            name="email"
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
      </div>
      <p>Don't have an account? <Button type="link" onClick={goToSignUp}>Sign Up</Button></p>
      {toast && (
        <ToastMessage
          alertMessage={toast.alertMessage}
          alertDescription={toast.alertDescription}
          alertType={toast.alertType}
        />
      )}
    </div>
  );
};

export default Login;
