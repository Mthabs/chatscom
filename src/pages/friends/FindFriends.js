import React, { useState, useEffect } from 'react';
import { customaxios } from '../../api/axiosDefaults';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from "../../styles/Avatar.module.css";


const FindFriends = () => {
  const [data, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await customaxios.get('/friends/search/', {
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
        placeholder="Enter username, name, email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='mb-2'
      />
      <ListGroup variant="flush">
        { data.map((user)=>{
          const {id, profile_picture, full_name} = user
          return(
            <ListGroup.Item>
              <div className='d-flex justify-content-between'>
                <div className='d-flex'>
                  {!profile_picture && <img src='https://res.cloudinary.com/dnt7oro5y/image/upload/v1/default_profile_qdjgyp'  className={styles.Avatar}  alt="Profile Picture" style={{ width: '50px', height: '50px', marginRight: '10px' }}  /> }
                  {profile_picture && <img src={profile_picture} alt="Profile Picture" className={styles.Avatar} style={{ width: '50px', height: '50px', marginRight: '10px' }} /> }
                  <a href={'/profile/' + id} ><span className='mt-2'>{full_name}</span></a>
                </div>
              </div>
            </ListGroup.Item>
          )})}
     </ListGroup>

     { data.length === 0 && <span> No Match to that Query </span> }
       
    </div>
  );
};

export default FindFriends;
