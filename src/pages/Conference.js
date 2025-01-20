import React, { useEffect, useState } from "react";
import apiServices from "../services/apiServices";


function Conference() {

    const [manifest, setManifest] = useState([]);
    const [selectedManifests, setSelectedManifests] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchManifest = async () => {
        try {

          const data = await apiServices.getManifestActive();

          console.log(data)
          setManifest(data);

        } catch (error) {
          setError('Erro ao carregar manifestos.');
        }

      };

      fetchManifest();
    }, [])

  
  // Função para alternar seleção de um manifesto
  const toggleSelection = (id) => {
    setSelectedManifests((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((manifestId) => manifestId !== id) // Deseleciona
        : [...prevSelected, id] // Seleciona
    );
  };

  // Verifica se um manifesto está selecionado
  const isSelected = (id) => selectedManifests.includes(id);

  const startConference = () => {
    alert(`Conferência iniciada para os manifestos: ${selectedManifests.join(', ')}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">manifestos em aberto</h1>
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Tabela com os manifestos */}
      <div className="table-responsive"
        style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd' }}>
      <table className="table table-striped table-bordered">
        
        <thead className="thead-light">
          <tr>
            <th scope="col">Selecionar</th>
            <th scope="col">Número do Manifesto</th>
            <th scope="col">Quantidade de Itens</th>
          </tr>
        </thead>
        <tbody>
          {manifest.map((manifest) => (
            <tr key={manifest.id}>
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={isSelected(manifest.id)}
                  onChange={() => toggleSelection(manifest.id)}
                />
              </td>
              <td style={{ textAlign: 'center' }}>{manifest.manifestName}</td>
              <td style={{ textAlign: 'center' }}>{manifest.quantity || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>

      {/* Botão "Iniciar Conferência" */}
      
      {selectedManifests.length > 0 && (
        <div className="mt-4">
          <button
            onClick={startConference}
            className="btn btn-primary btn-lg"
          >
            Iniciar Conferência
          </button>
        </div>
      )}
      
      
    </div>
  );
}

export default Conference;
