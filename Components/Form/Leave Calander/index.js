import React from 'react';
import { Calendar, Tag } from 'antd';

function getLeaveData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { color: 'blue', content: 'This is warning event.' },
        { color: 'green', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { color: 'yellow', content: 'This is warning event.' },
        { color: 'green', content: 'This is usual event.' },
        { color: 'red', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { color: 'yellow', content: 'This is warning event' },
        { color: 'green', content: 'This is very long usual event。。....' },
        { color: 'red', content: 'This is error event 1.' },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getLeaveData(value);
  return (
    <>
      {listData.map((item) => (
        <Tag key={item.content} color={item.color}>
          {item.content}
        </Tag>
      ))}
    </>
  );
}
// eslint-disable-next-line consistent-return
function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

function LeaveCalander() {
  return (
    <div>
      <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />,
    </div>
  );
}

export default LeaveCalander;
