import { Button, Card, Layout, Table, message } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import CsvDataReader from './CsvDataReader';
import { API_CONFIG } from '../../../../lib/Config/API';
import Styles from './ImportExport.module.scss';

function EmployeeDataImportScreen() {
  const { Column } = Table;
  const [csvArray, setCsvArray] = useState([]);
  console.log('CSV->', csvArray);
  const [Loading, setLOading] = useState(false);
  const ImportEmployeeData = {
    firstName: csvArray.First_Name,
    lastName: csvArray.Last_Name,
    gender: csvArray.gender,
    dob: csvArray.Gender,
    mobile: csvArray.Contact_No,
    personalEmail: csvArray.Email_Id,
    location: csvArray.City,
    status: csvArray.status,
    ctc: csvArray.Current_ctc,
    employeementType: csvArray.employeementType,
    designation: csvArray.Designation,
    grade: csvArray.grade,
    employeeStatus: csvArray.employeeStatus,
    salaryTemplate: csvArray.salaryTemplate,
  };
  const SaveImportEmployeeData = () => {
    console.log(ImportEmployeeData);
    setLOading(true);
    const config = {
      method: 'post',
      url: `${API_CONFIG.API_BASE_URL}employee/add`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: ImportEmployeeData,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        message.success('Data imported successfully!');
      })
      .catch((error) => {
        console.log(error);
        message.error('Something went wrong while adding!');
        setLOading(false);
      });
  };

  /// /////////////////

  return (
    <Card>
      <CsvDataReader setCsvArray={setCsvArray} />
      <Layout>
        <Table dataSource={csvArray} scroll={{ x: 2000 }}>
          <Column title="First Name" dataIndex="First_Name" key="firstName" fixed="left" />
          <Column title="Last Name" dataIndex="Last_Name" key="lastName" />
          <Column title="Gender" dataIndex="Gender" key="gender" />
          <Column title="Date of birth" dataIndex="Date_Of_Birth" key="dob" />
          <Column title="Contact no" dataIndex="Contact_No" key="Contact_No" />
          <Column title="Email ID" dataIndex="Email_Id" key="email" width={200} />
          <Column title="Address" dataIndex="Address" key="Address" width={200} />
          <Column title="City" dataIndex="City" key="city" />
          <Column title="State" dataIndex="State" key="State" />
          <Column title="Country" dataIndex="Country" key="country" />
          <Column title="Zipcode" dataIndex="Zipcode" key="zipcode" />
          <Column title="Current CTC" dataIndex="Current_ctc" key="Current_ctc" />
          <Column
            title="Designation"
            dataIndex="Designation"
            key="Designation"
            fixed="right"
            width={150}
          />
        </Table>
      </Layout>
      <Button
        type="primary"
        icon={<UploadOutlined />}
        loading={Loading}
        onClick={() => SaveImportEmployeeData()}
        className={Styles.ImportBtn}
      >
        Import
      </Button>
    </Card>
  );
}

export default EmployeeDataImportScreen;
