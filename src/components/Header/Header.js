import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import "./styles/header.css"
const Header = () => {

  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const navigateTo = (path) => {
    navigate(path)
  }

  const isActive = (path) => location.pathname === path;
  return (

    <header className="header bg-dark text-light py-1 px-4 d-flex justify-content-between align-items-center">
      {/* Ícones do Sidebar */}
      <div className="d-flex gap-4">
        
      </div>

      {/* Nome do Usuário e Logout */}
      <div className="d-flex align-items-center">
        <span className="me-2">Joderlan</span>
        <i className="fas fa-sign-out-alt fa-lg text-danger" style={{ cursor: "pointer" }}></i>
      </div>
    </header>

  );
};

export default Header;
