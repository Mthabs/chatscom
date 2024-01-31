import React from 'react';
import PropTypes from 'prop-types';

FriendsComp.propTypes = {};

export default function FriendsComp({ friends }) {
  return (
    <>
      <h1>Friends</h1>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
    </>
  );
}
