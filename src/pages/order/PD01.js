import React, { useState } from "react";
import apiServices from "../../services/apiServices";
import "./style/styles.css";

const PD01 = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false); // estado para o loading
  const [fileName, setFileName] = useState("Nenhum arquivo selecionado");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus("Selecione um arquivo.");
      return;
    }

    setLoading(true); // inicia o loading
    setStatus("");

    try {
      const response = await apiServices.uploadExcel(file);
      console.log("Resposta do backend:", response.data);
      setStatus("Arquivo enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error);
      setStatus("Erro ao enviar o arquivo.");
    } finally {
      setLoading(false); // finaliza o loading
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Atualiza o nome do arquivo
    } else {
      setFileName("Nenhum arquivo selecionado");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="file-upload">
          <label htmlFor="fileInput" className="file-label">
            Escolher arquivo
          </label>
          <input
            type="file"
            id="fileInput"
            className="file-input"
            onChange={handleFileChange}
            accept=".xlsx"
          />
          <span className="file-name">{fileName}</span>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-sm mt-10"
          disabled={loading}
          style={{ width: "200px" }}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Enviando...
            </>
          ) : (
            "Enviar"
          )}
        </button>

        {status && <div className="alert alert-info mt-3">{status}</div>}
      </form>
    </div>
  );
};

export default PD01;
