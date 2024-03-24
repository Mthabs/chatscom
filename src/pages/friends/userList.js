import ListGroup from 'react-bootstrap/ListGroup';
import styles from "../../styles/Avatar.module.css";
import "../../styles/Cross.module.css"
import { customaxios } from '../../api/axiosDefaults';


const UserList = ({data, underFlowMessage, accept, reject, handleAccept}) => {

  const rejectHandle = async(followId) => {
    const response =await customaxios.delete("friends/following/remove/"+followId+"/")
    if(response.status === 204){
      document.location.reload()  
    }
  }
    return(
        <>
        <ListGroup variant="flush">
        { data.map((relation)=>{
          const {id, profile_picture, full_name} = relation.user
          return(
            <ListGroup.Item>
              <div className='d-flex justify-content-between'>
                <div className='d-flex'>
                  {!profile_picture && <img src='https://res.cloudinary.com/dnt7oro5y/image/upload/v1/default_profile_qdjgyp'  className={styles.Avatar}  alt="Profile Picture" style={{ width: '50px', height: '50px', marginRight: '10px' }}  /> }
                  {profile_picture && <img src={profile_picture} alt="Profile Picture" className={styles.Avatar} style={{ width: '50px', height: '50px', marginRight: '10px' }} /> }
                  <a href={'/profile/' + id} ><span className='mt-2'>{full_name}</span></a>
                </div>
                <div className='d-flex'>
                  {accept && <span onClick={()=>{handleAccept(relation.id)}}><i className="fas fa-check-circle" /></span>}
                  {reject && <span onClick={()=>{rejectHandle(relation.id)}}><i className="fas fa-times fa-stack-x" /></span>}
                </div>
              </div>
            </ListGroup.Item>
          )
        })}
    </ListGroup>
    { data.length === 0 && <span> { underFlowMessage } </span> }
    </>
    )
}
export default UserList;