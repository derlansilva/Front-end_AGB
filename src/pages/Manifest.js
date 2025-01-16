
import React, { useState } from 'react';


const Manifest = () => {
  const [products, setProducts] = useState([])


  const handleFileUpload = (event) => {
    const files = event.target.files;
    const parser = new DOMParser();
    const allProducts = [];

    Array.from(files).forEach((file, fileIndex) => {
      const reader = new FileReader();

      reader.onload = (e) => {

        const xml = parser.parseFromString(e.target.result, "application/xml");
        const items = Array.from(xml.getElementsByTagName("det")).map((item) => {
          const cProd = item.getElementsByTagName("cProd")[0]?.textContent || "";
          const xProd = item.getElementsByTagName("xProd")[0]?.textContent || "";
          const qCom = item.getElementsByTagName("qCom")[0]?.textContent || "";
          return { item: cProd, description: xProd, quantity: qCom }
        });
        allProducts.push(...items)

        if (fileIndex === files.length - 1) {
          setProducts((prev) => [...prev, ...allProducts]);
        }
      };
      reader.readAsText(file);
    });
  };


  const handleGenerateManifest = () => {
    if (products.length === 0) {
      alert("Nenhum produto carregado.");
      return;
    }

    // Aqui você pode realizar as ações necessárias para gerar o manifesto
    alert("Manifesto gerado com sucesso!");
  };

  
  const totalQuantity   = products.reduce((acc , product) => acc + product.quantity , 0)


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Gerar Manifesto</h2>



      <div className="container">
        <div className="container mt-4">
          <div className="mb-3">
            <label htmlFor="file-upload" className="form-label">Escolher Arquivo XML</label>
            <input
              type="file"
              id="file-upload"
              accept=".xml"
              className="form-control form-control-lg"
              onChange={handleFileUpload}
              multiple
            />
          </div>
          {products.length > 0 && (
            <>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>Item</th>
                      <th>Descrição</th>
                      <th>Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td>{product.item}</td>
                        <td>{product.description}</td>
                        <td>{product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <button
                  className="btn btn-success"
                  onClick={handleGenerateManifest}
                >
                  Gerar Manifesto
                </button>
                <span><strong>Total Quantidade:</strong> {totalQuantity}</span>
              </div>
            </>
          )}
        </div>


      </div>

    </div>
    /*
    <div className="container mt-4">
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <button className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Novo Manifest</button>
        </div>
  
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
  
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Nº do Manifesto..."
          />
          <button className="btn btn-primary">Consultar</button>
        </div>
      </div>
  
   
      <h2>Manifesto em aberto</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Column 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>23245</td>
            <td>Malbec sport</td>
            <td>30</td>
            <td>Data 3</td>
          </tr>
          <tr>
            <td>22345</td>
            <td>NTP loção desodorante corporal orquidea noire</td>
            <td>26</td>
            <td>Data 6</td>
          </tr>
        </tbody>
      </table>
    </div>*/
  );
};

export default Manifest;