import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header/Header.tsx";

export default function MB51() {
  const [manifestNumber, setManifestNumber] = useState("");
  const [xmlFile, setXmlFile] = useState(null);
  const [items, setItems] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setXmlFile(e.target.files[0]);
    setSuccess(false);
    setItems([]); // Limpar itens anteriores
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!xmlFile) {
      alert("Por favor, selecione um arquivo XML.");
      return;
    }

    if (xmlFile.type !== "text/xml" && xmlFile.type !== "application/xml") {
      alert("Por favor, selecione um arquivo XML válido.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(event.target.result, "application/xml");
      const ns = "http://www.portalfiscal.inf.br/nfe";

      // Extração dos itens
      const dets = xmlDoc.getElementsByTagNameNS(ns, "det");
      const parsedItems = [];
      for (let i = 0; i < dets.length; i++) {
        const prod = dets[i].getElementsByTagNameNS(ns, "prod")[0];
        if (prod) {
          const code = prod.getElementsByTagNameNS(ns, "cProd")[0]?.textContent || "";
          const description = prod.getElementsByTagNameNS(ns, "xProd")[0]?.textContent || "";
          const quantity = prod.getElementsByTagNameNS(ns, "qCom")[0]?.textContent || "";

          parsedItems.push({ code, description, quantity });
        }
      }

      setItems(parsedItems);
      setSuccess(true);
    };

    reader.readAsText(xmlFile);
  };

  const generateManifest = () => {
    alert("Manifesto gerado com sucesso!");
    // Aqui você pode adicionar a lógica para enviar os dados para o servidor ou fazer algo com os itens
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="row mb-4">
          <div className="col-md-4">
            <label htmlFor="manifestoNumber" className="form-label">
              Número do Manifesto
            </label>
            <input
              type="text"
              id="manifestoNumber"
              className="form-control form-control-sm"  // Reduzindo a altura
              placeholder="Digite o número do manifesto"
              value={manifestNumber}
              onChange={(e) => setManifestNumber(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="fileInput" className="form-label">
              Arquivo XML
            </label>
            <input
              type="file"
              id="fileInput"
              className="form-control form-control-sm"  // Reduzindo a altura
              accept=".xml"
              onChange={handleFileChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-sm">Submeter</button>  {/* Botão reduzido */}
      </form>

      {items.length > 0 && (
        <div className="mt-5">
          <h4 className="mb-3">Tabela de Itens</h4>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}> {/* Tabela com scroll */}
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Código</th>
                  <th>Descrição</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.code}</td>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-end">
            <button className="btn btn-success mt-3 btn-sm" onClick={generateManifest}>
              Gerar Manifesto
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
