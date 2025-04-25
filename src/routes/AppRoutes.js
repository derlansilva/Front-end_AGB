

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from "../pages/login/Login";
import Manifest from "../pages/manifest/Manifest";
import Product from "../pages/products/Products";
import Conference from "../pages/conference/Conference";
import User from "../pages/user/Users";
import Test from "../pages/Test";
import Home from "../pages/home/Home";

//const root = ReactDOM.createRoot(document.getElementById('root'));


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home/>} >

                    <Route path="/home/manifest" element={<Manifest />} />
                    <Route path="/home/products" element={<Product />} />
                    <Route path="/home/conference" element={<Conference/>}/>
                    <Route path="home/user" element={<User/>}/>
                    <Route path="home/test" element={<Test/>}/>
                </Route>

            </Routes>
        </Router>
    )
}

export default AppRoutes;