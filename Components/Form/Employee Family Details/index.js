import React from 'react';
import { Col, Divider, Form, Input, Row } from 'antd';

function FamilyDetails() {
  return (
    <Row>
      <Col span={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Form.Item
          label="Contact person name"
          name="personName"
          rules={[{ required: true, message: "Emergency contact person name cann't be empty" }]}
          hasFeedback
        >
          <Input placeholder="Person name" />
        </Form.Item>
      </Col>

      <Col span={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Form.Item
          label="Contact number"
          name="cntactNumber"
          rules={[{ required: true, message: "Contact number cann't be empty" }]}
          hasFeedback
        >
          <Input placeholder="Contact number" />
        </Form.Item>
      </Col>

      <Col span={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Form.Item
          label="Relation"
          name="relationWith"
          rules={[{ required: true, message: "Relation of contact person cann't be empty" }]}
          hasFeedback
        >
          <Input placeholder="Relation" />
        </Form.Item>
      </Col>

      <Col span={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Form.Item
          label="Email address"
          name="emailAddress"
          rules={[{ type: 'email', message: 'Email address is not valid' }]}
          hasFeedback
        >
          <Input placeholder="Person name" />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default FamilyDetails;
