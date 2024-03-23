import React, { useState } from "react";
import FormLayout from "./FormLayout";
import { Link, useHistory } from "react-router-dom";
import { SubmissionError } from "redux-form";
import { customaxios } from "../../../api/axiosDefaults";
import styles from "../../../styles/SignInUpForm.module.css";
import appStyles from "../../../App.module.css";
import {
    Image,
    Col,
    Row,
    Container,
  } from "react-bootstrap";


function SignInForm() {
  const navigate = useHistory();
  const [loading, setLoading ] = useState(false);
  const [message, setMessage ] = useState("Please wait...")

  const handleSubmit = async (values) => {  
    setLoading(true) 
    try{
      const response = await customaxios.post('/auth/token/', values)
      if( response.status === 200 ){
        sessionStorage.setItem("authtoken", response.data.token)
        sessionStorage.setItem("user", JSON.stringify(response.data.user))
        sessionStorage.setItem("loggedIn", true)
        navigate.push("/")
        document.location.reload()
      }
    }
    catch(e){
      setLoading(false)
      if(e.code === "ERR_NETWORK"){
        alert("You're not connected to Internet. Please Check your network Connection")
      }
      else if(e.response.status === 400 ){
        throw new SubmissionError(e.response.data);
      }
      else{
        alert(e.response.status);
      }
    }
  };

  const handleClick = (url) => {
      navigate.push(url)
      document.location.reload()
  }
  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
        {!loading && <>
          <h1 className={styles.Header}>sign in</h1>
          <FormLayout onSubmit={handleSubmit}/>
          </>}
          {loading && <div className="d-flex justify-content-center">
          <img src="loader.gif" alt="Loading.." width="30" height="30" />
          <h5 className="mx-4">{message}</h5> 
            </div>
          }
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="" onClick={()=>{handleClick("/signup")}}>
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero.jpg"}
        />
      </Col>
    </Row>
  );
}

export default SignInForm;