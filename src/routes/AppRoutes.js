

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "../pages/Home";
import Login from "../pages/Login";
import Sidebar from "../components/Sidbar";
import Manifest from "../pages/Manifest";
import Header from "../components/Header";
import ProductForm from "../pages/Products";

const AppRoutes = () => {
    return (
        <Router>
            <div className="d-flex">
                
                <Sidebar />
                <div className="flex-grow-1">

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/manifest" element={<Manifest />} />
                        <Route path="/products" element={<ProductForm/>}/>
                    </Routes>
                </div>

            </div>


        </Router>
    )
}

export default AppRoutes;