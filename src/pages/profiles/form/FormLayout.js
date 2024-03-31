import { reduxForm, Form, change } from "redux-form"
import {  useDispatch } from "react-redux";
import { Field } from "redux-form";
import { renderTextField, renderFileField, renderTextAreaField } from "../../../components/fields";
import { Button } from "react-bootstrap";
import btnStyles from "../../../styles/Button.module.css";
import { useEffect } from "react";

const FormField = () => {
    return(
        <>       
        <Field name="profile_picture" component={renderFileField} image="/profile_upload.jpg" accept="image/*" label="Upload Image" size={120} />
        <Field name = "first_name" placeholder="First name" component={renderTextField} label="First Name" />
        <Field name = "last_name" placeholder="Last name" component={renderTextField} label="Last Name" /> 
        <Field name = "status" placeholder="What's happening?" component={renderTextAreaField} label="Status" />       
        </>
    )
}

const FormLayout = (props) => {
    const { handleSubmit, pristine, submitting, data } = props;
    const dispatch = useDispatch();
   
    useEffect(()=>{
        if(data){
            Object.keys(data).map((key)=>{
                dispatch(change("userprofile", key, data[key]))
            })
        }
    },[data])
    
    return(
        <Form onSubmit={handleSubmit}>
            <FormField />
            <Button
            className={`${btnStyles.Button} ${btnStyles.Bright} mt-3`}
            type="Submit"
            disabled={pristine || submitting}
            >
            Submit
            </Button>  
        </Form>
    )
}
export default reduxForm({
form:"userprofile",
})(FormLayout);