import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SubmissionError } from "redux-form";
import FormLayout from "./FormLayout";
import logo from "../../../assets/logo.png";
import styles from "../../../styles/SignInUpForm.module.css";
import appStyles from "../../../App.module.css";

import {
  Image,
  Col,
  Row,
  Container,
} from "react-bootstrap";
import { customaxios } from "../../../api/axiosDefaults";

const SignUpForm = (props) => {
  const navigate = useHistory();
  const [loading, setLoading ] = useState(false);
  const [profiledata, setProfiledata] = useState(null);
  const [message, setMessage ] = useState("Please wait, while we are creating you're account...")

  useEffect(()=>{
    if(profiledata ){
      profilecreate(profiledata)
    }
  },[profiledata])

  const handleSubmit = async (values) => {
    
    let accountdata = new FormData();
    let profiledata = new FormData();

    accountdata.append('username', values.username)
    accountdata.append('email', values.email)
    accountdata.append('password1', values.password1)
    accountdata.append('password2', values.password2)
 
    profiledata.append('first_name', values.first_name)
    profiledata.append('last_name', values.last_name)
    
    try{
      const response = await customaxios.post('/auth/register/', accountdata)
      if( response.status === 201 ){
        setMessage("Account Created");
        profiledata.append("user", response.data.id)
        setProfiledata(profiledata)
        return 1;
      }
    }
    catch(e){
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

  const profilecreate = async (profiledata) =>{
    setMessage("Creating Profile...")
    try{
      const response = await customaxios.post('/profile/create/', profiledata)
      if( response.status === 201 ){
        setMessage("Profile Created.")
        alert("Your account is created, Please Login")
        navigate.push("/signin")
        window.location.reload()
      }
    }
    catch(e){
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
  }

  const handleClick = (url) => {
    navigate.push(url)
    document.location.reload()
}

  return (
    <Row className={styles.Row}>
      <Col className="py-2 p-md-2" md={6}>

        <Container className={`${appStyles.Content} p-4 `}>
          <div className="d-flex justify-content-center my-4">
            <img src={logo} alt="Logo." />
          </div>
          {!loading && <>
           <h1 className={styles.Header}>sign up</h1>
          <FormLayout onSubmit={handleSubmit} />
          </>}
          {loading && <div className="d-flex justify-content-center">
          <img src="loader.gif" alt="Loading.." width="30" height="30" />
          <h5 className="mx-4">{message}</h5> 
            </div>
          }
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="" onClick={()=>{handleClick("/signin")}}>
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>

      </Col>
      <Col md={5} className={`p-2  mx-4 `} >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://images.unsplash.com/photo-1664712215116-178eb5800acb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          style={{height:"720px"}}
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;