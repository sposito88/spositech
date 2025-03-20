import { useState, useEffect, useRef } from 'react';

// Importação dinâmica para evitar erros de import.meta
let socket: any = null;

interface UseClientChatProps {
  serverUrl?: string;
  userName?: string;
  userEmail?: string;
}

interface SocketChatReturn {
  socket: any;
  isConnected: boolean;
  error: string | null;
  isInQueue: boolean;
  queuePosition: number | null;
  chatId: string | null;
  agentName: string | null;
  messages: Message[];
  sendMessage: (message: string) => void;
  startChat: () => void;
  endChat: () => void;
  isTyping: boolean;
  agentIsTyping: boolean;
  setIsTyping: (typing: boolean) => void;
}

interface Message {
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  agentName?: string;
}

export const useClientChat = ({ 
  serverUrl = process.env.NEXT_PUBLIC_SOCKET_URL || (typeof window !== 'undefined' ? window.location.origin : ''),
  userName = 'Visitante',
  userEmail = ''
}: UseClientChatProps = {}): SocketChatReturn => {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInQueue, setIsInQueue] = useState(false);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [agentName, setAgentName] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [agentIsTyping, setAgentIsTyping] = useState(false);
  const [userIsTyping, setUserIsTyping] = useState(false);
  
  const socketRef = useRef<any>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // Espera o script ser carregado
      const initSocket = () => {
        if (typeof window.initializeSocketIO !== 'function') {
          // Se ainda não estiver disponível, aguarda mais 100ms
          setTimeout(initSocket, 100);
          return;
        }

        console.log('Conectando ao servidor:', serverUrl);
        socketRef.current = window.initializeSocketIO(serverUrl);
        setSocket(socketRef.current);

        socketRef.current.on('connect', () => {
          console.log('Socket.IO conectado com ID:', socketRef.current.id);
          setIsConnected(true);
          setError(null);
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

        // Evento quando o usuário é colocado na fila
        socketRef.current.on('in_queue', ({ position }: { position: number }) => {
          setIsInQueue(true);
          setQueuePosition(position);
        });

        // Evento quando o usuário é conectado a um atendente
        socketRef.current.on('chat_assigned', ({ chatId, agentName, message }: { chatId: string, agentName: string, message: string }) => {
          setChatId(chatId);
          setAgentName(agentName);
          setIsInQueue(false);
          setQueuePosition(null);
          
          // Adiciona mensagem de sistema
          setMessages(prev => [
            ...prev,
            {
              content: message,
              sender: 'agent',
              timestamp: new Date(),
              agentName: 'Sistema'
            }
          ]);
        });

        // Evento quando o atendente envia uma mensagem
        socketRef.current.on('message_from_agent', ({ message }: { message: Message }) => {
          setMessages(prev => [...prev, message]);
          setAgentIsTyping(false);
        });

        // Evento quando o chat é encerrado
        socketRef.current.on('chat_ended', ({ message }: { message: string }) => {
          setMessages(prev => [
            ...prev,
            {
              content: message,
              sender: 'agent',
              timestamp: new Date(),
              agentName: 'Sistema'
            }
          ]);
          setChatId(null);
          setAgentName(null);
        });

        // Evento quando o atendente está digitando
        socketRef.current.on('agent_typing', () => {
          setAgentIsTyping(true);
        });

        // Evento quando o atendente para de digitar
        socketRef.current.on('agent_stop_typing', () => {
          setAgentIsTyping(false);
        });
      };

      initSocket();
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
  }, [serverUrl]);

  // Função para iniciar chat
  const startChat = () => {
    if (!socketRef.current || !isConnected) {
      setError('Não foi possível iniciar o chat: socket não conectado');
      return;
    }

    socketRef.current.emit('user_start_chat', {
      userData: {
        name: userName,
        email: userEmail
      }
    });
    setIsInQueue(true);
  };

  // Função para enviar mensagem
  const sendMessage = (message: string) => {
    if (!socketRef.current || !isConnected || !chatId) {
      setError('Não foi possível enviar a mensagem: chat não iniciado');
      return;
    }

    const messageObj: Message = {
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    socketRef.current.emit('send_message_user', {
      chatId,
      message
    });

    // Adiciona a mensagem ao histórico local
    setMessages(prev => [...prev, messageObj]);
    setUserIsTyping(false);
  };

  // Função para encerrar chat
  const endChat = () => {
    if (!socketRef.current || !isConnected || !chatId) {
      setError('Não foi possível encerrar o chat: chat não iniciado');
      return;
    }

    socketRef.current.emit('end_chat', {
      chatId,
      byAgent: false
    });

    setChatId(null);
    setAgentName(null);
    setIsInQueue(false);
    setQueuePosition(null);
  };

  // Função para notificar que o usuário está digitando
  const setIsTyping = (typing: boolean) => {
    if (!socketRef.current || !isConnected || !chatId) return;

    setUserIsTyping(typing);
    
    if (typing) {
      socketRef.current.emit('typing', { chatId, isAgent: false });
      
      // Limpa o timeout anterior se existir
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Define um novo timeout para enviar o evento de parar de digitar após 3 segundos
      typingTimeoutRef.current = setTimeout(() => {
        socketRef.current.emit('stop_typing', { chatId, isAgent: false });
        setUserIsTyping(false);
      }, 3000);
    } else {
      socketRef.current.emit('stop_typing', { chatId, isAgent: false });
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    }
  };

  return {
    socket: socketRef.current,
    isConnected,
    error,
    isInQueue,
    queuePosition,
    chatId,
    agentName,
    messages,
    sendMessage,
    startChat,
    endChat,
    isTyping: userIsTyping,
    agentIsTyping,
    setIsTyping
  };
}; 