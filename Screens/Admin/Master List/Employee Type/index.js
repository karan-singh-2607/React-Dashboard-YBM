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
const screenTitle = 'Employee Type';
const AuthNotification = (type) => {
  notification[type]({
    message: 'Sessino Expired',
    description: 'Your Session is Expired .',
  });
};

function EmployeeTypeScreen() {
  /// /
  const [form] = Form.useForm();
  const [AddNewType, setAddNewType] = useState({ loading: false, visible: false });
  const [EditType, setEditType] = useState({
    loading: false,
    visible: false,
    EmployeeTypeId: '',
    EmployeeTypeNmae: '',
    EmployeeTypeNameOnChange: '',
  });
  const [AllResData, setAllResData] = useState({ EmpInfo: null });
  const [EmployeeEmployeeTypeInfo, setEmployeeEmployeeTypeInfo] = useState([]);
  const [EmployeeType, setEmployeeType] = useState('');
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const [Token, setToken] = useState('');
  const showAddTypeModal = (e) => {
    e.preventDefault();
    setAddNewType({ visible: true });
  };
  const showEditTypeModal = (val) => {
    // console.log('object', val)
    // e.preventDefault()
    setEditType({ visible: true, EmployeeTypeId: val?._id, EmployeeTypeNmae: val?.employeetype });
  };
  const HandleAddType = () => {
    setAddNewType({ loading: true });
    setTimeout(() => {
      setAddNewType({ loading: false, visible: false });
    }, 3000);
  };
  const HandleEditType = () => {
    setEditType({ loading: true });
    setTimeout(() => {
      setEditType({ loading: false, visible: false });
    }, 3000);
  };

  const HandleCancelType = () => {
    setAddNewType({ visible: false });
    form.resetFields();
    setEditType({ loading: false, EmployeeTypeNmae: '' });
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
      const PersonalEmpInfo = await AuthData.get(`employeetype/get`)
        .then((response) => {
          setEmployeeEmployeeTypeInfo(response.data);
          setLoading(false);
        })
        .catch((error) => {
          if (error.response.status === 403 || error.response.status === 401) {
            localStorage.removeItem('token');
            router.push('/Auth/Login');
          }
          setEmployeeEmployeeTypeInfo({});
        });

      setAllResData({ EmpInfo: PersonalEmpInfo });
    };
    fetchData();
  };
  // console.log('EmpEmployeeType', EmployeeEmployeeTypeInfo);
  if (AllResData.EmpInfo) {
    console.log('data--->', AllResData.EmpInfo);
  }

  // Add Data (Post API)
  const [AddType, SetAddTypeData] = useState({
    employeetype: '',
  });
  const updateTypeData = (keyName, value) => {
    console.log(value);
    SetAddTypeData({ ...updateTypeData, [keyName]: value });
  };

  const SaveType = (e) => {
    e.preventDefault();
    const config = {
      method: 'post',
      url: `${process.env.NEXT_API_BASE_URL}/employeetype/add`,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${Token}`,
      },
      data: AddType,
    };
    axios(config)
      .then(() => {
        // console.log(JSON.stringify(response.data));
        getData();
        message.success('Employee type added successfully!');
        form.resetFields();
        HandleAddType();
        setAddNewType('');
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
    updateTypeData('');
  };

  // PUT API
  const SelectEmployeeType = (_id) => {
    const config = {
      method: 'put',
      url: `${process.env.NEXT_API_BASE_URL}/employeetype/${_id}`,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${Token}`,
        mode: 'no-cors',
      },
      data: { employeetype: EmployeeType, _id },
    };
    axios(config)
      .then((res) => {
        getData();
        message.success(res.data);
        form.resetFields();
        HandleEditType();
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
    setEmployeeType('');
  };
  const SelectEmployeeEmployeeType = (EmployeeTypeName) => {
    // setPersonalInfo(_id)
    setEmployeeType(EmployeeTypeName);
    // setId(_id)
  };

  /// ///Delete API
  const { confirm } = Modal;
  const showDeleteConfirm = (val) => {
    console.log(val);
    confirm({
      title: `Want to delete ${val?.employeetype}`,
      icon: <ExclamationCircleOutlined />,
      content: 'Once deleted, you will not be able to recover this EmployeeType!',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteEmployeeType(val?._id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const deleteEmployeeType = (id) => {
    if (id) {
      const config = {
        method: 'delete',
        url: `${process.env.NEXT_API_BASE_URL}/employeetype/${id}`,
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
          <Button type="primary" icon={<PlusOutlined />} size="middle" onClick={showAddTypeModal}>
            Add new
          </Button>
        </Row>
        <Modal
          visible={AddNewType?.visible}
          title={`Add ${screenTitle}`}
          onOk={HandleAddType}
          onCancel={HandleCancelType}
          footer={null}
        >
          <Layout>
            <Form
              name="AddType"
              form={form}
              onFinish={(value) => console.log(value)}
              onFinishFailed={(error) => console.log('Failed:', error)}
              autoComplete="off"
            >
              <Form.Item
                label={`${screenTitle} name`}
                name="EmployeeTypeName"
                rules={[
                  {
                    required: true,
                    message: `Please add ${screenTitle} name`,
                  },
                ]}
              >
                <Input
                  placeholder={`Add ${screenTitle}`}
                  onChange={(event) => updateTypeData('employeetype', event.target.value)}
                />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  span: 14,
                  offset: 8,
                }}
              >
                <Button type="primary" htmlType="submit" onClick={SaveType}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Layout>
        </Modal>
      </Card>
      <Card bordered>
        {/* eslint-disable-next-line no-constant-condition */}
        <Table dataSource={EmployeeEmployeeTypeInfo} loading={true ? Loading : !Loading}>
          <Column title={screenTitle} dataIndex="employeetype" key="employeetype" />
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
                  onClick={() => showEditTypeModal(record)}
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
        visible={EditType?.visible}
        title={`Edit ${screenTitle}`}
        onOk={HandleEditType}
        onCancel={HandleCancelType}
        footer={null}
      >
        <Layout>
          <Form
            name="EditType"
            initialValues={{
              EmployeeTypeName: EditType?.EmployeeTypeNmae,
            }}
            form={form}
            onFinish={(value) => console.log(value)}
            onFinishFailed={(error) => console.log('Failed:', error)}
            autoComplete="off"
          >
            <Form.Item
              label={`${screenTitle} name`}
              name="EmployeeTypeName"
              rules={[
                {
                  required: true,
                  message: `Please add ${screenTitle} name`,
                },
              ]}
            >
              <Input
                placeholder={`Edit ${screenTitle}`}
                onChange={(event) => SelectEmployeeEmployeeType(event.target.value)}
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
                onClick={() => SelectEmployeeType(EditType?.EmployeeTypeId)}
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

export default EmployeeTypeScreen;
