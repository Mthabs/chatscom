import { ProfileEditDropdown } from "../../components/MoreDropdown";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { customaxios } from "../../api/axiosDefaults";
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Post from "../posts/Post";
import Avatar from "../../components/Avatar";


const Profile = () => {
    const navigate = useHistory()
    const { id } = useParams();
    const [auth, setAuth] = useState(false);
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [followId, setFollowId] = useState(null);
    const [isDifferent, setIsDifferent] = useState(true);

    useEffect(()=>{
      let temp = JSON.parse(sessionStorage.getItem("loggedIn"));
      setAuth(temp);
      if(!temp){
        navigate.push("/signin")
        document.location.reload()
      }
      else{
        const user = JSON.parse(sessionStorage.getItem("user"))
        console.log(user.id === Number(id))
        if(user.id === Number(id)){
            setIsDifferent(false)
        }
        else{
            CheckFollowing();
        }
      }
    },[id])

    useEffect(()=>{
        if(auth){
          getPosts();
          getUserProfile();
        }
      },[auth])

      const  getUserProfile=async()=>{
        try{
          const response = await customaxios.get('profile/details/'+id+"/")
          if(response.status ===200 ){
            setProfile(response.data);
          }
        }
        catch(e){
          if(e.code === "ERR_NETWORK"){
            alert("You're not connected to Internet. Please Check your network Connection")
          }
          else{
            alert(e);
          }
        }
      }
    
      const  getPosts=async()=>{
        try{
          const response = await customaxios.get('post/user/'+id+"/")
    
          if(response.status ===200 && response.data.count > 0){
            setPosts(response.data.posts);
          }
        }
        catch(e){
          if(e.code === "ERR_NETWORK"){
            alert("You're not connected to Internet. Please Check your network Connection")
          }
          else{
            alert(e);
          }
        }
      }

      const CheckFollowing = async() =>{
        try{
            const response = await customaxios.get('friends/check/'+id+"/")
      
            if(response.status ===200 ){
              if(response.data.follow){
                setFollowId(response.data.id)
              }
            }
          }
          catch(e){
            if(e.code === "ERR_NETWORK"){
              alert("You're not connected to Internet. Please Check your network Connection")
            }
            else{
              alert(e);
            }
          }
      }

      const handleClick = async(check) =>{
        try{

            if(check){
                const response = await customaxios.post("friends/following/add/"+id+"/")
                if (response.status === 201){
                    setFollowId(response.data.id)
                }
            }
            else{
                const response =await customaxios.delete("friends/following/remove/"+followId+"/")
                if(response.status === 204){
                    setFollowId(null)
                }
            }
        }
        catch(e){
            if(e.code === "ERR_NETWORK"){
              alert("You're not connected to Internet. Please Check your network Connection")
            }
            else{
              alert(e);
            }
          }       
      }

    return (
        <>
        { profile && <div className="" style={{maxWidth: "900px"}}>
            <div className="d-flex justify-content-start">
             {!isDifferent && <ProfileEditDropdown id={id} />}
                {/* <i class="fas fa-ellipsis-v" aria-hidden="true" /> */}
            </div>
            <div className="px-3 text-center row no-gutters">
                <div className="col" >
                    <div>
                        { profile.profile_picture && 
                        <Avatar
                          src={profile.profile_picture}
                          height={120}
                          />}
                          { !profile.profile_picture && 
                          <Avatar
                            src="https://res.cloudinary.com/dnt7oro5y/image/upload/v1/default_profile_qdjgyp" 
                            height={120}
                          />}
                    </div>
                </div>
                <div className="col mt-2">
                <span><strong>{profile.full_name}</strong></span>
                <div className="justify-content-center no-gutters row mt-3">
                    <div className="col">
                        <div>{profile.posts_count}</div>
                        <div>post</div>
                    </div>
                    <div className="col">
                        <div>{profile.followers_count}</div>
                        <div>followers</div>
                    </div>
                    <div className="col">
                        <div>{profile.following_count}</div>
                        <div>following</div>
                    </div>
                </div>
                </div>
                <div className="col pt-2">
                {isDifferent && followId && <Button variant="danger" onClick={()=>{handleClick(false)}}>UnFollow</Button>}
                {isDifferent && !followId && <Button variant="info" onClick={()=>{handleClick(true)}}>Follow</Button>}{' '}
                </div>
            </div>
            <hr />
              <div className="d-flex justify-content-center">
                {profile.status}
                {!profile.status && <span>No Status</span>}
              </div>
            <hr />
            {posts && posts.map((post)=>{
                return(
                   <div className="my-4 row">
                      <div className="col">
                        <Post {...post} />
                      </div>
                    </div>
                      )
                    })}
            {posts.length === 0 && <div className="d-flex justify-content-center">
                <span>No Post added</span>
                </div>}
        </div>}
        </>
    )
}

export default Profile;