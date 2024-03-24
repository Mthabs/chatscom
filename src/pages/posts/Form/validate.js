const validate = (values) =>{
    const errors={}
    if(!values.image && !values.video){
        if(!values.content && !values.status){
            errors.content = "Required"
        }
    }
    console.log(errors)
    return errors;
}

export default validate;