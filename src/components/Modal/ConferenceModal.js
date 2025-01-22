import React, { useEffect, useState } from 'react';

const ConferenceModal = ({ show, onClose }) => {
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isBarcodeEntered, setIsBarcodeEntered] = useState(false);
  const [items, setItems] = useState([
    { item: 12345, description: "Desodorante Colônia Malbec Gol", quantity: 5 },
    { item: 23456, description: "Perfume Egeo Dolce Feminino", quantity: 10 },
    { item: 34567, description: "Kit Barba e Cabelo Beardo", quantity: 15 },
    { item: 45678, description: "Shampoo Herbal Essences", quantity: 20 },
    { item: 56789, description: "Loção Hidratante Nativa SPA", quantity: 25 },
    { item: 67890, description: "Desodorante Antitranspirante Dove", quantity: 30 },
    { item: 78901, description: "Perfume Malbec Black", quantity: 35 },
    { item: 89012, description: "Creme Hidratante Eudora", quantity: 40 },
    { item: 90123, description: "Colônia Nativa SPA O Boticário", quantity: 45 },
    { item: 10234, description: "Desodorante Masculino Boticário", quantity: 50 }
  ]);

  const handleBarcodeScan = (e) => {
    const scannedValue = e.target.value;
    setBarcode(scannedValue);

    if (scannedValue) {
      setIsBarcodeEntered(true);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    
  };

  
  const addItemToTable = () => {
    if (barcode && quantity) {
      const newItem = { description: barcode, quantity: quantity };
      setItems((prevItems) => {
        const updatedItems = [...prevItems, newItem];
        if (updatedItems.length > 10) {
          updatedItems.shift(); // Remover o item mais antigo se o limite for ultrapassado
        }
        return updatedItems;
      });
      setBarcode("");
      setQuantity("");
      setIsBarcodeEntered(false);
    }
  };

  if (!show) {
    return null;
  }

  
  return (

    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
      }}
    >
      {/* Quadrado central */}
      <div
        style={{
          width: "90%",
          maxWidth: "1200px",
          height: "95%",
          backgroundColor: "#1e1e1e",
          borderRadius: "10px",
          color: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Spans no topo */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "20px",
          }}
        >
          <span className="badge bg-primary">Total: 100</span>
          <span className="badge bg-success">Conferidos: 80</span>
          <span className="badge bg-danger">Faltas: 20</span>
        </div>

        {/* Modais centrais */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          {/* Modal para código de barras */}
          <div
            className="card text-dark"
            style={{
              width: "45%",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <h5 className="card-title">Código de Barras</h5>
            <input
              type="text"
              className="form-control mt-3"
              onChange={handleBarcodeScan}
              value={barcode}
              style={{
                fontSize: "18px",
                textAlign: "center",
                backgroundColor: "#f0f0f0",
                width: "100%", // O input vai ocupar toda a largura
              }}
            />
          </div>

          {/* Modal para quantidade (aparece somente depois de digitar código de barras) */}
          {isBarcodeEntered && (
            <div
              className="card text-dark"
              style={{
                width: "45%",
                padding: "20px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h5 className="card-title">Quantidade</h5>
              <input
                type="number"
                className="form-control mt-3"
                onChange={handleQuantityChange}
                value={quantity}
                style={{
                  fontSize: "18px",
                  textAlign: "center",
                  backgroundColor: "#f0f0f0",
                  width: "100%", // O input vai ocupar toda a largura
                }}
              />
            </div>
          )}
        </div>

      
          <div
            style={{
              marginTop: "20px",
              maxHeight: "200px", // Define a altura máxima da tabela
              overflowY: "auto", // Permite rolagem quando o conteúdo exceder o tamanho
            }}
          >
            
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Descrição</th>
                  <th scope="col">Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.item}</td>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        
        {/* Botões na parte inferior */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        >
          <button
            className="btn btn-danger"
            style={{ width: "45%" }}
            onClick={() => onClose("interrupted")}
          >
            Interromper
          </button>
          <button
            className="btn btn-success"
            style={{ width: "45%" }}
            onClick={() => onClose("finished")}
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>

  );
};

export default ConferenceModal;
