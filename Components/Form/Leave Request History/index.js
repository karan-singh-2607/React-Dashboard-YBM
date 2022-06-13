import React from 'react';
import { Timeline } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Styles from './Leaverequest.module.scss';

function LeaveRequestHistory() {
  return (
    <Timeline className={Styles.History}>
      <Timeline.Item color="green">
        <div>
          <p>
            <strong>01/05/2021 - 04/05/2021</strong>
          </p>
          <p>
            <strong>Type :</strong> Medical leave
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae optio autem
            reprehenderit eos sequi nam, dicta expedita non, aut dolorum ducimus. Ducimus eos eaque
            quod sed ratione veritatis earum ut?
          </p>
        </div>
      </Timeline.Item>
      <Timeline.Item color="red">
        <div>
          <p>
            <strong>01/05/2021 - 04/05/2021</strong>
          </p>
          <p>
            <strong>Type :</strong> Medical leave
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae optio autem
            reprehenderit eos sequi nam, dicta expedita non, aut dolorum ducimus. Ducimus eos eaque
            quod sed ratione veritatis earum ut?
          </p>
        </div>
      </Timeline.Item>
      <Timeline.Item>
        <div>
          <p>
            <strong>01/05/2021 - 04/05/2021</strong>
          </p>
          <p>
            <strong>Type :</strong> Medical leave
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae optio autem
            reprehenderit eos sequi nam, dicta expedita non, aut dolorum ducimus. Ducimus eos eaque
            quod sed ratione veritatis earum ut?
          </p>
        </div>
      </Timeline.Item>
      <Timeline.Item color="#00CCFF" dot={<SmileOutlined />}>
        <p>Custom color testing</p>
      </Timeline.Item>
    </Timeline>
  );
}

export default LeaveRequestHistory;
