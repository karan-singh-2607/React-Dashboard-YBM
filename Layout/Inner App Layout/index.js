import React from 'react';
import PropTypes from 'prop-types';
import Styles from './InnerAppLayout.module.scss';

function InnerAppLayout({ children }) {
  return <div className={Styles.InnerAppLayoutContainer}>{children}</div>;
}

InnerAppLayout.propTypes = {
  children: PropTypes.node,
};
export default InnerAppLayout;
