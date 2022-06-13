import { Layout, Col, Row } from 'antd';
import React from 'react';
import InvestmentDataCard from '../../../Components/Investment Data Card';
import Styles from './Overview.module.scss';

function OverviewScreen() {
  return (
    <Layout className={Styles.mainOverviewContainer}>
      <div className={Styles.leftOverviewContainer}>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <InvestmentDataCard
                Title="Revenue"
                Amount="80000"
                Diffrence="8%"
                Prefix="₹"
                Growth={false}
              />
            </Col>
            <Col span={8}>
              <InvestmentDataCard Title="Sales" Amount="50000" Diffrence="11%" Prefix="₹" Growth />
            </Col>
            <Col span={8}>
              <InvestmentDataCard
                Title="Cost"
                Amount="40000"
                Diffrence="13.25%"
                Prefix="₹"
                Growth
              />
            </Col>
          </Row>
        </div>
      </div>
      <div className={Styles.rightOverviewContainer}>2</div>
    </Layout>
  );
}

export default OverviewScreen;
