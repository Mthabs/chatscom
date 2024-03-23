import { Field } from 'redux-form'
import{
    renderEmailField,
    renderTextField,
    renderPasswordField,
} from "../../../components/fields"

export const SignUpField = () => {
    const FieldContext = {
        first_name:{
            name: "first_name",
            label: "First Name",
            component: renderTextField,
            help_text: "Enter Your First Name",
            required: true,
        },
        last_name:{
            name: "last_name",
            label: "Last Name",
            component: renderTextField,
            help_text: "Enter Your Last Name",
            required: false,
        },
        username: {
            name: "username",
            label: "Username",
            component: renderTextField,
            help_text: "Enter Your Username",
            required: true,
        },
        email: {
            name: "email",
            label: "Email ID",
            component: renderEmailField,
            help_text: "Enter Your Email",
            required: true,
        },
        password1: {
            name: "password1",
            label: "Password",
            component: renderPasswordField,
            help_text: "Enter Your Password",
            required: true,
        },
        password2: {
            name: "password2",
            label: "Re-Password",
            component: renderPasswordField,
            help_text: "Re-Enter Your Password",
            required: true,
        },
    }
    return Object.keys(FieldContext).map((key) => {
        const{
            name,
            component,
            label,
            help_text,
            required
        } = FieldContext[key];
        return (
            <Field
              name={name}
              label={label}
              component={component}
              placeholder={help_text}
              required={required}
              />
        )
    })
}