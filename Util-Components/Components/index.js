/* eslint-disable react/prop-types */
import React from 'react';

function Components(props) {
  const { component, className } = props;

  return <>{React.createElement(component, { className })}</>;
}

export default Components;
