import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import MB52 from "./pages/products/MB52";
import MB51 from "./pages/manifest/MB51";
import MB50 from "./pages/manifest/MB50";
import ZM22 from "./pages/ZM22";
import MB53 from "./pages/manifest/MB53";
import Login from "./components/login/Login";  // Importando o componente de login
import PD01 from "./pages/order/PD01";
import PD02 from "./pages/order/PD02";

const componentMap = {
  mb52: { label: "MB52 - Consulta de Produtos", component: MB52 },
  mb51: { label: "MB51 - Inserir Arquivo ao Manifesto", component: MB51 },
  mb50: { label: "MB50 - Gerar Manifesto", component: MB50 },
  zm22: { label: "ZM22 - Cadastro e cosulta de usuarios", component: ZM22 },
  mb53: { label: "MB53 - Lista de manifestos ", component: MB53 },
  pd01: { label: "PD01 - Upload de pedidos ", component: PD01 },
  pd02: { label: "PD01 - Upload de pedidos ", component: PD02 },
};

const App = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Controlando o estado de login

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
    const exists = openWindows.find((w) => w.code === code);
    if (exists) {
      setActiveWindowId(exists.id);
      return;
    }

    const newComponent = componentMap[code];
    const newWindow = {
      id: Date.now(),
      code,
      label: newComponent.label,
      Component: newComponent.component,
    };

    setOpenWindows([...openWindows, newWindow]);
    setActiveWindowId(newWindow.id);

    if (!history.includes(code)) {
      setHistory([code, ...history]);
    }
  };

  const closeWindow = (id) => {
    const updated = openWindows.filter((w) => w.id !== id);
    setOpenWindows(updated);
    if (activeWindowId === id && updated.length > 0) {
      setActiveWindowId(updated[updated.length - 1].id);
    } else if (updated.length === 0) {
      setActiveWindowId(null);
    }
  };

  const activeWindow = openWindows.find((w) => w.id === activeWindowId);

  // Função de login
  const handleLogin = () => {
    setIsLoggedIn(true); // Altera o estado para logado
  };

  return (
    <div className="vh-100 d-flex flex-column">
      {/* Modal de login */}
      {!isLoggedIn && <Login onLogin={handleLogin} />}

      {/* Se o usuário estiver logado, exibe a tela principal */}
      {isLoggedIn && (
        <>
          {/* Top Bar com os ícones */}
          <header
            className="bg-dark text-white px-3 d-flex justify-content-between align-items-center"
            style={{ height: "45px" }}
          >
            <div className="d-flex align-items-center gap-2">
              <span className="fw-semibold text-white">Mini SAP</span>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Digite ex: MB52"
                onKeyDown={handleKeyPress}
                style={{ width: "200px" }} // Ajuste opcional de largura
              />
            </div>

            <div className="d-flex align-items-center gap-3">
              <span className="small">derlan bentes</span>
              <button className="btn btn-sm btn-outline-light">Sair</button>
            </div>
          </header>

          {/* Abas de ícones no topo */}
          <div
            className="d-flex bg-light border-bottom px-5 d-flex align-items-center "
            style={{
              height: "35px",
              borderTop: "2px solid #ffc107",
              fontSize: "1rem",
            }}
          >
            <button
              className="btn btn-sm btn-outline-dark  d-flex align-items-center justify-content-center"
              title="MB52"
              onClick={() => openWindow("mb52")}
              style={{ fontSize: "1rem" , height: "30px" }} // Ajuste do tamanho do ícone
            >
              <i className="bi bi-box-seam fs-10" />
            </button>

            <button
              className="ms-1 btn btn-sm btn-outline-dark d-flex align-items-center justify-content-center"
              title="MB50"
              onClick={() => openWindow("mb50")}
              style={{ fontSize: "1rem" , height: "30px" }} // Ajuste do tamanho do ícone
            >
              <i className="bi bi-clipboard2 fs-10"></i>
            </button>

            <button
              className="ms-1 btn btn-sm btn-outline-dark d-flex align-items-center justify-content-center"
              title="MB51"
              onClick={() => openWindow("mb51")}
              style={{ fontSize: "1rem" , height: "30px" }} // Ajuste do tamanho do ícone
            >
              <i className="bi bi-filetype-xml fs-10"></i>
            </button>

            <button
              className=" ms-1 btn btn-sm btn-outline-dark d-flex align-items-center justify-content-center"
              title="ZM22"
              onClick={() => openWindow("zm22")}
              style={{ fontSize: "1rem"  , height: "30px"}} // Ajuste do tamanho do ícone
            >
              <i className="bi bi-person-square fs-10"></i>
            </button>
          </div>

          {/* Layout principal */}
          <div className="d-flex flex-grow-1">
            {/* Main Content */}
            <main className="flex-grow-1 p-3">
              {activeWindow ? (
                <activeWindow.Component />
              ) : (
                <div className="d-flex flex-column align-items-center  vh-100">
                  <h3 className="mb-3">Bem-vindo ao sistema</h3>
                  <p>Selecione uma funcionalidade no menu ou digite o código da transação acima.</p>
                </div>

              )}
            </main>
          </div>

          {/* Rodapé com as abas abertas - Fixo */}
          <div
            className="d-flex bg-light border-top px-2 py-1 fixed-bottom"
            style={{
              height: "29px",
              borderBottom: "3px solid #ffc107",
              fontSize: "0.75rem",
              zIndex: 999, // Garantir que a barra do rodapé fique acima do conteúdo
            }}
          >
            {openWindows.length === 0 && (
              <div className="d-flex align-items-center justify-content-center w-100">
                <span>Sem telas abertas</span>
              </div>
            )}
            {openWindows.map((win) => (
              <div
                key={win.id}
                className={`d-flex align-items-center justify-content-center px-2 py-0 border me-1 small ${activeWindowId === win.id ? "bg-white fw-bold" : "bg-light"
                  }`}
                role="button"
                onClick={() => setActiveWindowId(win.id)}
              >
                {win.label}{" "}
                <span
                  onClick={() => closeWindow(win.id)}
                  className="ms-2 text-danger"
                  style={{ cursor: "pointer", fontSize: "1.2rem" }} // Aumentando o ícone de fechar
                >
                  &times;
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
