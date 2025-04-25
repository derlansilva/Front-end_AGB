import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../pages/products/style/product.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const MB52 = () => {
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState({});
  const [activeTab, setActiveTab] = useState('stock');
  const [quantity, setQuantity] = useState('');
  const [occurrenceType, setOccurrenceType] = useState('entry');
  const [images, setImages] = useState([]);
  const [occurrenceHistory, setOccurrenceHistory] = useState([]);

  const fetchProduct = () => {
    if (!code.trim()) return;

    setDescription(`Produto: ${code} - Camiseta Azul Básica`);
    setPrice('49.90');
    setCategory('Moda Masculina');

    setProduct({
      quantity: 65,
      reservedStock: 8,
      totalStock: 57,
      stockHistory: [
        { date: '2025-04-15', type: 'entry', quantity: 50, balance: 50 },
        { date: '2025-04-16', type: 'exit', quantity: -10, balance: 40 },
        { date: '2025-04-17', type: 'exit', quantity: -5, balance: 35 },
        { date: '2025-04-18', type: 'entry', quantity: 30, balance: 65 },
      ],
      stores: [
        { name: 'Loja Centro', stock: 35 },
        { name: 'Loja Norte', stock: 22 }
      ]
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchProduct();
    }
  };

  const handleRegisterOccurrence = () => {
    if (!quantity || isNaN(quantity)) {
      alert('Por favor, insira uma quantidade válida.');
      return;
    }

    const newOccurrence = {
      id: Date.now(),
      date: new Date(),
      title: occurrenceType,
      quantity: quantity,
      user: "usuário atual",
      manifest: "123456",
      images: images
    };

    setOccurrenceHistory(prev => [...prev, newOccurrence]);
    setQuantity('');
    setImages([]);
  };

  const renderOccurrenceForm = () => (
    <div>
      <div className="row mt-3">
        <div className="col-md-4">
          <select
            className="form-select form-select-sm"
            value={occurrenceType}
            onChange={(e) => setOccurrenceType(e.target.value)}
          >
            <option value="entry">Entrada</option>
            <option value="shortage">Falta</option>
            <option value="excess">Excesso</option>
            <option value="damage">Dano no Produto</option>
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        {occurrenceType === 'damage' && (
          <div className="form-group upload-container col-md-4 mr-3">
            <input
              style={{ height: "30px" }}
              type="file"
              className="form-control upload-input"
              accept="image/*"
              multiple
              onChange={(e) => setImages([...images, ...Array.from(e.target.files)])}
            />
            <div className="file-names-container">
              {images.length > 0 ? images.map((file, i) => (
                <span key={i} className="file-name">
                  {file.name.length > 15 ? file.name.slice(0, 15) + "..." : file.name}
                </span>
              )) : ""}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3">
        <button className="btn btn-primary btn-sm" onClick={handleRegisterOccurrence}>
          Registrar Ocorrência
        </button>
      </div>
    </div>
  );

  const renderHistory = () => (
    <table className="mt-3 table table-bordered">
      <thead>
        <tr>
          <th>Data</th>
          <th>Operação</th>
          <th>Quantidade</th>
          <th>Usuário</th>
          <th>Manifesto</th>
        </tr>
      </thead>
      <tbody>
        {occurrenceHistory.length === 0 ? (
          <tr><td colSpan={5} className="text-center">Nenhuma ocorrência registrada</td></tr>
        ) : (
          occurrenceHistory.map(item => (
            <tr key={item.id}>
              <td>{format(new Date(item.date), "dd/MM/yyyy HH:mm:ss", { locale: ptBR })}</td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>{item.user}</td>
              <td>{item.manifest}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  const renderStock = () => (
    <div>
      <div className="col-md-12 mt-3">
        <div className="card">
          <div className="card-body">
            <h6>Estoque por Loja</h6>
            <table className="table table-bordered table-sm">
              <thead>
                <tr>
                  <th>Loja</th>
                  <th>Estoque Loja</th>
                  <th>Estoque Deposito</th>
                </tr>
              </thead>
              <tbody>
                {product?.stores?.length > 0 ? (
                  product.stores.map((store, i) => (
                    <tr key={i}>
                      <td>{store.name}</td>
                      <td>{store.stock}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="2" className="text-center">Nenhuma loja encontrada</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="col-md-12 mt-3">
        <div className="card">
          <div className="card-body">
            <h6>Histórico de Entrada e Saída</h6>
            <table className="table table-bordered table-sm">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Quantidade</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {product?.stockHistory?.length > 0 ? (
                  product.stockHistory.map((entry, i) => (
                    <tr key={i}>
                      <td>{entry.date}</td>
                      <td>{entry.type === 'entry' ? 'Entrada' : 'Saída'}</td>
                      <td>{entry.quantity > 0 ? `+${entry.quantity}` : entry.quantity}</td>
                      <td>{entry.balance}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" className="text-center">Nenhum histórico encontrado</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-1 pt-0">
      <div className="mb52-container">
        <div className="mb52-content">
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="code">Código</label>
              <input
                type="number"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ maxWidth: "200px"}}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                id="description"
                value={description}
                disabled
              />
            </div>

            <div className="form-group-inline">
              <div className="form-group">
                <label htmlFor="price">Preço</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Categoria</label>
                <input
                  type="text"
                  id="category"
                  value={category}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 pt-0 mb52-container">
        <div className="tab-buttons sticky-tab-buttons mb-1 mt-4 p-2">
          <button className={`tab-button ${activeTab === 'stock' ? 'active' : ''}`} onClick={() => setActiveTab('stock')}>Estoque</button>
          <button className={`tab-button ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>Histórico</button>
          <button className={`tab-button ${activeTab === 'occurrence' ? 'active' : ''}`} onClick={() => setActiveTab('occurrence')}>Registrar Ocorrência</button>
        </div>

        <div className="main-content-area">
          {activeTab === 'stock' && renderStock()}
          {activeTab === 'history' && renderHistory()}
          {activeTab === 'occurrence' && renderOccurrenceForm()}
        </div>
      </div>
    </div>
  );
};

export default MB52;
