import { Form, reduxForm } from "redux-form"
import { SignUpField } from "./FormFields";
import validate from "./validate";
import Button from 'react-bootstrap/Button';

import btnStyles from "../../../styles/Button.module.css";


  const FormLayout = (props) => {
    const { handleSubmit, load, pristine, reset, submitting } = props;
    
    return(
        <Form onSubmit={handleSubmit}>
            <SignUpField />
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright} mt-3`}
              block={true}
              type="submit"
              disabled={pristine || submitting}
            >
              Sign up
            </Button>        
        </Form>
    )
  };

  export default reduxForm({
    form:"register",
    destroyOnUnmount:false,
    forceUnregisterOnUnmount:false,
    validate,
  })(FormLayout);