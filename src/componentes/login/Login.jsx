import { useState } from "react";
import { useFetchApi } from '../../api/apiFetch'
import { Link, useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import '../../styles/Login.css'

const Login = () => {

    const [account, setAccount] = useState(null)
    const { data, error, loading, request } = useFetchApi('https://api-messenger-g42w.onrender.com/api/users/login', null)
    const navigate = useNavigate();

    const createLogin = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value
        })
    }

    const signIn = async (e) => {
       e.preventDefault();

       const res = await request({
        method: "POST",
        body: account
       })

       if(res && res.token){

         localStorage.setItem("token", res.token);
         
         const decoded = jwtDecode(res.token);
         localStorage.setItem("userId", decoded.id)

       } else {
        alert('No se a guardado la verificacion se inicio de sesion')
        return;
       }

       setAccount(null)

       navigate('/Layout')
    }

    return (

        <div className="contenedor-login">

            <h1 className="titulo">Iniciar Sesion</h1>

              <p>Conecta con tus amigos</p>

            <div className="contenedor-form">

                <form onSubmit={signIn}>

                    <label htmlFor="Correo">
                        <input type="email" id="Correo" name="mail" placeholder="Correo" 
                        onChange={createLogin}/>
                    </label>

                    <label htmlFor="Contraseña">
                        <input type="password" id="Contraseña" name="password" placeholder="Contraseña"
                        onChange={createLogin}/>
                    </label>

                    <input type="submit" value="Iniciar Sesion"/>
  
                </form>

                <Link to='/Register' className="boton-registrarse">
                    <h3>Registrarme</h3>
                </Link>

            </div>

            {loading && <div className="contenedor-cargando"> <h1 className="titulo-cargnado">Cargando...</h1> </div>}

            {error && <div className="contenedor-error"> <h1 className="titulo-cargnado">{error}</h1> </div>}

            {data && <div className="contenedor-exitoso"><p>{`Login exitoso. token: ${data.token}`}</p></div>}




        </div>
    )
}

export default Login