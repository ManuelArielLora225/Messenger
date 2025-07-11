import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar";
import '../../styles/Layout.css'


const Layout = () => {

return (

    <div className="layout-container">
       <Sidebar />
    <div className="content-contaider">
        <Outlet />
    </div>
 </div>


  
)
    
}


export default Layout