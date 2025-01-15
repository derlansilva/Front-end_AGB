// src/components/Conferencia.js
import React, { useState , useEffect } from "react";

const Conferencia = () => {
  // Estados para as quantidades
  const [codigoBarras, setCodigoBarras] = useState(""); // Código de barras lido
  const [quantidadeConferida, setQuantidadeConferida] = useState(0); // Quantidade conferida
  const [emModoDeQuantidade, setEmModoDeQuantidade] = useState(false); // Controla se o input está no modo de quantidade
  const [total, setTotal] = useState(100); // Total de itens a serem conferidos (exemplo)

  // Função para simular a leitura do código de barras
  const handleCodigoBarras = (event) => {
    const codigo = event.target.value;

    if (codigo) {
      setCodigoBarras(codigo);
      setEmModoDeQuantidade(true); // Altera para o modo de quantidade
    }
  };

  // Função para atualizar a quantidade conferida
  const handleQuantidadeConferida = (event) => {
    const value = Math.max(0, Math.min(event.target.value, total)); // Limita entre 0 e o total
    setQuantidadeConferida(value);
  };

  // Efeito para retornar ao modo de código de barras automaticamente após inserir a quantidade
  useEffect(() => {
    if (quantidadeConferida > 0) {
      // Se a quantidade conferida for maior que zero, volta ao modo de código de barras
      setEmModoDeQuantidade(false);
      setCodigoBarras(""); // Limpa o código de barras
      setQuantidadeConferida(0); // Limpa a quantidade conferida
    }
  }, [quantidadeConferida]);

  return (
    <section className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="text-center p-4 border rounded" style={{ width: "400px" }}>
        <h3>Conferência de Itens</h3>

        <div className="row mb-3">
          <div className="col-6">
            <p><strong>Itens Conferidos:</strong> {quantidadeConferida}</p>
          </div>
          <div className="col-6">
            <p><strong>Faltando:</strong> {total - quantidadeConferida}</p>
          </div>
        </div>

        {/* Input para Código de Barras */}
        {!emModoDeQuantidade ? (
          <div>
            <input
              type="text"
              className="form-control mb-3"
              value={codigoBarras}
              onChange={handleCodigoBarras}
              placeholder="Escaneie o código de barras"
            />
            <p>{codigoBarras ? `Código: ${codigoBarras}` : "Aguardando código..."}</p>
          </div>
        ) : (
          // Input para a quantidade conferida após ler o código de barras
          <div>
            <input
              type="number"
              className="form-control mb-3"
              value={quantidadeConferida}
              onChange={handleQuantidadeConferida}
              placeholder="Quantidade conferida"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Conferencia;
