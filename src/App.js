import Register from "./componentes/login/Register";
import Login from "./componentes/login/Login";
import Layout from "./componentes/layout/Layout";
import Profile from "./componentes/layout/Profile";
import UserProfile from "./componentes/layout/UserProfile";
import Chat from "./componentes/layout/Chat";
import EditAccount from "./componentes/layout/EditAccount"
import ChangePassword from "./componentes/layout/changePassword"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
     <div className="App">

    <BrowserRouter>
 
    <Routes>

     <Route path="/Login" element={<Login />} />
     <Route path="/Register" element={<Register/>} />

     <Route path="/Layout" element={<Layout />}>
       <Route path="Profile/:id" element={<Profile />} />
      <Route path="UserProfile" element={<UserProfile />} />
      <Route path="Chat/:reciever_id" element={<Chat />} />
      <Route path="EditAccount" element={<EditAccount />} />
      <Route path="ChangePassword" element={<ChangePassword/>} />
     </Route>

    </Routes>
    
    </BrowserRouter>

    </div>
  );
}

export default App;
