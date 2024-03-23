import { Field } from 'redux-form'
import{
    renderEmailField,
    renderTextField,
    renderPasswordField,
} from "../../../components/fields"

export const SignInField = () => {
    const FieldContext = {
        username: {
            name: "username",
            label: "Username",
            component: renderTextField,
            help_text: "Enter Your Username",
            required: true,
        },
        password: {
            name: "password",
            label: "Password",
            component: renderPasswordField,
            help_text: "Enter Your Password",
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