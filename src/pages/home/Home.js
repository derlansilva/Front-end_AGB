
import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';


import { Link, Outlet, NavLink } from 'react-router-dom';
import apiServices from "../../services/apiServices";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

import "./style/styles.css"


const Home = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [userName] = useState({ name: "Derlan Bentes" })

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };


    return (

        <div className="container-fluid p-0">
            {/* Header fixo no topo */}
            <Header />

            {/* Div principal para Sidebar e Outlet */}
            <div className="d-flex" style={{ height: "calc(100vh - 40px)", marginTop: "40px" }}>
                {/* Sidebar ocupando 10% */}
                <div className="sidebar bg-dark">
                    <Sidebar />
                </div>

                {/* Content (Outlet) ocupando 90% */}
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
};


export default Home;