import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import styles from "../../styles/PhotoEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

function PhotoEditForm() {
    const [errors, setErrors] = useState({});
    const [photoData, setPhotoData] = useState({
      caption: "",  
      description: "",
      image: "",
    });
    const { caption, description, image } = photoData;  
    const imageInput = useRef(null);
    const history = useHistory();
    const { id } = useParams();
  
    useEffect(() => {
      const handleMount = async () => {
        try {
          const { data } = await axiosReq.get(`/photos/${id}/`);
          const { caption, description, image, is_owner } = data;
  
          is_owner ? setPhotoData({ caption, description, image }) : history.push("/");
        } catch (err) {
          console.log(err);
        }
      };
  
      handleMount();
    }, [history, id]);
  
    const handleChange = (event) => {
      setPhotoData({
        ...photoData,
        [event.target.name]: event.target.value,
      });
    };
  
    const handleChangeImage = (event) => {
      if (event.target.files.length) {
        URL.revokeObjectURL(image);
        setPhotoData({
          ...photoData,
          image: URL.createObjectURL(event.target.files[0]),
        });
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
  
      formData.append("caption", caption);  
      formData.append("description", description);
  
      if (imageInput?.current?.files[0]) {
        formData.append("image", imageInput.current.files[0]);
      }
  
      try {
        await axiosReq.put(`/photos/${id}/`, formData);
        history.push(`/photos/${id}`);
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
          <Form.Label>Caption</Form.Label>  
          <Form.Control
            type="text"
            name="caption"
            value={caption}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.caption?.map((message, idx) => (  
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

      <Form.Group>
        <Form.Label>Description</Form.Label>
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
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PhotoEditForm;