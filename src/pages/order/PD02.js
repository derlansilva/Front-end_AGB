import React, { useState } from "react";
import apiServices from "../../services/apiServices";

export default function PD02() {
  const [orderNumber, setOrderNumber] = useState("");
  const [status, setStatus] = useState("");
  const [generationDate, setGenerationDate] = useState("");
  const [activeTab, setActiveTab] = useState("items");
  const [code, setCode] = useState('');
  const [items , setItems] = useState([]);

  const handleSearch = () => {
    // Aqui você vai buscar o pedido pela API
    console.log("Searching for order:", orderNumber);
    // Simula preenchimento:
    fetchOrder()

  };


  // Função para buscar produto através da API
  const fetchOrder = async () => {
    if (!orderNumber.trim()) return;

    try {
      // Substitua a URL pela da sua API real
      const response = await apiServices.getOrderByCode(`${orderNumber}`);

      
      setGenerationDate(response.releaseDate)
      setItems(response.itemDTO)

      switch(response.status){
        case "PENDING":
          setStatus("Pendente")
          break;

          case "CONFERED":
            setStatus("Conferido")
            break;
          case "CONFERED":
            setStatus("Finalizado")
          break;

      }
      console.log(response)

      // Caso a consulta retorne dados válidos
      /*if (response != null) {
 
        console.log("to no if")
        const productData = response.data;
 
        setDescription(productData.description || `Produto: ${code}`);
        setPrice(productData.price || '49.90');
        
        /*
        setProduct({
          quantity: productData.quantity || 0,
          reservedStock: productData.reservedStock || 0,
          totalStock: productData.totalStock || 0,
          stockHistory: productData.stockHistory || [],
          stores: productData.stores || []
        });
        */
      // } else {
      // alert('Produto não encontrado');
      //}
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      alert('Erro ao buscar produto');
    }
  };


  return (
    <div className="container mt-1 pt-0" style={styles.container}>

      <div style={styles.form}>
        <div style={styles.formGroup}>
          <label>Pedido</label>
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            style={styles.input}
          />


        </div>

        <div style={styles.formGroup}>
          <label>Status</label>
          <input type="text" value={status} disabled style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label>Gerado</label>
          <input
            type="text"
            value={generationDate}
            disabled
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.tabContainer}>
        <button
          className="btn "
          style={activeTab === "items" ? styles.activeTabButton : styles.tabButton}
          onClick={() => setActiveTab("items")}
        >
          Itens
        </button>
        <button
          className="btn "
          style={activeTab === "history" ? styles.activeTabButton : styles.tabButton}
          onClick={() => setActiveTab("history")}
        >
          Histórico
        </button>
      </div>




      <div style={styles.tableContainer}>
        {activeTab === "items" ? (

          <div className="col-md-12 mt-3">
            <div className="card">
              <div className="card-body">
                <h6>Estoque por Loja</h6>
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Descrição</th>
                      <th>Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item , index) => (
                      <tr key={index}>
                        <td>{item.sku}</td>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        ) : (

          <div className="col-md-12 mt-3">
            <div className="card">
              <div className="card-body">
                <h6>Itens</h6>
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Ocorrência</th>
                      <th>Usuario</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                      <tr>
                        <td>1233</td>
                        <td>contagem</td>
                        <td>derlan</td>
                      </tr>
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "sans-serif",
  },
  form: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  formGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    padding: "8px",
    fontSize: "14px",
    width: "200px",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  tabContainer: {
    display: "flex",
    //marginBottom: "10px",
    gap: "10px",
    marginTop: "40px"
  },
  tabButton: {
    padding: "6px 0px", // Mais fininho (menos altura)
    backgroundColor: "#f1f1f1",
    border: "1px solid #ccc",
    cursor: "pointer",
    width: "150px", // Botão mais comprido
    textAlign: "center",
    fontSize: "14px",
  },
  activeTabButton: {
    padding: "6px 0px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "1px solid #ccc",
    cursor: "pointer",
    width: "150px",
    textAlign: "center",
  },

  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #ccc",
    padding: "8px",
    backgroundColor: "#f9f9f9",
  },
  td: {
    border: "1px solid #ccc",
    padding: "8px",
  },
};
