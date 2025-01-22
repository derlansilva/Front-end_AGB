import React, { useEffect, useState } from 'react';

const ModalSpinner = ({ show, onClose }) => {
 
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
      <div>
        {/* Spans no topo */}
       

        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1050,
          }}
        >
          <div className="text-center">
            <div
              className="spinner-border text-light"
              role="status"
              style={{ width: '4rem', height: '4rem' }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-light mt-3">Enviando dados...</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ModalSpinner;
