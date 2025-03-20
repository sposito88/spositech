import React, { useState, useEffect, useRef } from 'react';
import { useClientChat } from '@/hooks/useClientChat';
import { 
  FaComments, 
  FaTimes, 
  FaPaperPlane, 
  FaCircle,
  FaUser
} from 'react-icons/fa';

interface ChatWidgetProps {
  userName?: string;
  userEmail?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ 
  userName = '', 
  userEmail = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [userInfo, setUserInfo] = useState({ name: userName, email: userEmail });
  const [showUserForm, setShowUserForm] = useState(!userName || !userEmail);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
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
    isTyping,
    agentIsTyping,
    setIsTyping
  } = useClientChat({
    userName: userInfo.name || 'Visitante',
    userEmail: userInfo.email || 'visitante@exemplo.com'
  });

  // Efeito para rolar para a última mensagem quando receber novas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Lidar com envio de formulário de informações do usuário
  const handleUserFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.name.trim() && userInfo.email.trim()) {
      setShowUserForm(false);
      startChat();
    }
  };

  // Lidar com envio de mensagem
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (newMessage.trim()) {
      sendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  // Lidar com alteração do texto da mensagem
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  // Renderiza o conteúdo principal do chat
  const renderChatContent = () => {
    // Se estiver aguardando informações do usuário
    if (showUserForm) {
      return (
        <div className="chat-widget-user-form">
          <h6 className="mb-3">Iniciar Conversa</h6>
          <form onSubmit={handleUserFormSubmit}>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">Nome</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="userName"
                value={userInfo.name}
                onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userEmail" className="form-label">Email</label>
              <input
                type="email"
                className="form-control form-control-sm"
                id="userEmail"
                value={userInfo.email}
                onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary btn-sm w-100"
              disabled={!isConnected}
            >
              Iniciar Chat
            </button>
          </form>
        </div>
      );
    }
    
    // Se estiver em fila
    if (isInQueue && !chatId) {
      return (
        <div className="chat-widget-queue">
          <div className="text-center p-4">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <h6>Aguardando Atendimento</h6>
            <p className="small">
              {queuePosition !== null 
                ? `Sua posição na fila: ${queuePosition}` 
                : 'Conectando ao atendimento...'}
            </p>
            <button 
              className="btn btn-sm btn-outline-danger mt-2"
              onClick={() => {
                endChat();
                setShowUserForm(true);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      );
    }
    
    // Chat em andamento
    return (
      <>
        <div className="chat-widget-messages">
          {messages.length === 0 && (
            <div className="chat-welcome-message">
              <p>Olá! Como podemos ajudar?</p>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'agent-message'}`}
            >
              <div className="message-content">
                <div className="message-text">{msg.content}</div>
                <div className="message-time">
                  {msg.agentName && msg.sender === 'agent' && <span className="agent-name">{msg.agentName}</span>}
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {agentIsTyping && (
            <div className="agent-typing">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSendMessage} className="chat-widget-input">
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={handleMessageChange}
            disabled={!chatId && !isInQueue}
            className="form-control"
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!newMessage.trim() || (!chatId && !isInQueue)}
          >
            <FaPaperPlane />
          </button>
        </form>
      </>
    );
  };

  return (
    <>
      {/* Botão flutuante para abrir o chat */}
      {!isOpen && (
        <button 
          className="chat-widget-button" 
          onClick={() => setIsOpen(true)}
          aria-label="Abrir chat"
        >
          <FaComments />
        </button>
      )}
      
      {/* Widget de chat */}
      <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
        {/* Cabeçalho do chat */}
        <div className="chat-widget-header">
          <div className="chat-status">
            <FaCircle className={`status-icon ${isConnected ? 'connected' : 'disconnected'}`} />
            <span>
              {chatId && agentName 
                ? `Atendimento com ${agentName}` 
                : 'Atendimento Online'}
            </span>
          </div>
          <button 
            className="chat-close-button" 
            onClick={() => setIsOpen(false)}
            aria-label="Fechar chat"
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Conteúdo do chat */}
        <div className="chat-widget-content">
          {error ? (
            <div className="chat-error">
              <p>{error}</p>
              <button 
                className="btn btn-sm btn-primary mt-2" 
                onClick={() => window.location.reload()}
              >
                Reconectar
              </button>
            </div>
          ) : (
            renderChatContent()
          )}
        </div>
      </div>
      
      {/* Estilos CSS */}
      <style jsx>{`
        .chat-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 350px;
          height: 450px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          z-index: 9999;
          transform: translateY(calc(100% + 20px));
          opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
          overflow: hidden;
        }
        
        .chat-widget.open {
          transform: translateY(0);
          opacity: 1;
        }
        
        .chat-widget-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--bs-primary, #0d6efd);
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          z-index: 9998;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        
        .chat-widget-button:hover {
          transform: scale(1.05);
        }
        
        .chat-widget-header {
          background: var(--bs-primary, #0d6efd);
          color: white;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        
        .chat-close-button {
          background: transparent;
          border: none;
          color: white;
          font-size: 1rem;
          cursor: pointer;
        }
        
        .chat-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .status-icon {
          font-size: 0.6rem;
        }
        
        .connected {
          color: #28a745;
        }
        
        .disconnected {
          color: #dc3545;
        }
        
        .chat-widget-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        .chat-widget-user-form {
          padding: 20px;
          overflow-y: auto;
        }
        
        .chat-widget-queue {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .chat-widget-messages {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .chat-widget-input {
          padding: 10px;
          display: flex;
          gap: 10px;
          border-top: 1px solid #e9ecef;
        }
        
        .chat-message {
          max-width: 80%;
          margin-bottom: 10px;
        }
        
        .user-message {
          align-self: flex-end;
        }
        
        .agent-message {
          align-self: flex-start;
        }
        
        .message-content {
          padding: 10px;
          border-radius: 10px;
        }
        
        .user-message .message-content {
          background-color: var(--bs-primary, #0d6efd);
          color: white;
          border-bottom-right-radius: 0;
        }
        
        .agent-message .message-content {
          background-color: #f1f3f5;
          color: #343a40;
          border-bottom-left-radius: 0;
        }
        
        .message-time {
          font-size: 0.7rem;
          margin-top: 5px;
          opacity: 0.8;
          text-align: right;
        }
        
        .agent-name {
          font-weight: bold;
          margin-right: 5px;
        }
        
        .chat-welcome-message {
          text-align: center;
          color: #6c757d;
          padding: 20px;
        }
        
        .chat-error {
          padding: 20px;
          color: #dc3545;
          text-align: center;
        }
        
        .agent-typing {
          align-self: flex-start;
          margin-bottom: 10px;
        }
        
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 3px;
          padding: 8px 12px;
          background-color: #f1f3f5;
          border-radius: 10px;
          border-bottom-left-radius: 0;
        }
        
        .typing-indicator span {
          width: 8px;
          height: 8px;
          background-color: #adb5bd;
          border-radius: 50%;
          animation: typing 1s infinite ease-in-out;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: 0s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typing {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </>
  );
};

export default ChatWidget; 