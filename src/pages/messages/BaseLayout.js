import  '../../styles/chat.css'
import SideNav from './SideNav';
import FormLayout from './FormLayout';
import { useState } from 'react';
import { useEffect } from 'react';
import { customaxios } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { reset } from 'redux-form';
import { useDispatch } from 'react-redux';
import Message from '../messages/Message';
import { beautifyTime } from '../../components/timeformatter';

const Messages = () => {
  const authUser = JSON.parse(sessionStorage.getItem("user"))
  const [receipientList, setRecipientList]= useState([]);
  const [chat, setChat] = useState(null);
  const [messageList, setMessageList] =useState(null);
  const dispatch = useDispatch()

  useEffect(()=>{
    fetchreceipientList();
  },[])

  useEffect(()=>{
    if(chat){
      fetchMessagesList()
    }
  },[chat])

  const fetchreceipientList = async() => {
    try{
      const response = await customaxios.get('messages/receipients/')

      if(response.status ===200){
        setRecipientList(response.data);
      }
    }
    catch(e){
      if(e.code === "ERR_NETWORK"){
        alert("You're not connected to Internet. Please Check your network Connection")
      }
      else if(e.response.status === 404){
        setRecipientList([]);
      }
      else{
        alert(e);
      }
  }}

  const fetchMessagesList = async() => {
    try{
      const response = await customaxios.get("messages/"+chat.id+"/")

      if(response.status ===200){
        setMessageList(response.data);
      }
    }
    catch(e){
      if(e.code === "ERR_NETWORK"){
        alert("You're not connected to Internet. Please Check your network Connection")
      }
      else if(e.response.status === 404){
        setMessageList([]);
      }
      else{
        alert(e);
      }
  }
}

  const handleSetChat = (object) =>{
    setChat(object);
  }

  const handleSubmit = async(values) => {
    const formdata = new FormData()
    formdata.append("message", values.message)
    formdata.append("chat", chat.id)
    formdata.append("receiver", chat.user.id)
    formdata.append("sender", authUser.id)
    console.log(formdata)
    const response = await customaxios.post("messages/"+chat.id+"/", formdata)
    if(response.status === 201){
      dispatch(reset("usermessage"))
      fetchMessagesList();
      fetchreceipientList();
    }
  }


    return (
        <>
        <div className="chat-layout">
        <SideNav  selectedChat={chat} receipientList={receipientList} handleSetChat={handleSetChat} />

   {/* Right Main Section - Display Chat */}
      <div className="main">
        {/* Header - Display selected chat */}
        <div className="chat-header">
          {chat && chat.user.profile_picture && <Avatar src={chat.user.profile_picture} height="60" text={chat.user.full_name} />}
          {chat && !chat.user.profile_picture && <Avatar src="https://res.cloudinary.com/dnt7oro5y/image/upload/v1/media/../default_profile_qdjgyp" height="60" text={chat.user.full_name} />}
          {chat && <p className="last-seen">{beautifyTime(chat.user.last_seen)}</p>}
          {!chat && <h3>No Chat Selected</h3>}
        </div>

        {/* Chat area */}
        <div className="chat-area">
          {/* Render chat messages */}
          { messageList && messageList.map((message)=>{
            return(
              <Message message={message} fetchMessagesList={fetchMessagesList} fetchreceipientList={fetchreceipientList} />
            )
          })}
          {chat && <FormLayout name="message" onSubmit={handleSubmit} />}
        </div>
        
      </div>
          {/* If no chat is selected, display a message */}
          {!chat && (
            <div className="no-chat-selected">
              <p>Select a chat to start messaging</p>
            </div>
          )}
          
    </div>
        </>
    );

}

export default Messages;