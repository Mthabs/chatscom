import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const FindFriends = () => {
  const currentUser = useCurrentUser();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users/', {
          params: { search: searchQuery },
        });

        setUsers(response.data.results);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [searchQuery]);

  const handleSendRequest = async (userId) => {
    try {
      await axios.post('/friend-requests/', { friend: userId });
      setSearchQuery('');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <div>
      <h2>Find Friends</h2>
      <input
        type="text"
        placeholder="Search for friends"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}
            {currentUser.id !== user.id && (
              <button onClick={() => handleSendRequest(user.id)}>Send Request</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindFriends;