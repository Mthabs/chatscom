import React, { useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import Followers from './Followers';
import Following from './Following';
import FriendRequests from './FriendRequests';
import FindFriends from './FindFriends';

const Friends = () => {
  const [activeKey, setActiveKey] = useState('Friends'); // Default active key

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };

  return (
    <Container>
      <h2>Friends</h2>

      {/* Navigation Links */}
      <Nav
        variant="tabs"
        activeKey={activeKey}
        onSelect={handleSelect}
        className="mb-3"
      >
        <Nav.Item>
          <Nav.Link as={NavLink} to="/friends/followers" eventKey="Followers">
            Followers
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/friends/following" eventKey="Following">
            Following
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/friends/friend-requests"
            eventKey="FriendRequests"
          >
            Friend Requests
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/friends/find-friends" eventKey="FindFriends">
            Find Friends
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Page Content */}
      <Switch>
        <Route path="/friends/followers" component={Followers} />
        <Route path="/friends/following" component={Following} />
        <Route path="/friends/friend-requests" component={FriendRequests} />
        <Route path="/friends/find-friends" component={FindFriends} />
        <Redirect from="/friends" to="/friends" />
      </Switch>
    </Container>
  );
};

export default Friends;
