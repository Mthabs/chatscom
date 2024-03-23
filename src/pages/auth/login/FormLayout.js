import { Form, reduxForm } from "redux-form"
import { SignInField } from "./FormField";
import Button from 'react-bootstrap/Button';

import btnStyles from "../../../styles/Button.module.css";


  const FormLayout = (props) => {
    const { handleSubmit, pristine, submitting } = props;
    
    return(
        <Form onSubmit={handleSubmit}>
            <SignInField />
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              block={true}
              type="submit"
              disabled={pristine || submitting}
            >
              Sign in
            </Button>        
        </Form>
    )
  };

  export default reduxForm({
    form:"signin",
    destroyOnUnmount:false,
    forceUnregisterOnUnmount:false,
  })(FormLayout);