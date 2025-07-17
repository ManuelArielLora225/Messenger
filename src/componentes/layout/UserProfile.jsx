import { useFetchApi } from '../../api/apiFetch';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/UserProfile.css'


const UserProfile = () => {
  
   const token = localStorage.getItem("token");
   const navigate = useNavigate();

  const { data, error, loading, request } = useFetchApi("",token)

  console.log(data)

  const [deleteAcount, setDeleteAcount] = useState(null)


   useEffect(() => {
     request({
        url: "http://localhost:4000/api/users/profile"
     })
   },[])


   const editAccount = (e) => {
    e.preventDefault();
    navigate('/Layout/EditAccount')
    }

    const changePassword = (e) => {
    e.preventDefault();
    navigate('/Layout/changePassword')
    }


   const logOut = async (e) => {
    e.preventDefault();

    try {
   const res = await fetch("http://localhost:4000/api/users/logout", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
 
    if(res.ok){
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
       setTimeout(() => {
         navigate('/Login')
       },0.7) 
    } else {
        alert('Error al cerran sesion')
    }} catch (err) {
        alert(`Error al cerran sesion ${err}`)
    }
   }

   const deleteAccount = async (e) => {
    e.preventDefault();

    const confirm = window.confirm('Seguro quieres eliminar tu cuenta?')

    if(confirm){
    
  try{
    const res = await fetch("http://localhost:4000/api/users/delete", {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if(res){
      setDeleteAcount(res.message)
      setTimeout(() => {
        navigate('/Login')
      },0.7)
    } else {
        alert('Error al eliminar la cuenta')
    }

  } catch(err){
    alert( `Error al eliminar la cuenta ${err}`)
  }
      


    }

   }



    return (
        <div className='contenedor-general-userProfile'>
              
            {loading && <div className='contenedor-cargando-userProfile'><h2>Cargando...</h2></div>}

            {error && !data && <div className='contenedor-error-userProfile'><h2>{`Error: ${error}`}</h2></div>}

            {data && 
               <div className='contenedor-de-userProfile'>
             
             <div className='contenedor-inicio-userProfile'>
                <h1>{`${data[0].name} ${data[0].lastname}`}</h1>
                <h3>{data[0].mail}</h3>
                <p>{data[0].gender}</p>
             </div>

             <div className='contenedor-detalles-userProfile'>
                <p>{`bio: ${data[0].bio}`}</p>
                <p>{`Telefono: ${data[0].phone_number}`}</p>
                <p>{`Sitio Web: ${data[0].web_site}`}</p>
                <p>{`Pais: ${data[0].country}` }</p>
                <p>{data[0].status}</p>
                <p>{`Cumpleaños: ${data[0].date_of_birth.split("T")[0]}`}</p>
            </div>
                

            <div className='contenedor-botones-userProfile'>

             <button className='boton-edit' onClick={editAccount}>✏️ Edit</button>

            <button className='boton-changePasswordt' onClick={changePassword}>🔒 Cambiar Contraseña</button>

            <button className="boton-cerrarSesion" onClick={logOut}>📤 Cerrar Sesion</button>

            <button className="boton-eliminarCuenta" onClick={deleteAccount}>🗑️ Eliminar Cuenta</button>




            </div>

              </div>           
            
            }



        </div>
    )
}


export default UserProfile