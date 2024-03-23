import { useEffect, useState } from "react"
import { Row, Col } from 'react-bootstrap';

import Comment from "./Comment"
import CommentForm from "./CommentForm"
import { customaxios } from "../../api/axiosDefaults"


const HandlePostComments = ({id}) => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"))

    const [data, setData] = useState([])

    useEffect(()=>{
        loadData()
    },[id])

    const loadData = async () => {
        const response = await customaxios.get("/post/comment/fetch/"+id+"/")
        try{
            if(response.status === 200){
                setData(response.data)
            }
        }
        catch(e){

        }
    }

    const handleSubmit = async (values) => {
        const formData = new FormData()
        formData.append("comment",values.content)
        formData.append("user",currentUser.id)
        formData.append("post",id)
        console.log(values)
        const response = await customaxios.post("/post/comment/create/",formData)
        if(response.status===201){
            document.location.reload();
        }
    }
 
    return(
        <>
            <Row className='mt-5'>
                <Col md={2}></Col>
                <Col>
                    <CommentForm onSubmit={handleSubmit}/>
                </Col>
                <Col md={2}></Col>
            </Row>
            <Row>
                <Col md={2}></Col>
                <Col>
                    {data.map((instance)=>{
                        return(<Comment {...instance} />) 
                    })}
                </Col>
                <Col md={2}></Col>
            </Row>
        </>
    )
}

export default HandlePostComments;