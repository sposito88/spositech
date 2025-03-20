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
  sender: 'user' | 'bot';
  content: string;
}

interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [showForm, setShowForm] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const botOptions = [
    { id: 'products', text: 'Produtos e Serviços' },
    { id: 'support', text: 'Suporte Técnico' },
    { id: 'sales', text: 'Falar com Vendas' }
  ];

  // Rolar para a mensagem mais recente
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Abrir chat com mensagem de boas-vindas
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage('Olá! Como posso ajudar você hoje?');
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        sender,
        content: text
      }
    ]);
  };

  const addBotMessage = (text: string) => {
    // Pequeno atraso para simular resposta do bot
    setTimeout(() => {
      addMessage(text, 'bot');
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Adicionar mensagem do usuário
    addMessage(input, 'user');
    
    // Simular resposta do bot
    handleBotResponse(input);
    
    // Limpar input
    setInput('');
  };

  const handleOptionClick = (option: string) => {
    addMessage(option, 'user');
    
    // Respostas específicas para cada opção
    switch(option) {
      case 'Produtos e Serviços':
        addBotMessage('Oferecemos diversos serviços de TI, incluindo suporte técnico, manutenção de sistemas, consultoria em TI, suporte mobile, redes e infraestrutura, e segurança digital. Qual serviço específico você gostaria de conhecer?');
        break;
      case 'Suporte Técnico':
        addBotMessage('Nosso suporte técnico está disponível 24/7. Para assistência imediata, você pode nos contatar pelo WhatsApp ou enviar um e-mail para suporte@spositech.com.br com detalhes do seu problema.');
        break;
      case 'Falar com Vendas':
        addBotMessage('Obrigado pelo seu interesse! Um de nossos consultores de vendas entrará em contato com você em breve. Você gostaria de receber mais informações sobre algum serviço específico?');
        break;
      default:
        addBotMessage('Como posso ajudar você com isso?');
    }
  };

  const handleBotResponse = (message: string) => {
    const lowerMsg = message.toLowerCase();
    
    // Respostas simples baseadas em palavras-chave
    if (lowerMsg.includes('preço') || lowerMsg.includes('valor') || lowerMsg.includes('custo')) {
      addBotMessage('Nossos preços variam de acordo com o serviço e as necessidades específicas da sua empresa. Podemos preparar um orçamento personalizado para você. Por favor, compartilhe mais detalhes sobre o que você está procurando.');
    } 
    else if (lowerMsg.includes('horário') || lowerMsg.includes('atendimento') || lowerMsg.includes('disponível')) {
      addBotMessage('Nosso horário de atendimento é de segunda a sexta, das 8h às 18h. Para emergências, oferecemos suporte 24/7 através do nosso canal prioritário.');
    }
    else if (lowerMsg.includes('obrigado') || lowerMsg.includes('valeu') || lowerMsg.includes('agradeço')) {
      addBotMessage('De nada! Estou aqui para ajudar. Precisa de mais alguma coisa?');
    }
    else if (lowerMsg.includes('endereço') || lowerMsg.includes('localização') || lowerMsg.includes('onde fica')) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          ...messages,
          {
            id: Date.now().toString(),
            sender: 'bot',
            content: "Nosso endereço é Rua Cosme Alves da Silva, 07, Cajá, Carpina - PE, 55813-095. Você pode nos visitar de segunda a sexta das 08h às 18h e aos sábados das 09h às 13h."
          }
        ]);
        setIsTyping(false);
      }, 1000);
    }
    else if (lowerMsg.includes('whatsapp') || lowerMsg.includes('contato') || lowerMsg.includes('telefone')) {
      addBotMessage('Você pode nos contatar pelo WhatsApp (81) 99874-6712 a qualquer momento. Estamos sempre prontos para ajudar!');
    }
    else if (lowerMsg.includes('segurança') || lowerMsg.includes('firewall') || lowerMsg.includes('antivírus')) {
      addBotMessage('Nossos serviços de segurança digital incluem instalação de firewall, antivírus, proteção contra ransomware, backup em nuvem e consultoria em segurança da informação. Qual destes serviços você precisa?');
    }
    else if (lowerMsg.includes('site') || lowerMsg.includes('website') || lowerMsg.includes('loja') || lowerMsg.includes('e-commerce')) {
      addBotMessage('Desenvolvemos sites responsivos, lojas virtuais e sistemas web personalizados. Nossos projetos incluem design moderno, otimização para SEO e compatibilidade com todos os dispositivos.');
    }
    else if (lowerMsg.includes('formação') || lowerMsg.includes('curso') || lowerMsg.includes('treinamento')) {
      addBotMessage('Oferecemos treinamentos e capacitações em diversas áreas de TI, desde informática básica até programação avançada. Nossos cursos podem ser personalizados para atender às necessidades específicas da sua equipe.');
    }
    else {
      addBotMessage('Entendi. Um de nossos especialistas entrará em contato com você em breve para fornecer mais informações. Você tem alguma outra pergunta?');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    if (!name || !email) {
      addBotMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    setUserInfo({ name, email, phone });
    setShowForm(false);
    addBotMessage(`Obrigado ${name}! Como posso ajudar você hoje?`);
    
    // Mostrar opções após o preenchimento do formulário
    setTimeout(() => {
      addBotMessage('Por favor, selecione uma das opções abaixo ou digite sua pergunta:');
    }, 1000);
  };

  return (
    <>
      {/* Botão de chat */}
      <button
        className="chat-button"
        onClick={toggleChat}
        aria-label="Chat"
      >
        {isOpen ? <FaTimes /> : <FaComments />}
        {!isOpen && <span className="ms-2">Chat</span>}
      </button>

      {/* Janela de chat */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="d-flex align-items-center">
              <FaRobot className="me-2" />
              <span>Assistente SposiTech</span>
            </div>
              <button 
              className="close-button" 
                onClick={toggleChat}
                aria-label="Fechar"
            >
              <FaTimes />
            </button>
          </div>

          <div className="chat-body">
            {showForm && !userInfo ? (
              <div className="user-form">
                <div className="bot-message mb-3">
                  Por favor, preencha seus dados para iniciar o atendimento:
                </div>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Seu nome *"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Seu e-mail *"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      placeholder="Seu telefone"
                    />
                  </div>
                  <button type="submit" className="btn btn-accent w-100">
                    Iniciar Conversa
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="messages">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.sender}`}>
                      <div className="message-icon">
                        {msg.sender === 'bot' ? <FaRobot /> : <FaUser />}
                      </div>
                      <div className="message-text">{msg.content}</div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="message bot">
                      <div className="message-icon">
                        <FaRobot />
                      </div>
                      <div className="message-text typing">Digitando...</div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {botOptions.length > 0 && !showForm && (
                  <div className="bot-options">
                    {botOptions.map((option) => (
                      <button
                        key={option.id}
                        className="bot-option-button"
                        onClick={() => handleOptionClick(option.text)}
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                )}

                <form className="chat-input" onSubmit={handleSubmit}>
            <input
              type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
                    className="form-control"
            />
              <button 
                    type="submit"
                    className="send-button"
                    disabled={!input.trim()}
                    aria-label="Enviar"
              >
                <FaPaperPlane />
              </button>
                </form>
              </>
            )}
          </div>

          <div className="chat-footer">
            <div className="alternative-contact">
              <p>Prefere outro canal? Fale conosco:</p>
              <div className="contact-buttons">
                <a
                  href="https://wa.me/5581998746712"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-button"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
                <a
                  href="https://t.me/spositech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="telegram-button"
                >
                  <FaTelegram /> Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .chat-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: auto;
          height: auto;
          padding: 12px 24px;
          background-color: #0d6efd;
          color: white;
          border: none;
          border-radius: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 1000;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .chat-button:hover {
          background-color: #0b5ed7;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }

        .chat-window {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 350px;
          height: 500px;
          background-color: #2a2a2a;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .chat-header {
          background-color: #101010;
          color: white;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #444;
        }

        .close-button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 18px;
        }

        .chat-body {
          flex: 1;
          overflow-y: auto;
          padding: 15px;
          display: flex;
          flex-direction: column;
          color: white;
        }

        .user-form {
          background-color: #333;
          padding: 15px;
          border-radius: 8px;
          color: white;
        }

        .messages {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .message {
          display: flex;
          margin-bottom: 10px;
          max-width: 85%;
        }

        .user-message {
          margin-left: auto;
          flex-direction: row-reverse;
        }

        .bot-message {
          margin-right: auto;
        }

        .message-icon {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin: 0 8px;
          background-color: #444;
          color: white;
        }

        .user-message .message-icon {
          background-color: #0d6efd;
        }

        .message-text {
          margin-bottom: 4px;
        }

        .bot-options {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 10px 0;
          justify-content: center;
        }

        .bot-option-button {
          background-color: #444;
          border: none;
          color: white;
          padding: 8px 15px;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .bot-option-button:hover {
          background-color: #0d6efd;
        }

        .chat-input {
          padding: 10px 15px;
          display: flex;
          gap: 10px;
          background-color: #333;
          border-top: 1px solid #444;
        }

        .form-control {
          background-color: #2a2a2a;
          color: white;
          border: 1px solid #444;
        }

        .form-control::placeholder {
          color: #aaa;
        }

        .form-control:focus {
          background-color: #333;
          color: white;
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }

        .send-button {
          background-color: #0d6efd;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .send-button:hover:not(:disabled) {
          background-color: #0b5ed7;
          transform: scale(1.05);
        }

        .send-button:disabled {
          background-color: #666;
          cursor: not-allowed;
        }

        .chat-footer {
          padding: 10px;
          border-top: 1px solid #444;
        }

        .alternative-contact {
          text-align: center;
        }

        .alternative-contact p {
          font-size: 12px;
          color: #ccc;
          margin-bottom: 8px;
        }

        .contact-buttons {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .whatsapp-button, .telegram-button {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 16px;
          border-radius: 5px;
          color: white;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.2s;
        }

        .whatsapp-button {
          background-color: #25D366;
        }

        .telegram-button {
          background-color: #0088cc;
        }

        .whatsapp-button:hover {
          background-color: #1da851;
        }

        .telegram-button:hover {
          background-color: #0070a8;
        }
      `}</style>
    </>
  );
};

export default Chatbot; 