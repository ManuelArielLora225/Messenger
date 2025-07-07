import { useState } from "react"
import { useFetchApi } from "../../api/apiFetch"
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";


const Sidebar = () => {

     const token = localStorage.getItem("token");
     const { request } = useFetchApi("", token)


    const [usersOnline, setUsersOnline] = useState([])
    const [friends, setFriends] = useState([])
    const [Pending, setPending] = useState([])

    const [showUsersOnline, setShowUsersOnline] = useState(false)
    const [showFriends, setShowFriends] = useState(false)
    const [ShowPending, setShowPending] = useState(false)



    const usersOnlineList = async (e) => {
        e.preventDefault();
        
      const res = await request({url: "https://api-messenger-g42w.onrender.com/api/users/usersOnline"})

       setUsersOnline(res)

       setShowUsersOnline(prev => !prev)

       console.log(res)

    }

    const friendsOnlineList = async (e) => {
        e.preventDefault();

        const res =  await request({url: "https://api-messenger-g42w.onrender.com/api/friends/friendsAccepted" })

        setFriends(res)

        setShowFriends(prev => !prev)
    }

    const pendingFriendsList = async (e) => {
        e.preventDefault();

        const res =  await request({url: "https://api-messenger-g42w.onrender.com/api/friends/friendsPending" })

        setPending(res)

        setShowPending(prev => !prev)
    }

    return (
        
        <div className="contenedor-sidebar">

            <div className="contenedor-icon-profile">
                <NavLink to='/Profile' className='icono-perfil'><CgProfile/></NavLink>
                <p className="titulo-perfil">Perfil</p>
            </div>

            <div className="contenedor-opciones">

                <h3 className="cabecera-usuarios-online"
                onClick={usersOnlineList}>Users Online</h3>

                {showUsersOnline &&
                    <div className="contenedor-users">
                        {usersOnline.map(user => (
                            <div key={user.id} className="contenedor-user-online">
                            <p className="name">{user.name + ' ' + user.lastname}</p>
                            <p className="status">{user.status}</p>
                            <p className="country">{usersOnline.country}</p>
                            </div>
                        ))}
                    </div>
                }

                <h3 className="cabecera-amigos-online"
                onClick={friendsOnlineList}>Friends</h3>

                {showFriends &&
                    <div className="contenedor-users">
                        {friends.map(user => (
                            <div key={user.id} className="contenedor-user-online">
                            <p className="name">{user.name + ' ' + user.lastname}</p>
                            <p className="status">{user.status}</p>
                            <p className="country">{usersOnline.country}</p>
                            </div>
                        ))}
                    </div>
                }

                <h3 className="cabecera-amigos-online"
                onClick={pendingFriendsList}>Friends Pending</h3>

                {ShowPending &&
                    <div className="contenedor-users">
                        {Pending.map(user => (
                            <div key={user.id} className="contenedor-user-online">
                            <p className="name">{user.name + ' ' + user.lastname}</p>
                            <p className="status">{user.status}</p>
                            <p className="country">{usersOnline.country}</p>
                            </div>
                        ))}
                    </div>
                }



            </div>

        </div>
    )
 
}


export default Sidebar