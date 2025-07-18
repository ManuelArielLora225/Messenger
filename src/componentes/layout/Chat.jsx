import { useState, useEffect} from 'react'
import { useFetchApi } from '../../api/apiFetch'
import { useParams } from 'react-router-dom'


const Chat = () => {

  const token = localStorage.getItem("token")
  const {reciever_id} = useParams();
  const { data, error, loading, request  } = useFetchApi("", token)

   useEffect(() => {
      request({
      url: "http://localhost:4000/api/messages/getMessage/:reciever_id",
     })

  },[reciever_id])


  return( 
    <div className='contenedor-general-chat'>
      
    </div>
  )

}


export default Chat