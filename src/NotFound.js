import React from 'react';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', color: '#1b5e20' }}>
      <h1 style={{ fontSize: '72px', margin: '0' }}>🌱</h1>
      <h2 style={{ fontSize: '48px', marginTop: '10px' }}>404</h2>
      <h3>Lost in the Fields?</h3>
      <p>The page you are looking for has been harvested or moved.</p>
      <button 
        onClick={() => window.location.href = "/"}
        style={{ 
          backgroundColor: '#2e7d32', 
          color: 'white', 
          padding: '12px 24px', 
          border: 'none', 
          borderRadius: '25px', 
          cursor: 'pointer', 
          fontWeight: 'bold',
          marginTop: '20px'
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;