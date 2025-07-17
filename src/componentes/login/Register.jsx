import { useState }  from 'react'
import { useFetchApi } from '../../api/apiFetch'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../../styles/Register.css'


const Register = () => {

    const token = null
    const [response, setResponse] = useState
    ({
     name: "",
     lastname: "",
     mail: "",
     password: "",
     bio: "",
    date_of_birth: "",
    gender: "",
     phone_number: "",
     web_site: ""
    })
    const [confirmPasswords, setConfirmPasswords] = useState({})
    const { data, error, loading, request } = useFetchApi('http://localhost:4000/api/users/register', token)
    const navigate = useNavigate()

    const createConfirmPassword = (e) => {
        setConfirmPasswords({
            ...confirmPasswords,
            [e.target.name]: e.target.value
        })
    }

    const createResponse = (e) => {
        setResponse({
            ...response,
            [e.target.name]: e.target.value
        })

    }

    const createAccount = async (e) => {
        e.preventDefault();

        if(confirmPasswords.password !== confirmPasswords.confirm_password) {
            alert('Las contraseñas no coinciden')
            return;
        }

        if (!/^\d+$/.test(response.phone_number)) {
       alert("El número de teléfono solo debe contener números.");
        return;
        }

        if(Object.values(response).some(value => value === "")){
            alert('Todos los campos deben ser llenados')
            return;
        }

        const respond = await request({
            method: "POST",
            body: response
        })

        console.log(response)
        if(respond){
            navigate('/Login')
        } else {
            alert('Error al registrar')
        }
        

    }
    
    return (

        <div className='contenedor-register'>

        {!loading && !error &&
 
       <div className='sub-contenedor-register'>
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

                <label htmlFor='bio'>
                    <input type='text' id='bio' name='bio' placeholder='A que te dedicas?'
                    onChange={createResponse}/>
                </label>

                <label htmlFor='Contraseña'>
                    <input type='password' id='Contraseña' name='password' placeholder='Contraseña'
                    onChange={(e) => {createResponse(e); createConfirmPassword(e)}}/>
                </label>

                <label htmlFor='Repite_la_contraseña'>
                    <input type='password' id='Repite_la_contraseña' name='confirm_password' placeholder='Repite la contraseña'
                    onChange={createConfirmPassword}/>
                </label>

                <label htmlFor='Fecha_de_nacimiento'>Inserta tu fecha de nacimiento</label>
                    <input type='date' id='Fecha_de_nacimiento' name='date_of_birth' placeholder='Fecha_de_nacimiento'
                    onChange={createResponse}/>

                <label htmlFor='Genero' className='label_Desplegable'>Selecciona tu Genero</label>
                <select id='Genero' name='gender' className='select' onChange={createResponse}>
                    <option value="">Selecciona el Genero</option>
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

                <Link to='/Login' className="boton-registrarse">
                    <h3>Inicar Sesion</h3>
                </Link>
         </div>
            
        }

             {loading && <div className='contenedor-cargado'> <h1>Cargando...</h1> </div>}

             {error && <div className='contenedor-error'><h1>{error}</h1></div>}

             {data && <div className='contenedor-data'> <h1>Usuario Registrado Correctamente</h1></div>}

        </div>
    )
}

export default Register
