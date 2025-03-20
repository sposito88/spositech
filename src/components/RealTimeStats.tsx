import React, { useEffect, useState } from 'react';
import { FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useSocket } from '@/hooks/useSocket';

interface RealTimeStatsProps {
  adminName: string;
  adminEmail: string;
}

interface ChatStats {
  waitingCount: number;
  activeChats: number;
  resolvedToday: number;
  averageWaitTime: string;
  connectionStatus: 'connecting' | 'connected' | 'disconnected';
}

interface Agent {
  agentId: string;
  name: string;
  status: string;
  activeChatsCount: number;
}

interface QueueUpdate {
  waitingCount: number;
  waitingUsers: Array<unknown>;
  onlineAgents: Agent[];
}

const RealTimeStats: React.FC<RealTimeStatsProps> = ({ adminName, adminEmail }) => {
  const { socket, isConnected, error: socketError } = useSocket();
  
  const [stats, setStats] = useState<ChatStats>({
    waitingCount: 0,
    activeChats: 0,
    resolvedToday: 0,
    averageWaitTime: '0:00',
    connectionStatus: 'connecting'
  });

  // Efeito para atualizar o status da conexão
  useEffect(() => {
    setStats(prev => ({
      ...prev,
      connectionStatus: socketError 
        ? 'disconnected' 
        : isConnected 
          ? 'connected' 
          : 'connecting'
    }));
  }, [isConnected, socketError]);

  // Efeito para configurar os ouvintes de eventos
  useEffect(() => {
    if (!socket || !isConnected) return;

    // Identifica-se como um atendente para o servidor
    socket.emit('agent_connect', {
      name: adminName,
      email: adminEmail,
      department: 'Administração',
      metadata: {
        role: 'admin',
        viewingDashboard: true
      }
    });
    
    // Recebe atualizações da fila de espera
    socket.on('queue_update', (data: QueueUpdate) => {
      setStats(prev => ({
        ...prev,
        waitingCount: data.waitingCount,
        activeChats: data.onlineAgents.reduce((sum: number, agent: Agent) => sum + agent.activeChatsCount, 0)
      }));
    });

    // Recebe estatísticas em tempo real
    socket.on('stats_update', (data: {resolvedToday?: number, averageWaitTime?: string}) => {
      if (data.resolvedToday !== undefined) {
        setStats(prev => ({
          ...prev,
          resolvedToday: data.resolvedToday || 0,
          averageWaitTime: data.averageWaitTime || prev.averageWaitTime
        }));
      }
    });

    // Limpeza
    return () => {
      socket.off('queue_update');
      socket.off('stats_update');
    };
  }, [socket, isConnected, adminName, adminEmail]);

  // Simular algumas estatísticas para demonstração
  useEffect(() => {
    if (stats.connectionStatus === 'connected') {
      const timer = setInterval(() => {
        setStats(prev => ({
          ...prev,
          resolvedToday: prev.resolvedToday + (Math.random() > 0.8 ? 1 : 0),
          activeChats: Math.max(0, prev.activeChats + (Math.random() > 0.7 ? 1 : -1))
        }));
      }, 15000);
      
      return () => clearInterval(timer);
    }
  }, [stats.connectionStatus]);

  return (
    <div className="realtime-stats">
      <div className="admin-card-header p-3 d-flex justify-content-between align-items-center mb-0">
        <h6 className="mb-0">Estatísticas em Tempo Real</h6>
        <div className="d-flex align-items-center">
          {stats.connectionStatus === 'connecting' && (
            <>
              <FaSpinner className="me-2 fa-spin text-warning" />
              <span className="small text-warning">Conectando...</span>
            </>
          )}
          {stats.connectionStatus === 'connected' && (
            <>
              <FaCheckCircle className="me-2 text-success" />
              <span className="small text-success">Conectado</span>
            </>
          )}
          {stats.connectionStatus === 'disconnected' && (
            <>
              <FaExclamationTriangle className="me-2 text-danger" />
              <span className="small text-danger">Desconectado</span>
            </>
          )}
        </div>
      </div>
      
      <div className="p-3">
        <div className="row g-3">
          <div className="col-md-6 col-lg-3">
            <div className="border border-dark rounded p-3 text-center">
              <div className="text-accent-custom fw-bold h3 mb-0">{stats.waitingCount}</div>
              <div className="text-white">Na Fila</div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="border border-dark rounded p-3 text-center">
              <div className="text-accent-custom fw-bold h3 mb-0">{stats.activeChats}</div>
              <div className="text-white">Chats Ativos</div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="border border-dark rounded p-3 text-center">
              <div className="text-accent-custom fw-bold h3 mb-0">{stats.resolvedToday}</div>
              <div className="text-white">Resolvidos Hoje</div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="border border-dark rounded p-3 text-center">
              <div className="text-accent-custom fw-bold h3 mb-0">{stats.averageWaitTime}</div>
              <div className="text-white">Tempo Médio de Espera</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeStats; 