import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaCircle, FaPaperPlane, FaClock, FaCheckCircle, FaTimesCircle, FaSignOutAlt, FaUsers, FaComment, FaEnvelope, FaExclamationCircle, FaTimes, FaSpinner, FaSync, FaExclamationTriangle } from 'react-icons/fa';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import SocketStatus from '@/components/SocketStatus';
import { useSocketChat } from '@/hooks/useSocketChat';

interface ChatUser {
  id: string;
  userId?: string;
  userData: {
    name: string;
    email: string;
    chatHistory?: any[];
    issue?: string;
  };
  waitingSince: Date;
  status?: string;
}

interface AgentData {
  agentId: string;
  name: string;
  status: 'available' | 'busy';
  activeChatsCount: number;
}

interface QueueUpdate {
  waitingCount: number;
  waitingUsers: ChatUser[];
  onlineAgents: AgentData[];
}

interface ChatData {
  chatId: string;
  userData: {
    name: string;
    email: string;
  };
  messages: ChatMessage[];
}

interface ChatMessage {
  sender: 'user' | 'agent';
  content: string;
  timestamp: Date;
  agentName?: string;
  read?: boolean;
}

interface Message {
  content: string;
  sender: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  user?: {
    name: string;
    email: string;
  };
  userData?: {
    name: string;
    email: string;
    issue?: string;
  };
  messages: Message[];
  status?: 'waiting' | 'active' | 'closed';
  timestamp?: Date;
  agent?: {
    name: string;
    id: string;
  };
  lastMessage?: string;
  lastMessageTime?: string | Date;
  unreadCount?: number;
}

interface DashboardState {
  chats: Chat[];
  activeChat: Chat | null;
  chatMessages: { [chatId: string]: Message[] };
  availableAgents: AgentData[];
  queue: ChatUser[];
  userTyping: boolean;
  searchTerm: string;
  isAvailable: boolean;
  isConnected: boolean;
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
}

interface UseSocketChatProps {
  userId?: string;
  userName?: string;
}

const AdminChat: React.FC = () => {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageInput, setMessageInput] = useState('');
  
  // Estado para armazenar informações do Socket
  const [customSocket, setCustomSocket] = useState<any>(null);
  
  // Verifica se estamos no cliente
  const [isMounted, setIsMounted] = useState(false);
  
  // Usa o hook customizado para Socket.IO
  const { 
    socket, 
    isConnected, 
    error,
    sendMessage: socketSendMessage,
    acceptChat: socketAcceptChat,
    endChat: socketEndChat
  } = useSocketChat({
    userId: typeof window !== 'undefined' ? sessionStorage.getItem('adminToken') || '' : '',
    userName: typeof window !== 'undefined' ? sessionStorage.getItem('adminName') || '' : '',
  });

  const [state, setState] = useState<DashboardState>({
    chats: [],
    activeChat: null,
    chatMessages: {},
    availableAgents: [],
    queue: [],
    userTyping: false,
    searchTerm: '',
    isAvailable: false,
    isConnected: false,
    connectionStatus: 'connecting'
  });

  // Verifica se o usuário está autenticado
  useEffect(() => {
    setIsMounted(true);
    
    // Verificar autenticação
    const adminToken = sessionStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
    }
  }, [router]);

  // Inicializa a conexão Socket.IO
  useEffect(() => {
    // Verificar se estamos no cliente
    if (typeof window === 'undefined') return;
    
    const adminToken = sessionStorage.getItem('adminToken');
    if (!adminToken) return;

    // Atualizar status quando o socket do hook mudar
    if (socket) {
      setState(prev => ({
        ...prev,
        isConnected: isConnected,
        connectionStatus: isConnected ? 'connected' : 'disconnected'
      }));
      
      // Configurar handlers adicionais
      socket.on('connect', () => {
        console.log('Conectado ao servidor de chat!');
        setState(prev => ({
          ...prev,
          isConnected: true,
          connectionStatus: 'connected'
        }));
        
        // Identificar como administrador
        socket.emit('admin_connected', { adminToken });
      });

      socket.on('connect_error', (error: any) => {
        console.error('Erro de conexão:', error);
        setState(prev => ({
          ...prev,
          isConnected: false,
          connectionStatus: 'disconnected'
        }));
      });

      socket.on('disconnect', () => {
        console.log('Desconectado do servidor');
        setState(prev => ({
          ...prev,
          isConnected: false,
          connectionStatus: 'disconnected'
        }));
      });
      
      // Eventos específicos para o painel do administrador
      socket.on('active_chats', (data: Chat[]) => {
        setState(prev => ({ ...prev, chats: data }));
      });
      
      socket.on('chat_queue', (data: ChatUser[]) => {
        setState(prev => ({ ...prev, queue: data }));
      });

      socket.on('chat_history', (data: { chatId: string, messages: Message[] }) => {
        setState(prev => ({
          ...prev, 
          chatMessages: { 
            ...prev.chatMessages, 
            [data.chatId]: data.messages 
          }
        }));
      });

      socket.on('user_typing', (data: { chatId: string }) => {
        if (state.activeChat && state.activeChat.id === data.chatId) {
          setState(prev => ({ ...prev, userTyping: true }));
          
          // Remover indicador após alguns segundos
          setTimeout(() => {
            setState(prev => ({ ...prev, userTyping: false }));
          }, 3000);
        }
      });
    }
  }, [socket, isConnected, state.activeChat]);

  // Adicionar chats de demonstração quando não houver dados reais
  useEffect(() => {
    if (state.chats.length === 0 && state.queue.length === 0) {
      // Criar alguns chats de exemplo para demonstração
      const demoChats: Chat[] = [
        {
          id: 'demo-1',
          userData: {
            name: 'João Silva',
            email: 'joao.silva@exemplo.com',
            issue: 'Problema de conexão'
          },
          messages: [],
          lastMessage: 'Preciso de ajuda com a configuração',
          lastMessageTime: new Date().toISOString(),
          unreadCount: 2
        },
        {
          id: 'demo-2',
          userData: {
            name: 'Maria Oliveira',
            email: 'maria@exemplo.com',
            issue: 'Dúvida sobre orçamento'
          },
          messages: [],
          lastMessage: 'Quanto custa o serviço de desenvolvimento web?',
          lastMessageTime: new Date(Date.now() - 900000).toISOString() // 15 minutos atrás
        }
      ];

      // Criar fila de espera de demonstração
      const demoQueue: ChatUser[] = [
        {
          id: 'queue-1',
          userData: {
            name: 'Pedro Souza',
            email: 'pedro@exemplo.com',
            issue: 'Suporte técnico urgente'
          },
          waitingSince: new Date(Date.now() - 180000) // 3 minutos atrás
        },
        {
          id: 'queue-2',
          userData: {
            name: 'Ana Santos',
            email: 'ana@exemplo.com',
            issue: 'Instalação de software'
          },
          waitingSince: new Date(Date.now() - 60000) // 1 minuto atrás
        }
      ];

      setState(prev => ({
        ...prev,
        chats: demoChats,
        queue: demoQueue,
        isAvailable: true // Definir como disponível para demonstração
      }));
    }
  }, [state.chats.length, state.queue.length]);

  // Renderizar o status da conexão
  const renderConnectionStatus = () => {
    switch (state.connectionStatus) {
      case 'connected':
        return (
          <div className="connection-status connected">
            <FaCircle size={10} /> 
            <span>Servidor conectado</span>
          </div>
        );
      case 'disconnected':
        return (
          <div className="connection-status disconnected">
            <FaCircle size={10} /> 
            <span>Servidor desconectado</span>
          </div>
        );
      default:
        return (
          <div className="connection-status connecting">
            <FaSync size={10} className="spin" /> 
            <span>Conectando ao servidor...</span>
          </div>
        );
    }
  };
  
  // Alternar disponibilidade do atendente
  const toggleAvailability = () => {
    const newStatus = !state.isAvailable;
    setState(prev => ({ ...prev, isAvailable: newStatus }));
    
    if (socket) {
      socket.emit('agent_availability', { available: newStatus });
    }
  };
  
  // Adicionar uma função para atualizar a lista de espera
  const refreshQueueAndStatus = () => {
    if (socket) {
      console.log('Atualizando lista de espera e status');
      socket.emit('check_agents_available');
      socket.emit('get_chat_queue');
    }
  };
  
  // Modificar a função de aceitar chat para melhor feedback
  const acceptChat = (chatId: string) => {
    if (!socket) {
      console.error('Socket não disponível');
      return;
    }
    
    console.log(`Aceitando chat: ${chatId}`);
    
    // Indicar que estamos processando o chat
    const tempChat: Chat = {
      id: chatId,
      status: 'active',
      messages: [],
      timestamp: new Date(),
      lastMessage: 'Aguardando conexão...',
      lastMessageTime: new Date()
    };
    
    // Atualizar o estado localmente primeiro para feedback imediato
    setState(prev => ({
      ...prev,
      chats: [...prev.chats.filter(c => c.id !== chatId), tempChat]
    }));
    
    // Enviar para o servidor
    socket.emit('accept_chat', { chatId });
    
    // Limpar o item da fila localmente para feedback imediato
    setState(prev => ({
      ...prev,
      queue: prev.queue.filter(item => item.id !== chatId)
    }));
  };
  
  // Finalizar um chat
  const endChat = (chatId: string) => {
    // Verificar se é um chat de demonstração
    const isDemoChat = chatId.startsWith('demo-') || chatId.startsWith('accepted-');
    
    if (isDemoChat) {
      // Remover dos chats ativos e limpar o chat ativo
      setState(prev => ({
        ...prev,
        chats: prev.chats.filter(c => c.id !== chatId),
        activeChat: null
      }));
      return;
    }
    
    // Se não for um chat de demonstração, usar o Socket.IO
    if (socket) {
      socketEndChat(chatId);
      
      // Atualizar o estado
      setState(prev => ({
        ...prev,
        chats: prev.chats.filter(c => c.id !== chatId),
        activeChat: null
      }));
    }
  };
  
  // Definir chat ativo
  const setActiveChat = (chat: Chat) => {
    setState(prev => ({ ...prev, activeChat: chat }));
    
    // Verificar se é um chat de demonstração
    const isDemoChat = chat.id.startsWith('demo-');
    
    // Se for um chat de demonstração, adicionar mensagens de demonstração
    if (isDemoChat) {
      const currentTime = new Date();
      const demoMessages: Message[] = [
        {
          content: `Olá, sou ${chat.userData?.name}. ${chat.lastMessage}`,
          sender: 'user',
          timestamp: new Date(currentTime.getTime() - 5 * 60000) // 5 minutos atrás
        },
        {
          content: `Olá ${chat.userData?.name}, como posso ajudar você hoje?`,
          sender: 'agent',
          timestamp: new Date(currentTime.getTime() - 4 * 60000) // 4 minutos atrás
        },
        {
          content: chat.id === 'demo-1' ? 
            'Estou tendo problemas para conectar ao sistema. A página fica carregando indefinidamente.' :
            'Gostaria de saber quanto custa o desenvolvimento de um site completo para minha empresa.',
          sender: 'user',
          timestamp: new Date(currentTime.getTime() - 3 * 60000) // 3 minutos atrás
        }
      ];
      
      setState(prev => ({
        ...prev,
        chatMessages: {
          ...prev.chatMessages,
          [chat.id]: demoMessages
        }
      }));
      
      return;
    }
    
    // Carregar histórico se necessário
    if (socket && (!state.chatMessages[chat.id] || state.chatMessages[chat.id].length === 0)) {
      socket.emit('get_chat_history', { chatId: chat.id });
    }
  };
  
  // Enviar mensagem
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageInput.trim() || !state.activeChat) return;
    
    const message = {
      content: messageInput,
      timestamp: new Date(),
      sender: 'agent'
    };
    
    // Verificar se é um chat de demonstração
    const isDemoChat = state.activeChat.id.startsWith('demo-') || state.activeChat.id.startsWith('accepted-');
    
    if (isDemoChat) {
      // Adicionar a mensagem do agente ao histórico
      setState(prev => ({
        ...prev,
        chatMessages: {
          ...prev.chatMessages,
          [state.activeChat!.id]: [
            ...(prev.chatMessages[state.activeChat!.id] || []),
            message as Message
          ]
        }
      }));
      
      // Simular resposta do usuário após alguns segundos
      setTimeout(() => {
        if (state.activeChat) {
          const userResponses = [
            'Entendi, obrigado pela ajuda!',
            'Vou verificar isso e te aviso se precisar de mais informações.',
            'Perfeito, era exatamente isso que eu precisava saber.',
            'Isso resolve meu problema, muito obrigado pelo atendimento!',
            'Excelente, vou seguir suas instruções.'
          ];
          
          const randomResponse = userResponses[Math.floor(Math.random() * userResponses.length)];
          
          const userMessage: Message = {
            content: randomResponse,
            timestamp: new Date(),
            sender: 'user'
          };
          
          setState(prev => {
            // Verificar se o chat ainda está ativo
            if (!prev.activeChat || prev.activeChat.id !== state.activeChat!.id) {
              return prev;
            }
            
            return {
              ...prev,
              chatMessages: {
                ...prev.chatMessages,
                [state.activeChat!.id]: [
                  ...(prev.chatMessages[state.activeChat!.id] || []),
                  userMessage
                ]
              }
            };
          });
        }
      }, 2000 + Math.random() * 3000); // 2-5 segundos
      
      setMessageInput('');
      return;
    }
    
    // Enviar via socket
    if (socket) {
      socketSendMessage(state.activeChat.id, messageInput);
      
      // Atualizar localmente
      setState(prev => ({
        ...prev,
        chatMessages: {
          ...prev.chatMessages,
          [state.activeChat!.id]: [
            ...(prev.chatMessages[state.activeChat!.id] || []),
            message as Message
          ]
        }
      }));
    }
    
    setMessageInput('');
  };
  
  // Formatar hora para exibição
  const formatChatTime = (date: Date) => {
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };
  
  const formatMessageTime = (timestamp: string | Date) => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    return formatChatTime(date);
  };
  
  // Filtragem de chats
  const filteredChats = state.chats.filter(chat => {
    if (!state.searchTerm) return true;
    
    const searchLower = state.searchTerm.toLowerCase();
    return (
      (chat.userData?.name || '').toLowerCase().includes(searchLower) ||
      (chat.userData?.email || '').toLowerCase().includes(searchLower)
    );
  });
  
  // Mensagens do chat ativo
  const chatMessages = state.activeChat 
    ? (state.chatMessages[state.activeChat.id] || [])
    : [];
    
  // Rolar para o final quando mensagens mudarem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Adicionar estilos para melhorar contraste e legibilidade
  const serverStatus = (connected: boolean) => {
    return (
      <div className="server-status">
        <span className="status-label">Servidor {connected ? 'conectado' : 'desconectado'}: </span>
        <span className={`status-indicator ${connected ? 'connected' : 'disconnected'}`}>
          ●
        </span>
        <span className="status-text"> {connected ? 'Disponível' : 'Indisponível'}</span>
        <style jsx>{`
          .server-status {
            display: flex;
            align-items: center;
            padding: 5px 10px;
            background-color: #333;
            border-radius: 4px;
            margin-left: auto;
          }
          .status-label {
            color: #ddd;
            margin-right: 5px;
          }
          .status-indicator {
            font-size: 18px;
          }
          .status-indicator.connected {
            color: #4CAF50;
          }
          .status-indicator.disconnected {
            color: #F44336;
          }
          .status-text {
            font-weight: bold;
            color: #ddd;
          }
        `}</style>
      </div>
    );
  };

  // Modificar o componente do painel de fila de espera para incluir botão de atualização
  const renderQueuePanel = () => {
    return (
      <div className="queue-panel">
        <div className="panel-header">
          <h4 className="chat-queue-heading">
            Fila de Espera {state.queue.length > 0 && <span className="queue-count">{state.queue.length}</span>}
          </h4>
          <button 
            className="refresh-button" 
            onClick={refreshQueueAndStatus}
            title="Atualizar fila"
          >
            <FaSync />
          </button>
        </div>
        
        {state.queue.length === 0 ? (
          <div className="empty-state">
            <p>Não há clientes aguardando atendimento.</p>
          </div>
        ) : (
          <div className="chat-list">
            {state.queue.map((user) => (
              <div key={user.id} className="chat-item waiting">
                <div className="chat-avatar">
                  <FaUser />
                </div>
                <div className="chat-info">
                  <h5>{user.userData?.name || 'Visitante'}</h5>
                  <p>{user.userData?.email || 'Sem email'}</p>
                  <span className="waiting-time">
                    <FaClock className="icon" /> Aguardando desde {formatChatTime(user.waitingSince)}
                  </span>
                </div>
                <button 
                  className="accept-button"
                  onClick={() => acceptChat(user.id)}
                >
                  Atender
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <AdminLayout title="Atendimento ao Cliente">
      <div className="chat-admin-container">
        <div className="chat-admin-header">
          <h1 className="chat-title">Atendimento ao Cliente</h1>
          {serverStatus(state.isConnected)}
        </div>
        
        {/* Alerta de informações sobre o servidor */}
        <div className={`server-info-alert ${state.isConnected ? 'success' : 'error'}`}>
          <div className="alert-icon">
            {state.isConnected ? <FaCheckCircle /> : <FaExclamationTriangle />}
          </div>
          <div className="alert-content">
            <strong>{state.isConnected ? 'Servidor Socket.IO está online' : 'Servidor Socket.IO não está respondendo'}</strong>
            <p className="alert-details">
              {state.isConnected 
                ? 'Os chats que você está vendo agora são demonstrativos. Quando o servidor Socket.IO estiver rodando, o sistema carregará os chats reais.'
                : 'Para que o chat funcione corretamente, é necessário que o servidor Socket.IO esteja em execução. Para iniciar o servidor, execute o comando abaixo em um terminal:'}
            </p>
            {!state.isConnected && (
              <pre className="command-code">npm run server</pre>
            )}
          </div>
        </div>
        
        <div className="admin-chat-container">
          {/* Coluna da esquerda - Lista de chats */}
          <div className="chat-sidebar">
            <div className="chat-header">
              <h3>
                Conversas 
                {state.queue.length > 0 && (
                  <span className="badge bg-danger ms-2">{state.queue.length}</span>
                )}
              </h3>
              <div className="chat-filters">
                <input
                  type="text"
                  placeholder="Buscar chat..."
                  value={state.searchTerm}
                  onChange={(e) => setState({...state, searchTerm: e.target.value})}
                  className="form-control form-control-sm"
                />
              </div>
            </div>

            {/* Lista de espera */}
            {renderQueuePanel()}

            {/* Lista de chats ativos */}
            <div className="chats-section">
              <h4>Conversas Ativas</h4>
              {filteredChats.length > 0 ? (
                filteredChats.map(chat => (
                  <div 
                    key={chat.id} 
                    className={`chat-item ${state.activeChat?.id === chat.id ? 'active' : ''}`}
                    onClick={() => setActiveChat(chat)}
                  >
                    <div className="chat-item-avatar">
                      <FaUser />
                    </div>
                    <div className="chat-item-info">
                      <span className="chat-name">
                        {chat.userData?.name || 'Visitante'}
                        {(chat.unreadCount && chat.unreadCount > 0) && (
                          <span className="unread-badge">{chat.unreadCount}</span>
                        )}
                      </span>
                      <span className="chat-preview">
                        {chat.lastMessage || 'Nova conversa'}
                      </span>
                    </div>
                    <div className="chat-item-time">
                      {chat.lastMessageTime && (
                        <span>{formatChatTime(new Date(chat.lastMessageTime))}</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-chats-message">
                  <FaComment className="icon" />
                  <p>Nenhuma conversa ativa no momento</p>
                </div>
              )}
            </div>
          </div>

          {/* Coluna da direita - Chat ativo */}
          <div className="chat-main">
            {state.activeChat ? (
              <>
                {/* Cabeçalho do chat */}
                <div className="chat-active-header">
                  <div className="user-info">
                    <FaUser className="avatar" />
                    <div>
                      <h4>{state.activeChat.userData?.name || 'Visitante'}</h4>
                      <span>{state.activeChat.userData?.email || 'Sem email'}</span>
                    </div>
                  </div>
                  <div className="actions">
                    <button 
                      className="btn btn-outline-danger"
                      onClick={() => endChat(state.activeChat!.id)}
                    >
                      <FaTimes /> Encerrar Chat
                    </button>
                  </div>
                </div>

                {/* Área de mensagens */}
                <div className="messages-area" ref={messagesEndRef}>
                  {chatMessages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`message ${msg.sender === 'agent' ? 'agent' : 'user'}`}
                    >
                      <div className="message-content">
                        {msg.content}
                      </div>
                      <div className="message-time">
                        {formatMessageTime(msg.timestamp)}
                      </div>
                    </div>
                  ))}
                  {state.userTyping && (
                    <div className="typing-indicator">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Área de digitação */}
                <div className="typing-area">
                  <form onSubmit={sendMessage}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Digite sua mensagem..."
                        value={messageInput}
                        onChange={(e) => {
                          setMessageInput(e.target.value);
                          if (socket) socket.emit('agent_typing', { chatId: state.activeChat!.id });
                        }}
                      />
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={!messageInput.trim()}
                      >
                        <FaPaperPlane />
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <div className="no-chat-selected">
                <div className="no-chat-content">
                  <FaComment className="icon" />
                  <h3>Selecione uma conversa</h3>
                  <p>Escolha uma conversa da lista para iniciar o atendimento</p>
                  
                  {state.queue.length > 0 && (
                    <div className="waiting-alert">
                      <FaExclamationCircle className="icon" />
                      <span>Existem {state.queue.length} clientes aguardando atendimento</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .chat-admin-container {
          padding: 20px;
          color: #333;
        }
        
        .chat-admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .chat-title {
          color: white;
          margin: 0;
        }
        
        .server-info-alert {
          display: flex;
          align-items: flex-start;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 20px;
          font-size: 14px;
        }
        
        .server-info-alert.success {
          background-color: #dff5e8;
          border: 1px solid #c3e6cb;
          color: #155724;
        }
        
        .server-info-alert.error {
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
        }
        
        .alert-icon {
          font-size: 24px;
          margin-right: 15px;
          padding-top: 3px;
        }
        
        .alert-content {
          flex: 1;
        }
        
        .alert-details {
          margin: 5px 0 0;
        }
        
        .command-code {
          background-color: #333;
          color: #0f0;
          padding: 10px;
          border-radius: 3px;
          font-family: monospace;
          margin-top: 10px;
          overflow-x: auto;
        }
        
        .chat-queue-heading, .active-chats-heading {
          color: white;
          margin: 20px 0 10px;
        }
        
        .chat-list {
          color: #333;
        }
        
        .admin-chat-container {
          display: flex;
          flex: 1;
          overflow: hidden;
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .chat-sidebar {
          width: 320px;
          border-right: 1px solid #e9ecef;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        .chat-header {
          padding: 15px;
          border-bottom: 1px solid #e9ecef;
        }
        
        .chat-filters {
          margin-top: 10px;
        }
        
        .queue-section, .chats-section {
          padding: 15px;
          overflow-y: auto;
        }
        
        .queue-section h4, .chats-section h4 {
          font-size: 14px;
          text-transform: uppercase;
          color: #6c757d;
          margin-bottom: 15px;
        }
        
        .chat-item {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .chat-item:hover {
          background-color: #f8f9fa;
        }
        
        .chat-item.active {
          background-color: #e9ecef;
        }
        
        .chat-item-avatar {
          position: relative;
          width: 40px;
          height: 40px;
          background-color: #e9ecef;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          flex-shrink: 0;
        }
        
        .position-badge {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 20px;
          height: 20px;
          background-color: #dc3545;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: bold;
        }
        
        .chat-item-info {
          flex: 1;
          overflow: hidden;
        }
        
        .chat-name {
          display: block;
          font-weight: 500;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .chat-preview {
          font-size: 12px;
          color: #6c757d;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .chat-item-time {
          font-size: 11px;
          color: #adb5bd;
          margin-left: 10px;
        }
        
        .unread-badge {
          background-color: #dc3545;
          color: white;
          font-size: 10px;
          border-radius: 50%;
          padding: 2px 6px;
          margin-left: 8px;
        }
        
        .chat-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        .no-chat-selected {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8f9fa;
        }
        
        .no-chat-content {
          text-align: center;
          padding: 30px;
          max-width: 400px;
        }
        
        .no-chat-content .icon {
          font-size: 48px;
          color: #adb5bd;
          margin-bottom: 20px;
        }
        
        .waiting-alert {
          margin-top: 20px;
          padding: 15px;
          background-color: #fff3cd;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #856404;
        }
        
        .chat-active-header {
          padding: 15px;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .user-info {
          display: flex;
          align-items: center;
        }
        
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #e9ecef;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
        }
        
        .messages-area {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        
        .message {
          max-width: 70%;
          margin-bottom: 15px;
        }
        
        .message.user {
          align-self: flex-start;
        }
        
        .message.agent {
          align-self: flex-end;
        }
        
        .message-content {
          padding: 12px 15px;
          border-radius: 18px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          word-break: break-word;
        }
        
        .message.user .message-content {
          background-color: #f8f9fa;
          border-bottom-left-radius: 0;
        }
        
        .message.agent .message-content {
          background-color: #0d6efd;
          color: white;
          border-bottom-right-radius: 0;
        }
        
        .message-time {
          font-size: 11px;
          color: #adb5bd;
          margin-top: 5px;
          text-align: right;
        }
        
        .typing-indicator {
          display: flex;
          padding: 12px 15px;
          background-color: #f8f9fa;
          border-radius: 18px;
          border-bottom-left-radius: 0;
          width: 70px;
          margin-bottom: 15px;
          align-self: flex-start;
        }
        
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #adb5bd;
          margin: 0 2px;
          animation: bounce 1.5s infinite;
        }
        
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-5px);
          }
        }
        
        .typing-area {
          padding: 15px;
          border-top: 1px solid #e9ecef;
        }
        
        .no-chats-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          color: #6c757d;
        }
        
        .no-chats-message .icon {
          font-size: 32px;
          margin-bottom: 10px;
          color: #adb5bd;
        }
        
        .spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .refresh-button {
          background-color: #6c757d;
          color: white;
          border: none;
          border-radius: 4px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .refresh-button:hover {
          background-color: #5a6268;
          transform: rotate(45deg);
        }
        
        .queue-count {
          display: inline-block;
          background-color: #dc3545;
          color: white;
          font-size: 12px;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 10px;
          margin-left: 8px;
        }
      `}</style>
    </AdminLayout>
  );
};

export default AdminChat; 