import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Certifique-se de importar o Bootstrap JS

export default function ZM22() {
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [consultarMatricula, setConsultarMatricula] = useState("");
  const [usuarioConsultado, setUsuarioConsultado] = useState(null);

  // Função para adicionar usuário
  const adicionarUsuario = (e) => {
    e.preventDefault();
    if (!matricula || !nome) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    const novoUsuario = { matricula, nome };
    setUsuarios([...usuarios, novoUsuario]);
    setMatricula("");
    setNome("");
    alert("Usuário adicionado com sucesso!");
  };

  // Função para consultar usuário pela matrícula
  const consultarUsuario = () => {
    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.matricula === consultarMatricula
    );
    setUsuarioConsultado(usuarioEncontrado || null);
  };

  return (
    <div className="container mt-3">
      {/* Botão para abrir o modal de Adicionar Usuário */}
      <div className="text-end mb-3">
        <button
          className="btn btn-primary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#adicionarUsuarioModal"
        >
          Adicionar Novo Usuário
        </button>
      </div>

      {/* Modal para Adicionar Usuário */}
      <div
        className="modal fade"
        id="adicionarUsuarioModal"
        tabIndex="-1"
        aria-labelledby="adicionarUsuarioModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="adicionarUsuarioModalLabel">
                Adicionar Novo Usuário
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={adicionarUsuario}>
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    className="form-control form-control-sm"
                    placeholder="Digite o nome do usuário"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="matricula" className="form-label">
                    Matrícula
                  </label>
                  <input
                    type="text"
                    id="matricula"
                    className="form-control form-control-sm"
                    placeholder="Digite a matrícula"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-sm">
                  Adicionar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário para Consultar Usuário */}
      <div className="mt-4">
        <h4>Consultar Usuário por Matrícula</h4>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="consultarMatricula" className="form-label">
              Matrícula
            </label>
            <input
              type="text"
              id="consultarMatricula"
              className="form-control form-control-sm"
              placeholder="Digite a matrícula para consulta"
              value={consultarMatricula}
              onChange={(e) => setConsultarMatricula(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={consultarUsuario}>
          Consultar
        </button>

        {/* Exibir informações do usuário consultado */}
        {usuarioConsultado ? (
          <div className="alert alert-info mt-4">
            <h5>Usuário Encontrado</h5>
            <p><strong>Nome:</strong> {usuarioConsultado.nome}</p>
            <p><strong>Matrícula:</strong> {usuarioConsultado.matricula}</p>
          </div>
        ) : (
          <div className="alert alert-warning mt-4">
            <p>Usuário não encontrado.</p>
          </div>
        )}
      </div>

      {/* Exibir lista de usuários cadastrados */}
      <div className="mt-4">
        <h4>Lista de Usuários Cadastrados</h4>
        {usuarios.length === 0 ? (
          <p>Não há usuários cadastrados.</p>
        ) : (
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <table className="table table-bordered table-hover table-sm">
              <thead className="table-light">
                <tr>
                  <th>Nome</th>
                  <th>Matrícula</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario, index) => (
                  <tr key={index}>
                    <td>{usuario.nome}</td>
                    <td>{usuario.matricula}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
