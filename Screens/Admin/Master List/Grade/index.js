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
const screenTitle = 'Grade';
const AuthNotification = (type) => {
  notification[type]({
    message: 'Sessino Expired',
    description: 'Your Session is Expired .',
  });
};

function GradeScreen() {
  /// /
  const [form] = Form.useForm();
  const [AddNewGrade, setAddNewGrade] = useState({ loading: false, visible: false });
  const [EditGrade, setEditGrade] = useState({
    loading: false,
    visible: false,
    GradeId: '',
    GradeNmae: '',
    GradeNameOnChange: '',
  });
  const [AllResData, setAllResData] = useState({ EmpInfo: null });
  const [EmployeeGradeInfo, setEmployeeGradeInfo] = useState([]);
  const [Grade, setGrade] = useState('');
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const [Token, setToken] = useState('');
  const showAddGradeModal = (e) => {
    e.preventDefault();
    setAddNewGrade({ visible: true });
  };
  const showEditGradeModal = (val) => {
    // console.log('object', val)
    // e.preventDefault()
    setEditGrade({ visible: true, GradeId: val?._id, GradeNmae: val?.grade });
  };
  const HandleAddGrade = () => {
    setAddNewGrade({ loading: true });
    setTimeout(() => {
      setAddNewGrade({ loading: false, visible: false });
    }, 3000);
  };
  const HandleEditGrade = () => {
    setEditGrade({ loading: true });
    setTimeout(() => {
      setEditGrade({ loading: false, visible: false });
    }, 3000);
  };

  const HandleCancelGrade = () => {
    setAddNewGrade({ visible: false });
    form.resetFields();
    setEditGrade({ loading: false, GradeNmae: '' });
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
  // useEffect(() => {
  //   getData();
  // }, []);
  // console.log(EditGrade);
  // Get API
  const getData = () => {
    const fetchData = async () => {
      setLoading(true);
      const PersonalEmpInfo = await AuthData.get(`grade/get`)
        .then((response) => {
          setEmployeeGradeInfo(response.data);
          setLoading(false);
        })
        .catch((error) => {
          if (error.response.status === 403 || error.response.status === 401) {
            localStorage.removeItem('token');
            router.push('/Auth/Login');
          }
          setEmployeeGradeInfo({});
        });

      setAllResData({ EmpInfo: PersonalEmpInfo });
    };
    fetchData();
  };
  // console.log('EmpGrade', EmployeeGradeInfo);
  if (AllResData.EmpInfo) {
    console.log('data--->', AllResData.EmpInfo);
  }

  // Add Data (Post API)
  const [AddGrade, SetAddGradeData] = useState({
    grade: '',
  });
  const updateGradeData = (keyName, value) => {
    SetAddGradeData({ ...updateGradeData, [keyName]: value });
  };

  const SaveGrade = (e) => {
    e.preventDefault();
    const config = {
      method: 'post',
      url: `${process.env.NEXT_API_BASE_URL}/grade/add`,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${Token}`,
      },
      data: AddGrade,
    };
    axios(config)
      .then(() => {
        // console.log(JSON.stringify(response.data));
        getData();
        message.success('Grade added successfully!');
        form.resetFields();
        HandleAddGrade();
        setAddNewGrade('');
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
    updateGradeData('');
  };

  // PUT API
  const SelectGrade = (_id) => {
    const config = {
      method: 'put',
      url: `${process.env.NEXT_API_BASE_URL}/grade/${_id}`,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${Token}`,
        mode: 'no-cors',
      },
      data: { grade: Grade, _id },
    };
    axios(config)
      .then((res) => {
        getData();
        message.success(res.data);
        form.resetFields();
        HandleEditGrade();
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
    setGrade('');
  };
  const SelectEmployeeGrade = (GradeName) => {
    // setPersonalInfo(_id)
    setGrade(GradeName);
    // setId(_id)
  };

  /// ///Delete API
  const { confirm } = Modal;
  const showDeleteConfirm = (val) => {
    console.log(val);
    confirm({
      title: `Want to delete ${val?.grade}`,
      icon: <ExclamationCircleOutlined />,
      content: 'Once deleted, you will not be able to recover this Grade!',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteGrade(val?._id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const deleteGrade = (id) => {
    if (id) {
      const config = {
        method: 'delete',
        url: `${process.env.NEXT_API_BASE_URL}/grade/${id}`,
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
          <Title level={3}>Grade</Title>
          <Button type="primary" icon={<PlusOutlined />} size="middle" onClick={showAddGradeModal}>
            Add Grade
          </Button>
        </Row>
        <Modal
          visible={AddNewGrade?.visible}
          title={`Add ${screenTitle}`}
          onOk={HandleAddGrade}
          onCancel={HandleCancelGrade}
          footer={null}
        >
          <Layout>
            <Form
              name="addgrade"
              form={form}
              onFinish={(value) => console.log(value)}
              onFinishFailed={(error) => console.log('Failed:', error)}
              autoComplete="off"
            >
              <Form.Item
                label={`${screenTitle} name`}
                name="gradeName"
                rules={[
                  {
                    required: true,
                    message: `Please add ${screenTitle} name`,
                  },
                ]}
              >
                <Input
                  placeholder={`Add ${screenTitle}`}
                  onChange={(event) => updateGradeData('grade', event.target.value)}
                />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  span: 14,
                  offset: 8,
                }}
              >
                <Button type="primary" htmlType="submit" onClick={SaveGrade}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Layout>
        </Modal>
      </Card>
      <Card bordered>
        {/* eslint-disable-next-line no-constant-condition */}
        <Table dataSource={EmployeeGradeInfo} loading={true ? Loading : !Loading}>
          <Column title={screenTitle} dataIndex="grade" key="grade" />
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
                  onClick={() => showEditGradeModal(record)}
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
        visible={EditGrade?.visible}
        title={`Edit ${screenTitle}`}
        onOk={HandleEditGrade}
        onCancel={HandleCancelGrade}
        footer={null}
      >
        <Layout>
          <Form
            name="editgrade"
            initialValues={{
              gradeName: EditGrade?.GradeNmae,
            }}
            form={form}
            onFinish={(value) => console.log(value)}
            onFinishFailed={(error) => console.log('Failed:', error)}
            autoComplete="off"
          >
            <Form.Item
              label={`${screenTitle} name`}
              name="gradeName"
              rules={[
                {
                  required: true,
                  message: `Please add ${screenTitle} name`,
                },
              ]}
            >
              <Input
                placeholder={`Edit ${screenTitle}`}
                onChange={(event) => SelectEmployeeGrade(event.target.value)}
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
                onClick={() => SelectGrade(EditGrade?.GradeId)}
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

export default GradeScreen;
