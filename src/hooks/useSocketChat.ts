import { useState, useEffect, useRef } from 'react';

// Verificar se estamos no navegador
const isBrowser = typeof window !== 'undefined';

// Carregar socket.io-client apenas no navegador
let io: any;
if (isBrowser) {
  io = require('socket.io-client');
}

interface UseSocketChatProps {
  serverUrl?: string;
  userName?: string;
  userId?: string;
}

interface SocketChatReturn {
  socket: any;
  isConnected: boolean;
  error: string | null;
  sendMessage: (chatId: string, message: string) => void;
  acceptChat: (userId: string) => void;
  endChat: (chatId: string) => void;
}

export const useSocketChat = ({ 
  serverUrl = process.env.NEXT_PUBLIC_SOCKET_URL || (typeof window !== 'undefined' ? window.location.origin : ''),
  userName = 'Admin',
  userId
}: UseSocketChatProps = {}): SocketChatReturn => {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // Conectar diretamente usando io
      console.log('Conectando ao servidor:', serverUrl);
      socketRef.current = io(serverUrl, {
        path: '/socket.io/',
        reconnectionAttempts: 3,
        timeout: 10000
      });
      
      setSocket(socketRef.current);

      socketRef.current.on('connect', () => {
        console.log('Socket.IO conectado com ID:', socketRef.current.id);
        setIsConnected(true);
        setError(null);
        
        // Identificar como admin
        socketRef.current.emit('admin_connected', { 
          adminToken: userId,
          name: userName 
        });
      });

      socketRef.current.on('connect_error', (err: any) => {
        console.error('Erro de conexão Socket.IO:', err);
        setIsConnected(false);
        setError(`Erro de conexão: ${err.message}`);
      });

      socketRef.current.on('disconnect', (reason: string) => {
        console.log('Socket.IO desconectado:', reason);
        setIsConnected(false);
      });
    } catch (err: any) {
      console.error('Erro ao inicializar Socket.IO:', err);
      setError(`Erro ao inicializar: ${err.message}`);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [serverUrl, userName, userId]);

  // Função para enviar mensagem
  const sendMessage = (chatId: string, message: string) => {
    if (!socketRef.current || !isConnected) {
      setError('Não foi possível enviar a mensagem: socket não conectado');
      return;
    }

    socketRef.current.emit('send_message_agent', {
      chatId,
      message
    });
  };

  // Função para aceitar chat
  const acceptChat = (userId: string) => {
    if (!socketRef.current || !isConnected) {
      setError('Não foi possível aceitar o chat: socket não conectado');
      return;
    }

    socketRef.current.emit('accept_chat', {
      chatId: userId
    });
  };

  // Função para encerrar chat
  const endChat = (chatId: string) => {
    if (!socketRef.current || !isConnected) {
      setError('Não foi possível encerrar o chat: socket não conectado');
      return;
    }

    socketRef.current.emit('end_chat', {
      chatId
    });
  };

  return {
    socket: socketRef.current,
    isConnected,
    error,
    sendMessage,
    acceptChat,
    endChat
  };
}; 