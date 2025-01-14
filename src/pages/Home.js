
import React from "react";


const Home = () => {
    return (
        <div className="d-flex">
            {/* Sidebar */}
            <nav
                className="bg-dark text-white p-3 vh-100"
                style={{ width: '250px' }}
            >
                <h2 className="text-center">Menu</h2>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a href="#home" className="nav-link text-white">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#products" className="nav-link text-white">
                            Products
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#about" className="nav-link text-white">
                            About
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Main Content */}
            <div className="p-4" style={{ flex: 1 }}>
                <h1>Welcome to the Dashboard</h1>
                <p>This is your product management system!</p>
            </div>
        </div>
    )
}