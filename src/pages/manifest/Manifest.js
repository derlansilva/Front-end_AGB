import React, { useState } from 'react';
import apiServices from '../../services/apiServices';
import { Button, Modal } from 'bootstrap';
import ModalSpinner from '../../components/ModalSpinner/ModalSpinner';
import "./styles/Manifest.css"

const Manifest = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isReadyToSend, setIsReadyToSend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [manifestNumber, setManifestNumber] = useState(null); // Novo estado para o número do manifesto
  const [listProducts, setListProducts] = useState([])
  const [fileNames , setFileNames] = useState([])

  //funcão para leitura de xml
  const handleFileUpload = (event) => {
    const files = event.target.files;
    const parser = new DOMParser();
    const allProducts = [];
    const fileNames = Array.from(files).map(file => file.name);

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
          setFileNames((prev) => [...prev, ...fileNames])
        }
      };
      reader.readAsText(file);
    });
  };

  //enviar os dados ao backend
  const sendDataToBackend = async () => {
    const jsonData = {
      products: products.map(product => ({
        code: product.code,
        description: product.description,
        quantity: parseInt(product.quantity),
        price: Number(product.price).toFixed(2) || 0, // Defina um preço padrão caso não exista
      })),
      timestamp: new Date().toISOString(),
    };

    console.log('Enviando os dados para o backend:', jsonData);
    setIsLoading(true);
    setMessage("");

    try {
      setLoading(true);
      const response = await apiServices.createManifest(jsonData);

      console.log("retorno do backend ", response.itemManifest)

      const request = await apiServices.getManifestById(response.id);
      console.log(request)

      setListProducts(response.itemManifest)

      setTimeout(() => {
        setLoading(false); // Desativar o spinner após 2 segundos
        setManifestNumber(response.manifestName); // Gerando um número fictício para o manifesto
      }, 2000);


      //console.log(response.data)

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

  const totalQuantity = products.reduce((acc, product) => acc + parseFloat(product.quantity), 0);

  const resetForm = () => {
    setProducts([]);
    setManifestNumber(null); // Resetando o número do manifesto
    setIsReadyToSend(false); // Resetando a possibilidade de enviar
    setFileNames([])
  };

  return (
    
    <div className="container manifest">
      <h4 className="mb-4">Criar Manifesto</h4>

      {/* Formulário de Upload de Arquivo */}
      {!manifestNumber && (
        <div className="container">
          <div className="container mt-4">
            <div className="form-group file-upload-container">
              <label htmlFor="file-upload" className="form-label file-upload-btn">Escolher Arquivo XML</label>
              <input
                className="form-control file-upload-input"
                type="file"
                id="file-upload"
                accept=".xml"
                onChange={handleFileUpload}
                multiple
              />

              <span className="file-name">
              {fileNames.length > 0 ? fileNames.join(", ") : "Nenhum arquivo selecionado"}
              </span>
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
                      <button
                        className='btn btn-primary'
                        onClick={() => setShowModal(true)}>
                        Gerar manifesto
                      </button>
                    )}
                    <span><strong>Total Quantidade:</strong> {totalQuantity}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação */}
      {showModal && (
        <div className="modal-overlay" style={modalOverlayStyle}>
        <div className="modal-container">
          <div className="modal-header">
            <span>Confirmar geração</span>
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
              style={closeButtonStyle}
            >
              X
            </button>
          </div>
          <div className="modal-body">
            <p>Tem certeza que deseja gerar o manifesto com os itens?</p>
            <div className="table-container">
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
          </div>
          
          <div className="modal-footer">
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

      {/* Modal Spinner */}
      {loading && (
        <ModalSpinner />
      )}

      {/* Exibir o manifesto gerado */}
      {manifestNumber && (
        <div className="mt-4">
          <h4>Manifesto nº {manifestNumber} gerado</h4>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Item</th>
                  <th>Descrição</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {listProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.code}</td>
                    <td>{product.description}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-primary" onClick={resetForm}>
            Gerar Novo Manifesto
          </button>
        </div>
      )}
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
