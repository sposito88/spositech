import React, { useState, useEffect, useRef } from 'react';
import { 
  FaComments, 
  FaTimes, 
  FaPaperPlane, 
  FaWhatsapp,
  FaTelegram,
  FaUser,
  FaRobot
} from 'react-icons/fa';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    issue: ''
  });
  const [showUserForm, setShowUserForm] = useState(true);
  
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Opções pré-definidas para o chatbot
  const botOptions = [
    { id: 'produtos', text: 'Informações sobre produtos' },
    { id: 'suporte', text: 'Suporte técnico' },
    { id: 'vendas', text: 'Falar com vendas' },
    { id: 'whatsapp', text: 'Continuar pelo WhatsApp' },
    { id: 'telegram', text: 'Continuar pelo Telegram' }
  ];

  // Rolar para o final quando novas mensagens chegarem
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Inicializar o chat quando for aberto
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage('Olá! Bem-vindo ao suporte da SPOSITech. Como posso ajudar?');
    }
  }, [isOpen, messages.length]);

  // Gerar ID único para mensagens
  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  // Adicionar mensagem do usuário
  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: generateId(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Adicionar mensagem do bot
  const addBotMessage = (content: string) => {
    // Pequeno delay para simular processamento
    setTimeout(() => {
      const newMessage: Message = {
        id: generateId(),
        content,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
    }, 600);
  };

  // Processar opção selecionada
  const handleOptionSelected = (optionId: string) => {
    switch (optionId) {
      case 'produtos':
        addBotMessage('Temos uma variedade de produtos e serviços de TI, incluindo desenvolvimento de software, suporte técnico, hospedagem na nuvem e consultoria. Qual área específica você gostaria de conhecer melhor?');
        break;
      case 'suporte':
        addBotMessage('Para suporte técnico, por favor descreva brevemente o problema que está enfrentando e tentarei ajudar ou direcionar você para o especialista adequado.');
        break;
      case 'vendas':
        addBotMessage('Obrigado pelo seu interesse! Para falar com nossa equipe de vendas, você pode enviar um email para vendas@spositech.com.br ou ligar para (21) 9999-9999 em horário comercial.');
        break;
      case 'whatsapp':
        addBotMessage('Estou redirecionando você para nosso WhatsApp de atendimento. Um momento...');
        window.open('https://wa.me/5521999999999', '_blank');
        break;
      case 'telegram':
        addBotMessage('Estou redirecionando você para nosso canal no Telegram. Um momento...');
        window.open('https://t.me/spositech', '_blank');
        break;
      default:
        addBotMessage('Não entendi sua solicitação. Por favor, escolha uma das opções acima ou descreva melhor como posso ajudar.');
    }
  };

  // Alternar chat aberto/fechado
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Lidar com a mudança no campo de entrada
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Enviar mensagem
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    addUserMessage(inputValue);
    
    // Processar entrada do usuário
    setTimeout(() => {
      addBotMessage('Obrigado pela sua mensagem. Como posso ajudar com "' + inputValue + '"?');
      
      // Mostrar opções novamente após resposta
      setTimeout(() => {
        addBotMessage('Por favor, selecione uma opção:');
      }, 1000);
    }, 800);
    
    setInputValue('');
  };

  // Enviar formulário do usuário
  const handleUserFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInfo.name.trim()) {
      alert('Por favor, informe seu nome.');
      return;
    }
    
    setShowUserForm(false);
    addBotMessage(`Olá ${userInfo.name}! Como posso ajudar você hoje?`);
  };

  // Formatar horário da mensagem
  const formatMessageTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Renderizar opções do chatbot
  const renderBotOptions = () => {
    return (
      <div className="bot-options">
        {botOptions.map(option => (
          <button
            key={option.id}
            className={`option-button ${option.id === 'whatsapp' ? 'whatsapp' : option.id === 'telegram' ? 'telegram' : ''}`}
            onClick={() => {
              addUserMessage(option.text);
              handleOptionSelected(option.id);
            }}
          >
            {option.id === 'whatsapp' && <FaWhatsapp className="option-icon" />}
            {option.id === 'telegram' && <FaTelegram className="option-icon" />}
            {option.text}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
      {!isOpen ? (
        <button className="chat-button" onClick={toggleChat}>
          <FaComments />
          <span>Chat</span>
        </button>
      ) : (
        <div className="chat-container">
          <div className="chat-header">
            <div className="header-left">
              <h3>Suporte SPOSITech</h3>
            </div>
            <button className="close-button" onClick={toggleChat}>
              <FaTimes />
            </button>
          </div>
          
          <div className="chat-body">
            {showUserForm ? (
              <form className="user-form" onSubmit={handleUserFormSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="issue">Assunto</label>
                  <input
                    type="text"
                    id="issue"
                    className="form-control"
                    value={userInfo.issue}
                    onChange={(e) => setUserInfo({...userInfo, issue: e.target.value})}
                    placeholder="Como podemos ajudar?"
                  />
                </div>
                <button type="submit" className="submit-button">
                  Iniciar Conversa
                </button>
              </form>
            ) : (
              <>
                <div className="messages-container" ref={messagesContainerRef}>
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                    >
                      <div className="message-avatar">
                        {message.sender === 'user' ? <FaUser /> : <FaRobot />}
                      </div>
                      <div className="message-bubble">
                        <div className="message-content">{message.content}</div>
                        <div className="message-time">
                          {formatMessageTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {renderBotOptions()}
                
                <div className="input-container">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Digite sua mensagem..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .chat-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }
        
        .chat-button {
          background-color: #0d6efd;
          color: white;
          border: none;
          border-radius: 50px;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }
        
        .chat-button:hover {
          background-color: #0b5ed7;
          transform: translateY(-2px);
        }
        
        .chat-container {
          width: 350px;
          height: 500px;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }
        
        .chat-header {
          background: #0d6efd;
          color: white;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .header-left {
          display: flex;
          align-items: center;
        }
        
        .header-left h3 {
          margin: 0;
          font-size: 16px;
        }
        
        .close-button {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
        }
        
        .chat-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 15px;
          background-color: #f8f9fa;
        }
        
        .messages-container {
          flex: 1;
          overflow-y: auto;
          margin-bottom: 15px;
          padding-right: 5px;
        }
        
        .message {
          display: flex;
          margin-bottom: 15px;
          align-items: flex-start;
        }
        
        .user-message {
          flex-direction: row-reverse;
        }
        
        .message-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 8px;
          flex-shrink: 0;
        }
        
        .user-message .message-avatar {
          background-color: #0d6efd;
          color: white;
        }
        
        .bot-message .message-avatar {
          background-color: #6c757d;
          color: white;
        }
        
        .message-bubble {
          max-width: 80%;
        }
        
        .message-content {
          padding: 10px;
          border-radius: 10px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        
        .user-message .message-content {
          background-color: #0d6efd;
          color: white;
          border-bottom-right-radius: 0;
        }
        
        .bot-message .message-content {
          background-color: white;
          color: #212529;
          border-bottom-left-radius: 0;
        }
        
        .message-time {
          font-size: 0.7rem;
          color: #6c757d;
          margin-top: 5px;
        }
        
        .user-message .message-time {
          text-align: right;
        }
        
        .input-container {
          display: flex;
          gap: 10px;
        }
        
        .input-container input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ced4da;
          border-radius: 20px;
          outline: none;
        }
        
        .input-container button {
          background-color: #0d6efd;
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        .input-container button:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
        }
        
        .user-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          background-color: white;
          padding: 15px;
          border-radius: 10px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .form-group label {
          font-size: 14px;
          color: #212529;
        }
        
        .form-control {
          padding: 8px 12px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .submit-button {
          background-color: #0d6efd;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 10px;
          cursor: pointer;
          font-weight: 500;
          margin-top: 10px;
        }
        
        .submit-button:hover {
          background-color: #0b5ed7;
        }
        
        .bot-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 15px;
        }
        
        .option-button {
          background-color: white;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 8px 12px;
          text-align: left;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
        }
        
        .option-button:hover {
          background-color: #f8f9fa;
          border-color: #0d6efd;
        }
        
        .option-button.whatsapp {
          background-color: #25D366;
          color: white;
          border-color: #25D366;
        }
        
        .option-button.whatsapp:hover {
          background-color: #128C7E;
        }
        
        .option-button.telegram {
          background-color: #0088cc;
          color: white;
          border-color: #0088cc;
        }
        
        .option-button.telegram:hover {
          background-color: #0077b5;
        }
        
        .option-icon {
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
};

export default ChatBox; 