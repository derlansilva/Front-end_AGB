import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando o hook useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductForm = () => {
  const navigate = useNavigate(); // Hook para navegação programática
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Simula um processamento de 2 segundos
    setTimeout(() => {
      setLoading(false);
      alert(`Produto cadastrado: ${productName}`);
      navigate('/home'); // Navegação para a página Home após o cadastro
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cadastro de Produto</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">Nome do Produto</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="Digite o nome do produto"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descrição</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              placeholder="Digite uma descrição do produto"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">Preço</label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Digite o preço do produto"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">Categoria</label>
            <select
              className="form-select"
              id="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecione a categoria</option>
              <option value="eletronicos">Eletrônicos</option>
              <option value="roupas">Roupas</option>
              <option value="alimentos">Alimentos</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Cadastrar Produto</button>
        </form>
      )}
    </div>
  );
};

export default ProductForm;
