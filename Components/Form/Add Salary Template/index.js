import { Alert, Button, Card, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types'; // ES6
import { API_CONFIG } from '../../../lib/Config/API';
import Styles from './AddSalaryTemplate.module.scss';

const { Title } = Typography;

function SalaryTemplate(props) {
  const [form] = Form.useForm();

  /// ////// Get Allowance
  const [AllResData, setAllResData] = useState({ EarningInfo: null });
  const [AddAllowance, setAddAllowance] = useState([]);
  const getAllowanceData = () => {
    const fetchData = async () => {
      const EarningInfo = await axios
        .get(`${API_CONFIG.API_BASE_URL}earnings/get`)

        .then((response) => {
          setAddAllowance(response.data);
        })
        .catch(() => {
          setAddAllowance({});
          props?.HandleError('error');
        });
      setAllResData({ EarningInfo });
    };
    fetchData();
  };
  // console.log('Allowace', AddAllowance);
  if (AllResData.EarningInfo) {
    console.log('data--->', AllResData.EarningInfo);
  }
  /// ////////
  // Get Deduction Data
  const [AllResponseData, setAllResponseData] = useState({ DedInfo: null });
  const [DeductionTemplateInfo, setDeductionTemplateInfo] = useState([]);
  const getDeductionData = () => {
    const fetchData = async () => {
      const DeductionInfo = await axios
        .get(`${API_CONFIG.API_BASE_URL}deduction/get`)
        .then((response) => {
          setDeductionTemplateInfo(response.data);
        })
        .catch(() => {
          setDeductionTemplateInfo({});
          props?.HandleError('error');
        });
      setAllResponseData({ DedInfo: DeductionInfo });
    };
    fetchData();
  };
  // console.log('deduction', DeductionTemplateInfo);

  if (AllResponseData.EmpInfo) {
    console.log('data--->', AllResponseData.DedInfo);
  }
  /// ////////
  /// // Post Salary Template
  const onAllowanceChange = (checkedValues) => {
    // console.log('Allowance', checkedValues);
    props?.setisAllowanceChecked(checkedValues);
  };
  const onDeductionChange = (checkedValues) => {
    // console.log('Deduction = ', checkedValues);
    props?.setisDeductionChecked(checkedValues);
  };
  /// ///////
  useEffect(() => {
    getAllowanceData();
    getDeductionData();
  }, []);
  useLayoutEffect(() => {
    form.resetFields();
  }, []);
  /// ////////

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Template name"
        name="templateName"
        rules={[
          {
            required: true,
            message: 'Please provide template name',
          },
        ]}
      >
        <Input
          placeholder="Salary template name"
          onChange={(e) => props?.setTemplateName(e.target.value)}
        />
      </Form.Item>
      <Card bordered className={Styles.cardContainer}>
        <Alert type="info" message="Select allowance and deduction that are aplicable" banner />
        <Row className={Styles.RowContainer}>
          <Col span={12}>
            <Title level={3}>Allowance</Title>
            <Row className={Styles.CheckboxContainer}>
              <Checkbox.Group onChange={onAllowanceChange}>
                {AddAllowance.map((data) => (
                  <Col key={data?._id} className={Styles.antCol}>
                    <Form.Item className={Styles.FormConatiner}>
                      <Checkbox value={data?._id}>{data?.earnings}</Checkbox>
                    </Form.Item>
                  </Col>
                ))}
              </Checkbox.Group>
            </Row>
          </Col>
          <Col span={12}>
            <Title level={3}>Deduction</Title>
            <Row className={Styles.CheckboxContainer}>
              <Checkbox.Group onChange={onDeductionChange}>
                {DeductionTemplateInfo.map((data) => (
                  <Col key={data?._id} className={Styles.antCol}>
                    <Form.Item className={Styles.FormConatiner}>
                      <Checkbox value={data?._id}>{data?.deduction}</Checkbox>
                    </Form.Item>
                  </Col>
                ))}
              </Checkbox.Group>
            </Row>
          </Col>
        </Row>
      </Card>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={() => props?.handleSubmit()}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

SalaryTemplate.propTypes = {
  handleSubmit: PropTypes.func,
  setTemplateName: PropTypes.func,
  HandleError: PropTypes.func,
  setisAllowanceChecked: PropTypes.func,
  setisDeductionChecked: PropTypes.func,
};

export default SalaryTemplate;
