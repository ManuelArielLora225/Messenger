import { useState }  from 'react'
import { useFetchApi } from '../../api/apiFetch'


const Register = () => {

    const token = null
    const [response, setResponse] = useState({})
    const { data, error, loading, request } = useFetchApi('https://api-messenger-g42w.onrender.com/api/users/register', token)

    const createResponse = (e) => {
        setResponse({
            ...response,
            [e.target.name]: e.target.value
        })


    }

    const createAccount = async (e) => {
        e.preventDefault();

        if(response.password !== response.confirm_password) {
            alert('Las contraseñas no coinciden')
            return;
        }

        const respond = await request({
            method: "POST",
            body: response
        })
        
        console.log('Respuesta del servidor:', respond)
    }
    

    return (

        <div className='contenedor-register'>

        {!loading && !error &&
 
       <>
            <h1 className='titulo'>Registrar</h1>

             <form onSubmit={createAccount}>

                <label htmlFor='Nombre'>
                    <input type='text' id='Nombre' name='name' placeholder='Nombre'
                    onChange={createResponse}/>
                </label>

                <label htmlFor='Apellido'>
                    <input type='text' id='Apellido' name='lastname' placeholder='Apellido'
                    onChange={createResponse}/>
                </label>

                <label htmlFor='Correo'>
                    <input type='email' id='Correo' name='mail' placeholder='Correo'
                    onChange={createResponse}/>
                </label>

                <label htmlFor='Numero_de_telefono'>
                    <input type='text' id='Numero_de_telefono' name='phone_number' placeholder='Numero de telefono'
                    onChange={createResponse}/>
                </label>

                <label htmlFor='Contraseña'>
                    <input type='password' id='Contraseña' name='password' placeholder='Contraseña'
                    onChange={createResponse}/>
                </label>

                <label htmlFor='Repite_la_contraseña'>
                    <input type='password' id='Repite_la_contraseña' name='confirm_password' placeholder='Repite la contraseña'
                    onChange={createResponse}/>
                </label>

                <label htmlFor='Fecha_de_nacimiento'>
                    <input type='date' id='Fecha_de_nacimiento' name='date_of_birth' placeholder='Fecha_de_nacimiento'
                    onChange={createResponse}/>
                </label>

                <label htmlFor='Genero' className='label_Desplegable'>Selecciona tu Genero</label>
                <select id='Genero' name='gender' className='select' onChange={createResponse}>
                    <option value="male">Hombre</option>
                    <option value='female'>Mujer</option>
                    <option value='other'>Otro</option>
                </select>

                <label htmlFor='sitioWeb'>
                    <input type='text' id='sitioWeb' name='web_site' placeholder='Sitio web'
                    onChange={createResponse}/>
                </label>

                <input type='submit' value='Registrarse'/>

             </form>
         </>
            
        }

             {loading && <div className='contenedor-cargado'> <h1>Cargando...</h1> </div>}

             {error && <div className='contenedor-error'><h1>{error}</h1></div>}

             {data && <div className='contenedor-data'> <h1>Usuario Registrado Correctamente</h1></div>}

        </div>
    )
}

export default Register
