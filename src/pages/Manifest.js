import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Manifest = () => {
    const [fileContent , setFileContent] = useState("");
    

    const handleFileChange = (event ) => {
        const file  = event.target.file[0];
        if(file && file.type == "text/xml"){
            const reader = new FileReader();

            reader.onload = (e) => {
                setFileContent(e.target.result);
            };

            reader.readAsText(file);
        }else{
            alert("Por favor , Selecione um arquivo XML valido ");
        }
    }
  return (
    <div className="container mt-5">
    <h2 className="mb-4">Gerar Manifesto</h2>
    
    
   
    <div className="container">
      <h3>Upload de Arquivo XML</h3>
      <div className="mb-3">
        <input
          type="file"
          accept=".xml"
          onChange={handleFileChange}
          className="form-control"
        />
      </div>
      {fileContent && (
        <div>
          <h4>Conteúdo do Arquivo:</h4>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
    
  </div>
  );
};

export default Manifest;