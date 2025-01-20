
import React, { useState } from 'react';
import apiServices from '../services/apiServices';
import { Button, Modal } from 'bootstrap';


const Manifest = () => {
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [isReadyToSend, setIsReadyToSend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const parser = new DOMParser();
    const allProducts = [];



    Array.from(files).forEach((file, fileIndex) => {
      const reader = new FileReader();

      reader.onload = (e) => {

        const xml = parser.parseFromString(e.target.result, "application/xml");
        const items = Array.from(xml.getElementsByTagName("det")).map((item) => {
          const cProd = item.getElementsByTagName("cProd")[0]?.textContent || "";
          const xProd = item.getElementsByTagName("xProd")[0]?.textContent || "";
          const qCom = item.getElementsByTagName("qCom")[0]?.textContent || "";
          const vUnCom = item.getElementsByTagName("vUnCom")[0]?.textContent || "";
          return { code: cProd, description: xProd, quantity: qCom, price: vUnCom }
        });
        allProducts.push(...items)

        if (fileIndex === files.length - 1) {
          setProducts((prev) => [...prev, ...allProducts]);
          setIsReadyToSend(true);
        }
      };
      reader.readAsText(file);
    });
  };


  const sendDataToBackend = async () => {

    const jsonData = {
      products: products.map(product => ({
        code: product.code,
        description: product.description,
        quantity: Number(product.quantity).toFixed(2),
        price: Number(product.price ).toFixed(2)|| 0, // Defina um preço padrão caso não exista
      })),
      timestamp: new Date().toISOString(),
    };

    console.log('Enviando os dados para o backend:', jsonData);
    setIsLoading(true);
    setMessage("");

    try {

      const response = await apiServices.createManifest(jsonData);
      setMessage(`Manifesto criado`);

      console.log(response.data)

      setShowModal(false);

      
    } catch (error) {
      console.error('Erro ao enviar dados para o backend:', error);

      if (error.response) {
        console.error('Detalhes do erro:', error.response.data);
      }
    } finally {
      setIsLoading(false); // Desativa o spinner
      products.length = 0;
    }

  };


  const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0)


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Gerar Manifesto</h2>



      <div className="container">
        <div className="container mt-4">
          <div className="form-group">
            <label htmlFor="file-upload" className="form-label">Escolher Arquivo XML</label>
            <input
              class="form-control"
              type="file"
              id="formFileDisabled"
              accept=".xml"
              className="form-control"
              onChange={handleFileUpload}
              multiple
            ></input>

          </div>

          <div className="mt-3">
            {products.length > 0 && (
              <>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }} >
                  <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>Item</th>
                        <th>Descrição</th>
                        <th>Quantidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={index}>
                          <td>{product.code}</td>
                          <td>{product.description}</td>
                          <td>{product.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  {isReadyToSend && (
                    <button onClick={() => setShowModal(true)}>
                      Iniciar Conferência
                    </button>
                  )}
                  <span><strong>Total Quantidade:</strong> {totalQuantity}</span>
                </div>
              </>
            )}

          </div>
        </div>


      </div>

      {/* Modal de Confirmação */}
      {showModal && (
        <div className="modal-overlay" style={modalOverlayStyle}>
          <div className="modal-container" style={modalContainerStyle}>
            <div className="modal-header" style={modalHeaderStyle}>
              <span>Confirmar geração</span>
              <button
                className="close-button"
                onClick={() => setShowModal(false)}
                style={closeButtonStyle}
              >
                X
              </button>
            </div>
            <div className="modal-body" style={modalBodyStyle}>
              <p>Tem certeza que deseja gerar o manifesto com os items?</p>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Descrição</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.code}</td>
                      <td>{product.description}</td>
                      <td>{product.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer" style={modalFooterStyle}>
              <button
                className="cancel-button btn btn-danger"
                onClick={() => setShowModal(false)}
                style={cancelButtonStyle}
              >
                Cancelar
              </button>
              <button
                className="confirm-button btn btn-success"
                onClick={sendDataToBackend}
                style={confirmButtonStyle}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Spinner */}
      {isLoading && (
        <div className="spinner">
          {/* Pode ser um spinner de sua escolha */}
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Mensagem de sucesso */}
      {message && <div className="success-message">{message}</div>}

    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContainerStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  width: '50%',
  maxWidth: '600px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #ddd',
  paddingBottom: '10px',
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
};

const modalBodyStyle = {
  padding: '20px 0',
};

const modalFooterStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '20px',
};

const cancelButtonStyle = {
  marginRight: '10px',
};

const confirmButtonStyle = {};

export default Manifest;