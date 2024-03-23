import React, { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import CommentForm from "./CommentForm";
import styles from "../../styles/Post.module.css";
import { customaxios } from "../../api/axiosDefaults";


const Comment = (props) => {
  const { id  , user, comment, likes_count } = props
  const currentUser = JSON.parse(sessionStorage.getItem("user"))

  const [isDifferent, setDifferent] = useState(true);
  const[like, setLike] = useState(false)
  const [editForm, setEditForm] = useState(false);

  useEffect(()=>{
    if(user.id === currentUser.id){
      setDifferent(false);
      initialLike();
    }
  },[user])

  const handleDelete = async () => {
    const response = await customaxios.delete("/post/comment/modify/"+id+"/")
    if(response.status===204){
      alert("Comment deleted successfully")
      document.location.reload()
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData()
    formData.append("comment", values.comment)
    const response = await customaxios.patch("/post/comment/modify/"+id+"/", formData)
    if(response.status === 206){
      alert("Comment updated successfully")
      document.location.reload()
    }
    
  }

  const handleLike = (value) => {
    if(value){
      customaxios.post("/post/comment/like/"+id+"/")
    }
    else{
      customaxios.delete("/post/comment/like/"+id+"/")
    }
    setLike(value)
    document.location.reload()
  }

  const initialLike = async() => {
    // Create Initial Like api and Integrate here: gets user like this post from api
    try{
        const response = await customaxios.get("/post/comment/like/"+id+"/")
        if(response.status === 200){
            setLike(response.data.like);
        }
    }
    catch(e){
        console.log(e)
    }
    
}

  const hideEditForm = () =>{
    setEditForm(false)
  }

  return (
    <div style={{backgroundColor:"white"}}>
      <hr />
      <div className="d-flex">
        <a href={`/profile/${user.id}`}>
          {user.profile_picture && <Avatar src={user.profile_picture} />}
         {!user.profile_picture && <Avatar src="https://res.cloudinary.com/dnt7oro5y/image/upload/v1/media/../default_profile_qdjgyp" /> }
        </a>
        <div >
          <span className={styles.Owner}>{user.full_name}</span>
        </div>
          {!isDifferent &&<MoreDropdown
            handleEdit={() => setEditForm(true)}
            handleDelete={handleDelete}
          />}
      </div>
      {!editForm && <div className=" row d-flex" >
        <div className="col-md-1"></div>
        <div className="col-md-9"> <p>{comment}</p></div>
        <div className="col-sm">
        {like && <i className={`fas fa-heart ${styles.Heart}`} onClick={()=>{handleLike(false)}} style={{marginTop:"-10px"}}/>}
        {!like && <i className="far fa-heart" onClick={()=>{handleLike(true)}} style={{marginTop:"-10px"}} /> }
        {likes_count}
        </div>
      </div>}
      {editForm && <CommentForm message={comment} onSubmit={handleSubmit} hideEditForm={hideEditForm} />}
      <hr />
    </div>
  );
};

export default Comment;