import React from 'react';
import LanguageSelector from '../Language Selector';
import NotificationContainer from '../Notification-Container';
import UserProfileContainer from '../User-Profile-Container';

function ActionCenter() {
  return (
    <>
      <NotificationContainer />
      <LanguageSelector />
      <UserProfileContainer />
    </>
  );
}

export default ActionCenter;
