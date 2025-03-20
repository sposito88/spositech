import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaComment, 
  FaPaperPlane, 
  FaCircle, 
  FaCheckCircle,
  FaTimesCircle,
  FaClock
} from 'react-icons/fa';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';

// Interface para chat na fila
interface QueueItem {
  id: string;
  name: string;
  email: string;
  issue?: string;
  waitingSince: Date;
}

// Interface para mensagem
interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

// Interface para chat ativo
interface ActiveChat {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  messages: ChatMessage[];
  status: 'active' | 'paused';
  startTime: Date;
}

const AdminChatbox: React.FC = () => {
  // Estado para gerenciar chats ativos e fila
  const [waitingQueue, setWaitingQueue] = useState<QueueItem[]>([]);
  const [activeChats, setActiveChats] = useState<ActiveChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<ActiveChat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  
  // Verificar autenticação
  useEffect(() => {
    const adminToken = localStorage.getItem('spositech_admin_token');
    if (!adminToken) {
      router.push('/admin/login');
    }
  }, [router]);
  
  // Conectar ao Socket.IO quando o componente montar
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let socket: any;
    
    const connectSocket = () => {
      if (typeof window.io === 'undefined') {
        setTimeout(connectSocket, 500);
        return;
      }
      
      try {
        socket = window.io();
        
        socket.on('connect', () => {
          console.log('Conectado ao servidor de chat!');
          setIsSocketConnected(true);
          setError(null);
          
          // Identificar como agente
          socket.emit('agent_login', {
            agentName: localStorage.getItem('spositech_admin_name') || 'Admin',
            agentId: socket.id
          });
        });
        
        socket.on('connect_error', (err: Error) => {
          console.error('Erro na conexão:', err);
          setIsSocketConnected(false);
          setError(`Erro de conexão: ${err.message}`);
        });
        
        socket.on('queue_updated', (data: { queueLength: number, waitingQueue: any[] }) => {
          // Formatar os dados da fila
          const formattedQueue = data.waitingQueue.map((item) => ({
            id: item.userId,
            name: item.userData.name,
            email: item.userData.email,
            issue: item.userData.issue,
            waitingSince: new Date(item.joinedAt)
          }));
          
          setWaitingQueue(formattedQueue);
        });
        
        socket.on('new_chat', (data: { chatId: string, userData: any }) => {
          // Adiciona um novo chat à lista de chats ativos
          const newChat: ActiveChat = {
            id: data.chatId,
            userId: data.chatId,
            userName: data.userData.name,
            userEmail: data.userData.email,
            messages: [],
            status: 'active',
            startTime: new Date()
          };
          
          setActiveChats(prev => [...prev, newChat]);
        });
        
        socket.on('message_from_user', (data: { chatId: string, message: any, userData: any }) => {
          const newMessage: ChatMessage = {
            id: Date.now().toString(),
            text: data.message.content,
            sender: 'user',
            timestamp: new Date(data.message.timestamp)
          };
          
          // Adicionar a mensagem ao chat
          setActiveChats(prev => 
            prev.map(chat => 
              chat.id === data.chatId 
                ? { ...chat, messages: [...chat.messages, newMessage] } 
                : chat
            )
          );
          
          // Se for o chat selecionado, atualizar também
          if (selectedChat && selectedChat.id === data.chatId) {
            setSelectedChat(prev => 
              prev ? { ...prev, messages: [...prev.messages, newMessage] } : null
            );
          }
        });
        
        socket.on('chat_ended_by_user', (data: { chatId: string, message: string }) => {
          // Remover o chat da lista de chats ativos
          setActiveChats(prev => prev.filter(chat => chat.id !== data.chatId));
          
          // Se for o chat selecionado, limpar a seleção
          if (selectedChat && selectedChat.id === data.chatId) {
            setSelectedChat(null);
          }
        });
      } catch (err: any) {
        console.error('Erro ao inicializar Socket.IO:', err);
        setError(`Erro ao inicializar Socket.IO: ${err.message}`);
      }
    };
    
    connectSocket();
    
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);
  
  // Aceitar um chat da fila
  const handleAcceptChat = (queuePosition: number) => {
    if (!isSocketConnected) {
      setError('Não foi possível aceitar o chat: Sem conexão com o servidor');
      return;
    }
    
    const socket = window.io();
    socket.emit('agent_accept_chat', { queuePosition });
  };
  
  // Enviar uma mensagem
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedChat || !newMessage.trim() || !isSocketConnected) {
      return;
    }
    
    const socket = window.io();
    socket.emit('send_message_agent', {
      chatId: selectedChat.id,
      message: newMessage
    });
    
    // Adicionar mensagem localmente
    const messageObj: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'agent',
      timestamp: new Date()
    };
    
    // Atualizar o chat selecionado
    setSelectedChat(prev => 
      prev ? { ...prev, messages: [...prev.messages, messageObj] } : null
    );
    
    // Atualizar a lista de chats
    setActiveChats(prev => 
      prev.map(chat => 
        chat.id === selectedChat.id 
          ? { ...chat, messages: [...chat.messages, messageObj] } 
          : chat
      )
    );
    
    // Limpar o campo de mensagem
    setNewMessage('');
  };
  
  // Encerrar um chat
  const handleEndChat = (chatId: string) => {
    if (!isSocketConnected) {
      setError('Não foi possível encerrar o chat: Sem conexão com o servidor');
      return;
    }
    
    const socket = window.io();
    socket.emit('end_chat_agent', {
      chatId,
      message: 'O atendente encerrou o chat.'
    });
    
    // Remover o chat da lista
    setActiveChats(prev => prev.filter(chat => chat.id !== chatId));
    
    // Se for o chat selecionado, limpar a seleção
    if (selectedChat && selectedChat.id === chatId) {
      setSelectedChat(null);
    }
  };
  
  return (
    <AdminLayout title="Gerenciamento de Chat">
      <Head>
        <title>Gerenciamento de Chat | Spositech Admin</title>
      </Head>
      
      <div className="container-fluid p-0">
        <div className="row g-0" style={{ height: "calc(100vh - 70px)" }}>
          {/* Sidebar esquerdo com fila e chats */}
          <div className="col-md-4 col-lg-3 border-end" style={{ height: "100%", overflowY: "auto" }}>
            {/* Status da conexão */}
            <div className="p-3 border-bottom">
              <div className="d-flex align-items-center">
                <FaCircle 
                  size={10} 
                  className={isSocketConnected ? "text-success" : "text-danger"} 
                />
                <span className="ms-2">
                  {isSocketConnected ? "Conectado" : "Desconectado"}
                </span>
              </div>
              {error && <div className="alert alert-danger mt-2 py-1 px-2 small">{error}</div>}
            </div>
            
            {/* Fila de espera */}
            <div className="p-3 border-bottom">
              <h6 className="d-flex align-items-center">
                <FaUsers className="me-2" /> 
                Fila de Espera 
                <span className="badge bg-primary ms-2">{waitingQueue.length}</span>
              </h6>
              
              {waitingQueue.length === 0 ? (
                <p className="text-muted small">Não há clientes na fila</p>
              ) : (
                <div className="list-group list-group-flush">
                  {waitingQueue.map((item, index) => (
                    <div key={item.id} className="list-group-item px-0 py-2 border-0">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <div className="fw-bold">{item.name}</div>
                          <div className="small text-muted">{item.email}</div>
                          {item.issue && (
                            <div className="small text-muted">Assunto: {item.issue}</div>
                          )}
                          <div className="small text-muted d-flex align-items-center mt-1">
                            <FaClock size={12} className="me-1" />
                            {new Date(item.waitingSince).toLocaleTimeString()}
                          </div>
                        </div>
                        <button 
                          className="btn btn-sm btn-primary" 
                          onClick={() => handleAcceptChat(index)}
                        >
                          Atender
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Chats ativos */}
            <div className="p-3">
              <h6 className="d-flex align-items-center">
                <FaComment className="me-2" /> 
                Chats Ativos 
                <span className="badge bg-primary ms-2">{activeChats.length}</span>
              </h6>
              
              {activeChats.length === 0 ? (
                <p className="text-muted small">Não há chats ativos</p>
              ) : (
                <div className="list-group list-group-flush">
                  {activeChats.map(chat => (
                    <div 
                      key={chat.id} 
                      className={`list-group-item px-0 py-2 border-0 ${selectedChat?.id === chat.id ? 'bg-light' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <div className="d-flex justify-content-between">
                        <div>
                          <div className="fw-bold">{chat.userName}</div>
                          <div className="small text-muted">{chat.userEmail}</div>
                          <div className="small text-muted d-flex align-items-center mt-1">
                            <FaClock size={12} className="me-1" />
                            {new Date(chat.startTime).toLocaleTimeString()}
                          </div>
                        </div>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEndChat(chat.id);
                          }}
                        >
                          <FaTimesCircle />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Área principal de chat */}
          <div className="col-md-8 col-lg-9 d-flex flex-column" style={{ height: "100%" }}>
            {selectedChat ? (
              <>
                {/* Header do chat */}
                <div className="p-3 border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">{selectedChat.userName}</h6>
                      <div className="small text-muted">{selectedChat.userEmail}</div>
                    </div>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleEndChat(selectedChat.id)}
                    >
                      Encerrar Chat
                    </button>
                  </div>
                </div>
                
                {/* Área de mensagens */}
                <div className="flex-grow-1 p-3" style={{ overflowY: "auto" }}>
                  {selectedChat.messages.length === 0 ? (
                    <div className="text-center text-muted my-5">
                      <p>Não há mensagens neste chat</p>
                      <p>Envie uma mensagem para iniciar a conversa</p>
                    </div>
                  ) : (
                    selectedChat.messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`d-flex ${message.sender === 'agent' ? 'justify-content-end' : 'justify-content-start'} mb-3`}
                      >
                        <div 
                          className={`message-bubble p-3 rounded-3 ${
                            message.sender === 'agent' 
                              ? 'bg-primary text-white' 
                              : 'bg-light'
                          }`}
                          style={{ maxWidth: '70%' }}
                        >
                          <div>{message.text}</div>
                          <div className={`small ${message.sender === 'agent' ? 'text-white-50' : 'text-muted'} text-end mt-1`}>
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                {/* Área de envio de mensagem */}
                <div className="p-3 border-top">
                  <form onSubmit={handleSendMessage}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Digite sua mensagem..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={!newMessage.trim() || !isSocketConnected}
                      >
                        <FaPaperPlane />
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center h-100 text-muted">
                <FaComment size={50} className="mb-3" />
                <h5>Selecione um chat para iniciar o atendimento</h5>
                <p>Ou aceite um cliente da fila de espera</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .message-bubble {
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </AdminLayout>
  );
};

export default AdminChatbox; 