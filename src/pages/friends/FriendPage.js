import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Friend from "../friends/Friend"; // Assuming the component name is Friend
import { fetchMoreData } from "../../utils/utils";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";

function FriendPage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [friendFollowers, setFriendFollowers] = useState({ results: [] });
  const [friendFollowing, setFriendFollowing] = useState({ results: [] });

  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [friend] = pageProfile.results;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: friendFollowers },
          { data: friendFollowing }
        ] = await Promise.all([
          axiosReq.get(`/followers/?followed=${id}`),
          axiosReq.get(`/followers/?follower=${id}`)
        ]);

        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [friend] },
        }));

        setFriendFollowers(friendFollowers);
        setFriendFollowing(friendFollowing);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainFriendProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image className={styles.ProfileImage} roundedCircle src={friend?.image} />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{friend?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{friend?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{friend?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{friend?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            (friend?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => handleUnfollow(friend)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleFollow(friend)}
              >
                follow
              </Button>
            ))}
        </Col>
        {friend?.content && <Col className="p-3">{friend.content}</Col>}
      </Row>
    </>
  );

  const mainFriendFollowers = (
    <>
      <hr />
      <p className="text-center">{friend?.owner}'s followers</p>
      <hr />
      {friendFollowers.results.length ? (
        <InfiniteScroll
          children={friendFollowers.results.map((follower) => (
            <Friend key={follower.id} friend={follower} />
          ))}
          dataLength={friendFollowers.results.length}
          loader={<Asset spinner />}
          hasMore={!!friendFollowers.next}
          next={() => fetchMoreData(friendFollowers, setFriendFollowers)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No followers found for ${friend?.owner}.`}
        />
      )}
    </>
  );

  const mainFriendFollowing = (
    <>
      <hr />
      <p className="text-center">{friend?.owner}'s following</p>
      <hr />
      {friendFollowing.results.length ? (
        <InfiniteScroll
          children={friendFollowing.results.map((following) => (
            <Friend key={following.id} friend={following} />
          ))}
          dataLength={friendFollowing.results.length}
          loader={<Asset spinner />}
          hasMore={!!friendFollowing.next}
          next={() => fetchMoreData(friendFollowing, setFriendFollowing)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`${friend?.owner} is not following anyone.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainFriendProfile}
              {mainFriendFollowers}
              {mainFriendFollowing}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default FriendPage;
