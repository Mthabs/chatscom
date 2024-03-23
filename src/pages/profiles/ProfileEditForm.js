import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { customaxios } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";


const ProfileEditForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();
  const user = JSON.parse(sessionStorage.getItem('user'))

  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    content: "",
    profile_picture: "",
  });
  const { first_name, last_name, status, profile_picture } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
        try {
          const { data } = await customaxios.get(`/profile/edit/${id}/`);
          const { first_name, last_name, status, profile_picture } = data;
          setProfileData({ first_name, last_name, status, profile_picture });
        } catch (err) {
          console.log(err);
          history.push("/");
        }
      } 
    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("status", status);

    if (imageFile?.current?.files[0]) {
      formData.append("profile_picture", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await customaxios.patch(`/profiles/edit/${id}/`, formData);
      history.goBack();
      window.location.reload()
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
      <Form.Group>
      <Form.Label>First name</Form.Label>
        <Form.Control
          as="textarea"
          value={first_name}
          onChange={handleChange}
          name="first_name"
          rows={7}
        />
         <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          value={first_name}
          onChange={handleChange}
          name="first_name"
          rows={7}
        />
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          value={status}
          onChange={handleChange}
          name="status"
          rows={7}
        />
      </Form.Group>

      {errors?.content?.map((message, idx) => (
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
        save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
          <Container className={appStyles.Content}>
            <Form.Group>
              {profile_picture && (
                <figure>
                  <Image src={profile_picture} fluid />
                </figure>
              )}
              {errors?.profile_picture?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      profile_picture: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEditForm;