import { useState, useEffect } from 'react'
import { useFetchApi } from '../../api/apiFetch'
import { useNavigate } from 'react-router-dom'
import '../../styles/EditAccount.css'

const EditAccount = () => {

    const token = localStorage.getItem("token")
    const [updateData, setUpdateData] = useState({})
    const { data, loading, error, request } = useFetchApi("",token)
    const navegate = useNavigate()


    useEffect(() => {
        const fetchProfile = async() => {
      const res = await request({
        url: "http://localhost:4000/api/users/profile"
        })
        if(res){
            setUpdateData({
                name: res[0].name || '',
                lastname: res[0].lastname || '',
                mail: res[0].mail || '',
                bio: res[0].bio || '',
                date_of_birth: res[0].date_of_birth || '',
                gender: res[0].gender || '',
                phone_number: res[0].phone_number || '',
                web_site: res[0].web_site || '',
            })
        }
        }
        fetchProfile();
        

    },[])

    const updateDataProfile = (e) => {
      setUpdateData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }))
    } 

    const updateProfile = async (e) => {
        e.preventDefault();

        const respond = await request({
            url: "http://localhost:4000/api/users/update",
            method: "POST",
            body: updateData
        })

        if(respond){
            alert("Perfil actualizado")
          setTimeout(() => {
            navegate("/Layout/UserProfile")
          },3)
        } else {
            return;
        }

    }

    return(
        <div className='contenedor-general'>

            {error && !data && <div className='contenedor-error'><h1>{`Error: ${error}`}</h1></div>}

            <div className='contenedor-titulo'>
                <h1>Editar Perfil</h1>
            </div>

            <div className='contenedor-formulario'>

               <form onSubmit={updateProfile}>

                <label htmlFor='Nombre'>Cambia tu nombre</label>
                    <input type='text' id='Nombre' name='name' value={updateData.name} placeholder={`${updateData.name}`}
                    onChange={updateDataProfile}/>
               

                <label htmlFor='Apellido'>Cambia tu apellido</label>
                    <input type='text' id='Apellido' name='lastname' value={updateData.lastname} placeholder={`${updateData.lastname}`}
                    onChange={updateDataProfile}/>

                <label htmlFor='Correo'>Cambia tu correo</label>
                    <input type='email' id='Correo' name='mail' value={updateData.mail} placeholder={`${updateData.mail}`}
                    onChange={updateDataProfile}/>
                

                <label htmlFor='Numero_de_telefono'>Cambia tu numero de telefono</label>
                    <input type='text' id='Numero_de_telefono' name='phone_number' value={updateData.phone_number} placeholder={`${updateData.phone_number}`}
                    onChange={updateDataProfile}/>
                

                <label htmlFor='Fecha_de_nacimiento'>Selecciona otra fecha de nacimiento </label>
                    <input type='date' id='Fecha_de_nacimiento' name='date_of_birth' value={updateData.date_of_birth} placeholder={`${updateData.date_of_birth}`}
                    onChange={updateDataProfile}/>
              

                <label htmlFor='Genero' className='label_Desplegable'>Cambia tu Genero</label>
                <select id='Genero' name='gender' className='select' value={updateData.gender} onChange={updateDataProfile}>
                    <option value="male">Hombre</option>
                    <option value='female'>Mujer</option>
                    <option value='other'>Otro</option>
                </select>

                <label htmlFor='sitioWeb'>Inserta tu nuevo sitio Web</label>
                    <input type='text' id='sitioWeb' name='web_site' value={updateData.web_site} placeholder={`${updateData.web_site}`}
                    onChange={updateDataProfile}/>
                

                <input type='submit' value='Actualizar Perfil'/>

             </form>

            </div>
        </div>
    )

}

export default EditAccount