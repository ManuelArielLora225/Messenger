import React, { useEffect, useState } from 'react';
import { useIdContext } from "../../providers/usersIdProviders";
import { useFetchApi } from '../../api/apiFetch';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import '../../styles/Profile.css'

const Profile = () => {

    const { id } = useParams();
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const { request  } = useFetchApi("", token)
    const [statusFriends, setStatusFriends] = useState(null)
    const [requester, setRequester] = useState(null)

    console.log(id)


   //request of friend status
    const statusFriend = async () => {

        try{
   
           const res = await request({
            url:`https://api-messenger-g42w.onrender.com/api/friends/statusFriend/${id}`
           })

           if(res && res.status){
             setStatusFriends(res.status)
             setRequester(res.requester_id)
           }


        } catch(err) {
            console.error('Error de solicitud de estado de amigos', err);
        }
    }


    //request of userInfo
     useEffect(() => {

         statusFriend()
  
        axios.get(`https://api-messenger-g42w.onrender.com/api/users/profile/${id}`)
         .then(res => {
            setData(res.data)
         })
         .catch(err => {
            setError(err.message)
         })
         .finally(() => {
            setLoading(false)
         })

        

     },[id])



     //friend-buttom-functions

     const addFriend = async (e) => {
        e.preventDefault();

        try {

           const res = await request({
            url: 'https://api-messenger-g42w.onrender.com/api/friends/addFriend', 
            method: "POST",
            body: {
                friend_id: id
            }
        })
 
        if(res && res.message){
            alert(res.message)
            await statusFriend()
        } else {
            alert('Algo a salido mal')
        } 
 
        } catch(err) {
            console.error(`Error al enviar la solicitud: ${err}`)
            alert("No se pudo enviar la solicitud")
        }
        
     }
     
     const acceptFriend = async (e) => {
        e.preventDefault();

        try {

            const res = await request({
                url:`https://api-messenger-g42w.onrender.com/api/friends/requestFriend/${id}`,
                method: "POST",
                body: {
                    field: "status",
                    value: "Accepted"
                }
            })

            if(res && res.message){
                alert(res.message)
                await statusFriend()
            }

        } catch(err){
            console.error('Error al aceptar amigo', err)
            alert('No se pudo aceptar la solicitud')
        }

     }

        const rejectedFriend = async (e) => {
        e.preventDefault();

        try {

            const res = await request({
                url:`https://api-messenger-g42w.onrender.com/api/friends/requestFriend/${id}`,
                method: "POST",
                body: {
                    field: "status",
                    value: "rejected"
                }
            })
            
            if(res && res.message){
                alert(res.message)
                await statusFriend()
            }
        } catch(err){
            console.error('Error al aceptar amigo', err)
            alert('No se pudo aceptar la solicitud')
        }

     }


    const deleteFriend = async (e) => {
        e.preventDefault();

        try {
            
            const res = await request({
                url: `https://api-messenger-g42w.onrender.com/api/friends/deleteFriend/${id}`,
                method: "DELETE"
            })

            if(res && res.message){
                alert(res.message)
                await statusFriend()
            }
        } catch(err){
            console.error('Error al eliminar amigo', err)
            alert('No se pudo eliminar al amigo')
        } }

         const friendButtom = () => {

            if(!statusFriends) return <button className='agregar_amigo' onClick={addFriend}>Añadir amigo</button>

           if(statusFriends === 'Pending'){
            if(requester == userId){
                return <button className='boton-Enviado' disabled>Solicitud Enviada</button>
            } else {
                return (
                    <>
                <button className='boton_Aceptar_Solicitud' onClick={acceptFriend}>Aceptar Solicitud</button>
                <button className='boton_Rechazar_Solicitud' onClick={rejectedFriend}>Rechazar Solicitud</button>
                   </>
                )
            }

           }

           if(statusFriends === 'Accepted'){
            return <button className='boton_Eliminar_Amigo' onClick={deleteFriend}>Eliminar Amigo</button>
           }

           if(statusFriends === 'rejected'){
            return <button className='boton_rechazado' disabled>Solicitud Rechazada</button>
           }
                 }
           
  

     return (
        <div className='contenedor-general'>

            {loading && <div className='contenedor-cargando'><h2>Cargando...</h2></div>}

            {error && <div className='contenedor-error'><h2>{`Error: ${error}`}</h2></div>}

            {data && 
              
              <div className='contenedor-de-perfil'>
             
             <div className='contenedor-inicio-perfil'>
                <h1>{`${data.name} ${data.lastname}`}</h1>
                <h3>{data.mail}</h3>
                <p>{data.gender}</p>
             </div>

             <div className='contenedor-detalles-perfil'>
                <p>{`bio: ${data.bio}`}</p>
                <p>{`Telefono: ${data.phone_number}`}</p>
                <p>{`Sitio Web: ${data.web_site}`}</p>
                <p>{`Pais: ${data.country}`}</p>
                <p>{data.status}</p>
                <p>{`Cumpleaños: ${data.date_of_birth}`}</p>
            </div>
                

            <div className='contenedor-botones'>

                <div className='contenedor-boton-amistad'>
                    {friendButtom()}
                </div>


                <button className='boton-chat'>
                    💬 Chat
                </button>

            </div>

              </div>

            }

        </div>
     )


}


export default Profile