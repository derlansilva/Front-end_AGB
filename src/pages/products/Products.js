import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/product.css';
import apiServices from '../../services/apiServices';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa os ícones do Bootstrap
import { Button, Modal } from 'bootstrap';

const Product = () => {
  const [productCode, setProductCode] = useState('');
  const [product, setProduct] = useState({});
  const [description, setDescription] = useState('');
  const [activeTab, setActiveTab] = useState('estoque');
  const [historyData, setHistoryData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [ocorrenciaType, setOcorrenciaType] = useState('entrada');
  const [quantidade, setQuantidade] = useState('');

  const [photos, setPhotos] = useState([]);

  const handleRegistrarOcorrencia = () => {
    if (!quantidade || isNaN(quantidade)) {
      alert('Por favor, insira uma quantidade válida.');
      return;
    }

    const novaOcorrencia = {
      type: ocorrenciaType,
      quantity: parseInt(quantidade),
      date: new Date().toLocaleString(), // Data da ocorrência
      photos: photos, // Adicionando as fotos, se houver
    };

    console.log('Ocorrência registrada:', novaOcorrencia);

    // Limpar os campos após o registro
    setQuantidade('');

    setPhotos([]);
  }

  const handleSearch = async () => {
    try {
      const response = await apiServices.getProductById(productCode);

      console.log(response.ocorrence)
      setHistoryData(response.ocorrence)
      setProduct(response)
      console.log(response)
    } catch (error) {
      console.error('Erro ao buscar o produto', error);
    }
  };
  const renderEstoque = () => {
    return (
      <div>
        <h5>Estoque de Produtos</h5>
        <div className="row">
          {/* Informações do estoque disponível e reservado */}
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-around"> {/* Usando justify-content-around para aproximar */}
                  <div className="text-center">
                    <h6>Estoque Disponível:</h6>
                    <p>{product.quantity || 0}</p>
                  </div>
                  <div className="text-center">
                    <h6>Estoque Reservado:</h6>
                    <p>{product.reservedStock || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabela de Histórico de Entradas e Saídas */}
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h6>Histórico de Entradas e Saídas</h6>
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Tipo</th>
                      <th>Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.stockHistory && product.stockHistory.length > 0 ? (
                      product.stockHistory.map((entry, index) => (
                        <tr key={index}>
                          <td>{entry.date}</td>
                          <td>{entry.type === 'entrada' ? 'Entrada' : 'Saída'}</td>
                          <td>{entry.quantity > 0 ? `+${entry.quantity}` : entry.quantity}</td>
                          <td>{entry.balance}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">Nenhum histórico encontrado</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const renderHistorico = () => {
    return (
      <div>
        <h5>Histórico de Consultas</h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Data</th>
              <th>Operação</th>
              <th>Quantidade</th>
              <th>Usuario</th>
              <th>Manifesto</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item, index) => (
              <tr key={item.id}>
                <td>{item.data}</td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>{item.unitPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderRegistrarOcorrencia = () => {
    return (
      <div>
        <h5>Registrar Ocorrência</h5>
        <div className="row">
          <div className="col-md-4">
            <select
              className="form-select form-select-sm"
              value={ocorrenciaType}
              onChange={(e) => setOcorrenciaType(e.target.value)}
            >
              <option value="entrada">Entrada</option>
              <option value="falta">Falta</option>
              <option value="sobra">Sobra</option>
              <option value="avaria">Avaria de Produto</option>
            </select>
          </div>

          <div className="col-md-4">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Quantidade"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
          </div>

          {ocorrenciaType === 'avaria' && (

            <div className="form-group upload-container col-md-4 mr-3">
              <label htmlFor="imageUpload" className="form-label upload-btn">Escolher Foto da Avaria</label>
              <input
                type="file"
                id="imageUpload"
                className="form-control upload-input"
                accept="image/*"
                multiple
                onChange={(e) => setPhotos(prevPhotos => [...prevPhotos, ...Array.from(e.target.files)])}
              />
              <div className="file-names-container">
                {photos.length > 0 ?
                  photos.map((file, index) => (
                    <span key={index} className="file-name">
                      {file.name.length > 15 ? file.name.substring(0, 15) + "..." : file.name}
                    </span>
                  ))
                  : "Nenhum arquivo selecionado"}
              </div>
            </div>
          )}



        </div>

        <div className="mt-3">
          <button
            className="btn btn-primary btn-sm"
            onClick={handleRegistrarOcorrencia}
          >
            Registrar Ocorrência
          </button>
        </div>
      </div>
    );
  };


  return (
    <div className="product-consultation">
      <div className="top-section">
        <div className="left-column">
          <div className="input-group">
            <form>
              <div className="input-group">
                <div className="input-field">
                  <label htmlFor="productCode" className="input-label">Código</label>
                  <div className="input-with-button">
                    <input
                      type="number"
                      id="productCode"
                      className="small-input"
                      placeholder="Código"
                      value={productCode}
                      onChange={(e) => setProductCode(e.target.value)}
                    />
                    <button
                      type="button"
                      className="search-button"
                      onClick={handleSearch}
                    >
                      <i className="bi bi-search"></i>
                    </button>


                  </div>
                </div>
              </div>

            </form>

            <div className="input-field">
              <label htmlFor="productName" className="input-label">Descrição</label>
              <input type="text" id="productName" value={product.description} className="small-input" placeholder="Descrição" disabled />
            </div>
          </div>

          <div className="input-group-inline">
            <div className="input-inline">
              <label htmlFor="productCategory" className="input-label">Categoria</label>
              <input type="text" id="productCategory" className="form-control form-control-sm" placeholder="Categoria" disabled />
            </div>
            <div className="input-inline">
              <label htmlFor="productPrice" className="input-label">Preço</label>
              <input type="text" id="productPrice" value={product.price} className="form-control form-control-sm" placeholder="Preço" disabled />
            </div>
          </div>

        </div>

        <div className='right-column'>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)} >Cadastrar Novo Produto</button>
        </div>
      </div>



      {/* Navegação entre as seções */}
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'estoque' ? 'active' : ''}`}
          onClick={() => setActiveTab('estoque')}
        >
          Estoque
        </button>
        <button
          className={`tab-button ${activeTab === 'historico' ? 'active' : ''}`}
          onClick={() => setActiveTab('historico')}
        >
          Histórico
        </button>
        <button
          className={`tab-button ${activeTab === 'ocorrencia' ? 'active' : ''}`}
          onClick={() => setActiveTab('ocorrencia')}
        >
          Registrar Ocorrência
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'estoque' && renderEstoque()}
        {activeTab === 'historico' && renderHistorico()}
        {activeTab === 'ocorrencia' && renderRegistrarOcorrencia()}
      </div>

      {/* Modal de Confirmação */}
      {showModal && (
        <div className="modal-overlay" style={modalOverlayStyle}>
          <div className="modal-container">
            <div className="modal-header">
              <span>Cadastrar produto</span>
              <button
                className="close-button"
                onClick={() => setShowModal(false)}
                style={closeButtonStyle}
              >
                X
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="productCode">Código</label>
                  <input
                    type="text"
                    id="productCode"
                    className="form-control"

                    // Atualiza o estado com o valor do código
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productDescription">Descrição</label>
                  <input
                    type="text"
                    id="productDescription"
                    className="form-control"
                    // Atualiza o estado com o valor da descrição
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productCategory">Categoria</label>
                  <select
                    id="productCategory"
                    className="form-control"

                    // Atualiza o estado com a categoria selecionada
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="perfumaria">Perfumaria</option>
                    <option value="locao">Loção</option>
                    <option value="sabonete">Sabonete</option>
                    <option value="rosto">Rosto</option>
                  </select>
                </div>
              </form>
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
                // Adicione a função de confirmação
                style={confirmButtonStyle}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Product;


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


