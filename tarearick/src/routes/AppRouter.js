import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import CharacterDetails from "../Components/Character/CharacterDetails/CharacterDetails";
import Home from "../Pages/Home/Home";
import Home2 from "../Pages/Home2/Home2";
import LoginForm from "../Components/Forms/LoginForm";
import RegistroForm from "../Components/Forms/RegistroForm";
import UserListMemo from "../Components/Hooks/UserListMemo";
import UserListCallback from "../Components/Hooks/UserListCallback";
import UserListCombinado from "../Components/Hooks/UserListCombinado";
import UserList from "../Components/Hooks/UserList";
import AddColorForm from "../Components/Hooks/AddColorForm";

function AppRouter() {
  return (
    <>
      <div>
        <Link to="/">Main page</Link> | 
        <Link to="/custom">Custom Hook</Link> |  
        <Link to="/solo">User List</Link> | 
        <Link to="/memo">Memo Test</Link> | 
        <Link to="/callback">Callback Test</Link> | 
        <Link to="/combinado">Combinado Test</Link> | 
        <Link to="/home2">Home 2</Link>|{" "}
        <Link to="/page2">Page 2</Link>{" "}
        <Link to="/character/3">Character 3</Link>{" "}
        <Link to="/form1">Login</Link>{" "}
      </div>

      <Routes>
        
        <Route path="/home2" element={<Home2/>} />
        <Route path="/custom" element={<AddColorForm/>} />
        <Route path="/solo" element={<UserList/>} />

        <Route path="/memo" element={<UserListMemo/>} />
        <Route path="/callback" element={<UserListCallback/>} />
        <Route path="/combinado" element={<UserListCombinado/>} />

        <Route path="/page1" element={<h1>I'm Page 1</h1>} />
        <Route path="/" element={<Home/>} />
        <Route
            path="/character/:id"
            element={<CharacterDetails />}  
        />
        <Route
            path="/form1"
            element={<LoginForm />}  
        />
 
      </Routes>
    </>
  );
}

export default AppRouter;