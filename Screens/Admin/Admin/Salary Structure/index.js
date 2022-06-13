/* eslint-disable no-constant-condition */
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
  message,
  notification,
  Modal,
  Row,
  Space,
  Table,
  Tag,
  Typography,
  Drawer,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import SalaryTemplate from '../../../../Components/Form/Add Salary Template';
import EditSalaryTemplate from '../../../../Components/Form/Edit Salary Template';
import { API_CONFIG } from '../../../../lib/Config/API';

const { Column } = Table;
const { Title } = Typography;
const screenTitle = 'Salary structure';
function SalaryStructureScreen() {
  /// ///////Drawer for add / Edit
  const [DrawerVisible, setDrawerVisible] = useState({ AddDrawer: false, EditDrawer: false });
  const [EditableData, setEditableData] = useState([]);
  const showAddDrawer = () => {
    setDrawerVisible({ AddDrawer: true });
  };
  const showEditDrawer = (val) => {
    setEditableData(val);
    setDrawerVisible({ EditDrawer: true });
    console.log('data++', val);
  };
  console.log(EditableData);
  const onDrawerClose = () => {
    // debugger
    form.resetFields();
    setDrawerVisible({ AddDrawer: false, EditDrawer: false });
    // debugger
    // debugger
    setisAllowanceChecked([]);
    setisDeductionChecked([]);
    // debugger
  };
  // console.log('Drawer', DrawerVisible);

  /// /
  const [form] = Form.useForm();
  const [AllResData, setAllResData] = useState({ EmpInfo: null });
  const [SalaryStructureInfo, setSalaryStructureInfo] = useState([]);
  const [Loading, setLoading] = useState(false);

  // console.log(EditDesignation);
  // Get API
  const getData = () => {
    const fetchData = async () => {
      setLoading(true);
      const PersonalEmpInfo = await axios
        .get(`${API_CONFIG.API_BASE_URL}salarytemplate/get`)
        .then((response) => {
          setSalaryStructureInfo(response.data);
          setLoading(false);
        })
        .catch(() => {
          setSalaryStructureInfo({});
        });

      setAllResData({ EmpInfo: PersonalEmpInfo });
    };
    fetchData();
  };
  // console.log('Salary Structure', SalaryStructureInfo);
  if (AllResData.EmpInfo) {
    console.log('data--->', AllResData.EmpInfo);
  }
  /// ///////// POST API
  const [isAllowanceChecked, setisAllowanceChecked] = useState([]);
  const [isDeductionChecked, setisDeductionChecked] = useState([]);
  const [TemplateName, setTemplateName] = useState({
    name: '',
  });

  const handleSubmit = () => {
    const isEarning = isAllowanceChecked;
    const isDeduction = isDeductionChecked;
    const templateName = TemplateName;
    const config = {
      method: 'post',
      url: `${API_CONFIG.API_BASE_URL}salarytemplate/add`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name: templateName,
        status: 'Active',
        salaryHeads: isEarning,
        deductionHeads: isDeduction,
      },
    };
    axios(config)
      .then(() => {
        // console.log(JSON.stringify(response.data));
        message.success('New salary template added');
        getData();
        onDrawerClose();
      })
      .catch((error) => {
        console.log(error);
        HandleError('error');
      });
    form.resetFields();
    console.log(templateName, isEarning, isDeduction);
  };
  // console.log(TemplateName, isAllowanceChecked, isDeductionChecked);
  /// // Edit Salary Template
  const [editAllowanceChecked, setEditAllowanceChecked] = useState([]);
  const [editDeductionChecked, setEditDeductionChecked] = useState([]);
  const [editTemplateName, setEditTemplateName] = useState({
    name: '',
  });
  const handleEditSubmit = (id) => {
    const isEarning = editAllowanceChecked;
    const isDeduction = editDeductionChecked;
    const templateName = editTemplateName;
    const config = {
      method: 'PUT',
      url: `${API_CONFIG.API_BASE_URL}salarytemplate/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        tempateId: id,
        name: templateName,
        salaryHeads: isEarning,
        deductionHeads: isDeduction,
      },
    };
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        message.success('Salary template updated');
        getData();
        onDrawerClose();
      })
      .catch((error) => {
        console.log(error);
        HandleError('error');
      });
    console.log(templateName, isEarning, isDeduction);
    setEditableData([]);
    setTemplateName({ name: '' });
    setEditAllowanceChecked(['']);
    setEditDeductionChecked(['']);
  };
  // console.log(TemplateName, isAllowanceChecked, isDeductionChecked);
  /// ////////

  const onAllowanceChange = (checkedValues) => {
    console.log('Allowance', checkedValues);
    setEditAllowanceChecked(checkedValues);
  };
  const onDeductionChange = (checkedValues) => {
    console.log('Deduction = ', checkedValues);
    setEditDeductionChecked(checkedValues);
  };
  /// //////////////////
  useEffect(() => {
    getData();
  }, []);
  /// //Error on api
  const HandleError = (Type) => {
    notification[Type]({
      message: 'Error!',
      description: 'Something went wrong, please contact your administrator',
    });
  };
  /// ///Delete API
  const { confirm } = Modal;
  const showDeleteConfirm = (val) => {
    console.log(val);
    confirm({
      title: `Want to delete ${val?.name}`,
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
        url: `${API_CONFIG.API_BASE_URL}salarytemplate/${id}`,
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
      <Card bordered>
        <Row justify="space-between">
          <Title level={3}>{screenTitle}</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="middle"
            onClick={() => showAddDrawer()}
          >
            Add salary template
          </Button>
        </Row>
        <Drawer
          title="Create salary template"
          size="large"
          width="calc(100% - 225px)"
          placement="right"
          onClose={onDrawerClose}
          visible={DrawerVisible?.AddDrawer}
        >
          <SalaryTemplate
            onDrawerClose={onDrawerClose}
            setisAllowanceChecked={setisAllowanceChecked}
            setisDeductionChecked={setisDeductionChecked}
            setTemplateName={setTemplateName}
            handleSubmit={handleSubmit}
            HandleError={HandleError}
          />
        </Drawer>
      </Card>
      <Card bordered>
        <Table dataSource={SalaryStructureInfo} loading={true ? Loading : !Loading}>
          <Column title={screenTitle} dataIndex="name" key="designation" />
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
                  onClick={() => showEditDrawer(record)}
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
        ,
      </Card>
      {DrawerVisible.EditDrawer && (
        <Drawer
          title="Update salary template"
          size="large"
          width="calc(100% - 225px)"
          placement="right"
          onClose={onDrawerClose}
          visible={DrawerVisible?.EditDrawer}
        >
          <EditSalaryTemplate
            onDrawerClose={onDrawerClose}
            SalaryStructureInfo={SalaryStructureInfo}
            setEditTemplateName={setEditTemplateName}
            handleEditSubmit={handleEditSubmit}
            EditableData={EditableData}
            DrawerVisible={DrawerVisible}
            setEditableData={setEditableData}
            onDeductionChange={onDeductionChange}
            onAllowanceChange={onAllowanceChange}
            form={form}
          />
        </Drawer>
      )}
    </>
  );
}

export default SalaryStructureScreen;
