import { useState, useEffect } from 'react';

// Hook simplificado para usar o Socket.IO
export const useSocket = (url?: string) => {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const serverUrl = url || window.location.origin;
    let socketInstance: any = null;
    let retryCount = 0;
    const maxRetries = 5;
    
    // Função para tentar inicializar o socket
    const initSocket = () => {
      // Verifica se o io está disponível globalmente
      if (typeof window.io === 'undefined') {
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Socket.IO ainda não disponível. Tentativa ${retryCount}/${maxRetries}`);
          setTimeout(initSocket, 500);
        } else {
          setError('Não foi possível carregar o Socket.IO após várias tentativas.');
        }
        return;
      }
      
      try {
        console.log(`Iniciando Socket.IO para ${serverUrl}`);
        socketInstance = window.io(serverUrl);
        
        socketInstance.on('connect', () => {
          console.log('Socket conectado com ID:', socketInstance.id);
          setIsConnected(true);
          setError(null);
        });
        
        socketInstance.on('connect_error', (err: any) => {
          console.error('Erro de conexão:', err);
          setIsConnected(false);
          setError(`Erro de conexão: ${err.message}`);
        });
        
        socketInstance.on('disconnect', (reason: string) => {
          console.log('Socket desconectado:', reason);
          setIsConnected(false);
        });
        
        setSocket(socketInstance);
      } catch (err: any) {
        console.error('Erro ao inicializar socket:', err);
        setError(`Erro ao inicializar: ${err.message}`);
      }
    };
    
    // Espera um pouco para garantir que os scripts sejam carregados
    setTimeout(initSocket, 1000);
    
    return () => {
      if (socketInstance) {
        console.log('Desconectando socket...');
        socketInstance.disconnect();
      }
    };
  }, [url]);
  
  return { socket, isConnected, error };
}; 