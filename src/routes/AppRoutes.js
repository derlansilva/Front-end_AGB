

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "../pages/Home";
import Login from "../pages/Login";
import Sidebar from "../components/Sidebar";
import Manifest from "../pages/Manifest";
import Header from "../components/Header";
import Product from "../pages/Products";
import Conferencia from "../pages/Conferencia";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} >

                    <Route path="manifest" element={<Manifest />} />
                    <Route path="products" element={<Product />} />
                    <Route path="conferencia" element={<Conferencia/>}/>
                </Route>

            </Routes>
        </Router>
    )
}

export default AppRoutes;