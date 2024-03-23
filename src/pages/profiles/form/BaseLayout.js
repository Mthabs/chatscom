import { Col, Row } from "react-bootstrap";
import FormLayout from "./FormLayout"
import { customaxios } from "../../../api/axiosDefaults";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

const ProfileEdit = () =>{
    const navigate = useHistory()
    const {id} = useParams()
    const handleSubmit= async (values)=>{
        const formdata = new FormData()
        if(values.profile_picture){
            formdata.append("profile_picture", values.profile_picture)
        }
        if(values.first_name){
            formdata.append("first_name", values.first_name)
        }
        if(values.last_name){
            formdata.append("last_name", values.last_name)
        }
        if(values.status){
            formdata.append("status", values.status)
        }
        const response = await customaxios.patch('profile/edit/'+id+"/", formdata)
        if (response.status === 206){
            alert("Profile Updated")
            navigate.push("/profile/"+id)
            window.location.reload()
        }
    }
    return(
        <Row>
            <Col md={4}>
                <h3>Update Your Profile</h3>
                <FormLayout onSubmit={handleSubmit} />
            </Col>
        </Row>
    )
}

export default ProfileEdit;