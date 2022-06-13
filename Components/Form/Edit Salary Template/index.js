import {
  Alert,
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  notification,
  Row,
  Typography,
} from 'antd';
import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types'; // ES6
import { API_CONFIG } from '../../../lib/Config/API';
import Styles from './EditSalaryTemplate.module.scss';

const { Title } = Typography;
function EditSalaryTemplate(props) {
  const {
    onAllowanceChange,
    onDeductionChange,
    setEditTemplateName,
    handleEditSubmit,
    EditableData,
    DrawerVisible,
    form,
  } = props;
  console.log(EditableData);
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
          HandleError('error');
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
          HandleError('error');
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
  useEffect(() => {
    getAllowanceData();
    getDeductionData();
  }, []);
  useLayoutEffect(() => {
    form.resetFields();
  }, []);
  /// //Error on api
  const HandleError = (Type) => {
    notification[Type]({
      message: 'Error!',
      description: 'Something went wrong, please contact your administrator',
    });
  };

  /// ///////
  const onFinish = (values) => {
    console.log('Success:', values);
    form.resetFields(['templateName']);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{
        templateName: DrawerVisible?.EditDrawer ? EditableData?.name : ' ',
      }}
      name="basic"
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
          onChange={(e) => setEditTemplateName(e.target.value)}
        />
      </Form.Item>
      <Card bordered className={Styles.cardContainer}>
        <Alert type="info" message="Select allowance and deduction that are aplicable" banner />
        <Row className={Styles.RowContainer}>
          <Col span={12}>
            <Title level={3}>Allowance</Title>
            <Row className={Styles.CheckboxContainer}>
              <Checkbox.Group defaultValue={EditableData?.salaryHeads} onChange={onAllowanceChange}>
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
              <Checkbox.Group
                defaultValue={EditableData?.deductionHeads}
                onChange={onDeductionChange}
              >
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
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => handleEditSubmit(EditableData?._id)}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

EditSalaryTemplate.propTypes = {
  onAllowanceChange: PropTypes.func,
  onDeductionChange: PropTypes.func,
  setEditTemplateName: PropTypes.func,
  handleEditSubmit: PropTypes.func,
  EditableData: PropTypes.func,
  DrawerVisible: PropTypes.func,
  form: PropTypes.func,
};
export default EditSalaryTemplate;
