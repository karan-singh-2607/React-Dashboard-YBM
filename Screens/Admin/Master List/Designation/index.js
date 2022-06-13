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
import { API_CONFIG } from '../../../../lib/Config/API';

const { Column } = Table;
const { Title } = Typography;
const screenTitle = 'Designation';

const AuthNotification = (type) => {
  notification[type]({
    message: 'Sessino Expired',
    description: 'Your Session is Expired .',
  });
};

function DesignationScreen() {
  /// /
  const [form] = Form.useForm();
  const router = useRouter();
  const [AddNewDesignation, setAddNewDesignation] = useState({ loading: false, visible: false });
  const [EditDesignation, setEditDesignation] = useState({
    loading: false,
    visible: false,
    DesignationId: '',
    DesignationNmae: '',
    DesignationNameOnChange: '',
  });
  const [AllResData, setAllResData] = useState({ EmpInfo: null });
  const [EmployeeDesignationInfo, setEmployeeDesignationInfo] = useState([]);
  const [Designation, setDesignation] = useState('');
  const [Loading, setLoading] = useState(false);
  const [Token, setToken] = useState('');

  const showAddDesignationModal = (e) => {
    e.preventDefault();
    setAddNewDesignation({ visible: true });
  };
  const showEditDesignationModal = (val) => {
    setEditDesignation({
      visible: true,
      DesignationId: val?._id,
      DesignationNmae: val?.designation,
    });
  };
  const HandleAddDesignation = () => {
    setAddNewDesignation({ loading: true });
    setTimeout(() => {
      setAddNewDesignation({ loading: false, visible: false });
    }, 3000);
  };
  const HandleEditDesignation = () => {
    setEditDesignation({ loading: true });
    setTimeout(() => {
      setEditDesignation({ loading: false, visible: false });
    }, 3000);
  };

  const HandleCancelDesignation = () => {
    setAddNewDesignation({ visible: false });
    form.resetFields();
    setEditDesignation({ loading: false, DesignationNmae: '' });
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
      const PersonalEmpInfo = await AuthData.get(`designation/get`)
        .then((response) => {
          setEmployeeDesignationInfo(response.data);
          setLoading(false);
        })
        .catch((error) => {
          if (error.response.status === 403 || error.response.status === 401) {
            localStorage.removeItem('token');
            router.push('/Auth/Login');
          }
        });

      setAllResData({ EmpInfo: PersonalEmpInfo });
    };
    fetchData();
  };
  // console.log('EmpDesignation', EmployeeDesignationInfo);
  if (AllResData.EmpInfo) {
    console.log('data--->', AllResData.EmpInfo);
  }

  // Add Data (Post API)
  const [AddDesignation, SetAddDesignationData] = useState({
    designation: '',
  });

  const updateDesignationData = (keyName, value) => {
    SetAddDesignationData({ ...updateDesignationData, [keyName]: value });
  };
  const SaveDesignation = (e) => {
    e.preventDefault();
    const config = {
      method: 'post',
      url: `${process.env.NEXT_API_BASE_URL}/designation/add`,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${Token}`,
      },
      data: AddDesignation,
    };
    axios(config)
      .then(() => {
        // console.log(JSON.stringify(response.data));
        getData();
        message.success('Designation added successfully!');
        form.resetFields();
        HandleAddDesignation();
        setAddNewDesignation('');
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
    updateDesignationData('');
  };

  // PUT API
  const SelectDesignation = (_id) => {
    const config = {
      method: 'put',
      url: `${API_CONFIG.API_BASE_URL}designation/${_id}`,
      headers: {
        'Content-Type': 'application/json',
        mode: 'no-cors',
      },
      data: { designation: Designation, _id },
    };
    axios(config)
      .then((res) => {
        getData();
        message.success(res.data);
        form.resetFields();
        HandleEditDesignation();
        setEditDesignation('');
      })
      .catch((error) => {
        console.log(error);
        message.error('Something went wrong while updating!');
      });
    setDesignation('');
  };
  const SelectEmployeeDesignation = (DesignationName) => {
    // setPersonalInfo(_id)
    setDesignation(DesignationName);
    // setId(_id)
  };

  /// ///Delete API
  const { confirm } = Modal;
  const showDeleteConfirm = (val) => {
    console.log(val);
    confirm({
      title: `Want to delete ${val?.Designation}`,
      icon: <ExclamationCircleOutlined />,
      content: 'Once deleted, you will not be able to recover this designation!',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteDesignation(val?._id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const deleteDesignation = (id) => {
    if (id) {
      const config = {
        method: 'delete',
        url: `${API_CONFIG.API_BASE_URL}designation/${id}`,
        headers: {},
        data: id,
      };

      axios(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          message.success(response?.data);
          getData();
        })
        .catch((error) => {
          console.log(error);
          message.error('Failed to delete, please try again.');
        });
    }
  };
  /// //////

  return (
    <>
      {console.log(Token)}
      <Card bordered>
        <Row justify="space-between">
          <Title level={3}>Designation</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="middle"
            onClick={showAddDesignationModal}
          >
            Add Designation
          </Button>
        </Row>
        <Modal
          visible={AddNewDesignation?.visible}
          title={`Add ${screenTitle}`}
          onOk={HandleAddDesignation}
          onCancel={HandleCancelDesignation}
          footer={null}
        >
          <Layout>
            <Form
              name="addDesignation"
              form={form}
              onFinish={(value) => console.log(value)}
              onFinishFailed={(error) => console.log('Failed:', error)}
              autoComplete="off"
            >
              <Form.Item
                label={`${screenTitle} name`}
                name="designationName"
                rules={[
                  {
                    required: true,
                    message: `Please add ${screenTitle} name`,
                  },
                ]}
              >
                <Input
                  placeholder={`Add ${screenTitle}`}
                  onChange={(event) => updateDesignationData('designation', event.target.value)}
                />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  span: 14,
                  offset: 8,
                }}
              >
                <Button type="primary" htmlType="submit" onClick={SaveDesignation}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Layout>
        </Modal>
      </Card>
      <Card bordered>
        {/* eslint-disable-next-line no-constant-condition */}
        <Table dataSource={EmployeeDesignationInfo} loading={true ? Loading : !Loading}>
          <Column title={screenTitle} dataIndex="designation" key="designation" />
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
                  onClick={() => showEditDesignationModal(record)}
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
        visible={EditDesignation?.visible}
        title={`Edit ${screenTitle}`}
        onOk={HandleEditDesignation}
        onCancel={HandleCancelDesignation}
        footer={null}
      >
        <Layout>
          <Form
            name="editDesignation"
            initialValues={{
              designationName: EditDesignation?.DesignationNmae,
            }}
            form={form}
            onFinish={(value) => console.log(value)}
            onFinishFailed={(error) => console.log('Failed:', error)}
            autoComplete="off"
          >
            <Form.Item
              label={`${screenTitle} name`}
              name="designationName"
              rules={[
                {
                  required: true,
                  message: `Please add ${screenTitle} name`,
                },
              ]}
            >
              <Input
                placeholder={`Edit ${screenTitle}`}
                onChange={(event) => SelectEmployeeDesignation(event.target.value)}
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
                onClick={() => SelectDesignation(EditDesignation?.DesignationId)}
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

export default DesignationScreen;
