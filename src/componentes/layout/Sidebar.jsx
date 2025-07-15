import { useState } from "react"
import { useFetchApi } from "../../api/apiFetch"
import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import '../../styles/Sidebar.css'


const Sidebar = () => {

     const token = localStorage.getItem("token");
     const { request } = useFetchApi("", token)
     const navegate = useNavigate();


    const [usersOnline, setUsersOnline] = useState([])
    const [usersOffline, setUsersOffline] = useState([])
    const [friends, setFriends] = useState([])
    const [pending, setPending] = useState([])

    const [showUsersOnline, setShowUsersOnline] = useState(false)
    const [showUsersOffline, setShowUsersOffline] = useState(false)
    const [showFriends, setShowFriends] = useState(false)
    const [ShowPending, setShowPending] = useState(false)

    


    const usersOnlineList = async (e) => {
        e.preventDefault();
        
      const res = await request({url: "http://localhost:4000/api/users/usersOnline "})

       setUsersOnline(res)

       setShowUsersOnline(prev => !prev)

    }

    
    const usersOfflineList = async (e) => {
        e.preventDefault();
        
      const res = await request({url: "http://localhost:4000/api/users/usersOffline "})

       setUsersOffline(res)

       setShowUsersOffline(prev => !prev)

    }

    const friendsOnlineList = async (e) => {
        e.preventDefault();

        const res =  await request({url: "http://localhost:4000/api/friends/friendsAccepted" })

        setFriends(res)

        setShowFriends(prev => !prev)
    }

    const pendingFriendsList = async (e) => {
        e.preventDefault();

        const res =  await request({url: "http://localhost:4000/api/friends/friendsPending" })

        setPending(res)

        setShowPending(prev => !prev)
    }

    return (
        
        <div className="contenedor-sidebar">

            <NavLink to = "UserProfile"><div className="contenedor-icon-profile">
                <div className='icono-perfil'><CgProfile/></div>
                <p className="titulo-perfil">Perfil</p>
            </div></NavLink>

            <div className="contenedor-opciones">

                <h3 className="cabecera-usuarios-online"
                onClick={usersOnlineList}>Usuarios Online</h3>

                {showUsersOnline &&
                    <div className="contenedor-users">
                        {usersOnline.map(user => (
                            <div key={user.id} className="contenedor-user-online" onClick={() => {navegate(`/Layout/Profile/${user.id}`)}}>
                            <p className="name">{user.name + ' ' + user.lastname}</p>
                            <p className="status">{user.status}</p>
                            <p className="country">{user.country}</p>
                            </div>
                        ))}
                    </div>
                }

                <h3 className="cabecera-amigos-online"
                onClick={friendsOnlineList}>Amigos</h3>

                {showFriends &&
                    <div className="contenedor-users">
                        {friends.map(user => (
                            <div key={user.id} className="contenedor-user-online" onClick={() => {navegate(`/Layout/Profile/${user.id}`)}}>
                            <p className="name">{user.name + ' ' + user.lastname}</p>
                            <p className="status">{user.status}</p>
                            <p className="country">{user.country}</p>
                            </div>
                        ))}
                    </div>
                }

                <h3 className="cabecera-amigos-online"
                onClick={pendingFriendsList}>Pendientes</h3>

                {ShowPending &&
                     <div className="contenedor-users">
                        {pending.map(user => (
                            <div key={user.id} className="contenedor-user-online" onClick={() => {navegate(`/Layout/Profile/${user.id}`)}}>
                            <p className="name">{user.name + ' ' + user.lastname}</p>
                            <p className="status">{user.status}</p>
                            <p className="country">{user.country}</p>
                            </div>
                        ))}
                    </div>
                }

                <h3 className="cabecera-usuarios-online"
                onClick={usersOfflineList}>Usuarios Offline</h3>

                {showUsersOffline &&
                    <div className="contenedor-users">
                        {usersOffline.map(user => (
                            <div key={user.id} className="contenedor-user-online" onClick={() => {navegate(`/Layout/Profile/${user.id}`)}}>
                            <p className="name">{user.name + ' ' + user.lastname}</p>
                            <p className="status">{user.status}</p>
                            <p className="country">{user.country}</p>
                            </div>
                        ))}
                    </div>
                }



            </div>

        </div>
    )
 
}


export default Sidebar