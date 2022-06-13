import {
  EditOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import Icon from '../../Util-Components/Icon';
import AvatarContainer from '../Avatar-Container';
import Styles from './UserProfileContainer.module.scss';

const menuItem = [
  {
    title: 'Edit Profile',
    icon: EditOutlined,
    path: '/',
  },

  {
    title: 'Account Setting',
    icon: SettingOutlined,
    path: '/',
  },
  {
    title: 'Billing',
    icon: ShopOutlined,
    path: '/',
  },
  {
    title: 'Help Center',
    icon: QuestionCircleOutlined,
    path: '/',
  },
];

function UserProfileContainer() {
  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    router.push('/Auth/Login');
  };

  const profileMenu = (
    <Menu className={Styles.profileDropdown}>
      <div className={Styles.ProfileHeader}>
        <AvatarContainer size={45} />
      </div>
      {menuItem.map((el) => (
        <Menu.Item key={el.title} className={Styles.MenuItem}>
          <a href={el.path}>
            <Icon className="mr-3" type={el.icon} />
            <span className="font-weight-normal">{el.title}</span>
          </a>
        </Menu.Item>
      ))}
      <Menu.Item key={menuItem.length + 1} className={Styles.MenuItem}>
        <a href="#" onClick={handleLogOut}>
          <LogoutOutlined className="mr-3" />
          <span className="font-weight-normal">Sign Out</span>
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={Styles.Avatar}>
      <Dropdown overlay={profileMenu} trigger={['click']} placement="bottomRight">
        <a href="#" onClick={(e) => e.preventDefault()}>
          <AvatarContainer size={30} />
        </a>
      </Dropdown>
    </div>
  );
}

export default UserProfileContainer;
