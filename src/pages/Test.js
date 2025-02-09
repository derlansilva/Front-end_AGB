import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Draggable  from 'react-draggable';

const Test = () => {
  const [command, setCommand] = useState('');
  const [windows, setWindows] = useState([]);
  
  // Função para criar uma nova janela com base no comando
  const openWindow = (command) => {
    let windowTitle = '';

    if (command === '020') {
      windowTitle = 'Gestão de Produtos';
    } else if (command === '030') {
      windowTitle = 'Visão Geral do Estoque';
    } else {
      windowTitle = 'Comando Não Encontrado';
    }

    // Adiciona uma nova janela à lista de janelas abertas
    setWindows([...windows, { id: windows.length, title: windowTitle }]);
  };

  // Função para remover uma janela
  const closeWindow = (id) => {
    setWindows(windows.filter((window) => window.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2>Digite um Comando</h2>

      {/* Campo de Entrada de Comando */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Digite o código"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && openWindow(command)} // Aciona a função quando pressionar Enter
        />
        <button className="btn btn-primary" onClick={() => openWindow(command)}>
          Executar
        </button>
      </div>

      {/* Renderiza as janelas abertas */}
      <div className="windows-container">
        {windows.map((window) => (
          <Draggable key={window.id}>
            <div
              className="window"
              style={{
                position: 'absolute',
                top: `${50 + window.id * 60}px`,
                left: `${50 + window.id * 60}px`,
                width: '300px',
                height: '200px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <div className="window-header" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                <span>{window.title}</span>
                <button
                  onClick={() => closeWindow(window.id)}
                  style={{
                    float: 'right',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  X
                </button>
              </div>
              <div className="window-body" style={{ padding: '10px' }}>
                {window.title === 'Gestão de Produtos' && (
                  <div>
                    <p>Aqui você pode consultar, cadastrar ou editar produtos.</p>
                    {/* Coloque o conteúdo relevante para Gestão de Produtos aqui */}
                  </div>
                )}
                {window.title === 'Visão Geral do Estoque' && (
                  <div>
                    <p>Aqui você pode ver o estoque atual, quantidades e localização dos produtos.</p>
                    {/* Coloque o conteúdo relevante para Visão Geral do Estoque aqui */}
                  </div>
                )}
                {window.title === 'Comando Não Encontrado' && (
                  <div>
                    <p>Comando não encontrado, tente novamente.</p>
                  </div>
                )}
              </div>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default Test;
