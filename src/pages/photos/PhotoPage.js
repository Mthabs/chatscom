import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Photo from "./Photo"; 
import Photocomment from "../photocomments/Photocomment";
import PhotocommentCreateForm from "../photocomments/PhotocommentUploadForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

function PhotoPage() {
  const { id } = useParams();
  const [photo, setPhoto] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [photocomments, setPhotocomments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: photo }, { data: photocomments }] = await Promise.all([
          axiosReq.get(`/photos/${id}`),
          axiosReq.get(`/photocomments/?photo=${id}`),
        ]);
        setPhoto({ results: [photo] });
        setPhotocomments(photocomments);
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
        <Photo {...photo.results[0]} setPhotos={setPhoto} photoPage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <PhotocommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              photo={id}
              setPhoto={setPhoto}
              setPhotocomments={setPhotocomments}
            />
          ) : photocomments.results.length ? (
            "Photocomments"
          ) : null}
          {photocomments.results.length ? (
            <InfiniteScroll
              children={photocomments.results.map((photocomment) => (
                <Photocomment
                  key={photocomment.id}
                  {...photocomment}
                  setPhoto={setPhoto}
                  setPhotocomments={setPhotocomments}
                />
              ))}
              dataLength={photocomments.results.length}
              loader={<Asset spinner />}
              hasMore={!!photocomments.next}
              next={() => fetchMoreData(photocomments, setPhotocomments)}
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

export default PhotoPage;