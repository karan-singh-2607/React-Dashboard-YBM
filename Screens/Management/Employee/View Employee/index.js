import { LoadingOutlined } from '@ant-design/icons';
import { Card, Layout, Space, Spin, Table, Tag, Tooltip, Button, Drawer, Popover } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import NumberFormat from 'react-number-format';
import EditEmployee from '../../../../Components/Edit Employee';
import { API_CONFIG } from '../../../../lib/Config/API';
import Styles from './ViewEmployee.module.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Column } = Table;

const SalaryBreakdown = (
  <div className={Styles.SalaryBreakdown}>
    <div>
      <p>Allowance</p>
      <div>
        <div>Basic pay</div>
        <div>15000</div>
      </div>
      <div>
        <div>Basic pay</div>
        <div>15000</div>
      </div>
      <div>
        <div>Basic pay</div>
        <div>15000</div>
      </div>
    </div>
    <div className={Styles.deduction}>
      <p>Deduction</p>
      <div>
        <div>TDS</div>
        <div>1500</div>
      </div>
      <div>
        <div>TDS</div>
        <div>1500</div>
      </div>
    </div>
    <div>
      <div>Total</div>
      <div>
        <NumberFormat
          value={40000}
          displayType="text"
          prefix="&#8377;"
          thousandSeparator
          decimalScale={2}
          fixedDecimalScale
        />
      </div>
    </div>
  </div>
);
function ViewEmployeeScreen() {
  // Drawer
  const [visible, setVisible] = useState(false);
  const [EditEmployeeDrawer, setEditEmployeeDrawer] = useState({});
  const showDrawer = (data) => {
    setEditEmployeeDrawer(data);
    setVisible(true);
  };
  const onCloseDrawer = () => {
    setVisible(false);
  };

  // API Call
  const [ApiResponse, setApiResponse] = useState([{ EmployeesList: null }]);
  const [ListEmployees, setListEmployees] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const EmployeesList = await axios
        .get(`${API_CONFIG.API_BASE_URL}employee/get`)
        .then((response) => {
          setListEmployees(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          setListEmployees({ error });
        });

      setApiResponse({ EmployeesList });
    };
    fetchData();
  }, []);
  console.log('Employee==>', ListEmployees);

  if (ApiResponse.EmployeesList) {
    console.log('Employyeslist', ApiResponse.EmployeesList);
  }

  return (
    <Layout className="inner-app-layout">
      <Card bordered>
        <Table
          size="small"
          dataSource={ListEmployees}
          loading={{ indicator: <Spin indicator={antIcon} />, spinning: !ListEmployees }}
          scroll={{ x: 1500, y: 'calc(100vh - 70px)' }}
          pagination={{ pageSize: 50 }}
        >
          <Column
            title="First Name"
            dataIndex="firstName"
            key="firstName"
            fixed="left"
            width={130}
          />
          <Column title="Last Name" dataIndex="lastName" key="lastName" fixed="left" width={130} />
          <Column
            title="Date of birth"
            dataIndex="dob"
            key="dob"
            render={(data) => <Tag color="cyan">{moment(data).format('DD/MM/YYYY')}</Tag>}
            width={130}
          />
          <Column title="Email" dataIndex="personalEmail" key="personalEmail" />
          <Column title="Mobile number" dataIndex="mobile" key="mobile" />
          <Column
            title="Salary structure"
            dataIndex="salaryTemplate"
            key="salaryTemplate"
            width={220}
            render={(data) => (
              <Popover
                content={SalaryBreakdown}
                title="Salary breakdown"
                trigger="click"
                style={{ width: 300 }}
              >
                <Button type="link" style={{ padding: 0 }}>
                  {data}
                </Button>
              </Popover>
            )}
          />
          <Column title="Location" dataIndex="location" key="location" width={120} />
          <Column title="Employment type" dataIndex="employeementType" key="employeementType" />
          <Column title="CTC" dataIndex="ctc" key="ctc" />

          <Column
            fixed="right"
            title="Action"
            key="action"
            render={(data) => (
              <Space size="middle">
                <Tooltip placement="topLeft" title="Edit" arrowPointAtCenter>
                  <Button
                    type="link"
                    icon={<AiOutlineEdit size={22} onClick={() => showDrawer(data)} />}
                  />
                </Tooltip>
                <Tooltip placement="topLeft" title="Delete" arrowPointAtCenter>
                  <Button type="link" icon={<RiDeleteBinLine size={22} />} danger />
                </Tooltip>
              </Space>
            )}
            width={120}
          />
        </Table>
      </Card>
      {/* Drawer */}
      <Drawer
        title="Edit employee"
        placement="right"
        width="calc(100% - 225px)"
        onClose={onCloseDrawer}
        visible={visible}
      >
        <EditEmployee EditEmployeeDrawer={EditEmployeeDrawer} />
      </Drawer>
    </Layout>
  );
}

export default ViewEmployeeScreen;
