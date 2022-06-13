import { BellOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Link from 'next/link';
import React from 'react';
import { BsCreditCard2Front } from 'react-icons/bs';
import Icon from '../../Util-Components/Icon';

function ProfileNavigation() {
  const handleClick = (e) => {
    console.log('click ', e);
  };
  return (
    <Menu
      onClick={handleClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link href="/Profile/EditProfile">profile</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<LockOutlined />}>
        Password
      </Menu.Item>
      <Menu.Item key="3" icon={<Icon type={BsCreditCard2Front} />}>
        Billing
      </Menu.Item>
      <Menu.Item key="4" icon={<BellOutlined />}>
        Notification
      </Menu.Item>
    </Menu>
  );
}

export default ProfileNavigation;
