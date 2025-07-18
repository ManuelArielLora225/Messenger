import { useEffect, useState } from 'react';
import { useFetchApi } from '../../api/apiFetch';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../../styles/Profile.css'

const Profile = () => {

    const { id } = useParams();
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")    
    const navigate = useNavigate();

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const { request  } = useFetchApi("", token)
    const [statusFriends, setStatusFriends] = useState(null)
    const [requester, setRequester] = useState(null)


   //request of friend status
    const statusFriend = async () => {

        try{
   
           const res = await request({
            url:`http://localhost:4000/api/friends/statusFriend/${id}`
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
        setData(null)
        setError(null)
        setRequester(null)
        setStatusFriends(null)

         statusFriend()
  
        axios.get(`http://localhost:4000/api/users/profile/${id}`)
         .then(res => {
            setData(res.data[0])
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
            url: 'http://localhost:4000/api/friends/addFriend', 
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
                url:`http://localhost:4000/api/friends/acceptFriend/${id}`,
                method: "POST"
            })

            if(res && res.message){
                alert('Solicitud de amistar aceptada')
                await statusFriend()
            }

        } catch(err){
            console.error('Error al aceptar amigo', err)
            alert('No se pudo aceptar la solicitud')
        }

        console.log(statusFriends)

     }

        const rejectedFriend = async (e) => {
        e.preventDefault();


        try {

            const res = await request({
                url:`http://localhost:4000/api/friends/rejectFriend/${id}`,
                method: "POST"
            })
            
            if(res && res.message){
                alert('Solicitud de amistad rechazada')
                await statusFriend()
            }
        } catch(err){
            console.error('Error al aceptar amigo', err)
            alert('No se pudo aceptar la solicitud')
        }
     }


    const deleteFriend = async (e) => {
        e.preventDefault();

        const confirmado = window.confirm('Seguro quieres eliminar este amigo?')

        if(confirmado) {
            
        try {
            
        const res = await request({
                url: `http://localhost:4000/api/friends/deleteFriend/${id}`,
                method: "DELETE"
            })

            if(res && res.message){
                alert(res.message)
                await statusFriend()
            }
        } catch(err){
            console.error('Error al eliminar amigo', err)
            alert('No se pudo eliminar al amigo')
        } 

        } else {
            
            return
        }

    }

         const friendButtom = () => {

            if(statusFriend === null) return null;

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
                <a href={`mailto:${data.mail}`}><h3>{data.mail}</h3></a>
                <p>{data.gender}</p>
             </div>

             <div className='contenedor-detalles-perfil'>
                <p>{`bio: ${data.bio}`}</p>
                <p>{`Telefono: ${data.phone_number}`}</p>
                <p>{`Sitio Web: ${data.web_site}`}</p>
                <p>{`Pais: ${data.country}`}</p>
                <p>{data.status}</p>
                <p>{`Cumpleaños: ${data.date_of_birth.split("T")[0]}`}</p>
            </div>
                

            <div className='contenedor-botones'>

                <div className='contenedor-boton-amistad'>
                    {friendButtom()}
                </div>


                <button className='boton-chat' onClick={() => { navigate(`/Layout/Chat/${data.id}`)}}>
                    💬 Chat
                </button>

            </div>

              </div>

            }

        </div>
     )


}


export default Profile