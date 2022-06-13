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
const AuthNotification = (type) => {
  notification[type]({
    message: 'Sessino Expired',
    description: 'Your Session is Expired .',
  });
};

function DepartmentScreen() {
  /// /
  const [form] = Form.useForm();
  const router = useRouter();
  const [AddNewDepartment, setAddNewDepartment] = useState({ loading: false, visible: false });
  const [EditDepartment, setEditDepartment] = useState({
    loading: false,
    visible: false,
    deptId: '',
    deptNmae: '',
    deptNameOnChange: '',
  });
  const [AllResData, setAllResData] = useState({ EmpInfo: null });
  const [EmployeeDepartmentInfo, setEmployeeDepartmentInfo] = useState([]);
  const [Department, setDepartment] = useState('');
  const [Loading, setLoading] = useState(false);
  const [Token, setToken] = useState('');

  const showAddDepartmentModal = (e) => {
    e.preventDefault();
    setAddNewDepartment({ visible: true });
  };
  const showEditDptModal = (val) => {
    console.log('object', val);
    // e.preventDefault()
    setEditDepartment({ visible: true, deptId: val?._id, deptNmae: val?.empstatus });
  };
  const HandleAddDept = () => {
    setAddNewDepartment({ loading: true });
    setTimeout(() => {
      setAddNewDepartment({ loading: false, visible: false });
    }, 3000);
  };
  const HandleEditDept = () => {
    setEditDepartment({ loading: true });
    setTimeout(() => {
      setEditDepartment({ loading: false, visible: false });
    }, 3000);
  };

  const HandleCancelDept = () => {
    setAddNewDepartment({ visible: false });
    form.resetFields();
    setEditDepartment({ loading: false, deptNmae: '' });
  };
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

  useLayoutEffect(() => {
    form.resetFields();
  }, []);
  // Get API
  const getData = () => {
    const fetchData = async () => {
      setLoading(true);
      const PersonalEmpInfo = await AuthData.get(`empstatus/get`)
        .then((response) => {
          setEmployeeDepartmentInfo(response.data);
          setLoading(false);
        })
        .catch(() => {
          setEmployeeDepartmentInfo({});
        });

      setAllResData({ EmpInfo: PersonalEmpInfo });
    };
    fetchData();
  };
  // console.log('EmpDept', EmployeeDepartmentInfo);
  if (AllResData.EmpInfo) {
    console.log('data--->', AllResData.EmpInfo);
  }

  // Add Data (Post API)
  const [AddDepartment, SetAddDepartmentData] = useState({
    empstatus: '',
  });
  const updateDepartmentData = (keyName, value) => {
    SetAddDepartmentData({ ...updateDepartmentData, [keyName]: value });
  };
  const SaveDepartment = (e) => {
    e.preventDefault();
    const config = {
      method: 'post',
      url: `${process.env.NEXT_API_BASE_URL}/empstatus/add`,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${Token}`,
      },
      data: AddDepartment,
    };

    axios(config)
      .then(() => {
        // console.log(JSON.stringify(response.data));
        getData();
        message.success('Department added successfully!');
        form.resetFields();
        HandleAddDept();
        setAddNewDepartment('');
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
    updateDepartmentData('');
  };

  // PUT API
  const SelectDepartment = (_id) => {
    const config = {
      method: 'put',
      url: `${process.env.NEXT_API_BASE_URL}/empstatus/${_id}`,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${Token}`,
        mode: 'no-cors',
      },
      data: { empstatus: Department, _id },
    };
    axios(config)
      .then((res) => {
        getData();
        message.success(res.data);
        form.resetFields();
        HandleEditDept();
        setEditDepartment('');
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
    setDepartment('');
  };
  const SelectEmployeeDepartment = (deptName) => {
    // setPersonalInfo(_id)
    setDepartment(deptName);
    // setId(_id)
  };

  /// ///Delete API
  const { confirm } = Modal;
  const showDeleteConfirm = (val) => {
    console.log(val);
    confirm({
      title: `Want to delete ${val?.empstatus}`,
      icon: <ExclamationCircleOutlined />,
      content: 'Once deleted, you will not be able to recover this Department!',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteDepartment(val?._id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const deleteDepartment = (id) => {
    if (id) {
      const config = {
        method: 'delete',
        url: `${process.env.NEXT_API_BASE_URL}/empstatus/${id}`,
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
            // console.log(error.response.data);
            AuthNotification('error');
            localStorage.removeItem('token');
            router.push('/Auth/Login');
          }
          // console.log(error);
          // message.error('Fiels to delete department, please try again.');
        });
    }
  };
  /// //////

  return (
    <>
      <Card bordered>
        <Row justify="space-between">
          <Title level={3}>Department</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="middle"
            onClick={showAddDepartmentModal}
          >
            Add department
          </Button>
        </Row>
        <Modal
          visible={AddNewDepartment?.visible}
          title="Add department"
          onOk={HandleAddDept}
          onCancel={HandleCancelDept}
          footer={null}
        >
          <Layout>
            <Form
              name="adddepartment"
              form={form}
              onFinish={(value) => console.log(value)}
              onFinishFailed={(error) => console.log('Failed:', error)}
              autoComplete="off"
            >
              <Form.Item
                label="Department name"
                name="departmentName"
                rules={[
                  {
                    required: true,
                    message: 'Please add department name',
                  },
                ]}
              >
                <Input
                  placeholder="Add department"
                  onChange={(event) => updateDepartmentData('empstatus', event.target.value)}
                />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  span: 14,
                  offset: 8,
                }}
              >
                <Button type="primary" htmlType="submit" onClick={SaveDepartment}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Layout>
        </Modal>
      </Card>
      <Card bordered>
        {/* eslint-disable-next-line no-constant-condition */}
        <Table dataSource={EmployeeDepartmentInfo} loading={true ? Loading : !Loading}>
          <Column title="Department" dataIndex="empstatus" key="age" />
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
                  onClick={() => showEditDptModal(record)}
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
        visible={EditDepartment?.visible}
        title="Edit department"
        onOk={HandleEditDept}
        onCancel={HandleCancelDept}
        footer={null}
      >
        <Layout>
          <Form
            name="editdepartment"
            initialValues={{
              departmentName: EditDepartment?.deptNmae,
            }}
            form={form}
            onFinish={(value) => console.log(value)}
            onFinishFailed={(error) => console.log('Failed:', error)}
            autoComplete="off"
          >
            <Form.Item
              label="Department name"
              name="departmentName"
              rules={[
                {
                  required: true,
                  message: 'Please add department name',
                },
              ]}
            >
              <Input
                placeholder="Edit department"
                onChange={(event) => SelectEmployeeDepartment(event.target.value)}
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
                onClick={() => SelectDepartment(EditDepartment?.deptId)}
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

export default DepartmentScreen;
