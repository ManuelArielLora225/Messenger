import { useState, useEffect } from "react"
import { useFetchApi } from "../../api/apiFetch"
import { useNavigate } from "react-router-dom"
import '../../styles/changePassword.css'

const ChangePassword = () => {

    const token = localStorage.getItem("token")

    const navigate = useNavigate()
    
    const [newPassword, setNewPassword] = useState({})

    const { request } =  useFetchApi("", token)

    useEffect(() => {
        
        const getPassword = async() => {

             const res = await request({
                url:"http://localhost:4000/api/users/password"
              })

              if(res){
                setNewPassword({
                    oldPassword: res.password
                })
              }  
        }

        getPassword()
    },[token])

    const createNewPassword = (e) => {
        setNewPassword({
            ...newPassword,
            [e.target.name]: e.target.value
        })
    }

    const updatePassword =async (e) => {
        e.preventDefault();

        if(newPassword.oldPassword !== newPassword.confirmOldPassword){
            alert('La contraseña anterior es incorrecta')
             return;
        }

        if(newPassword.password !== newPassword.confirmPassword){
            alert('La nueva contraseña y la confirmacion no coinciden')
             return;
        }

        const respond = await request({
            url: "http://localhost:4000/api/users/changePassword",
            method:"POST",
            body:
            {
               password: newPassword.password
            }
        })

        if(respond){
            alert('La contraseña se cambio exitosamente')
            setTimeout(() => {
                navigate('/Login')
            }, 2.5)
        } else {
            alert('Error al cambiar la contraseña')
            return;
        }
    }



    return (
        
        <div className="contenedor-general">

            <div className="contenedor-titulos">

                <h1>Cambiar la contraseña</h1>

            </div>

            <div className="contenedor-form">

                <form onSubmit={updatePassword}>

                    <label htmlFor="confirmOldPassword">Inserta la contraseña anterior</label>
                     <input type="password" id="confirmOldPassword" name="confirmOldPassword"
                      onChange={createNewPassword}/>

                    <label htmlFor="password">Inserta la nueva contraseña</label>
                     <input type="password" id="password" name="password"
                     onChange={createNewPassword}/>

                    <label htmlFor="confirmPassword">Confirma la contraseña</label>
                     <input type="password" id="confirmPassword" name="confirmPassword"
                     onChange={createNewPassword}/>

                    <input type='submit' value='Cambiar contraseña'/>

                </form>

            </div>

        </div>
        
    )


}   

export default ChangePassword