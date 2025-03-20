import React, { useEffect } from 'react';

const SocketOverride: React.FC = () => {
  useEffect(() => {
    // Esconde mensagens de Socket.IO após o carregamento da página
    const hideSocketMessages = () => {
      const elements = document.querySelectorAll('[class*="socket"], [id*="socket"], [style*="position: fixed"][style*="bottom: 0"]');
      elements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
        }
      });
    };

    // Executar imediatamente
    hideSocketMessages();
    
    // Executar após um curto período para garantir que a mensagem seja ocultada
    const timer = setTimeout(hideSocketMessages, 100);
    
    // E também configurar um observador para remover quaisquer novas mensagens
    const observer = new MutationObserver((mutations) => {
      hideSocketMessages();
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return null; // Não renderiza nada
};

export default SocketOverride; 