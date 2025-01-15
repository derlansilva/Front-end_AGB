import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div
      className="bg-dark text-white vh-100 position-fixed"
      style={{ width: '250px' }}
    >
      <h2 className="text-center mt-3"><img src="/logo.png"
            className="me-2"
            style={{ width: '200px', height: '50px', objectFit: 'cover' }}/></h2>
      <ul className="nav flex-column p-3">
        
        <li className="nav-item">
          <Link href="/products" className="nav-link text-white">
            Adicionar Produto
          </Link    >
        </li>
        <li className="nav-item">
          <a href="#about" className="nav-link text-white">
            About
          </a>
        </li>
        <li className="nav-item">
          <a href="#contact" className="nav-link text-white">
            Contact
          </a>
        </li>

        <li className="nav-item">
          <a href="/manifesto" className="nav-link text-white">
            Criar manifesto
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
