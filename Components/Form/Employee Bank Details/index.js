import { Col, Row, Form, Input } from 'antd';
import React from 'react';

function BankDetails() {
  return (
    <Row>
      <Col span={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Form.Item
          label="Account holder name"
          name="accountHolderName"
          rules={[
            { required: true, message: 'Please enter account holder name' },
            { whitespace: true, message: 'Account holder name cannot be empty ' },
          ]}
          hasFeedback
        >
          <Input
            placeholder="Account holder name"
            // onChange={(value) => HandleInputChanges(value.target.value, 'lastName')}
          />
        </Form.Item>
      </Col>
      <Col span={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Form.Item
          label="Account number"
          name="accountNuber"
          rules={[
            { required: true, message: 'Please enter account number' },
            { whitespace: true, message: 'Account number cannot be empty ' },
            { min: 11, message: 'Account number is not vlid' },
          ]}
          hasFeedback
        >
          <Input
            placeholder="Account number"
            // onChange={(value) => HandleInputChanges(value.target.value, 'lastName')}
          />
        </Form.Item>
      </Col>
      <Col span={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Form.Item
          label="Confirm account number"
          name="CnfAccountNuber"
          rules={[
            { required: true, message: 'Please enter account number' },
            { whitespace: true, message: 'Confirm account number cannot be empty' },
            { min: 11, message: 'Account number is not vlid' },
          ]}
          hasFeedback
        >
          <Input
            placeholder="Account number"
            // onChange={(value) => HandleInputChanges(value.target.value, 'lastName')}
          />
        </Form.Item>
      </Col>

      <Col span={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Form.Item
          label="IFSC code"
          name="ifscCode"
          rules={[
            { required: true, message: 'Please enter IFSC code' },
            { whitespace: true, message: 'IFSC code cannot be empty ' },
            {
              pattern: /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/,
              message: 'Please enter a valid IFSC code',
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder="Account number"
            // onChange={(value) => HandleInputChanges(value.target.value, 'lastName')}
          />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default BankDetails;
