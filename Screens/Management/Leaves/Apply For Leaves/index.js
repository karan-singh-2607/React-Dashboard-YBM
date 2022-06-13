import {
  Col,
  DatePicker,
  Form,
  Row,
  Tag,
  Select,
  Input,
  Card,
  Button,
  Drawer,
  Divider,
} from 'antd';
import React, { useState } from 'react';
import Styles from './ApplyForLeaves.module.scss';
import LeaveRequestHistroy from '../../../../Components/Form/Leave Request History';
import LeaveCalander from '../../../../Components/Form/Leave Calander';

function ApplyForLeavesScreen() {
  const { Option } = Select;
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;
  const [DrawerVisible, setDrawerVisible] = useState({ AddDrawer: false, EditDrawer: false });
  const onChangeInput = (e) => {
    console.log('Change:', e.target.value);
  };

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onSearch(val) {
    console.log('search:', val);
  }
  const showAbsenceHistory = () => {
    setDrawerVisible({ AddDrawer: true });
  };
  const showAbsenceBalance = () => {
    setDrawerVisible({ EditDrawer: true });
  };
  const onDrawerClose = () => {
    setDrawerVisible({ AddDrawer: false, EditDrawer: false });
  };

  return (
    <>
      <Card bordered>
        <Row className={Styles.RowAvatar}>
          <Col span={24}>
            <div>
              Your remaining leave is:
              <Tag color="red">12</Tag>
            </div>
            <Button type="link" onClick={showAbsenceHistory}>
              View Leave History
            </Button>
            <Button type="link" onClick={showAbsenceBalance}>
              View Leave Calander
            </Button>
          </Col>
          <Drawer
            title=" Leave Calander "
            placement="right"
            onClose={onDrawerClose}
            visible={DrawerVisible?.EditDrawer}
            size="large"
            width="calc(100% - 225px)"
          >
            <LeaveCalander />
          </Drawer>
        </Row>

        <Form
          autoComplete="off"
          layout="vertical"
          className={Styles.LeavesForm}
          onFinish={(values) => {
            console.log({ values });
          }}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
        >
          <Row>
            <Col span={11} flex={1} className={Styles.ColCOntainer}>
              <Form.Item label="Leave starting from">
                <RangePicker className={Styles.DatePickerContainer} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item label="Reason for leave" flex={1}>
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  className={Styles.SelectDropdown}
                >
                  <Option value="">Select Absence Name</Option>
                  <Option value="lucy">Casual Leave (2.5)</Option>
                  <Option value="tom">Child Adoption Leave For Men (42.0)</Option>
                  <Option value="tom">Compensatory (0.0)</Option>
                  <Option value="tom">Earned Leave (3.0)</Option>
                  <Option value="tom">Gifted Leave (0.0)</Option>
                  <Option value="tom">Involuntory Absence from Work (14.0)</Option>
                  <Option value="tom">Loss Of Pay (0.0)</Option>
                  <Option value="tom">Paternity Leave (5.0)</Option>
                  <Option value="tom">Sick Leave(5.0)</Option>
                  <Option value="tom"> Vaccination Leave (0.0)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={10}>
              <Form.Item label="Description for leave">
                <TextArea
                  showCount
                  maxLength={1000}
                  placeholder="Comments"
                  className={Styles.TextAreaContainer}
                  rows={5}
                  onChange={onChangeInput}
                />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary">Submit</Button>
        </Form>
      </Card>
      <Drawer
        title=" View Absence Request History "
        placement="right"
        onClose={onDrawerClose}
        visible={DrawerVisible?.AddDrawer}
        width="calc(100% - 225px)"
      >
        <LeaveRequestHistroy />
      </Drawer>
    </>
  );
}

export default ApplyForLeavesScreen;
