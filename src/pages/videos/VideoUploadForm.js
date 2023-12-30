import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import Asset from "../../components/Asset";

import Upload from "../../assets/upload.png";

import styles from "../../styles/VideoUploadForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";


function VideoUploadForm() {
  const [errors, setErrors] = useState({});

  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    video_file: "",
  });
  const { title, description, video_file } = videoData;

  const videoInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setVideoData({
      ...videoData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeVideo = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(video_file);
      setVideoData({
        ...videoData,
        video: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("video_file", videoInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/videos/", formData);
      history.push(`/videos/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        upload
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.description} ${styles.Container} d-flex flex-column justify-description-center`}
          >
            <Form.Group className="text-center">
              {video_file ? (
                <>
                  <video
                    className={appStyles.Video}
                    controls
                    src={video_file}
                    type="video/*"
                  />
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="video-upload"
                    >
                      Change the video
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-description-center"
                  htmlFor="video-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload a video"
                  />
                </Form.Label>
              )}

              <Form.File
                id="video-upload"
                accept="video/*"
                onChange={handleChangeVideo}
                ref={videoInput}
              />
            </Form.Group>
            {errors?.video?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.description}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default VideoUploadForm;