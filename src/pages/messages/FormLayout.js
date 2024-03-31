import { reduxForm, Form, change } from "redux-form"
import {  useDispatch } from "react-redux";
import { Field } from "redux-form";
import { renderTextAreaField, renderFileField } from "../../components/fields";
import { Button } from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";
import { useEffect } from "react";


const FormField = ({name}) => {
    return(
        <>
        <Field name = {name} placeholder="Enter Your Message" component={renderTextAreaField} />
        {/* <div className="d-flex">
        <Field name="image" component={renderFileField} image="/upload2.jpg" accept="image/*" label="Upload Image" />
        <Field name="video" component={renderFileField} image="/upload.jpg" accept="video/*" label="Upload Video" />
        </div> */}
        </>
    )
}

const FormLayout = (props) => {
    const { handleSubmit, pristine, submitting,  message, name="content" } = props;
    const dispatch = useDispatch()
    useEffect(()=>{
        // dispatch(reset("usermessage"))
        dispatch(change("usermessage", name, message))
    },[])
    return(
        <Form onSubmit={handleSubmit}>
            <FormField name={name} />
            <Button
            className={`${btnStyles.Button} ${btnStyles.Bright} mt-3`}
            type="Submit"
            disabled={pristine || submitting}
            >
            {!message && "Send"}
            {message && "Save"}
            </Button>  
        </Form>
    )
}
export default reduxForm({
form:"usermessage",
destroyOnUnmount:true,
forceUnregisterOnUnmount:true,
})(FormLayout);