import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaRobot, FaComments, FaSpinner, FaRegClock } from 'react-icons/fa';
import dynamic from 'next/dynamic';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isAgent?: boolean;
}

interface ChatAgentManagerProps {
  userName?: string;
  userEmail?: string;
  chatHistory: Message[];
  onSendMessage: (message: string, isFromAgent?: boolean) => void;
  onBackToBot: () => void;
}

// Versão do componente que será renderizada apenas no cliente
const ChatAgentManagerClient: React.FC<ChatAgentManagerProps> = ({
  userName = 'Visitante',
  userEmail = '',
  chatHistory,
  onSendMessage,
  onBackToBot
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Importação dinâmica do hook (só é carregado no cliente)
  const { useSocketChat } = require('../hooks/useSocketChat');
  
  const {
    isConnected,
    isWaitingForAgent,
    isAgentConnected,
    queuePosition,
    agentName,
    sendMessage,
    requestAgent,
    endChat,
    lastAgentMessage,
    isAgentTyping
  } = useSocketChat({
    userName,
    userEmail,
    chatHistory
  });

  // Efeito para solicitar atendente assim que o componente montar
  useEffect(() => {
    if (isConnected && !isWaitingForAgent && !isAgentConnected) {
      requestAgent();
    }
  }, [isConnected, isWaitingForAgent, isAgentConnected, requestAgent]);

  // Efeito para adicionar mensagens do atendente ao histórico
  useEffect(() => {
    if (lastAgentMessage) {
      onSendMessage(lastAgentMessage, true);
    }
  }, [lastAgentMessage, onSendMessage]);

  // Efeito para rolar para o final das mensagens
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isAgentTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleEndChat = () => {
    endChat();
    onBackToBot();
  };

  return (
    <div className="chat-agent-manager d-flex flex-column h-100">
      <div className="chat-header bg-dark p-2 text-accent-custom d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          {isAgentConnected ? (
            <FaUser className="me-2" />
          ) : (
            <FaComments className="me-2" />
          )}
          <div>
            {isAgentConnected 
              ? `Atendimento com ${agentName}`
              : isWaitingForAgent 
                ? 'Aguardando atendente...'
                : 'Atendimento Humano'}
          </div>
        </div>
        <button 
          onClick={handleEndChat} 
          className="btn btn-sm btn-outline-danger"
        >
          Encerrar
        </button>
      </div>

      <div className="chat-messages flex-grow-1 overflow-auto p-3 bg-black">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`message mb-3 ${
              msg.sender === 'user' ? 'text-end' : ''
            }`}
          >
            <div
              className={`d-inline-block p-2 rounded-3 ${
                msg.sender === 'user'
                  ? 'bg-accent-custom text-dark'
                  : msg.isAgent
                    ? 'bg-dark text-light border border-accent-custom'
                    : 'bg-secondary text-light'
              }`}
            >
              <div className="d-flex align-items-center">
                {msg.sender !== 'user' && (
                  <div className="me-2">
                    {msg.isAgent ? <FaUser /> : <FaRobot />}
                  </div>
                )}
                <div>{msg.text}</div>
              </div>
              <div
                className={`message-time small ${
                  msg.sender === 'user' ? 'text-dark' : 'text-light'
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
                {msg.isAgent && <span className="ms-1">• {agentName}</span>}
              </div>
            </div>
          </div>
        ))}

        {isAgentTyping && (
          <div className="message mb-3">
            <div className="d-inline-block p-2 rounded-3 bg-dark text-light border border-accent-custom">
              <div className="d-flex align-items-center">
                <div className="me-2">
                  <FaUser />
                </div>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {isWaitingForAgent && (
          <div className="queue-info text-center p-3 my-3 bg-dark rounded-3 text-accent-custom">
            <FaRegClock className="me-2" size={24} />
            <p className="mb-1">Você está na fila de atendimento</p>
            <div className="queue-position">
              <FaSpinner className="me-2 spin" />
              {queuePosition > 0 
                ? `Posição: ${queuePosition}°` 
                : 'Conectando com o próximo atendente disponível...'}
            </div>
          </div>
        )}

        <div ref={messageEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-2 bg-dark">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder={
              isAgentConnected 
                ? `Digite sua mensagem para ${agentName}...` 
                : isWaitingForAgent
                  ? "Aguardando atendente..."
                  : "Digite sua mensagem..."
            }
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={!isAgentConnected}
          />
          <button
            type="submit"
            className="btn btn-accent-custom"
            disabled={!isAgentConnected || !newMessage.trim()}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

// Componente de fallback para SSR (Server-Side Rendering)
const ChatAgentManagerSSR: React.FC<ChatAgentManagerProps> = ({
  userName = 'Visitante',
  chatHistory,
  onBackToBot
}) => {
  return (
    <div className="chat-agent-manager d-flex flex-column h-100">
      <div className="chat-header bg-dark p-2 text-accent-custom d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <FaComments className="me-2" />
          <div>Carregando Atendimento Humano...</div>
        </div>
        <button 
          onClick={onBackToBot} 
          className="btn btn-sm btn-outline-danger"
        >
          Voltar
        </button>
      </div>

      <div className="chat-messages flex-grow-1 overflow-auto p-3 bg-black">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`message mb-3 ${
              msg.sender === 'user' ? 'text-end' : ''
            }`}
          >
            <div
              className={`d-inline-block p-2 rounded-3 ${
                msg.sender === 'user'
                  ? 'bg-accent-custom text-dark'
                  : 'bg-secondary text-light'
              }`}
            >
              <div className="d-flex align-items-center">
                {msg.sender !== 'user' && (
                  <div className="me-2">
                    <FaRobot />
                  </div>
                )}
                <div>{msg.text}</div>
              </div>
              <div
                className={`message-time small ${
                  msg.sender === 'user' ? 'text-dark' : 'text-light'
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}

        <div className="queue-info text-center p-3 my-3 bg-dark rounded-3 text-accent-custom">
          <FaRegClock className="me-2" size={24} />
          <p className="mb-1">Carregando sistema de atendimento...</p>
          <div className="queue-position">
            <FaSpinner className="me-2 spin" />
            Aguarde um momento...
          </div>
        </div>
      </div>

      <form className="p-2 bg-dark">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Carregando..."
            disabled={true}
          />
          <button
            type="submit"
            className="btn btn-accent-custom"
            disabled={true}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

// Criamos um componente dinâmico com SSR desabilitado
const ChatAgentManager = dynamic(
  () => Promise.resolve(ChatAgentManagerClient),
  { 
    ssr: false,
    loading: () => <ChatAgentManagerSSR 
                    userName="Visitante" 
                    userEmail=""
                    chatHistory={[]}
                    onSendMessage={() => {}}
                    onBackToBot={() => {}} 
                  />
  }
);

export default ChatAgentManager; 