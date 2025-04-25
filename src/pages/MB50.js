import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MB50 = () => {
  const [manifestoType, setManifestoType] = useState("");
  const [manifestoNumber, setManifestoNumber] = useState("");
  const [showResult, setShowResult] = useState(false);

  const gerarManifesto = () => {
    if (manifestoType) {
      const newManifestoNumber = `MAN-${Math.floor(Math.random() * 1000000)}`;
      setManifestoNumber(newManifestoNumber);
      setShowResult(true);
    } else {
      alert("Por favor, selecione o tipo de manifesto.");
    }
  };

  return (
    <div className="container mt-4">
      {/* Seleção para tipo de manifesto */}
      <div className="mb-3 row justify-content-left">
        <div className="col-md-3">
          <select
            id="manifestoType"
            className="form-select form-select-sm"
            value={manifestoType}
            onChange={(e) => setManifestoType(e.target.value)}
          >
            <option value="" disabled>
              Selecione o Tipo
            </option>
            <option value="CWB">CWB</option>
            <option value="CJB">CJB</option>
            <option value="MTZ">MTZ</option>
          </select>
        </div>

        <div className="col-auto">
          <button
            className="btn btn-sm btn-primary"
            onClick={gerarManifesto}
          >
            Gerar Manifesto
          </button>
        </div>
      </div>

      {/* Exibindo o número do manifesto gerado */}
      {showResult && (
        <div className="mt-4">
          <h5>Manifesto Gerado</h5>
          <p>
            <strong>Número do Manifesto:</strong> {manifestoNumber}
          </p>
        </div>
      )}
    </div>
  );
};

export default MB50;
