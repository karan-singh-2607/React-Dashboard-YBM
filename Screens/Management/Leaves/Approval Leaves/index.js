/* eslint-disable no-nested-ternary */
/* eslint-disable no-dupe-keys */
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { Card, Row, Space, Table, Tag, Typography, Badge, Modal, Input, Tooltip } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';
import Styles from './ApprovalLeaves.module.scss';

const { Column } = Table;
const { Title } = Typography;
function ApprovalLeaveScreen() {
  const [ApproveVisible, setApproveVisible] = useState(false);
  const [RejectVisible, setRejectVisible] = useState(false);
  const handleApprove = () => {
    setApproveVisible(true);
  };
  const handleReject = () => {
    setRejectVisible(true);
  };
  const data = [
    {
      key: '1',
      employeename: 'Prachi',
      startdate: '01-01-2022',
      enddate: '10-01-2022',
      reason: 'fever',
      noofleaves: '8',
      remainingleaves: '4',
      totalleaves: '24',
      leavescarryforward: '2',
      status: { text: 'Approved', status: 'sucess' },
      leavetypes: 'Sick',
    },
    {
      key: '2',
      employeename: 'Karan',
      startdate: '01-01-2022',
      enddate: '10-01-2022',
      reason: '',
      noofleaves: '8',
      remainingleaves: '4',
      totalleaves: '24',
      leavescarryforward: '2',
      status: { text: 'Pending', status: 'warning' },
      leavetypes: 'Loss of Pay',
    },
  ];

  return (
    <>
      <Card bordered>
        <Row>
          <Title level={3}>Leave Requests</Title>
        </Row>
      </Card>
      <Card>
        <Table
          dataSource={data}
          scroll={{ x: 1900, y: 'calc(100vh - 70px)' }}
          pagination={{ pageSize: 50 }}
        >
          <Column title="Employee" dataIndex="employeename" key="employeename" fixed="left" />
          <Column
            title="Status"
            dataIndex="status"
            key="status"
            render={(status) => (
              // eslint-disable-next-line no-nested-ternary
              <Tag
                icon={
                  status.text === 'Approved' ? (
                    <CheckCircleOutlined />
                  ) : status.text === 'Pending' ? (
                    <ClockCircleOutlined />
                  ) : (
                    <CloseCircleOutlined />
                  )
                }
                color={
                  status.text === 'Approved'
                    ? 'success'
                    : status.text === 'Pending'
                    ? 'warning'
                    : 'error'
                }
              >
                {status.text}
              </Tag>
            )}
          />
          <Column
            title="Start Date"
            dataIndex="startdate"
            key="startdate"
            render={(startdate) => (
              <Tag icon={<HistoryOutlined />} color="cyan">
                {moment(startdate).format('DD/MM/YYYY')}
              </Tag>
            )}
          />
          <Column
            title="End Date"
            dataIndex="enddate"
            key="enddate"
            render={(enddate) => (
              <Tag icon={<ClockCircleOutlined />} color="magenta">
                {moment(enddate).format('DD/MM/YYYY')}
              </Tag>
            )}
          />
          <Column
            title="Leave Types"
            dataIndex="leavetypes"
            key="leavetypes"
            render={(leavetypes) => (
              <Tag color="blue" key={leavetypes}>
                {leavetypes}
              </Tag>
            )}
          />
          <Column title="Reason" dataIndex="reason" key="reason" />
          <Column title="No Of Leaves" dataIndex="noofleaves" key="noofleaves" />
          <Column title="Remaining Leaves" dataIndex="remainingleaves" key="remainingleaves" />
          <Column title="Total Leaves" dataIndex="totalleaves" key="totalleaves" />
          <Column
            title="Leaves Carry Forward"
            dataIndex="leavescarryforward"
            key="leavescarryforward"
          />

          <Column
            title="Action"
            key="action"
            fixed="right"
            render={() => (
              <Space size="middle">
                <Tooltip placement="topLeft" title="Approve" arrowPointAtCenter>
                  <AiOutlineCheckCircle className={Styles.ApproveCheck} onClick={handleApprove} />
                </Tooltip>
                <Tooltip placement="topLeft" title="Reject" arrowPointAtCenter>
                  <MdOutlineCancel className={Styles.Reject} onClick={handleReject} />
                </Tooltip>
              </Space>
            )}
          />
        </Table>
      </Card>
      <Modal
        title="Approve Status"
        centered
        visible={ApproveVisible}
        onOk={() => setApproveVisible(false)}
        onCancel={() => setApproveVisible(false)}
        // width={1000}
      >
        <Input placeholder="Approve Reason" />
      </Modal>
      <Modal
        title="Reject Status"
        centered
        visible={RejectVisible}
        onOk={() => setRejectVisible(false)}
        onCancel={() => setRejectVisible(false)}
        // width={1000}
      >
        <Input placeholder="Reject Reason" />
      </Modal>
    </>
  );
}

export default ApprovalLeaveScreen;
