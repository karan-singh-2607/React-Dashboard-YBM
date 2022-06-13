/* eslint-disable react/prop-types */
import React from 'react';

function Icon(props) {
  const { type, className } = props;
  return <>{React.createElement(type, { className })}</>;
}
export default Icon;
