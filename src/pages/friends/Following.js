import React from 'react';
import { useProfileData } from '../../contexts/ProfileDataContext';

const Following = () => {
  const { profile } = useProfileData();

  return (
    <div>
      <div>{profile?.following_count}</div>
      <div>following</div>
    </div>
  );
};

export default Following;