import React from 'react';
import InnerProfileLayout from '../../Layout/Inner Profile Layout';
import RootContainer from '../../Layout/Root Layout';
import EditProfileScreen from '../../Screens/Company/Company Overview/Edit Profile/EditProfileScreen';

function EditProfile() {
  return (
    <RootContainer>
      <InnerProfileLayout>
        <EditProfileScreen />
      </InnerProfileLayout>
    </RootContainer>
  );
}

export default EditProfile;
