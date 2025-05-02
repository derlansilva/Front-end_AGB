import React, { useState , useEffect } from "react";
import * as XLSX from "xlsx";
import apiServices from "../../services/apiServices";
import "./style/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';


const PD03 = () => {
  const [file, setFile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileProcessed, setFileProcessed] = useState(false);
  const [backendMessage, setBackendMessage] = useState("");
  const [processingFile, setProcessingFile] = useState(false); // Novo estado para processar arquivo
  const [message , setMessage] = useState("");
  
useEffect(() => {
  handleVerifyFile();
},[])

  const processExcel = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        jsonData.shift();

        const filteredData = jsonData.filter(row =>
          Array.isArray(row) && row.some(cell => cell !== null && cell !== undefined && String(cell).trim() !== "")
        );

        const orders = [];
        let currentOrder = null;

        filteredData.forEach((row) => {
          const orderNumber = row[0];
          const barCode = row[1];
          const sku = row[2];
          const description = row[3];
          const quantity = row[4];
          const releaseDate = row[5];

          if (!currentOrder || currentOrder.orderNumber !== orderNumber) {
            if (currentOrder) {
              orders.push(currentOrder);
            }
            currentOrder = {
              orderNumber,
              releaseDate,
              items: [],
            };
          }

          currentOrder.items.push({
            sku,
            barCode,
            description,
            quantity,
          });
        });

        if (currentOrder) {
          orders.push(currentOrder);
        }

        setOrders(orders);
        setFileProcessed(true);
        resolve(orders);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsBinaryString(file);
    });
  };

  const handleProcessFile = async () => {
    setProcessingFile(true); // Começou a processar
    try {
      await processExcel(file);
    } finally {
    
      setProcessingFile(false); // Terminou de processar
      
    }
  };


  const handleVerifyFile = () =>{

    
     if(orders.lengthm >0){ orders.forEach(item => {
        console.log(item)
      })
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus("Selecione um arquivo.");
      return;
    }

    if (!fileProcessed) {
      setStatus("Processar o arquivo antes de enviar.");
      return;
    }

    setLoading(true);
    setStatus("");
    setBackendMessage("");

    try {
      const response = await apiServices.sendOrders(orders);
      console.log("Resposta do backend:", response);
      setBackendMessage(response.data);
      setMessage(response.data)
      setStatus("Pedidos enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error.response ? error.response.data : error.message);
      setStatus("Erro ao enviar o arquivo.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileProcessed(false);
      setStatus("");
    }
  };

  return (
    <div className="container my-4">
      <h5>Upload de Arquivo Excel</h5>

      <form onSubmit={handleSubmit}>
        <div className="file-upload">
          <label htmlFor="fileInput" className="file-label">
            Selecione o arquivo Excel:
          </label>
          <input
            type="file"
            id="fileInput"
            className="file-input"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
          />
          {file && <div className="file-name">{file.name}</div>}
        </div>

        <div className="mb-3 d-flex justify-content-start">
          {file && !fileProcessed && (
            <button
              type="button"
              onClick={handleProcessFile}
              className="btn btn-primary me-2"
              disabled={processingFile} // Desativa enquanto processa
            >
              {processingFile ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Processando...
                </>
              ) : (
                "Processar Arquivo"
              )}
            </button>
          )}

          {fileProcessed && (
            <button type="submit" className="btn btn-success" disabled={loading}>
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
                "Enviar Pedidos"
              )}
            </button>
          )}
        </div>

        {status && (
          <div className={`alert ${status === "Pedidos enviados com sucesso!" ? "alert-success" : "alert-danger"}`}>
            <strong>{message}</strong>
          </div>
        )}

        {fileProcessed && (
          <div className="mt-3">
            <h5>Pedidos Processados:</h5>
            <div
              className="bg-light p-3"
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                whiteSpace: "pre-wrap",
                border: "1px solid #ccc",
                borderRadius: "5px"
              }}
            >
              <pre className="m-0">{JSON.stringify(orders, null, 2)}</pre>
            </div>
          </div>
        )}
      </form>

      {backendMessage && (
        <div className="mt-3">
          <h3>Resposta do Backend:</h3>
          <p>{backendMessage}</p>
        </div>
      )}
    </div>
  );
};

export default PD03;
