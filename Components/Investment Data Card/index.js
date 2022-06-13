import { Card, Row, Typography } from 'antd';
import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types'; // ES6
import Styles from './InvestmentDataCard.module.scss';

const { Title } = Typography;

function InvestmentDataCard(props) {
  return (
    <Card bordered>
      <Title level={4} className="mb-0">
        {props?.Title}
      </Title>
      <div className=" mt-3">
        <div>
          <Row align="middle">
            <NumberFormat
              value={props?.Amount}
              className="foo"
              displayType="text"
              thousandSeparator
              prefix={`${props?.Prefix}`}
              renderText={(value, data) => (
                <Title level={1} className={Styles.cardAmount} {...data}>
                  {value}
                </Title>
              )}
            />
            <span className={props?.Growth ? Styles.cardProfit : Styles.cardInLoss}>
              {props?.Diffrence} {props?.Growth ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            </span>
          </Row>
          <div className={Styles.infoText}>Compare to last year (2019)</div>
        </div>
      </div>
    </Card>
  );
}
InvestmentDataCard.propTypes = {
  Title: PropTypes.string,
  Amount: PropTypes.string,
  Prefix: PropTypes.string,
  Diffrence: PropTypes.string,
  Growth: PropTypes.bool,
};
export default InvestmentDataCard;
