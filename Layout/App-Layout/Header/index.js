import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import ActionCenter from '../../../Components/Action-Center';
import SiteLogo from '../../../Components/Logo';
import Styles from './Header.module.scss';

function HeaderNav(props) {
  const { Header, Sider } = Layout;
  return (
    <Header className={Styles.appHeader}>
      <Sider
        collapsible
        collapsed={props?.Collapsed}
        trigger={null}
        className={`${
          props?.theme === 'dark' ? 'ant-layout-sider-light' : 'ant-layout-sider-light'
        } ${Styles.LogoContainer}`}
        theme={props.theme}
      >
        <SiteLogo />
      </Sider>
      <div className={Styles.triggerContainer}>
        <div>
          {React.createElement(props?.Collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: props?.toggle,
          })}
        </div>
        <div className={Styles.ActionCenterContainer}>
          <ActionCenter />
        </div>
      </div>
    </Header>
  );
}

HeaderNav.propTypes = {
  Collapsed: PropTypes.bool,
  toggle: PropTypes.func,
  theme: PropTypes.string,
};

export default HeaderNav;
