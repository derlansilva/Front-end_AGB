
import React, { useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

import { Link, Outlet, NavLink } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import ProductForm from "./Products";
import "./styles/Home.css";



const Home = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [userName] = useState({ name: "Derlan Bentes" })

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };


    return (

        <div className="d-flex" style={{ height: "100vh" }}>
            {/* Sidebar Fixa */}
            <aside className="bg-dark text-white p-3">
                <div className="text-center">
                    <img src="/logo.png" className="me-2 logo"/>
                </div>


                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/products">
                            Produtos
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/manifest">
                            Manifesto
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/conferencia">
                            Conferencia
                        </NavLink>
                    </li>
                </ul>

                <div className="text-center">
                <p>{userName.name}</p>
                    <button className="btn btn-danger w-100">Sair</button>
                </div>
            </aside>



            {/* Área de conteúdo principal */}
            <div style={{ marginLeft: "250px", width: "100%", padding: "20px" }}>

                {/* Aqui o conteúdo será renderizado dinamicamente */}
                <section className="mt-3">
                    <Outlet />
                </section>
            </div>
        </div>
    )
};


export default Home;