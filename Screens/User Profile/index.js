import { makeStyles } from '@mui/styles';
import {
  Avatar,
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Image,
  Input,
  message,
  Row,
  Upload,
} from 'antd';
import React, { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import ChangePassword from './Change Password';

const useStyles = makeStyles({
  Label: {
    alignItems: 'center',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  Form: {
    '& .ant-form-item': {
      width: '100%',
      margin: 0,
    },
  },
});

/// //////////
const Uploadprops = {
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function UserProfileScreen() {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  const showLargeDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="userProfile"
      labelCol={{ span: 6, className: classes.Label }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{ width: '100%' }}
      className={classes.Form}
    >
      <Row style={{ alignItems: 'center' }}>
        <Form.Item name="Logo" label="Profile ">
          <Row style={{ width: '100%', alignItems: 'center' }}>
            <Col>
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                src={
                  <Image
                    alt=""
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
                }
              />
            </Col>
            <Col>
              <Row style={{ alignItems: 'center', marginLeft: '1rem' }}>
                <Upload {...Uploadprops} name="logo" action="/upload.do" maxCount={1}>
                  <Button type="link" icon={<AiOutlineEdit size={22} />} />
                </Upload>
                <Button type="link" icon={<RiDeleteBinLine size={22} />} danger />
              </Row>
            </Col>
          </Row>
        </Form.Item>
      </Row>
      <Divider />
      <Row>
        <Form.Item label="Full Name">
          <Row>
            <Col span={12} style={{ paddingRight: 10 }}>
              <Form.Item
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: 'First Name is required',
                  },
                ]}
                style={{ display: 'inline-block' }}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={12} style={{ paddingleft: 10 }}>
              <Form.Item
                name="lastname"
                rules={[{ required: true, message: 'Last Name is required' }]}
                style={{ display: 'inline-block' }}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Row>

      <Divider />
      <Row>
        <Form.Item label="Contact Information">
          <Row>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input email' }, { type: 'email' }]}
            >
              <Input placeholder="Email" style={{ display: 'inline-block', margin: ' 10px 0' }} />
            </Form.Item>
          </Row>

          <Row>
            <Form.Item
              name="official email"
              rules={[
                { required: true, message: 'Please input official email' },
                { type: 'email' },
              ]}
            >
              <Input
                placeholder="Official Email"
                style={{ display: 'inline-block', margin: ' 10px 0' }}
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              name="mobileno"
              rules={[{ required: true, message: 'Please input Mobile Number' }]}
            >
              <Input
                placeholder="Mobile No."
                style={{ display: 'inline-block', margin: ' 10px 0' }}
              />
            </Form.Item>
          </Row>
        </Form.Item>
      </Row>
      <Divider />
      <Row>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please input Gender' }]}
        >
          <Input placeholder="Gender" />
        </Form.Item>
      </Row>
      <Divider />
      <Row>
        <Form.Item label="Address">
          <Form.Item
            name="addressline1"
            rules={[{ required: true, message: 'Address line 1 is required' }]}
            style={{ display: 'inline-block' }}
          >
            <Input
              placeholder="Address line 1"
              style={{ display: 'inline-block', margin: ' 10px 0' }}
            />
          </Form.Item>

          <Row>
            <Col span={12} style={{ paddingRight: 10 }}>
              <Form.Item
                name="conutry"
                rules={[{ required: true, message: 'Country is required' }]}
                style={{ display: 'inline-block' }}
              >
                <Input placeholder="Country" />
              </Form.Item>
            </Col>
            <Col span={12} style={{ paddingleft: 10 }}>
              <Form.Item
                name="state"
                rules={[{ required: true, message: 'State is required' }]}
                style={{ display: 'inline-block' }}
              >
                <Input placeholder="State" />
              </Form.Item>
            </Col>
            <Col span={12} style={{ paddingRight: 10, display: 'inline-block', margin: ' 10px 0' }}>
              <Form.Item
                name="city"
                rules={[{ required: true, message: 'City is required' }]}
                style={{ display: 'inline-block' }}
              >
                <Input placeholder="City" />
              </Form.Item>
            </Col>
            <Col span={12} style={{ paddingRight: 10, display: 'inline-block', margin: ' 10px 0' }}>
              <Form.Item
                name="zipcode"
                rules={[{ required: true, message: 'Zip Code is required' }]}
                style={{ display: 'inline-block' }}
              >
                <Input placeholder="Zip Code" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Row>
      <Divider />
      <Row>
        <Form.Item label="Password">
          <Row>
            <Col span={12}>
              <Button type="link" onClick={showLargeDrawer}>
                Change Password
              </Button>
            </Col>
            {/* <Col span={12}>
              <Button type="link">Forgot Password</Button>
            </Col> */}
          </Row>
        </Form.Item>
      </Row>
      <Divider />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Drawer
        title="Change Password"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={520}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //     <Button type="primary" onClick={onClose}>
        //       OK
        //     </Button>
        //   </Space>
        // }
      >
        <ChangePassword />
      </Drawer>
    </Form>
  );
}

export default UserProfileScreen;
