import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Video from "./Video";  
import Videocomment from "../videocomments/Videocomment";
import VideocommentUploadForm from "../videocomments/VideocommentUploadForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [videocomments, setVideocomments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: video }, { data: videocomments }] = await Promise.all([
          axiosReq.get(`/videos/${id}`),
          axiosReq.get(`/videocomments/?video=${id}`),
        ]);
        setVideo({ results: [video] });
        setVideocomments(videocomments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Video {...video.results[0]} setVideos={setVideo} videoPage />
        <Container className={appStyles.Description}>
          {currentUser ? (
            <VideocommentUploadForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              video={id}
              setVideo={setVideo}
              setVideocomments={setVideocomments}
            />
          ) : videocomments.results.length ? (
            "Videocomments"
          ) : null}
          {videocomments.results.length ? (
            <InfiniteScroll
              children={videocomments.results.map((videocomment) => (
                <Videocomment
                  key={videocomment.id}
                  {...videocomment}
                  setVideo={setVideo}
                  setVideocomments={setVideocomments}
                />
              ))}
              dataLength={videocomments.results.length}
              loader={<Asset spinner />}
              hasMore={!!videocomments.next}
              next={() => fetchMoreData(videocomments, setVideocomments)}
            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default VideoPage;