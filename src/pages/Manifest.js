import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Manifest = () => {
  return (
    <div className="container mt-5">
    <h2 className="mb-4">Cadastro de Produto</h2>
    
      // Spinner de carregamento
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
   
      <form>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Nome do Produto</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            placeholder="Digite o nome do produto"
            required
           
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
        
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Categoria</label>
          <select
            className="form-select"
            id="category"
            required
            
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
    
  </div>
  );
};

export default Manifest;