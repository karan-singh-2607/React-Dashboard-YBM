import React, { useLayoutEffect, useState } from 'react';
import { Avatar } from 'antd';
import { useRouter } from 'next/router';
import Styles from './Avatar.module.scss';

function AvatarContainer(props) {
  const router = useRouter();
  const [FirstName, setFirstName] = useState('');

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      const UserName = localStorage.getItem('firstName', 'firstName');
      if (UserName == null) {
        router.push('/Auth/Login');
      } else {
        setFirstName(UserName);
      }
    }
  }, [FirstName]);
  const size = props;
  const ProfileName = FirstName;
  return (
    <>
      <Avatar size={size} className={Styles.AvatarContainer}>
        {ProfileName.slice(0, 1)}{' '}
      </Avatar>
      {ProfileName}
    </>
  );
}

export default AvatarContainer;
