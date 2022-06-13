import { Form, Tabs, Typography } from 'antd';
import Layout from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import TabPanelConfig from '../../../../lib/Data/TabPanelConfig';
import Components from '../../../../Util-Components/Components';
import Icon from '../../../../Util-Components/Icon';
import Styles from './AddEmployee.module.scss';

const { Text } = Typography;
const { TabPane } = Tabs;

function AddEmployeeScreen() {
  const [StateMode] = useState({ mode: 'top' });
  const { mode } = StateMode;

  return (
    <Layout className="inner-app-layout">
      <Form
        autoComplete="off"
        layout="vertical"
        initialValues={{ Layout: 'inline' }}
        className={Styles.AddEmployeeForm}
        onFinish={(values) => {
          console.log({ values });
        }}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
      >
        <Tabs defaultActiveKey="0" tabPosition={mode} className={Styles.TabsTab}>
          {TabPanelConfig.map((data) => (
            <TabPane
              tab={
                <>
                  {' '}
                  <Icon type={data?.icon} className={Styles.IconSize} />{' '}
                  <Text strong>{data?.label}</Text>
                </>
              }
              key={data?.id}
            >
              <Components component={data?.Component} />
            </TabPane>
          ))}
        </Tabs>
      </Form>
    </Layout>
  );
}

export default AddEmployeeScreen;
