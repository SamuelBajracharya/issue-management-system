import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {gsap} from 'gsap';
import {MorphSVGPlugin} from 'gsap/MorphSVGPlugin';
import {GoogleCircleFilled, LockOutlined, MailOutlined} from "@ant-design/icons";
import {Button, Divider, Form, Input} from "antd";
import AuthNavbar from "../../components/authComponents/authNavbar.jsx";
import {useGetMe, useLogin} from "../../hooks/useAuth.js";
import {useProfileData} from "../../store/authStore.js";
import Cookies from "js-cookie";
import ToastMessage from "../../components/toastMessage.jsx";

gsap.registerPlugin(MorphSVGPlugin);

const Login = () => {
  const {mutate, isLoading} = useLogin();
  const loginUserSet = useProfileData(state => state.login);
  const [toast, setToast] = useState(null);
  const {data: user} = useGetMe()

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return; // wait until user data is loaded

    const token = Cookies.get('accessToken');
    const role = user.role;

    if (token && role) {
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'superadmin') navigate('/super/dashboard');
      else if (role === 'user') navigate('/');
      else console.log('Unknown role');
    }
  }, [user, navigate]);

  const goToSignUp = () => {
    navigate('/signup');
  };

  const handleSignIn = async (values) => {
    const {email, password} = values;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const loginData = isEmail ? {email, password} : {phone: email, password};
    loginUserSet(isEmail ? email : loginData.phone);

    mutate(loginData, {
      onSuccess: (data) => {
        // Save token and role in cookies
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

        // Redirect based on role
        setTimeout(() => {
          if (data.role === 'admin') navigate("/admin/dashboard");
          else if (data.role === 'superadmin') navigate("/super/dashboard");
          else if (data.role === 'user') navigate("/");
          else console.log("Unknown role");
        }, 1000);
      },
      onError: (err) => {
        setToast({
          alertMessage: "Login Failed",
          alertDescription: err.response?.data?.message || "Something went wrong. Please try again.",
          alertType: "error",
        });
      }
    });
  };

  return (
    <div className="auth-container">
      <AuthNavbar/>
      <div className="login-container">
        <h1>Welcome Back!</h1>
        <Button className="google-button"><GoogleCircleFilled/>Continue With Google</Button>
        <Divider plain>Or</Divider>
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
