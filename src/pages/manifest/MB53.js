import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { jsPDF } from "jspdf";

export default function MB53() {
  const [manifestos, setManifestos] = useState([
    {
      id: 1,
      nome: "Manifesto 001",
      dataCriacao: "2025-04-20",
      totalItens: 12,
      criador: "Derlan",
      notas: ["NF123", "NF456"],
      itens: ["Produto A", "Produto B"],
    },
    {
      id: 2,
      nome: "Manifesto 002",
      dataCriacao: "2025-04-21",
      totalItens: 8,
      criador: "Ana",
      notas: ["NF789"],
      itens: ["Produto X", "Produto Y"],
    },
  ]);

  const [selectedManifesto, setSelectedManifesto] = useState(null);

  const gerarPDF = (manifesto) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Manifesto: ${manifesto.nome}`, 10, 10);
    doc.text(`Data de Criação: ${manifesto.dataCriacao}`, 10, 20);
    doc.text(`Total de Itens: ${manifesto.totalItens}`, 10, 30);
    doc.save(`${manifesto.nome}.pdf`);
  };

  return (
    <div className="container mt-3">
      <h4 className="mb-4 text-dark">Lista de Manifestos Criados</h4>

      {manifestos.length === 0 ? (
        <p>Não há manifestos cadastrados.</p>
      ) : (
        <div className="d-flex flex-column gap-2">
          {manifestos.map((manifesto) => (
            <div
              key={manifesto.id}
              className="card shadow-sm px-3 py-2"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: "60px",
                cursor: "pointer",
              }}
              onClick={() => setSelectedManifesto(manifesto)} // Abre o modal
            >
              <div className="d-flex flex-column">
                <strong>{manifesto.nome}</strong>
                <small className="text-muted" style={{ fontSize: "0.85rem" }}>
                  Criado em: {manifesto.dataCriacao} | Total de Itens: {manifesto.totalItens}
                </small>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    const novoNome = prompt("Digite o novo nome para o manifesto:");
                    if (novoNome) {
                      setManifestos((prev) =>
                        prev.map((m) =>
                          m.id === manifesto.id ? { ...m, nome: novoNome } : m
                        )
                      );
                    }
                  }}
                >
                  <i className="bi bi-pencil-square"></i> Atualizar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm("Você tem certeza que deseja excluir este manifesto?")) {
                      setManifestos((prev) => prev.filter((m) => m.id !== manifesto.id));
                    }
                  }}
                >
                  <i className="bi bi-trash"></i> Excluir
                </button>
                <button
                  className="btn btn-success btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    gerarPDF(manifesto);
                  }}
                >
                  <i className="bi bi-download"></i> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedManifesto && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelectedManifesto(null)}
        >
          <div
            className="modal-dialog"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalhes do Manifesto</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedManifesto(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Nome:</strong> {selectedManifesto.nome}</p>
                <p><strong>Criado por:</strong> {selectedManifesto.criador}</p>
                <p><strong>Data de Criação:</strong> {selectedManifesto.dataCriacao}</p>
                <p><strong>Total de Itens:</strong> {selectedManifesto.totalItens}</p>
                <p><strong>Notas Fiscais:</strong></p>
                <ul>
                  {selectedManifesto.notas.map((nf, idx) => (
                    <li key={idx}>{nf}</li>
                  ))}
                </ul>
                <p><strong>Itens:</strong></p>
                <ul>
                  {selectedManifesto.itens.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedManifesto(null)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
