import React, { useEffect, useId, useState } from 'react';
import { useIdContext } from "../../providers/usersIdProviders";
import { useFetchApi } from '../../api/apiFetch';
import axios from 'axios'

const Profile = () => {

    const { id } = useIdContext();
    const token = localStorage.getItem("token")
     

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const { request  } = useFetchApi("", token)
    const {solicitud, setSolicitud} = useState('Añadir')

     useEffect(() => {
  
        axios.get(`https://api-messenger-g42w.onrender.com/api/users/profile/${id}`)
         .then(res => {
            setData(res)
         })
         .catch(err => {
            setError(err.message)
         })
         .finally(() => {
            setLoading(false)
         })

     },[id])

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
            setSolicitud('Pendiente')
        } else {
            alert('Algo a salido mal')
        } 
 
        } catch(err) {
            console.error(`Error al enviar la solicitud: ${err}`)
            alert("No se pudo enviar la solicitud")
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

                <button className='boton-amigo'
                onClick={addFriend}>
                   {solicitud}
                </button>

                <button className='boton-chat'>
                    Chat
                </button>

            </div>

              </div>

            }

        </div>
     )


}


export default Profile