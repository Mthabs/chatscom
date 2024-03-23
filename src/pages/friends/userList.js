import ListGroup from 'react-bootstrap/ListGroup';
import styles from "../../styles/Avatar.module.css";


const UserList = ({data, underFlowMessage}) => {
    return(
        <>
        <ListGroup variant="flush">
        { data.map((user)=>{
          return(
            <ListGroup.Item>
              <div className='d-flex'>
                {!user.profile_picture && <img src='https://res.cloudinary.com/dnt7oro5y/image/upload/v1/default_profile_qdjgyp'  className={styles.Avatar}  alt="Profile Picture" style={{ width: '50px', height: '50px', marginRight: '10px' }}  /> }
                {user.profile_picture && <img src={user.profile_picture} alt="Profile Picture" className={styles.Avatar} style={{ width: '50px', height: '50px', marginRight: '10px' }} /> }
                <a href={'/profile/' + user.id} ><span className='mt-2'>{user.full_name}</span></a>
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