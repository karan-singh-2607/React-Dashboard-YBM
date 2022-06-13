import { Space } from 'antd';
import React from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import Styles from './LanguageSelector.module.scss';

function LanguageSelector() {
  return (
    <Space className={Styles.LanguageContainer}>
      <GlobalOutlined className={Styles.GlobalOutlinedContainer} twoToneColor="#52c41a" />
    </Space>
  );
}

export default LanguageSelector;
