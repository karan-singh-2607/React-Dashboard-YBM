import { Form, Row, Input, Button } from 'antd';
import React from 'react';
import { makeStyles } from '@mui/styles';

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

function ChangePassword() {
  const classes = useStyles();
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
      <Row>
        <Form.Item
          label="Old Password"
          name="oldpassword"
          rules={[{ required: true, message: 'Please input Old Pasword' }]}
        >
          <Input
            placeholder="Old Password"
            style={{ display: 'inline-block', margin: ' 10px 0' }}
          />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          label="New Password"
          name="newpassword"
          rules={[{ required: true, message: 'Please input New password' }]}
        >
          <Input
            placeholder="New Password"
            style={{ display: 'inline-block', margin: ' 10px 0' }}
          />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          label="Confirm Password"
          name="confirmpassword"
          rules={[{ required: true, message: 'Please input Confirm Password' }]}
        >
          <Input
            placeholder="Confirm Password"
            style={{ display: 'inline-block', margin: ' 10px 0' }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
}

export default ChangePassword;
