

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "../pages/Home";
import Login from "../pages/Login";
import Manifest from "../pages/Manifest";
import Product from "../pages/Products";
import Conference from "../pages/Conference";
import User from "../pages/Users";

//const root = ReactDOM.createRoot(document.getElementById('root'));


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} >

                    <Route path="manifest" element={<Manifest />} />
                    <Route path="products" element={<Product />} />
                    <Route path="conferencia" element={<Conference/>}/>
                    <Route path="/user" element={<User/>}/>
                </Route>

            </Routes>
        </Router>
    )
}

export default AppRoutes;