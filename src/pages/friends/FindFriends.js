import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './userList';


const FindFriends = () => {
  const [data, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/friends/search/', {
          params: { query: searchQuery },
        });

        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    if(searchQuery !== ''){
      fetchUsers();
    }
  }, [searchQuery]);



  return (
    <div className='my-2'>
      <h2>Find Friends</h2>
      <input
        type="text"
        placeholder="Search for friends"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='mb-2'
      />
       <UserList data={data} underFlowMessage={"No Match to that Query"} />
    </div>
  );
};

export default FindFriends;
