import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Avatar from "../../components/Avatar";
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect } from 'react';
import { customaxios } from "../../api/axiosDefaults";
import { beautifyTime } from "../../components/timeformatter";
import styles from "../../styles/Avatar.module.css";


const SideNav = (props) => {
    const{ selectedChat, receipientList, handleSetChat} = props
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await customaxios.get('/friends/search/', {
              params: { query: searchQuery },
            });
    
            setUsers(response.data);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
        if(searchQuery !== ''){
          fetchUsers();
        }
      }, [searchQuery]);

      const handleUserClick = async (id) =>{
        const response = await customaxios.post('messages/add/person/'+id+'/')
        if(response.status === 200 || response.status === 201){
            handleClose()
            handleSetChat(response.data)
            // document.location.reload()
        }
      }

    return(
        <>
        <div className="sidebar">
        <h2>Messages</h2>
        <ul>
            {receipientList.map(instance => (
            <li key={instance.id} className={selectedChat && selectedChat.id === instance.id ? 'active' : ''} onClick={()=>{handleSetChat({id:instance.id, user:instance.user})}}>
                {instance.user.profile_picture && <Avatar src={instance.user.profile_picture} text={instance.user.full_name} />}
                {!instance.user.profile_picture && <Avatar src="https://res.cloudinary.com/dnt7oro5y/image/upload/v1/media/../default_profile_qdjgyp" text={instance.user.full_name} />}
                {instance.last_message && <div className="chat-info ml-5">
                {instance.last_message.seen && <p className="last-message">{instance.last_message.text}</p>}
                {!instance.last_message.seen && <p className="last-message"><strong>{instance.last_message.text}</strong></p>}
                <p className="message-time">{beautifyTime(instance.last_message.sent)}</p>
                </div>}
            </li>
            ))}
        </ul>
        <div className="d-flex justify-content-end">
        <Button variant="success" onClick={handleShow}>New</Button>
        </div>
        </div>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Message People</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                    type="email"
                    placeholder="Enter Name, Email, Username to search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                />
                </Form.Group>
            </Form>
            <div style={{height:"200px"}}>
            <ListGroup variant="flush">
                { data.map((user)=>{
                const {id, profile_picture, full_name} = user
                return(
                    <ListGroup.Item>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex' onClick={()=>{handleUserClick(id)}}>
                        {!profile_picture && <img src='https://res.cloudinary.com/dnt7oro5y/image/upload/v1/default_profile_qdjgyp'  className={styles.Avatar}  alt="Profile Picture" style={{ width: '50px', height: '50px', marginRight: '10px' }}  /> }
                        {profile_picture && <img src={profile_picture} alt="Profile Picture" className={styles.Avatar} style={{ width: '50px', height: '50px', marginRight: '10px' }} /> }
                        <span className='mt-2' style={{color:'purple'}}>{full_name}</span>
                        </div>
                    </div>
                    </ListGroup.Item>
                )})}
            </ListGroup>
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default SideNav;