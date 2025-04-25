import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import MB52 from "./pages/MB52";
import MB51 from "./pages/MB51";
import MB50 from "./pages/MB50";
import ZM22 from "./pages/ZM22";
import MB53 from "./pages/MB53";
import Login from "./components/login/Login";  // Importando o componente de login

const componentMap = {
  mb52: { label: "MB52 - Consulta de Produtos", component: MB52 },
  mb51: { label: "MB51 - Inserir Arquivo ao Manifesto", component: MB51 },
  mb50: { label: "MB50 - Gerar Manifesto", component: MB50 },
  zm22: { label: "ZM22 - Cadastro e cosulta de usuarios", component: ZM22 },
  mb53: { label: "MB53 -  Lista de manifestos ", component: MB53 },
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
          {/* Top Bar */}
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
              <span className="small">Usuário: João</span>
              <button className="btn btn-sm btn-outline-light">Sair</button>
            </div>
          </header>

          {/* Abas */}
          <div
            className="d-flex bg-light border-bottom px-2"
            style={{ height: "25px", borderTop: "2px solid #ffc107", fontSize: "0.65rem" }} // amarelo estilo Bootstrap
          >
            {openWindows.map((win) => (
              <div
                key={win.id}
                className={`px-2 py-1 border me-1 small ${activeWindowId === win.id ? "bg-white fw-bold" : "bg-light"
                  }`}
                role="button"
                onClick={() => setActiveWindowId(win.id)}
              >
                {win.label}{" "}
                <span
                  onClick={() => closeWindow(win.id)}
                  className="ms-1 text-danger"
                >
                  &times;
                </span>
              </div>
            ))}
          </div>

          {/* Layout */}
          <div className="d-flex flex-grow-1">
            {/* Sidebar */}
            <aside className="bg-light border-end p-2" style={{ width: "50px" }}>
              <div className="nav flex-column gap-3 align-items-center text-center">
                <button
                  className="btn btn-sm btn-outline-dark"
                  title="MB52"
                  onClick={() => openWindow("mb52")}
                >
                  <i className="bi bi-box-seam fs-5" />
                </button>

                <button
                  className="btn btn-sm btn-outline-dark"
                  title="Abrir MB50"
                  onClick={() => openWindow("mb50")}
                  style={{ fontSize: "1.2rem" }}
                >
                  <i className="bi bi-clipboard2"></i>
                </button>

                <button
                  className="btn btn-sm btn-outline-dark"
                  title="Abrir MB51"
                  onClick={() => openWindow("mb51")}
                  style={{ fontSize: "1.2rem" }}
                >
                  <i className="bi bi-filetype-xml"></i>
                </button>

                <button
                  className="btn btn-sm btn-outline-dark"
                  title="Abrir ZM22"
                  onClick={() => openWindow("zm22")}
                  style={{ fontSize: "1.2rem" }}
                >
                  <i className="bi bi-person-square"></i>
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow-1 p-3">
              {activeWindow ? (
                <activeWindow.Component />
              ) : (
                <div>
                  <h5 className="mb-3">Bem-vindo ao sistema</h5>
                  <p>Selecione uma funcionalidade no menu lateral ou digite o código da transação acima.</p>
                </div>
              )}
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
