import React from "react";
import styles from "../../styles/Video.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Video = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comment_count,
    like_count,
    likevideo_id,
    title,
    description,
    video_file,
    updated_at,
    videoPage,
    setVideos,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/videos/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/videos/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likevideos/", { video: id });
      setVideos((prevVideos) => ({
        ...prevVideos,
        results: prevVideos.results.map((video) => {
          return video.id === id
            ? { ...video, like_count: video.like_count + 1, likevideo_id: data.id }
            : video;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likevideos/${likevideo_id}/`);
      setVideos((prevVideos) => ({
        ...prevVideos,
        results: prevVideos.results.map((video) => {
          return video.id === id
            ? { ...video, like_count: video.like_count - 1, likevideo_id: null }
            : video;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Video}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && videoPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/videos/${id}`}>
        <Card.Img src={video_file} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {description && <Card.Text>{description}</Card.Text>}
        <div className={styles.VideoBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own video!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : likevideo_id ? (
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
              overlay={<Tooltip>Log in to like videos!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {like_count}
          <Link to={`/videos/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comment_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Video;