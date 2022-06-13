import Icon, { MailOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Layout, Row, notification, Alert } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import axios from 'axios';
import { useRouter } from 'next/router';
import Login from '../../../public/assets/Images/Login_images/login.png';
import Logo from '../../../public/assets/Images/YBM-Logo.svg';
import Styles from './AuthLogin.module.scss';

function AuthLoginLayout() {
  const [form] = Form.useForm();
  const router = useRouter();
  const initialValues = { email: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [Loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  /** *Sucess Notification** */

  const AuthNotification = (type) => {
    notification[type]({
      message: 'Login Successfully',
      description: 'Welcome, you are now logged in!.',
    });
  };
  /**
   * Get vlaue input Field
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };
  /**
   * Login Then Move To Overview
   */

  const onFinish = () => {
    setLoading(true);
    const config = {
      method: 'post',
      url: `${process.env.NEXT_API_BASE_URL}/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: formValues,
    };
    axios(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        AuthNotification('success');
        console.log(response.data.result.firstName);
        const data = response.data.result;
        localStorage.setItem('firstName', data.firstName);
        const { token } = response.data;

        localStorage.setItem('token', JSON.stringify(token));

        router.push('/Overview');
        setIsError(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setLoading(false);
      });
  };

  return (
    <Layout>
      <Row>
        <Col span={16} className={Styles.LoginContainer}>
          <div className={`container ${Styles.FormContainer}`}>
            <Row justify="center" align="middle" style={{ flex: 1 }}>
              <Col span={8}>
                <h1 className={Styles.Heading}>Sign In</h1>
                {isError ? (
                  <Alert message="Invalid email or password" type="error" showIcon closable />
                ) : (
                  ''
                )}
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  // onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Please provide email address' },
                      { whitespace: true, message: 'Email address cannot be empty ' },
                      { type: 'email', message: 'Please enter a valid email address' },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="abc@gmail.com"
                      name="email"
                      value={formValues.email}
                      prefix={<MailOutlined className="text-primary" />}
                      style={{ width: '100%' }}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: 'Please input your password!' },
                      { whitespace: true, message: 'Password cannot be empty ' },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="123"
                      name="password"
                      value={formValues.password}
                      onChange={(e) => handleChange(e)}
                      prefix={<Icon component={RiLockPasswordLine} className="text-primary" />}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" loading={Loading} htmlType="login" block>
                      Sign In
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={8} className={Styles.BackgroundContainer}>
          <div className={Styles.ImageContainer}>
            <div className={Styles.LogoContainer}>
              <Image src={Logo} objectFit="contain" width={50} height={50} alt="" />;
            </div>
            <Row justify="center">
              <Col span={20}>
                <Image src={Login} width={382} height={312} className={Styles.siderImage} alt="" />
                <h1 className={Styles.WelcomeConatiner}>Welcome to YBM</h1>
                <p className={Styles.InnerConatiner}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl
                  erat, vel convallis elit fermentum pellentesque.
                </p>
              </Col>
            </Row>

            <div className="d-flex justify-content-end">
              <div className={Styles.policyContainer}>
                <Link href="/#"> Term & Conditions </Link>
                <span className="mx-2 p-2 text-white">|</span>
                <Link href="/#">Privacy & Policy</Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default AuthLoginLayout;
