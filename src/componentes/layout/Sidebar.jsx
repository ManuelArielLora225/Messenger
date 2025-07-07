import { useState } from "react"
import { useFetchApi } from "../../api/apiFetch"
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";


const Sidebar = () => {

     const token = localStorage.getItem("token");
     const { data, loading, error, request } = useFetchApi("", token)


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
                <NavLink to='/Profile'><CgProfile className='icono-perfil'/></NavLink>
                <p className="titulo-perfil">Perfil</p>
            </div>

            <div className="contenedor-opciones">

                <h3 className="cabecera-usuarios-online"
                onClick={usersOnlineList}>Users Online</h3>

                {showUsersOnline &&
                    <div className="contenedor-users">
                        {data.map(user => (
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