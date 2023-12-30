import React from "react";
import styles from "../../styles/Photo.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Photo = (props) => {
    const {
      id,
      owner,
      profile_id,
      profile_image,
      comment_count,  
      like_count,    
      likephoto_id,  
      caption,
      image,
      updated_at,
      photoPage,
      setPhotos,
    } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/photos/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/photos/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likephotos/", { photo: id });
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        results: prevPhotos.results.map((photo) => {
          return photo.id === id
            ? { ...photo, like_count: photo.like_count + 1, likephoto_id: data.id }
            : photo;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likephotos/${likephoto_id}/`);
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        results: prevPhotos.results.map((photo) => {
          return photo.id === id
            ? { ...photo, like_count: photo.like_count - 1, likephoto_id: null }
            : photo;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Photo}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && photoPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/photos/${id}`}>
        <Card.Img src={image} alt={caption} /> 
      </Link>
      <Card.Body>
        {caption && <Card.Title className="text-center">{caption}</Card.Title>}
        <div className={styles.PhotoBar}>
            {is_owner ? (
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't like your own photo!</Tooltip>}
            >
                <i className="far fa-heart" />
            </OverlayTrigger>
            ) : likephoto_id ? (
                <span onClick={handleUnlike}>
                <i className={`fas fa-heart ${styles.Heart}`} />
                </span>
            ) : currentUser ? (
                <span onClick={handleLike}>
                <i className={`far fa-heart ${styles.HeartOutline}`} />
                </span>
            ) : (
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to like photos!</Tooltip>}
            >
                <i className="far fa-heart" />
            </OverlayTrigger>
            )}
            {like_count}
            <Link to={`/photos/${id}`}>
                <i className="far fa-comments" />
            </Link>
            {comment_count} 
        </div>
      </Card.Body>
    </Card>
  );
};

export default Photo;