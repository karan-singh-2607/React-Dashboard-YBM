import { Col, DatePicker, Form, Input, Row, message, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import cryptoRandomString from 'crypto-random-string';
import { generatePassword } from 'passWhip';
import { API_CONFIG } from '../../../lib/Config/API';
import SelectDropdown from '../../Dropdown-Select';
import httpErrorHandle from '../../HTTP Error Handle';
import Styles from './EmployeePersonalInfo.module.scss';

const dateFormat = 'DD/MM/YYYY';

function disabledDate(current) {
  return current > moment().endOf('day');
}
const GenderData = [
  {
    id: '01',
    value: 'Male',
    genderName: 'Male',
  },
  {
    id: '02',
    value: 'Female',
    genderName: 'Female',
  },
  {
    id: '03',
    value: 'Others',
    genderName: 'Others',
  },
];
const StatusData = [
  {
    id: '01',
    value: 'Active',
    genderName: 'Active',
  },
  {
    id: '02',
    value: 'In-Active',
    genderName: 'Not active',
  },
  {
    id: '03',
    value: 'Hired',
    genderName: 'Hired',
  },
  {
    id: '04',
    value: 'Un-Hired',
    genderName: 'Un-Hired',
  },
  {
    id: '05',
    value: 'Permanent',
    genderName: 'Permanent',
  },
  {
    id: '06',
    value: 'On-Probation',
    genderName: 'On-Probation',
  },
  {
    id: '07',
    value: 'Internship',
    genderName: 'Internship',
  },
  {
    id: '08',
    value: 'Resigned',
    genderName: 'Resigned',
  },
  {
    id: '09',
    value: 'On-Notice-Period',
    genderName: 'On-Notice-Period',
  },
];
const EmploymentTypeData = [
  {
    id: '01',
    value: 'Part-Time',
    genderName: 'Part Time',
  },
  {
    id: '02',
    value: 'Full-Time',
    genderName: 'Full Time',
  },
  {
    id: '03',
    value: 'On-Contract',
    genderName: 'Terminated',
  },
];

function PersonalInformation() {
  const [form] = Form.useForm();

  const [DOB, setDOB] = useState('');
  const onChangeDate = (date, dateString) => {
    // console.log(date, '++++++++++++', dateString);
    setDOB(moment(dateString).format('YYYY/MM/DD'));
  };

  // /////////////////// API Calls
  const [ApiResponse, setApiResponse] = useState([
    { Designation: null },
    { Grade: null },
    { SalaryTemplate: null },
    { EmployeeBackground: null },
  ]);
  const [DesignationData, setDesignationData] = useState([]);
  const [GradeData, setGradeData] = useState([]);
  const [SalaryTemplateData, setSalaryTemplateData] = useState([]);
  const [EmployeeBackgroundData, setEmployeeBackgroundData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const Designation = await axios
        .get(`${API_CONFIG.API_BASE_URL}designation/get`)
        .then((response) => {
          setDesignationData(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            httpErrorHandle(error);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        });

      const Grade = await axios
        .get(`${API_CONFIG.API_BASE_URL}grade/get`)
        .then((response) => {
          setGradeData(response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            httpErrorHandle(error);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        });
      const EmployeeBackground = await axios
        .get(`${API_CONFIG.API_BASE_URL}empstatus/get`)
        .then((response) => {
          setEmployeeBackgroundData(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            httpErrorHandle(error);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        });
      const SalaryTemplate = await axios
        .get(`${API_CONFIG.API_BASE_URL}salarytemplate/get`)
        .then((response) => {
          setSalaryTemplateData(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            httpErrorHandle(error);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        });

      setApiResponse({ Designation }, { Grade }, { EmployeeBackground }, { SalaryTemplate });
    };
    // console.log('EmployeeB==>', EmployeeBackgroundData, 'Salary==>', SalaryTemplateData)
    fetchData();
  }, []);

  if (ApiResponse.Designation) {
    console.log('Desingnation', ApiResponse.Designation);
  } else if (ApiResponse.Grade) {
    console.log('Grade', ApiResponse.Grade);
  } else if (ApiResponse.EmployeeBackground) {
    console.log('EmployeeBackground', ApiResponse.EmployeeBackground);
  } else if (ApiResponse.SalaryTemplate) {
    console.log('SalaryTemplate', ApiResponse.SalaryTemplate);
  }

  // Dropdown Component Handler
  const [DropDownValues, setDropDownValues] = React.useState({
    gender: null,
    status: null,
    employeementType: null,
    employeeStatus: null,
    designation: null,
    grade: null,
    salaryTemplate: null,
  });
  const [CollectValues] = useState('');
  const HandleDropDownChanges = (value, key) => {
    setDropDownValues({ ...DropDownValues, [key]: value });
  };

  const DropDownOnClick = (Val) => {
    console.log('Dropdown Data=>', Val);
    // setCollectValues(...Val, event.target.value)
    console.log('DropdownCollection', CollectValues);
  };
  // Input value handle
  const [InputValues, setInputValues] = useState({
    firstName: null,
    lastName: null,
    mobile: null,
    personalEmail: null,
    location: null,
    ctc: null,
  });
  const HandleInputChanges = (value, key) => {
    setInputValues({ ...InputValues, [key]: value });
  };

  // Genrate username
  const Username = cryptoRandomString({ length: 10, type: 'alphanumeric' });
  // Generate password
  const TempPassword = generatePassword({ numbers: true, randomCase: true, symbols: false });
  // Post API
  const AddEmployee = {
    firstName: InputValues.firstName,
    lastName: InputValues.lastName,
    gender: DropDownValues.gender,
    dob: DOB,
    mobile: InputValues.mobile,
    personalEmail: InputValues.personalEmail,
    username: Username,
    password: TempPassword,
    location: InputValues.location,
    status: DropDownValues.status,
    ctc: InputValues.ctc,
    employeementType: DropDownValues.employeementType,
    designation: DropDownValues.designation,
    grade: DropDownValues.grade,
    employeeStatus: DropDownValues.employeeStatus,
    salaryTemplate: DropDownValues.salaryTemplate,
  };
  console.log(AddEmployee);
  const SaveEmployeeData = (e) => {
    e.preventDefault();
    const config = {
      method: 'post',
      url: `${API_CONFIG.API_BASE_URL}employee/add`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: AddEmployee,
    };

    axios(config)
      .then(() => {
        message.success('Department added successfully!');
        setInputValues('');
      })
      .catch((error) => {
        httpErrorHandle(error);
      });
  };
  useLayoutEffect(() => {
    form.resetFields();
  });
  /// /////////////////

  return (
    <Row>
      <Col span={8} className={Styles.formCol}>
        <Form.Item
          label="First name"
          name="firstname"
          rules={[
            { required: true, message: 'Please enter first name' },
            { whitespace: true, message: 'First name cannot be empty ' },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input
            placeholder="First Name"
            onChange={(value) => HandleInputChanges(value.target.value, 'firstName')}
          />
        </Form.Item>
      </Col>

      <Col span={8} className={Styles.formCol}>
        <Form.Item
          label="Last name"
          name="lastname"
          rules={[
            { required: true, message: 'Please enter last name' },
            { whitespace: true, message: 'last name cannot be empty ' },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input
            placeholder="Last Name"
            onChange={(value) => HandleInputChanges(value.target.value, 'lastName')}
          />
        </Form.Item>
      </Col>

      <Col span={8} className={Styles.formCol}>
        <Form.Item label="Gender" name="gender" hasFeedback>
          <SelectDropdown
            Data={GenderData}
            DropDownValues={DropDownValues}
            HandleDropDownChanges={HandleDropDownChanges}
            DropDownOnClick={DropDownOnClick}
            Label="Gender"
            Key="gender"
          />
        </Form.Item>
      </Col>

      <Col span={8} className={Styles.formCol}>
        <Form.Item
          label="Date of birth"
          name="dob"
          rules={[{ required: true, message: 'Please provide date of birth' }]}
          hasFeedback
        >
          <DatePicker
            onChange={onChangeDate}
            disabledDate={disabledDate}
            format={dateFormat}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Col>

      <Col span={8} className={Styles.formCol}>
        <Form.Item
          label="Mobile number"
          name="mob"
          rules={[
            { required: true, message: 'Please provide mobile number' },
            { whitespace: true, message: 'Mobile number cannot be empty ' },
            {
              pattern: /^[\d]{0,10}$/,
              message: 'Enter Only Mobile Number',
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder="Mobile Number"
            onChange={(value) => HandleInputChanges(value.target.value, 'mobile')}
          />
        </Form.Item>
      </Col>

      <Col span={8} className={Styles.formCol}>
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: 'Please provide email address' },
            { whitespace: true, message: 'Email address cannot be empty ' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
          hasFeedback
        >
          <Input
            placeholder="Email Address"
            onChange={(value) => HandleInputChanges(value.target.value, 'personalEmail')}
          />
        </Form.Item>
      </Col>

      <Col span={8} className={Styles.formCol}>
        <Form.Item
          label="Location"
          name="location"
          rules={[
            { required: true, message: 'Please provide city name' },
            { whitespace: true, message: 'Location cannot be empty ' },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input
            placeholder="City name"
            onChange={(value) => HandleInputChanges(value.target.value, 'location')}
          />
        </Form.Item>
      </Col>

      <Col span={8} className={Styles.formCol}>
        <Form.Item label="Status" name="employeeStatus" hasFeedback>
          <SelectDropdown
            Data={StatusData}
            DropDownValues={DropDownValues}
            HandleDropDownChanges={HandleDropDownChanges}
            DropDownOnClick={DropDownOnClick}
            Label="Employee status"
            Key="status"
          />
        </Form.Item>
      </Col>

      <Col span={8} className={Styles.formCol}>
        <Form.Item
          label="CTC"
          name="ctc"
          rules={[
            { required: true, message: 'Please provide CTC' },
            { whitespace: true, message: 'CTC cannot be empty ' },
          ]}
          hasFeedback
        >
          <Input
            placeholder="CTC"
            prefix="₹"
            suffix="INR"
            onChange={(value) => HandleInputChanges(value.target.value, 'ctc')}
          />
        </Form.Item>
      </Col>

      <Col span={8} className={Styles.formCol}>
        <Form.Item label="Employee Type" name="employeementType" hasFeedback>
          <SelectDropdown
            Data={EmploymentTypeData}
            DropDownValues={DropDownValues}
            HandleDropDownChanges={HandleDropDownChanges}
            DropDownOnClick={DropDownOnClick}
            Label="Employee Type"
            Key="employeementType"
          />
        </Form.Item>
      </Col>

      <Col span={8} className={Styles.formCol}>
        <Form.Item
          label="Designation"
          name="designation"
          rules={[{ required: true, message: `Please provide employee status` }]}
          hasFeedback
        >
          <SelectDropdown
            Data={DesignationData}
            DropDownValues={DropDownValues}
            HandleDropDownChanges={HandleDropDownChanges}
            DropDownOnClick={DropDownOnClick}
            Label="Designation"
            Key="designation"
          />
        </Form.Item>
      </Col>

      <Col span={8} className={Styles.formCol}>
        <Form.Item
          label="Grade"
          name="grade"
          rules={[{ required: true, message: `Please provide employee status` }]}
          hasFeedback
        >
          <SelectDropdown
            Data={GradeData}
            DropDownValues={DropDownValues}
            HandleDropDownChanges={HandleDropDownChanges}
            DropDownOnClick={DropDownOnClick}
            Label="Grade"
            Key="grade"
          />
        </Form.Item>
      </Col>

      <Col span={8} className={Styles.formCol}>
        <Form.Item
          label="Employee Background"
          name="employeeStatus"
          rules={[{ required: true, message: `Please provide employee status` }]}
          hasFeedback
        >
          <SelectDropdown
            Data={EmployeeBackgroundData}
            DropDownValues={DropDownValues}
            HandleDropDownChanges={HandleDropDownChanges}
            DropDownOnClick={DropDownOnClick}
            Label="Employee status"
            Key="employeeStatus"
          />
        </Form.Item>
      </Col>

      <Col span={8} className={Styles.formCol}>
        <Form.Item
          label="Salary Template"
          name="salaryTemplate"
          rules={[{ required: true, message: `Please provide salary template` }]}
          hasFeedback
        >
          <SelectDropdown
            Data={SalaryTemplateData}
            DropDownValues={DropDownValues}
            HandleDropDownChanges={HandleDropDownChanges}
            DropDownOnClick={DropDownOnClick}
            Label="Salary Template"
            Key="salaryTemplate"
          />
        </Form.Item>
      </Col>
      <Form.Item wrapperCol={{ span: 24 }} className={Styles.Submitbtn}>
        <Button
          type="primary"
          htmlType="submit"
          className={Styles.Employeebtn}
          onClick={SaveEmployeeData}
        >
          Submit
        </Button>
      </Form.Item>
    </Row>
  );
}

export default PersonalInformation;
