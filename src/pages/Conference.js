import React, { useEffect, useState } from "react";


function Conference() {
  const [manifestos, setManifestos] = useState([
    { id: 1, numero: "MAN001", quantidade: 50 },
    { id: 2, numero: "MAN002", quantidade: 30 },
    { id: 3, numero: "MAN003", quantidade: 70 },
  ]);
  const [selectedManifestos, setSelectedManifestos] = useState([]);

  useEffect( () => {
    console.log(window.Electron)
  })
  const startConference = async () => {
    console.log(" electron rodando " , window.Electron)
    /*try{
      const result = await window.Electron.run
    }*/
  }

  // Função para alternar a seleção de manifestos
  const toggleSelectManifesto = (id) => {
    setSelectedManifestos((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  // Função para iniciar a conferência
  const handleStartConferencia = () => {
    startConference()
    const selectedNumbers = manifestos
      .filter((m) => selectedManifestos.includes(m.id))
      .map((m) => m.numero)
      .join(", ");
      
    alert(`Iniciando conferência para os manifestos: ${selectedNumbers}`);
    const command = `C:\receipt\assets\program.exe ${selectedManifestos}`


  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Página de Conferência</h1>

      {/* Tabela com os manifestos */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Manifesto</th>
            <th>Quantidade</th>
            <th>Selecionar</th>
          </tr>
        </thead>
        <tbody>
          {manifestos.map((manifesto) => (
            <tr
              key={manifesto.id}
              className={
                selectedManifestos.includes(manifesto.id) ? "table-primary" : ""
              }
            >
              <td>{manifesto.numero}</td>
              <td>{manifesto.quantidade}</td>
              <td>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => toggleSelectManifesto(manifesto.id)}
                >
                  {selectedManifestos.includes(manifesto.id)
                    ? "Desmarcar"
                    : "Selecionar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botão "Iniciar Conferência" */}
      {selectedManifestos.length > 0 && (
        <div className="mt-3">
          <button
            className="btn btn-success"
            onClick={handleStartConferencia}
          >
            Iniciar Conferência
          </button>
        </div>
      )}
    </div>
  );
}

export default Conference;
