import React, { useState } from 'react';
import { Menu, Dropdown, Badge, Avatar, List, Button } from 'antd';
import {
  MailOutlined,
  BellOutlined,
  WarningOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import notificationData from '../../public/assets/data/notification.data.json';
import Flex from '../../Util-Components/Flex';
import Styles from './NotificationContainer.module.scss';

const getIcon = (icon) => {
  switch (icon) {
    case 'mail':
      return <MailOutlined />;
    case 'alert':
      return <WarningOutlined />;
    case 'check':
      return <CheckCircleOutlined />;
    default:
      return <MailOutlined />;
  }
};

const getNotificationBody = (list) =>
  list.length > 0 ? (
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item className="list-clickable">
          <Flex alignItems="center">
            <div className="pr-3">
              {item.img ? (
                <Avatar src={`/img/avatars/${item.img}`} />
              ) : (
                <Avatar className={`ant-avatar-${item.type}`} icon={getIcon(item.icon)} />
              )}
            </div>
            <div className="mr-3">
              <span className="font-weight-bold text-dark">{item.name} </span>
              <span className="text-gray-light">{item.desc}</span>
            </div>
            <small className="ml-auto">{item.time}</small>
          </Flex>
        </List.Item>
      )}
    />
  ) : (
    <div className="empty-notification">
      <Image
        src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
        alt="empty"
        loading="lazy"
      />
      <p className="mt-3">You have viewed all notifications</p>
    </div>
  );

function NotificationContainer() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(notificationData);

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const notificationList = (
    <div className={Styles.NavNotification}>
      <div className={Styles.NotificationHeader}>
        <h4 className="mb-0">Notification</h4>
        <Button className="text-primary" type="text" onClick={() => setData([])} size="small">
          Clear{' '}
        </Button>
      </div>
      <div className="nav-notification-body">{getNotificationBody(data)}</div>
      {data.length > 0 ? (
        <div className="nav-notification-footer">
          <a className="d-block" href="#/">
            View all
          </a>
        </div>
      ) : null}
    </div>
  );

  return (
    <Dropdown
      placement="bottomRight"
      overlay={notificationList}
      onVisibleChange={handleVisibleChange}
      visible={visible}
      trigger={['click']}
    >
      <Menu mode="horizontal">
        <Menu.Item key="notification" className={Styles.notification}>
          <Badge count={data.length}>
            <BellOutlined className="nav-icon mx-auto" type="bell" />
          </Badge>
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
}

export default NotificationContainer;
