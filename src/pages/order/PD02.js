import React, { useState } from 'react';
import axios from 'axios';

export default function PD02() {
  const [copiedData, setCopiedData] = useState('');
  const [message, setMessage] = useState('');
  
  const handlePasteData = async () => {
    try {
      if (!copiedData.trim()) {
        setMessage("Por favor, cole os dados primeiro.");
        return;
      }

      // Enviar os dados copiados diretamente para o backend
      const response = await axios.post('http://localhost:8080/api/upload', { data: copiedData });
      setMessage("Dados enviados com sucesso!");
      console.log(response.data); // Aqui você pode processar a resposta conforme necessário
    } catch (error) {
      setMessage("Erro ao enviar os dados.");
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>MiniSAP - Upload de Dados</h1>
      <textarea
        value={copiedData}
        onChange={(e) => setCopiedData(e.target.value)}
        placeholder="Cole os dados aqui"
        rows={10}
        cols={50}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <div>
        <button onClick={handlePasteData} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
          Enviar Dados
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
}
