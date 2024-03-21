import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults'; // Update the path based on your project structure

const FriendRequests = () => {
  const [loading, setLoading] = useState(true);
  const [friendRequests, setFriendRequests] = useState([]);
  const [error, setError] = useState(null);

  const fetchFriendRequests = async () => {
    try {
      const response = await axiosReq.get('/friend-requests/');
      setFriendRequests(response.data);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
      setError('Error fetching friend requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      // Optimistic UI Update: Assuming the request will be accepted successfully.
      const updatedRequests = friendRequests.filter(request => request.id !== requestId);
      setFriendRequests(updatedRequests);

      // Now send the request to the server.
      await axiosReq.post(`/friend-requests/${requestId}/`);
    } catch (error) {
      console.error('Error accepting friend request:', error);
      setError('Error accepting friend request. Please try again.');
      // Revert the optimistic UI update on error.
      fetchFriendRequests();
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      // Optimistic UI Update: Assuming the request will be rejected successfully.
      const updatedRequests = friendRequests.filter(request => request.id !== requestId);
      setFriendRequests(updatedRequests);

      // Now send the request to the server.
      await axiosReq.delete(`/friend-requests/${requestId}/`);
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      setError('Error rejecting friend request. Please try again.');
      // Revert the optimistic UI update on error.
      fetchFriendRequests();
    }
  };

  return (
    <Container>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <div>
          <h2>Friend Requests</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ul>
            {friendRequests.map((request) => (
              <li key={request.id}>
                {request.friend_name} wants to be your friend
                <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
                <button onClick={() => handleRejectRequest(request.id)}>Reject</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default FriendRequests;
