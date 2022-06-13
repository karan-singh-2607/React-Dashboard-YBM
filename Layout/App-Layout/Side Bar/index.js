import React from 'react';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import SideNavigation from '../../../Components/Side Navigation';

const { Sider } = Layout;

function SideBar(props) {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={props?.Collapsed}
      className={`side-nav ${
        props?.theme === 'dark' ? 'ant-layout-sider-light' : 'ant-layout-sider-light'
      }`}
      theme={props.theme}
    >
      <Scrollbars autoHide>
        <SideNavigation handleOverview={props?.handleOverview} />
      </Scrollbars>
    </Sider>
  );
}

SideBar.propTypes = {
  Collapsed: PropTypes.bool,
  theme: PropTypes.string,
  handleOverview: PropTypes.func,
};

export default SideBar;
