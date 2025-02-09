import React,{useState} from "react";
import { FaHome, FaBox, FaCog, FaUser } from "react-icons/fa"; // Ícones
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';

import "./styles/Sidebar.css"

function Sidebar() {

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
    <div className="sidebar bg-dark">
      <ul className="menu">
        
        <li className={`icon fas fa-home fa-lg ${isActive('/home') ? 'text-dark bg-light' : ''}`}
            onClick={() => navigateTo('/home')}>
              <span>Inicio</span>
         {/* Para home */}
        </li>
        

        <li className={`icon fas fa-box fa-lg  ${isActive('/home/products') ? 'text-dark bg-light' : ''}`}
        onClick={() => navigateTo('/home/products')}>
          <span>Produtos</span>
          </li>{/* Para product*/}

        <li className={`fas fa-file-alt fa-lg ${isActive('/home/manifest') ? 'text-dark bg-light' : ''}`}
        onClick={() => navigateTo('/home/manifest')}>
          <span>Manifesto</span>
          </li> {/* Para Manifesto */}

        <li className={`fas fa-clipboard-check fa-lg ${isActive('/home/conference') ? 'text-dark bg-light' : ''}`}
        onClick={() => navigateTo('/home/conference')}>
          <span>Conferencia</span>  
        </li> {/* Para Conferência */}

        <li className="fas fa-user fa-lg">
          <span>Usuarios</span>
        </li> {/* Para Usuário */}

        <li className={`fas fa-cog fa-lg ${isActive('/home/setting') ? 'text-dark bg-light' : ''}`} 
        onClick={() => navigateTo('/home/setting')}>
          <span>Configurações</span>
          </li>{/* Para setting */}
      </ul>
    </div>
  );
}

export default Sidebar;
