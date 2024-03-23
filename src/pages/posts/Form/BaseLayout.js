import { Row, Col, Container } from "react-bootstrap";
import { Card } from "react-bootstrap"
import FormLayout from "./FormLayout";
import { customaxios } from "../../../api/axiosDefaults";
import { SubmissionError } from "redux-form";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Post from "../Post";


const PostCreation = () => {
  const navigate = useHistory()
  const [auth, setAuth] = useState(false);
  const [posts, setPosts] = useState(null);

    useEffect(()=>{
      let temp = JSON.parse(sessionStorage.getItem("loggedIn"));
      setAuth(temp);
      if(!temp){
        navigate.push("/signin")
      }
  },[])

  useEffect(()=>{
    if(auth){
      getPosts()
    }
  },[auth])

  const  getPosts=async()=>{
    try{
      const response = await customaxios.get('post/all/')

      if(response.status ===200 && response.data.count > 0){
        setPosts(response.data.posts);
      }
    }
    catch(e){
      if(e.code === "ERR_NETWORK"){
        alert("You're not connected to Internet. Please Check your network Connection")
      }
      else{
        alert(e);
      }
    }
  }
    const handleSubmit = async (values) => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const formdata = new FormData();
        if (values.content){
            formdata.append("content", values.content)
        }
        if(values.video){
            formdata.append("video", values.video)
        }
        if(values.image){
            formdata.append("image", values.image)
        }
            formdata.append("user", user.id)
        try{
            const response = await customaxios.post('/post/', formdata);
            if( response.status === 201 ){
              alert("Successfully Posted")
              window.location.reload()
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
        return 1;
    }
    return(
        <Row>
            {auth && <Col className="d-flex justify-content-between" md={7} lg={8}>
                <Container>
                    <FormLayout onSubmit={handleSubmit}/>
                    {posts && posts.map((post)=>{
                      return(
                        <Row className="my-4">
                          <Col>
                          <Post {...post} />
                          </Col>
                        </Row>
                      )
                    })}
                  <Card className="mt-4">
                    <Card.Body className="d-flex justify-content-center">
                      {!posts && (<span><strong>There are no posts to display</strong></span>)}
                      {posts && (<span>You're all caught up</span>)}
                    </Card.Body>
                  </Card>
                </Container>
            </Col>}
        </Row>
        
        )
}
export default PostCreation;