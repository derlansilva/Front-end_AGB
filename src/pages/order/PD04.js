import React, { useState } from "react";
import apiServices from "../../services/apiServices"; // Certifique-se de ter os métodos adequados em seu serviço API
import "./style/styles.css";

const PD04 = () => {
  const [status, setStatus] = useState("pending");  // Status padrão "PENDING"
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [error, setError] = useState("");

  // Função para buscar os pedidos com o status selecionado
  const handleSearchOrders = async () => {
    setError(""); // Limpar qualquer erro anterior
    try {
        console.log(status)
        const statusString = toString(status);
        setOrders([])
       const response = await apiServices.getOrdersByStatus("pending");  // Método para consultar o backend com base no status

       console.log(response)
      if (!response || response.length === 0) {
        setError("Nenhum pedido encontrado.");
        setOrders([]);
        setTotalOrders(0);
        
        return;
      }

      console.log(response.data.length)
      console.log(status)
      setOrders(response.data);
      setTotalOrders(response.data.length);
   
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar os pedidos.");
    }
  };

  return (
    <div className="container mt-1">
      <h5>Consulta de Pedidos</h5>
      <hr />

      {/* Input para selecionar o status */}
      <div className="mt-3">
        <label htmlFor="statusSelect" className="form-label">
          Selecione o status:
        </label>
        <div className="d-flex">
          <select
            id="statusSelect"
            className="form-select btn-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            
            style={{
                width: "200px",
                height: "30px",
             
              }}
          >
            <option value="pending">Pendente</option>
            <option value="finished">Finalizado</option>
          </select>
          <button
            className="btn btn-primary ms-2  btn-sm"
            onClick={handleSearchOrders}
            style={{ height: "30px" }}
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Exibe a mensagem de erro, caso haja */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {totalOrders > 0 ?<h6 className="mt-4">
          Total de pedidos {status === "pending" ? "pendentes" : "finalizados"}:{" "}
          {totalOrders}
        </h6> : ""}
      {/* Texto com o total de pedidos */}
      <div className="mt-3"
      style={{
        maxHeight: orders.length > 5 ? "200px" : "auto",
        overflowY: orders.length > 5 ? "auto" : "visible",
      }}
      >
      </div>

      {/* Lista de pedidos */}
      {orders.length > 0 && (
        <div className="mt-1 table-responsive"  style={{ maxHeight: "250px", overflowY: "auto" }}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Status</th>
                <th>Data</th>
                <th>Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.orderNumber}</td>
                  {order.status === "PENDING" ?
                  <td>Pendente</td>:
                  <td>Finalizado</td>
                }
                  <td>{order.releaseDate}</td>
                  <td>
                    <button className="btn btn-info btn-sm">Detalhes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PD04;
