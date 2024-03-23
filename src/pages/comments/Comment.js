import { reduxForm, Form, change } from "redux-form"
import { Field } from "redux-form";
import { renderTextAreaField, renderFileField } from "../../components/fields";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import btnStyles from "../../styles/Button.module.css";
import { useEffect } from "react";



const CommentForm = (props) => {
  // Props
    const { handleSubmit, pristine, submitting, message, hideEditForm } = props;
    // Dispatch 
    const dispatch = useDispatch()
    // UseEffect function to load form field
    useEffect(()=>{
        if(message){ 
          dispatch(change("commentForm", "comment", message))
        }
    },[message])

    return(
        <Form onSubmit={handleSubmit}>
            <Field name = {message ? "comment" : "content"} placeholder="Leave Your Comment here" component={renderTextAreaField} />
            <Button
            className={`${btnStyles.Button} ${btnStyles.Bright} mt-3`}
            type="Submit"
            disabled={pristine || submitting}
            >
            {!message && "Comment"}
            {message && "Save Comment"}
            </Button>  
            {message && <Button
              className={`${btnStyles.Button} btn btn-light  mt-3`}
              type="Button"
              onClick={()=>hideEditForm}
              >
              Cancel
            </Button>}
        </Form>
    )
}
export default reduxForm({
form:"commentForm",
destroyOnUnmount:true,
forceUnregisterOnUnmount:true,
})(CommentForm);