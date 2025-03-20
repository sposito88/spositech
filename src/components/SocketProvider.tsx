import React, { useState, useEffect } from 'react';
import Script from 'next/script';

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socketInitialized, setSocketInitialized] = useState(false);

  // Verifica se o socket.io está disponível e inicializa
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkIO = () => {
      if (typeof window.io !== 'undefined') {
        console.log('Socket.IO encontrado e disponível');
        setSocketInitialized(true);
      } else {
        console.log('Aguardando Socket.IO...');
        setTimeout(checkIO, 500);
      }
    };

    checkIO();
  }, []);

  return (
    <>
      {/* O script principal do Socket.IO está no _document.tsx */}
      {children}
    </>
  );
};

export default SocketProvider; 