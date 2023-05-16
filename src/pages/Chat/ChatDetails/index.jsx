import React from "react"
import {useParams} from "react-router-dom";

const ChatDetails = () => {
  const params = useParams();
  
  return(
    <>
      <h1>ChatDetails</h1>
      <br/>
      <p>{params.chatId}</p>
    </>

  )
}

export default ChatDetails;