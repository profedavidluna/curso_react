import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import CharacterDetails from "../Components/Character/CharacterDetails/CharacterDetails";
import Home from "../Pages/Home/Home";
import Home2 from "../Pages/Home2/Home2";

function AppRouter() {
  return (
    <>
      <div>
        <Link to="/">Main page</Link> | 
        <Link to="/home2">Home 2</Link>|{" "}
        <Link to="/page2">Page 2</Link>
        <Link to="/character/3">Character 3</Link>
      </div>

      <Routes>
        
        <Route path="/home2" element={<Home2/>} />
        <Route path="/page1" element={<h1>I'm Page 1</h1>} />
        <Route path="/" element={<Home/>} />
        <Route
            path="/character/:id"
            element={<CharacterDetails />}  
        />
      </Routes>
    </>
  );
}

export default AppRouter;