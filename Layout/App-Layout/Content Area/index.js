import { Layout } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import Styles from './ContentArea.module.scss';

const { Content } = Layout;

function ContentArea(props) {
  // console.log(props);
  return (
    <Content
      className={`${Styles.appContent} ${
        props?.theme === 'dark' ? 'ant-layout-sider-light' : 'ant-layout-sider-light'
      }`}
      theme={props.theme}
    >
      {props?.children}
    </Content>
  );
}
ContentArea.propTypes = {
  theme: PropTypes.string,
  children: PropTypes.node,
};

export default ContentArea;
