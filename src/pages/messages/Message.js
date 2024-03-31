import { useState } from "react";
import { customaxios } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import FormLayout from "./FormLayout";
import Avatar from "../../components/Avatar";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { beautifyTime } from "../../components/timeformatter";


const Message = ({ message, fetchMessagesList, fetchreceipientList}) => {
      const [editForm, setEditForm] = useState(false);

      const handleDelete = async() =>{
        const response = await customaxios.delete('messages/detail/'+message.id+"/")
        if(response.status === 204){
          fetchMessagesList()
          fetchreceipientList()
        }
    }
    
    const handleSubmit = async(values)=>{
      const formData = new FormData()
      formData.append("message", values.update)
      const response = await customaxios.patch('messages/detail/'+message.id+"/", formData)
      if(response.status === 206){
        setEditForm(false);
        fetchMessagesList()
        fetchreceipientList()
      }
    }
    return(
        <>
        {!editForm && <OverlayTrigger
          key={message.id}
          placement="right"
          overlay={
            <Tooltip id={'tooltip-top'}>
             {beautifyTime(message.created)}
            </Tooltip>
          }
        >
            <div key={message.id} className={message.self ? 'chat-message user d-flex justify-content-between': 'chat-message other'}>
              <div className={message.self? "col-md-11 d-flex justify-content-end":"d-flex justify-content-start"}>
              {message.self && <p> {message.message}</p> }
             {!message.self && message.sender.profile_picture &&<Avatar src={message.sender.profile_picture} text={message.message} height={25} /> }
             {!message.self && !message.sender.profile_picture && <Avatar src="https://res.cloudinary.com/dnt7oro5y/image/upload/v1/default_profile_qdjgyp" text={message.message} height={25} /> }
              </div>
              <div className="col">
              {message.self && !message.is_deleted && <MoreDropdown
                  handleEdit={() => setEditForm(true)}
                  handleDelete={() => handleDelete()}
              />}
              </div>  
            </div>  
        </OverlayTrigger>}
          
            {editForm && <FormLayout message={message.message} name="update" onSubmit={handleSubmit} />}
          </>
    )
}

export default Message;