


import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";

import MB52 from "./pages/MB52";
import MB51 from "./pages/MB51";
import MB50 from "./pages/MB50";
import SAP from "./SAP";

const componentMap = {
  mb52: { label: "MB52 - Consulta de Produtos", component: MB52 },
  mb51: { label: "MB51 - Inserir Arquivo ao Manifesto", component: MB51 },
  mb50: { label: "MB50 - Gerar Manifesto", component: MB50 },
  sap : { label : "SAP - test de tela sap" , component: SAP}
};

const App = () => {
  const [windowData, setWindowData] = useState(null); // apenas 1 janela ativa
  const [activePageLabel, setActivePageLabel] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const code = e.target.value.trim().toLowerCase();
      if (code && componentMap[code]) {
        openWindow(code);
        e.target.value = "";
      } else {
        alert(`Transação "${code}" não encontrada.`);
      }
    }
  };

  const openWindow = (code) => {
    const newComponent = componentMap[code];
    setWindowData({
      id: Date.now(),
      code,
      Component: newComponent.component,
    });
    setActivePageLabel(newComponent.label);
  };

  const closeWindow = () => {
    setWindowData(null);
    setActivePageLabel("");
  };

  return (
    
    <div className="app-container">
      {/* Cabeçalho fixo */}
      <header className="top-bar">
        <input
          id="transactionCode"
          type="text"
          className="form-control form-control-sm"
          placeholder="Digite, ex: MB52"
          onKeyDown={handleKeyPress}
        />
        <div className="text-white m-0">
          {/* Nome do usuário */}
          <div className="text-end">
            <span className="fw-semibold small">Usuário: João</span>
          </div>
        </div>

      </header>

      {/* Subtítulo da página carregada */}

      <div
        className="bg-white py-2 px-5 shadow-sm text-dark"

        style={{
          marginTop: "51px",
          borderTop: "3px solid gold",
          height: "40px", // Diminuindo a altura
        }}
      >
        <div className="d-flex  justify-content-between align-items-center" style={{ height: "100%" }}>

          {/* Botões à direita */}
          <div className="icon-buttons d-flex gap-1">
            {/* Botão com ícone para MB52 */}
            <button
              className="btn btn-sm btn-outline-dark"
              title="Abrir MB52"
              onClick={() => openWindow("mb52")}
              style={{ fontSize: "1.2rem" }}
            >
              <i className="bi bi-box-seam" />
            </button>


            {/* Botão com ícone para MB51 */}
            <button
              className="btn btn-sm btn-outline-dark"
              title="Abrir MB51"
              onClick={() => openWindow("mb50")}
              style={{ fontSize: "1.2rem" }}
            >
              <i class="bi bi-clipboard2"></i>
            </button>


            {/* Botão com ícone para MB51 */}
            <button
              className="btn btn-sm btn-outline-dark"
              title="Abrir MB51"
              onClick={() => openWindow("mb51")}
              style={{ fontSize: "1.2rem" }}
            >
              <i class="bi bi-filetype-xml"></i>
            </button>


            {/* Botão com ícone para MB51 */}
            <button
              className="btn btn-sm btn-outline-dark"
              title="Abrir MB51"

              style={{ fontSize: "1.2rem" }}
            >
              <i class="bi bi-card-list"></i>


            </button>


            {/* Botão com ícone para MB51 */}
            <button
              className="btn btn-sm btn-outline-dark"
              title="Abrir MB51"

              style={{ fontSize: "1.2rem" }}
            >


              <i class="bi bi-person-square"></i>
            </button>


            {/* Adicione outros botões conforme necessário */}
          </div>

          {/* Texto à esquerda */}
          <h6 className="mb-0 fw-semibold small">{activePageLabel}</h6>

        </div>
      </div>




      {/* Janela ativa */}
      <div
        className="window-area"
        style={{ marginTop: activePageLabel ? "10px" : "68px" }} // ajuste de espaço
      >
        {windowData && (
          <div key={windowData.id} className="window-card">
            <button
              className="btn btn-sm btn-danger close-btn"
              onClick={closeWindow}
            >
              ×
            </button>
            <div className="window-content">
              <windowData.Component />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

