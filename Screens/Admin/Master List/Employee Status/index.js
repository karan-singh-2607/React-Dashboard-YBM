import {
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  HistoryOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Row,
  Space,
  Table,
  Tag,
  Typography,
  notification,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useRouter } from 'next/router';

const { Column } = Table;
const { Title } = Typography;
const screenTitle = 'Employee Status';
const AuthNotification = (type) => {
  notification[type]({
    message: 'Sessino Expired',
    description: 'Your Session is Expired .',
  });
};

function EmployeeStatusScreen() {
  /// /
  const [form] = Form.useForm();
  const [AddNewEmployeeStatus, setAddNewEmployeeStatus] = useState({
    loading: false,
    visible: false,
  });
  const [EditEmployeeStatus, setEditEmployeeStatus] = useState({
    loading: false,
    visible: false,
    EmployeeStatusId: '',
    EmployeeStatusName: '',
    EmployeeStatusNameOnChange: '',
  });
  const [AllResData, setAllResData] = useState({ EmpInfo: null });
  const [EmployeeStatusInfo, setEmployeeStatusInfo] = useState([]);
  const [EmployeeStatus, setEmployeeStatus] = useState('');
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const [Token, setToken] = useState('');
  const showAddEmployeeStatusModal = (e) => {
    e.preventDefault();
    setAddNewEmployeeStatus({ visible: true });
  };
  const showEditEmployeeStatusModal = (val) => {
    // console.log('object', val)
    // e.preventDefault()
    setEditEmployeeStatus({
      visible: true,
      EmployeeStatusId: val?._id,
      EmployeeStatusNmae: val?.employeestatus,
    });
  };
  const HandleAddEmployeeStatus = () => {
    setAddNewEmployeeStatus({ loading: true });
    setTimeout(() => {
      setAddNewEmployeeStatus({ loading: false, visible: false });
    }, 3000);
  };
  const HandleEditEmployeeStatus = () => {
    setEditEmployeeStatus({ loading: true });
    setTimeout(() => {
      setEditEmployeeStatus({ loading: false, visible: false });
    }, 3000);
  };

  const HandleCancelEmployeeStatus = () => {
    setAddNewEmployeeStatus({ visible: false });
    form.resetFields();
    setEditEmployeeStatus({ loading: false, EmployeeStatusNmae: '' });
  };
  useLayoutEffect(() => {
    form.resetFields();
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      const TOKEN = JSON.parse(localStorage.getItem('token', 'token'));
      setToken(TOKEN);
      getData();
    }
  }, [Token]);

  const AuthData = axios.create({
    baseURL: process.env.NEXT_API_BASE_URL,
    headers: {
      authorization: `Bearer ${Token}`,
    },
  });
  // Get API
  const getData = () => {
    const fetchData = async () => {
      setLoading(true);
      const PersonalEmpInfo = await AuthData.get(`employeestatus/get`)
        .then((response) => {
          setEmployeeStatusInfo(response.data);
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          if (error.response.status === 403 || error.response.status === 401) {
            localStorage.removeItem('token');
            router.push('/Auth/Login');
          }
          setEmployeeStatusInfo({});
        });

      setAllResData({ EmpInfo: PersonalEmpInfo });
    };
    fetchData();
  };
  // console.log('EmpEmployeeStatus', EmployeeStatusInfo);
  if (AllResData.EmpInfo) {
    console.log('data--->', AllResData.EmpInfo);
  }

  // Add Data (Post API)
  const [AddEmployeeStatus, SetAddEmployeeStatusData] = useState({
    employeestatus: '',
  });
  const updateEmployeeStatusData = (keyName, value) => {
    SetAddEmployeeStatusData({ ...updateEmployeeStatusData, [keyName]: value });
    console.log(keyName, value);
  };

  const SaveEmployeeStatus = (e) => {
    e.preventDefault();
    const config = {
      method: 'post',
      url: `${process.env.NEXT_API_BASE_URL}/employeestatus/add`,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${Token}`,
      },
      data: AddEmployeeStatus,
    };
    axios(config)
      .then(() => {
        // console.log(JSON.stringify(response.data));
        getData();
        message.success('EmployeeStatus added successfully!');
        form.resetFields();
        HandleAddEmployeeStatus();
        setAddNewEmployeeStatus('');
      })
      .catch((error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          // console.log(error.response.data);
          AuthNotification('error');
          localStorage.removeItem('token');
          router.push('/Auth/Login');
        }
        // console.log(error);
        // message.error('Something went wrong while adding!');
      });
    updateEmployeeStatusData('');
  };

  // PUT API
  const SelectEmployeeStatus = (_id) => {
    const config = {
      method: 'put',
      url: `${process.env.NEXT_API_BASE_URL}/employeestatus/${_id}`,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${Token}`,
        mode: 'no-cors',
      },
      data: { employeestatus: EmployeeStatus, _id },
    };
    axios(config)
      .then((res) => {
        getData();
        message.success(res.data);
        form.resetFields();
        HandleEditEmployeeStatus();
      })
      .catch((error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          // console.log(error.response.data);
          AuthNotification('error');
          localStorage.removeItem('token');
          router.push('/Auth/Login');
        }
        // console.log(error);
        // message.error('Something went wrong while updating!');
      });
    setEmployeeStatus('');
  };
  const SelectEmployeeEmployeeStatus = (employeeStatusName) => {
    // setPersonalInfo(_id)
    setEmployeeStatus(employeeStatusName);
    // setId(_id)
  };

  /// ///Delete API
  const { confirm } = Modal;
  const showDeleteConfirm = (val) => {
    console.log(val);
    confirm({
      title: `Want to delete ${val?.employeestatus}`,
      icon: <ExclamationCircleOutlined />,
      content: 'Once deleted, you will not be able to recover this EmployeeStatus!',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteEmployeeStatus(val?._id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const deleteEmployeeStatus = (id) => {
    if (id) {
      const config = {
        method: 'delete',
        url: `${process.env.NEXT_API_BASE_URL}/employeestatus/${id}`,
        headers: {
          authorization: `Bearer ${Token}`,
        },
        data: id,
      };

      axios(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          message.success(response?.data);
          getData();
        })
        .catch((error) => {
          if (error.response.status === 403 || error.response.status === 401) {
            AuthNotification('error');
            localStorage.removeItem('token');
            router.push('/Auth/Login');
          }
        });
    }
  };
  /// //////

  return (
    <>
      <Card bordered>
        <Row justify="space-between">
          <Title level={3}>{screenTitle}</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="middle"
            onClick={showAddEmployeeStatusModal}
          >
            Add new
          </Button>
        </Row>
        <Modal
          visible={AddNewEmployeeStatus?.visible}
          title={`Add ${screenTitle}`}
          onOk={HandleAddEmployeeStatus}
          onCancel={HandleCancelEmployeeStatus}
          footer={null}
        >
          <Layout>
            <Form
              name="addemployeestatus"
              form={form}
              onFinish={(value) => console.log(value)}
              onFinishFailed={(error) => console.log('Failed:', error)}
              autoComplete="off"
            >
              <Form.Item
                label={`${screenTitle} name`}
                name="employeeStatusName"
                rules={[
                  {
                    required: true,
                    message: `Please add ${screenTitle} name`,
                  },
                ]}
              >
                <Input
                  placeholder={`Add ${screenTitle}`}
                  onChange={(event) =>
                    updateEmployeeStatusData('employeestatus', event.target.value)
                  }
                />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  span: 14,
                  offset: 8,
                }}
              >
                <Button type="primary" htmlType="submit" onClick={SaveEmployeeStatus}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Layout>
        </Modal>
      </Card>
      <Card bordered>
        {/* eslint-disable-next-line no-constant-condition */}
        <Table dataSource={EmployeeStatusInfo} loading={true ? Loading : !Loading}>
          <Column title={screenTitle} dataIndex="employeestatus" key="empstatus" />
          <Column
            title="Created at"
            dataIndex="createdAt"
            key="createdAt"
            render={(date) => (
              <Tag icon={<ClockCircleOutlined />} color="magenta">
                {moment(date).format('DD/MM/YYYY')}
              </Tag>
            )}
          />
          <Column
            title="Last updated"
            dataIndex="updatedAt"
            key="updatedAt"
            render={(date) => (
              <Tag icon={<HistoryOutlined />} color="cyan">
                {moment(date).format('DD/MM/YYYY')}
              </Tag>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(record) => (
              <Space size="middle">
                <Button
                  type="link"
                  aria-label={record?._id}
                  icon={<AiOutlineEdit size={22} />}
                  onClick={() => showEditEmployeeStatusModal(record)}
                />
                <Button
                  type="link"
                  icon={<RiDeleteBinLine size={22} />}
                  danger
                  onClick={() => showDeleteConfirm(record)}
                />
              </Space>
            )}
          />
        </Table>
      </Card>

      <Modal
        visible={EditEmployeeStatus?.visible}
        title={`Edit ${screenTitle}`}
        onOk={HandleEditEmployeeStatus}
        onCancel={HandleCancelEmployeeStatus}
        footer={null}
      >
        <Layout>
          <Form
            name="EditEmployeeStatus"
            initialValues={{
              employeeStatusName: EditEmployeeStatus?.EmployeeStatusNmae,
            }}
            form={form}
            onFinish={(value) => console.log(value)}
            onFinishFailed={(error) => console.log('Failed:', error)}
            autoComplete="off"
          >
            <Form.Item
              label={`${screenTitle} name`}
              name="employeeStatusName"
              rules={[
                {
                  required: true,
                  message: `Please add ${screenTitle} name`,
                },
              ]}
            >
              <Input
                placeholder={`Edit ${screenTitle}`}
                onChange={(event) => SelectEmployeeEmployeeStatus(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 14,
                offset: 8,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => SelectEmployeeStatus(EditEmployeeStatus?.EmployeeStatusId)}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Layout>
      </Modal>
    </>
  );
}

export default EmployeeStatusScreen;
