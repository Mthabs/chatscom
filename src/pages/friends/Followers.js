import React from 'react';
import { useProfileData } from '../../contexts/ProfileDataContext';

const Followers = () => {
  const { followers_count } = useProfileData();

  return (
    <div>
      <div>{followers_count}</div>
      <div>followers</div>
    </div>
  );
};

export default Followers;