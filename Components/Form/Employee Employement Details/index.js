import { Card, Col, Row, Button, Form, Input, DatePicker, Divider } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Styles from './EmployementDetails.module.scss';

const { RangePicker } = DatePicker;

function EmployeementDetails() {
  return (
    <>
      <Card bordered>
        <Row>
          <Col span={8} style={{ paddingLeft: 8, paddingRight: 8 }}>
            <Form.Item
              label="Organisation name"
              name="organisationName"
              rules={[
                { required: true, message: 'Please enter organisation name' },
                { whitespace: true, message: 'Organisation name cannot be empty' },
                { min: 3 },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Organisation name"
                // onChange={(value) => HandleInputChanges(value.target.value, ' ')}
              />
            </Form.Item>
          </Col>

          <Col span={8} style={{ paddingLeft: 8, paddingRight: 8 }}>
            <Form.Item
              label="Designation"
              name="Designation"
              rules={[
                { required: true, message: 'Please enter organisation name' },
                { whitespace: true, message: 'Organisation name cannot be empty' },
                { min: 3 },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Organisation name"
                // onChange={(value) => HandleInputChanges(value.target.value, ' ')}
              />
            </Form.Item>
          </Col>

          <Col span={8} style={{ paddingLeft: 8, paddingRight: 8 }}>
            <Form.Item label="working period" hasFeedback>
              <RangePicker
                picker="month"
                renderExtraFooter={() => 'Select range of your working period'}
              />
            </Form.Item>
          </Col>

          <Col span={24} style={{ paddingLeft: 8, paddingRight: 8 }}>
            <Form.Item label="Full address">
              <Input placeholder="Full address" />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Button type="primary" icon={<PlusOutlined />} size="default">
            Add employement
          </Button>
        </Row>
      </Card>

      <Divider />

      <Row>
        <Col span={12} className={Styles.DataContainer}>
          <Card>
            <Row wrap={1} style={{ flexDirection: 'column' }}>
              <div className={Styles.DeleteLink}>
                <Button type="link">Delete</Button>
              </div>
              <p>
                <strong>Your Busines Mate Pvt Ltd</strong>
              </p>
              <p>
                <code>Software Developer</code>
              </p>
              <div>
                <strong>2020</strong> - <strong>2021</strong>
              </div>
              <p>
                S-1, Park Avenue Apartment, Aditya Vihar, Chitrakoot, Vaishali Nagar, Jaipur,
                Rajasthan - 302021
              </p>
            </Row>
          </Card>
        </Col>

        <Col span={12} className={Styles.DataContainer}>
          <Card>
            <Row wrap={1} style={{ flexDirection: 'column' }}>
              <div className={Styles.DeleteLink}>
                <Button type="link">Delete</Button>
              </div>
              <p>
                <strong>Your Busines Mate Pvt Ltd</strong>
              </p>
              <p>
                <code>Software Developer</code>
              </p>
              <div>
                <strong>2020</strong> - <strong>2021</strong>
              </div>
              <p>
                S-1, Park Avenue Apartment, Aditya Vihar, Chitrakoot, Vaishali Nagar, Jaipur,
                Rajasthan - 302021
              </p>
            </Row>
          </Card>
        </Col>

        <Col span={12} className={Styles.DataContainer}>
          <Card>
            <Row wrap={1} style={{ flexDirection: 'column' }}>
              <div className={Styles.DeleteLink}>
                <Button type="link">Delete</Button>
              </div>
              <p>
                <strong>Your Busines Mate Pvt Ltd</strong>
              </p>
              <p>
                <code>Software Developer</code>
              </p>
              <div>
                <strong>2020</strong> - <strong>2021</strong>
              </div>
              <p>
                S-1, Park Avenue Apartment, Aditya Vihar, Chitrakoot, Vaishali Nagar, Jaipur,
                Rajasthan - 302021
              </p>
            </Row>
          </Card>
        </Col>

        <Col span={12} className={Styles.DataContainer}>
          <Card>
            <Row wrap={1} style={{ flexDirection: 'column' }}>
              <div className={Styles.DeleteLink}>
                <Button type="link">Delete</Button>
              </div>
              <p>
                <strong>Your Busines Mate Pvt Ltd</strong>
              </p>
              <p>
                <code>Software Developer</code>
              </p>
              <div>
                <strong>2020</strong> - <strong>2021</strong>
              </div>
              <p>
                S-1, Park Avenue Apartment, Aditya Vihar, Chitrakoot, Vaishali Nagar, Jaipur,
                Rajasthan - 302021
              </p>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default EmployeementDetails;
