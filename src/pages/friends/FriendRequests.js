import React, { useState, useEffect } from 'react';
import { customaxios } from '../../api/axiosDefaults';
import UserList from './userList';


const FriendRequests = () => {
  const [data, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await customaxios.get('/friends/requests/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  fetchUsers();
  }, []);

  const acceptRequest = async (followId) => {
    try {
      const response = await customaxios.post('friends/following/accept/'+followId+'/');
      document.location.reload()
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  return (
    <div className='my-2'>   
       <UserList data={data} underFlowMessage={"No Friend Requests"} reject={true} accept={true} handleAccept={acceptRequest}/>
    </div>
  );
};

export default FriendRequests;