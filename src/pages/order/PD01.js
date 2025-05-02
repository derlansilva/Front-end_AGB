import React, { useState, useRef, useEffect } from "react";
import apiServices from "../../services/apiServices";
import "./style/styles.css";

const PD01 = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [itemBarcode, setItemBarcode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isOrderLocked, setIsOrderLocked] = useState(false);

  const orderInputRef = useRef(null);  // Ref para o input de pedido
  const itemInputRef = useRef(null);   // Ref para o input de item

  // Função para buscar e validar o pedido
  const handleScanOrder = async () => {
    setMessage("");
    setError("");
    setOrderData(null);

    if (!orderNumber) {
      setError("Por favor, bipar o número do pedido.");
      return;
    }

    try {
      const response = await apiServices.getOrderByCode(orderNumber);

      const data = response;
      console.log(data);

      if (!data) {
        setError("Pedido não encontrado.");
        return;
      }

      if (data.status === "FINISHED") {
        setError(`O pedido já está finalizado.`);
        return;
      }

      if (data.status === "PENDING") {
        setOrderData(data);
        setIsOrderLocked(true);
        setTimeout(() => {
          itemInputRef.current && itemInputRef.current.focus();
        }, 100);
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar o pedido.");
    }
  };

  // Função para validar o item conferido
  const handleScanItem = () => {
    if (!itemBarcode) return;

    setMessage("");
    setError("");

    const updatedItems = [...orderData.items];
    const index = updatedItems.findIndex(
      (item) => item.barCode === itemBarcode
    );

    if (index !== -1) {
      if (updatedItems[index].quantity > 1) {
        updatedItems[index].quantity -= 1;
      } else {
        updatedItems.splice(index, 1);
      }
      setOrderData({ ...orderData, items: updatedItems });
      setMessage("Item conferido com sucesso.");
    } else {
      setError("Este item não pertence ao pedido.");
    }

    setItemBarcode("");
    itemInputRef.current && itemInputRef.current.focus();
  };

  // Efeito para conferir o pedido automaticamente assim que o código do pedido for inserido
  useEffect(() => {
    if (orderNumber.trim() !== "") {
      handleScanOrder();
    }
  }, [orderNumber]);

  // Efeito para conferir o item automaticamente assim que o código do item for inserido
  useEffect(() => {
    if (itemBarcode.trim() !== "") {
      handleScanItem();
    }
  }, [itemBarcode]);

  // Função para finalizar a conferência
  const handleFinishConference = () => {
    setOrderData(null);
    setOrderNumber("");
    setIsOrderLocked(false);
    setMessage("");
    setError("");
    setItemBarcode("");
    setTimeout(() => {
      orderInputRef.current && orderInputRef.current.focus();
    }, 100);
  };

  // Função para voltar ao estado inicial ao pressionar "Enter"
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleFinishConference();
    }
  };

  return (
    <div className="container mt-1">
      <h5>Conferência de Pedido</h5>
      <hr></hr>

      {/* Input para o número do pedido */}
      {!isOrderLocked && (
        <div className="mt-3">
          <label htmlFor="orderInput" className="form-label">
            Bipar Pedido:
          </label>
          <input
            type="text"
            id="orderInput"
            className="form-control"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Digitar ou bipar o número do pedido"
            ref={orderInputRef}
            style={{ width: "300px", height: "40px" }}
            onKeyDown={handleKeyDown} // Detecta o "Enter"
          />
        </div>
      )}

      {/* Dados do pedido e input para conferir itens */}
      {orderData && (
        <div className="mt-4">
          {/* Input para o código do item */}
          <div className="mt-3 d-flex align-items-center">
            <input
              type="text"
              id="itemInput"
              className="form-control"
              value={itemBarcode}
              onChange={(e) => setItemBarcode(e.target.value)}
              placeholder="Digitar ou bipar o código do item"
              ref={itemInputRef}
              style={{ width: "260px", height: "40px" }}
              onKeyDown={handleKeyDown} // Detecta o "Enter"
            />
            <h5 className="ms-3 mb-0">Pedido: {orderData.orderNumber}</h5>
          </div>

          {/* Tabela de itens a conferir */}
          <div className="mt-4">
            <h7>Itens a Conferir:</h7>
            {orderData.items.length === 0 ? (
              <>
                <p className="text-success">Todos os itens foram conferidos!</p>
                <button
                  className="btn btn-primary"
                  onClick={handleFinishConference}
                >
                  Finalizar Conferência
                </button>
              </>
            ) : (
              <div
                style={{
                  maxHeight: orderData.items.length > 5 ? "200px" : "auto",
                  overflowY: orderData.items.length > 5 ? "auto" : "visible",
                }}
              >
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Ean</th>
                      <th>Descrição</th>
                      <th>Quantidade Restante</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.barCode}</td>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PD01;
