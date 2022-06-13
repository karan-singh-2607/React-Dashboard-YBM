import React from 'react';
import { Col, Layout, Row } from 'antd';
import PropTypes from 'prop-types';
import InnerAppLayout from '../Inner App Layout';
import ProfileNavigation from '../../Components/Profile-navigation';
import Styles from './innerProfileLayout.module.scss';

const { Content } = Layout;

function InnerProfileLayout({ children }) {
  return (
    <Layout>
      <Content>
        <InnerAppLayout>
          <Layout className={Styles.LayoutContainer}>
            <Col span={24}>
              <Row>
                <Col className={Styles.ColContiner}>
                  <ProfileNavigation />
                </Col>
                <Col className={Styles.InnerProfileContainer}>{children}</Col>
              </Row>
            </Col>
          </Layout>
        </InnerAppLayout>
      </Content>
    </Layout>
  );
}
InnerProfileLayout.propTypes = {
  children: PropTypes.objectOf(PropTypes.object),
};

export default InnerProfileLayout;
