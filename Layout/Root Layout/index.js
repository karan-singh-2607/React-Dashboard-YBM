import { Layout } from 'antd';
import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import ContentArea from '../App-Layout/Content Area';
import HeaderNav from '../App-Layout/Header';
import SideBar from '../App-Layout/Side Bar';
import Styles from './Index.module.scss';

function RootContainer({ children }) {
  // console.log('object===>', children);
  const [theme] = useState('light');
  const [MenuIndex, setMenuIndex] = useState(0);
  const [Collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!Collapsed);
  };
  const handleOverview = (data) => {
    setMenuIndex(data);
  };

  return (
    <Layout className={Styles.LayoutContainer}>
      <HeaderNav toggle={toggle} Collapsed={Collapsed} theme={theme} />
      <Layout className={Styles.sitelayout}>
        <SideBar
          Collapsed={Collapsed}
          theme={theme}
          className={Styles.Sidebar}
          handleOverview={handleOverview}
        />
        <Layout style={Collapsed ? { paddingLeft: 80 } : { paddingLeft: 200 }}>
          <Scrollbars autoHide>
            {/* eslint-disable-next-line react/no-children-prop */}
            <ContentArea MenuIndex={MenuIndex} children={children} theme={theme} />
          </Scrollbars>
        </Layout>
      </Layout>
    </Layout>
  );
}

RootContainer.propTypes = {
  children: PropTypes.node,
};

export default RootContainer;
