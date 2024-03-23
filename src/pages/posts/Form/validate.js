const validate = (values) =>{
    const errors={}
    if(values.image){
        if (!values.image.type || !values.image.type.startsWith('image/')) {
            errors.image = 'File must be an image';
        }
    }
    if(values.video){
        if (!values.video.type || !values.video.type.startsWith('video/')) {
            errors.image = 'File must be an Video';
        }
    }
    if(!values.image && !values.video){
        if(!values.content){
            errors.content = "Required"
        }
    }
    return errors;
}

export default validate;