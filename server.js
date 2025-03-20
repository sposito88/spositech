const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');

// Desativar o tracing do Next.js que está causando problemas de permissão
process.env.NEXT_TRACING_MODE = 'off';
process.env.NEXT_TELEMETRY_DISABLED = '1';

// Carregar variáveis de ambiente com tratamento de erro
try {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log('Variáveis de ambiente carregadas com sucesso de .env.local');
  } else {
    console.log('Arquivo .env.local não encontrado, usando variáveis padrão');
    dotenv.config();
  }
} catch (err) {
  console.error('Erro ao carregar variáveis de ambiente:', err);
  // Continuar mesmo se houver erro nas variáveis de ambiente
}

// Preparar uma estrutura para armazenar informações das conexões
const connections = {
  users: {},     // Usuários comuns conectados
  agents: {},    // Agentes de atendimento conectados
  queue: [],     // Fila de espera
  activeChats: {} // Chats ativos
};

// Servidor Socket.IO independente
const socketApp = express();
const socketServer = http.createServer(socketApp);

// Configurar CORS adequadamente
socketApp.use(cors({
  origin: [process.env.NODE_ENV === 'production' ? 'https://spositech.com.br' : 'http://localhost:3030'],
  methods: ['GET', 'POST'],
  credentials: true
}));

// Configurar Socket.IO com CORS adequado
const io = new Server(socketServer, {
  cors: {
    origin: [process.env.NODE_ENV === 'production' ? 'https://spositech.com.br' : 'http://localhost:3030'],
    methods: ['GET', 'POST'],
    credentials: true
  },
  path: '/socket.io/'
});

// Middleware para logging de requisições
socketApp.use((req, res, next) => {
  console.log(`[Socket.IO] ${req.method} ${req.url}`);
  next();
});

// Configurar rota de status da API
socketApp.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    version: '1.0.0',
    socketConnections: Object.keys(connections.users).length + Object.keys(connections.agents).length,
    queue: connections.queue.length,
    activeChats: Object.keys(connections.activeChats).length
  });
});

// Verificar periodicamente o status do servidor e enviar para todos os clientes
function broadcastServerStatus() {
  const status = {
    online: true,
    timestamp: new Date().toISOString(),
    connectedUsers: Object.keys(connections.users).length,
    connectedAgents: Object.keys(connections.agents).length,
    queueLength: connections.queue.length,
    activeChats: Object.keys(connections.activeChats).length
  };
  
  io.emit('server_status', status);
  console.log(`Status do servidor enviado: ${status.connectedUsers} usuários, ${status.connectedAgents} agentes, ${status.queueLength} na fila`);
}

// Iniciar emissão de status a cada 5 segundos
const statusInterval = setInterval(broadcastServerStatus, 5000);

// Configurar Socket.IO
io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);
  
  // Enviar status atual do servidor
  broadcastServerStatus();
  
  // Enviar o status do servidor quando um cliente se conecta
  socket.emit('server_status', {
    online: true,
    timestamp: new Date().toISOString(),
    connectedUsers: Object.keys(connections.users).length,
    connectedAgents: Object.keys(connections.agents).length,
    queueLength: connections.queue.length,
    activeChats: Object.keys(connections.activeChats).length
  });
  
  // Verificar disponibilidade de atendentes
  socket.on('check_agents_available', () => {
    const agentsAvailable = Object.values(connections.agents).some(agent => agent.available);
    socket.emit('agents_status', { available: agentsAvailable });
  });
  
  // Evento quando um agente conecta - corrigido para evitar registro duplo
  socket.on('admin_connected', (data) => {
    // Evitar registro duplo
    if (connections.agents[socket.id]) {
      console.log(`Agente já registrado: ${socket.id}`);
      return;
    }
    
    // Registrar agente
    connections.agents[socket.id] = {
      id: socket.id,
      name: data.name || 'Atendente',
      available: true
    };
    
    console.log(`Agente conectado: ${data.name || 'Atendente'} (${socket.id})`);
    
    // Enviar lista de chats ativos e fila de espera para o admin
    socket.emit('active_chats', Object.values(connections.activeChats));
    socket.emit('chat_queue', connections.queue);
    
    // Informar a todos os clientes que um agente está disponível
    io.emit('agents_status', { available: true });
    
    // Processar fila se houver clientes esperando
    if (connections.queue.length > 0) {
      console.log(`Existem ${connections.queue.length} clientes na fila. Notificando agente.`);
      socket.emit('chat_queue_updated', {
        queue: connections.queue,
        message: `Há ${connections.queue.length} cliente(s) esperando atendimento.`
      });
    }
  });
  
  // Evento quando um usuário inicia um chat - melhorado para autoatribuição se possível
  socket.on('user_start_chat', (data) => {
    const queueItem = {
      id: socket.id,
      userData: data.userData,
      waitingSince: new Date(),
      status: 'waiting'
    };
    
    connections.users[socket.id] = queueItem;
    
    console.log(`Usuário entrou na fila: ${socket.id}`);
    console.log(`Dados do usuário:`, data.userData);
    
    // Verificar se existe algum agente disponível para atendimento imediato
    const availableAgents = Object.entries(connections.agents)
      .filter(([_, agent]) => agent.available)
      .map(([id, agent]) => ({ id, ...agent }));
    
    if (availableAgents.length > 0) {
      // Atribuir ao primeiro agente disponível
      const agent = availableAgents[0];
      console.log(`Atribuindo automaticamente chat para agente disponível: ${agent.name} (${agent.id})`);
      
      // Adicionar aos chats ativos
      connections.activeChats[socket.id] = {
        id: socket.id,
        agentId: agent.id,
        userData: data.userData,
        messages: [],
        startTime: new Date()
      };
      
      // Notificar o usuário
      socket.emit('chat_assigned', {
        chatId: socket.id,
        agentName: agent.name
      });
      
      // Notificar o agente
      io.to(agent.id).emit('chat_assigned', {
        chatId: socket.id,
        userData: data.userData
      });
      
      // Atualizar lista de chats ativos para os agentes
      Object.keys(connections.agents).forEach(agentId => {
        io.to(agentId).emit('active_chats', Object.values(connections.activeChats));
      });
    } else {
      // Adicionar à fila se não houver agentes disponíveis
      connections.queue.push(queueItem);
      
      // Atualizar posição na fila
      updateQueuePositions();
      
      // Notificar agentes sobre novo chat na fila
      Object.keys(connections.agents).forEach(agentId => {
        io.to(agentId).emit('chat_queue', connections.queue);
      });
    }
  });
  
  // Evento quando um agente aceita um chat - aprimorado com melhor tratamento de erros
  socket.on('accept_chat', async (data) => {
    const { chatId } = data;
    
    console.log(`Agente ${socket.id} aceitando chat ${chatId}`);
    
    // Verificar se o agente está registrado
    if (!connections.agents[socket.id]) {
      console.log(`Erro: Agente ${socket.id} não está registrado`);
      socket.emit('error', { message: 'Você não está registrado como agente' });
      return;
    }
    
    // Verificar se o chat está na fila
    const chatIndex = connections.queue.findIndex(chat => chat.id === chatId);
    
    if (chatIndex === -1) {
      console.log(`Erro: Chat ${chatId} não está na fila`);
      socket.emit('error', { message: 'Chat não encontrado na fila' });
      return;
    }
    
    // Obter o chat da fila
    const chat = connections.queue[chatIndex];
    
    // Verificar se o usuário do chat ainda está conectado
    if (!connections.users[chat.id]) {
      console.log(`Erro: Usuário do chat ${chatId} não está mais conectado`);
      socket.emit('error', { message: 'Usuário do chat não está mais conectado' });
      
      // Remover da fila
      connections.queue.splice(chatIndex, 1);
      io.emit('chat_queue_updated', connections.queue);
      return;
    }
    
    // Vincular o agente ao usuário
    connections.agents[socket.id].activeChats.push(chatId);
    connections.users[chat.id].agentId = socket.id;
    
    // Adicionar aos chats ativos
    connections.activeChats[chatId] = {
      id: chatId,
      userId: chat.id,
      agentId: socket.id,
      messages: [],
      status: 'active',
      startTime: new Date()
    };
    
    // Remover o chat da fila
    connections.queue.splice(chatIndex, 1);
    
    // Atualizar a fila para todos
    io.emit('chat_queue_updated', connections.queue);
    
    // Notificar o agente que aceitou o chat
    socket.emit('chat_accepted', {
      chatId,
      userId: chat.id,
      userData: connections.users[chat.id]?.userData || {}
    });
    
    // Notificar o usuário que seu chat foi aceito
    const userSocket = io.sockets.sockets.get(chat.id);
    if (userSocket) {
      userSocket.emit('chat_started', {
        chatId,
        agentName: connections.agents[socket.id]?.name || 'Atendente'
      });
      
      // Enviar mensagem de boas-vindas
      const welcomeMessage = {
        id: uuidv4(),
        chatId,
        content: `Olá! Sou ${connections.agents[socket.id]?.name || 'um atendente'} e estou aqui para ajudar.`,
        sender: 'agent',
        senderName: connections.agents[socket.id]?.name || 'Atendente',
        timestamp: new Date()
      };
      
      // Salvar a mensagem no histórico
      if (!connections.activeChats[chatId].messages) {
        connections.activeChats[chatId].messages = [];
      }
      connections.activeChats[chatId].messages.push(welcomeMessage);
      
      // Enviar para ambos: agente e usuário
      userSocket.emit('new_message', welcomeMessage);
      socket.emit('new_message', welcomeMessage);
    }
    
    console.log(`Chat ${chatId} aceito com sucesso pelo agente ${socket.id}`);
    
    // Atualizar status do servidor
    broadcastServerStatus();
  });
  
  // Evento quando um agente está digitando
  socket.on('agent_typing', (data) => {
    const chatId = data.chatId;
    io.to(chatId).emit('agent_typing');
  });
  
  // Evento quando um usuário está digitando
  socket.on('user_typing', (data) => {
    const chat = Object.values(connections.activeChats).find(chat => chat.id === socket.id);
    if (chat) {
      io.to(chat.agentId).emit('user_typing', { chatId: socket.id });
    }
  });
  
  // Evento quando um agente envia uma mensagem
  socket.on('send_message_agent', (data) => {
    const chatId = data.chatId;
    const message = {
      content: data.message,
      sender: 'agent',
      timestamp: new Date()
    };
    
    // Armazenar a mensagem
    if (connections.activeChats[chatId]) {
      connections.activeChats[chatId].messages.push(message);
      
      // Enviar para o usuário
      io.to(chatId).emit('message_from_agent', { message });
    }
  });
  
  // Evento quando um usuário envia uma mensagem
  socket.on('send_message_user', (data) => {
    const message = {
      content: data.message,
      sender: 'user',
      timestamp: new Date()
    };
    
    // Encontrar o chat ativo deste usuário
    const chat = Object.values(connections.activeChats).find(chat => chat.id === socket.id);
    
    if (chat) {
      // Armazenar a mensagem
      connections.activeChats[socket.id].messages.push(message);
      
      // Enviar para o agente
      io.to(chat.agentId).emit('message_from_user', { 
        chatId: socket.id,
        message
      });
    }
  });
  
  // Evento quando um agente termina um chat
  socket.on('end_chat', (data) => {
    const chatId = data.chatId;
    
    if (connections.activeChats[chatId]) {
      // Notificar o usuário que o chat foi encerrado
      io.to(chatId).emit('chat_ended', { 
        message: 'O atendente encerrou o chat. Obrigado por entrar em contato!'
      });
      
      // Remover dos chats ativos
      delete connections.activeChats[chatId];
      
      // Atualizar lista de chats ativos para os agentes
      Object.keys(connections.agents).forEach(agentId => {
        io.to(agentId).emit('active_chats', Object.values(connections.activeChats));
      });
    }
  });
  
  // Evento quando um agente altera sua disponibilidade
  socket.on('agent_availability', (data) => {
    if (connections.agents[socket.id]) {
      connections.agents[socket.id].available = data.available;
      
      // Verificar se há algum agente disponível
      const agentsAvailable = Object.values(connections.agents).some(agent => agent.available);
      
      // Notificar todos os clientes sobre a disponibilidade de agentes
      io.emit('agents_status', { available: agentsAvailable });
    }
  });
  
  // Obter histórico de chat
  socket.on('get_chat_history', (data) => {
    const chatId = data.chatId;
    
    if (connections.activeChats[chatId]) {
      socket.emit('chat_history', {
        chatId,
        messages: connections.activeChats[chatId].messages
      });
    }
  });
  
  // Lidar com desconexão
  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
    
    // Remover da fila se for um usuário em espera
    connections.queue = connections.queue.filter(item => item.id !== socket.id);
    
    // Notificar agente se for um chat ativo
    const chat = Object.values(connections.activeChats).find(chat => chat.id === socket.id);
    if (chat) {
      io.to(chat.agentId).emit('user_disconnected', { chatId: socket.id });
      delete connections.activeChats[socket.id];
      
      // Atualizar lista de chats ativos para os agentes
      Object.keys(connections.agents).forEach(agentId => {
        io.to(agentId).emit('active_chats', Object.values(connections.activeChats));
      });
    }
    
    // Remover de usuários
    delete connections.users[socket.id];
    
    // Se for um agente, remover e atualizar disponibilidade
    if (connections.agents[socket.id]) {
      delete connections.agents[socket.id];
      
      // Verificar se ainda há agentes disponíveis
      const agentsAvailable = Object.values(connections.agents).some(agent => agent.available);
      io.emit('agents_status', { available: agentsAvailable });
    }
    
    // Atualizar posições na fila
    updateQueuePositions();
  });

  // Modificar a lógica de registro de agente para evitar duplicação
  socket.on('register_agent', (data) => {
    // Verificar se este socket já está registrado como agente
    if (connections.agents[socket.id]) {
      console.log(`Agente ${socket.id} já está registrado`);
      socket.emit('agent_registered', { 
        success: true,
        message: 'Você já está registrado como agente',
        agentId: socket.id 
      });
      return;
    }
    
    // Registrar o novo agente
    const agentName = data.name || 'Agente Anônimo';
    
    connections.agents[socket.id] = { 
      id: socket.id, 
      name: agentName,
      socket: socket,
      status: 'available',
      activeChats: [],
      joinedAt: new Date()
    };
    
    console.log(`🧑‍💼 Agente registrado: ${agentName} (${socket.id})`);
    
    // Confirmar o registro para o agente
    socket.emit('agent_registered', { 
      success: true, 
      message: 'Registrado como agente com sucesso',
      agentId: socket.id 
    });
    
    // Se houver clientes na fila, notificar o agente
    if (connections.queue.length > 0) {
      socket.emit('clients_waiting', { count: connections.queue.length });
    }
    
    // Atualizar status do servidor
    broadcastServerStatus();
    
    // Atualizar a fila para o novo agente
    socket.emit('chat_queue_updated', connections.queue);
  });

  // Adicionar evento para recuperar a fila de chat
  socket.on('get_chat_queue', () => {
    console.log(`Enviando fila de chat para ${socket.id}`);
    socket.emit('chat_queue_updated', connections.queue);
  });

  // Modificar o evento start_chat para conectar automaticamente se houver agentes disponíveis
  socket.on('start_chat', (data) => {
    // Verificar se o usuário já iniciou um chat
    const existingChatIndex = connections.queue.findIndex(chat => chat.id === socket.id);
    if (existingChatIndex !== -1) {
      console.log(`Usuário ${socket.id} já está na fila de espera`);
      socket.emit('chat_queued', { 
        position: existingChatIndex + 1,
        message: 'Você já está na fila de espera. Por favor, aguarde.' 
      });
      return;
    }
    
    // Verificar se o usuário já está em um chat ativo
    const isInActiveChat = Object.values(connections.activeChats).some(
      chat => chat.id === socket.id && chat.status === 'active'
    );
    
    if (isInActiveChat) {
      console.log(`Usuário ${socket.id} já está em um chat ativo`);
      socket.emit('error', { message: 'Você já está em um chat ativo' });
      return;
    }
    
    // Registrar dados do usuário
    if (data.userData) {
      if (!connections.users[socket.id]) {
        connections.users[socket.id] = {
          id: socket.id,
          socket: socket,
          userData: {}
        };
      }
      connections.users[socket.id].userData = data.userData;
    }
    
    // Criar ID do chat
    const chatId = uuidv4();
    
    // Adicionar o chat à fila
    const queueItem = {
      id: chatId,
      userId: socket.id,
      userData: connections.users[socket.id]?.userData || {},
      waitingSince: new Date(),
      status: 'waiting'
    };
    
    connections.queue.push(queueItem);
    
    // Notificar o usuário que está na fila
    socket.emit('chat_queued', { 
      chatId: chatId,
      position: connections.queue.length,
      message: 'Você está na fila de espera. Um agente irá atendê-lo em breve.' 
    });
    
    console.log(`Chat ${chatId} iniciado por usuário ${socket.id} e adicionado à fila`);
    console.log(`Fila atual: ${connections.queue.length} chats aguardando`);
    
    // Verificar se há agentes disponíveis e notificá-los
    const availableAgents = Object.values(connections.agents).filter(
      agent => agent.status === 'available' && agent.activeChats.length < 3
    );
    
    if (availableAgents.length > 0) {
      console.log(`Há ${availableAgents.length} agentes disponíveis. Notificando...`);
      
      // Notificar todos os agentes disponíveis
      availableAgents.forEach(agent => {
        if (agent.socket) {
          agent.socket.emit('clients_waiting', { count: connections.queue.length });
        }
      });
      
      // Tentar atribuir automaticamente o chat ao primeiro agente disponível
      const firstAgent = availableAgents[0];
      if (firstAgent && firstAgent.socket) {
        console.log(`Tentando atribuir chat ${chatId} automaticamente ao agente ${firstAgent.id}`);
        
        // Simular aceitação de chat pelo agente
        firstAgent.socket.emit('auto_assign_chat', { chatId });
      }
    } else {
      console.log('Não há agentes disponíveis no momento.');
    }
    
    // Notificar todos sobre a atualização da fila
    io.emit('chat_queue_updated', connections.queue);
    
    // Atualizar status do servidor
    broadcastServerStatus();
  });
  
  // Novo evento para atribuição automática de chat
  socket.on('auto_assign_chat', (data) => {
    // Se o agente confirmar a atribuição automática, processar como aceitação normal
    const { chatId } = data;
    socket.emit('accept_chat', { chatId });
  });
});

// Função para atualizar posições na fila e notificar os usuários
function updateQueuePositions() {
  connections.queue.forEach((item, index) => {
    const userSocket = io.sockets.sockets.get(item.id);
    if (userSocket) {
      io.to(item.id).emit('queue_position', { 
        position: index + 1,
        userId: item.id
      });
    }
  });
}

// Definir porta e URL
const PORT = process.env.SOCKET_PORT || 3005;
// Não force HTTPS no ambiente de desenvolvimento
const CLIENT_URL = process.env.NODE_ENV === 'production' 
  ? 'https://spositech.com.br' 
  : 'http://localhost:3030';

// Iniciar o servidor
socketServer.listen(PORT, () => {
  console.log(`Servidor Socket.IO iniciado na porta ${PORT}`);
  console.log(`Aceitando conexões de ${CLIENT_URL}`);
  
  // Iniciar broadcast a cada 5 segundos
  setInterval(broadcastServerStatus, 5000);
  
  // Broadcast inicial
  broadcastServerStatus();
});

// Quando o servidor encerrar, limpar o intervalo
process.on('SIGINT', () => {
  console.log('Servidor Socket.IO encerrando...');
  clearInterval(statusInterval);
  process.exit(0);
}); 