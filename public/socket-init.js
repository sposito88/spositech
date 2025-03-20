// Este arquivo é carregado diretamente no HTML e expõe o Socket.IO globalmente
// para evitar problemas com o webpack
(function() {
  console.log("Socket.IO inicializador carregado");
  
  // Função que verifica se o io está disponível
  function checkIO() {
    if (typeof io !== 'undefined') {
      // O io está disponível, podemos definir nossa função
      window.initializeSocketIO = function(serverUrl) {
        console.log("Inicializando socket para:", serverUrl);
        return io(serverUrl, {
          transports: ['websocket', 'polling'],
          timeout: 10000,
          autoConnect: true
        });
      };
      console.log("Socket.IO inicializado com sucesso");
    } else {
      // O io ainda não está disponível, verificar novamente em 100ms
      console.log("Aguardando carregamento do Socket.IO...");
      setTimeout(checkIO, 100);
    }
  }
  
  // Iniciar a verificação
  checkIO();
})(); 