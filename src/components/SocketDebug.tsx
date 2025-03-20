import React, { useState, useEffect } from 'react';

const SocketDebug: React.FC = () => {
  const [status, setStatus] = useState('Verificando...');
  const [ioExists, setIoExists] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Verificar a cada 500ms se o socket.io está disponível
      const interval = setInterval(() => {
        const hasIO = typeof window.io !== 'undefined';
        setIoExists(hasIO);
        setStatus(hasIO ? 'Socket.IO está disponível!' : 'Socket.IO ainda não está disponível...');
        
        if (hasIO) {
          clearInterval(interval);
        }
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '10px', left: '10px', padding: '10px', background: '#222', color: ioExists ? '#4caf50' : '#f44336', borderRadius: '4px', zIndex: 9999 }}>
      {status}
    </div>
  );
};

export default SocketDebug; 