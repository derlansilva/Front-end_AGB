import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <nav 
    style={{
         // azul bem claro
        borderTop: "8px solid #ffc107", // borda amarela
        borderBottom: "5px solid #ffc107",
        padding: "0 10px",
        color: "#003368", // azul escuro para o texto
        fontWeight: "bold",
        fontSize: "15px",

        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container-fluid bg-dark">
        <span className="navbar-text fw-semibold text-white">{title}</span>
      </div>
    </nav>
  );
};

export default Header;
