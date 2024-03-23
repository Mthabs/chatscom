import { useEffect, useState } from 'react';
import { customaxios } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Row, Col } from 'react-bootstrap';
import HandlePostComments from '../comments/BaseLayout';
import Post from "./Post"



const PostDetail = () =>{
    const navigate = useHistory()
    const { id } = useParams();
    const [auth, setAuth] = useState(false);
    const [data, setData] = useState(null);

    useEffect(()=>{
        setAuth(JSON.parse(sessionStorage.getItem("loggedIn")));
    },[])

    useEffect(()=>{
        if(auth){
            loaddata()
        }
    },[auth])

    const loaddata = async() =>{
        try {
            const response = await customaxios.get("post/"+id+"/")
            if(response.status === 200){
                setData(response.data)
            }
        }
        catch(e){
            if(e.code === "ERR_NETWORK"){
                alert("You're not connected to Internet. Please Check your network Connection")
              }
              else{
                alert(e.response.status);
              }
        }
        
    }

    return(
        <>
        <Row>
            <Col md={2}></Col>
            <Col>
                {data && <Post {...data} /> }
            </Col>
            <Col md={2}></Col>
        </Row>
        
       <HandlePostComments id={id} />
        </>
    )
}

export default PostDetail;