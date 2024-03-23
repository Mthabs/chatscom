const validate = (values) => {
    const errors = {}
    const requiredFields = [
        "first_name",
        "email",
        "username",
        "password1",
        "password2",
    ];

    requiredFields.forEach((field)=>{
        if(!values[field]){
            errors[field] = "Required";
        }
    });
    if(values['password1'] !== values['password2']){
        errors['password2'] = "Password doesn't match"
    }

    // console.log(errors)
    return errors;
}

export default validate;