import { useState, useEffect } from "react"
import { useFetchApi } from "../../api/apiFetch"

const ChangePassword = () => {
    const token = localStorage.getItem('token')
    const [newPassword, setNewPassword] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const { request } = useFetchApi('', token)


    const createNewPassword = (e) => {
        setNewPassword({
            ...newPassword,
            [e.target.name]: e.target.value
        })

        setTimeout(() => {

        })
    }




    return (
        <div className="contenedor-general">
            <div className="contenedor-titulos">
                <h1>Cambiar la contraseña</h1>
            </div>
            <div className="contenedor-form">
                <form>
                    <label htmlFor="oldPassword">Inserta la contraseña anterior</label>
                     <input type="password" id="oldPassword" name="oldPassword"
                     onChange={createNewPassword}/>

                    <label htmlFor="password">Inserta la contraseña anterior</label>
                     <input type="password" id="password" name="password"
                     onChange={createNewPassword}/>

                    <label htmlFor="confirmPassword">Inserta la contraseña anterior</label>
                     <input type="password" id="confirmPassword" name="confirmPassword"
                     onChange={createNewPassword}/>

                    <input type='submit' value='Cambiar contraseña'/>

                </form>
            </div>
        </div>
    )


}

export default ChangePassword