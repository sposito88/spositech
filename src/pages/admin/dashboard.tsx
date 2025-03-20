import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import AdminTable from '@/components/AdminTable';
import RealTimeStats from '@/components/RealTimeStats';
import { FaUsers, FaComments, FaCheckCircle, FaChartBar, FaServer, FaClock } from 'react-icons/fa';

// Interface para os dados de estatísticas
interface DashboardStats {
  totalUsers: number;
  totalChats: number;
  activeChats: number;
  resolvedChats: number;
  avgResponseTime: string;
  satisfaction: number;
}

// Interface para os últimos chats
interface RecentChat {
  id: string;
  userName: string;
  agentName: string;
  date: Date;
  status: 'active' | 'resolved' | 'pending';
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalChats: 0,
    activeChats: 0,
    resolvedChats: 0,
    avgResponseTime: '0m',
    satisfaction: 0
  });
  
  const [recentChats, setRecentChats] = useState<RecentChat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState({
    name: '',
    email: ''
  });

  // Efeito para carregar os dados (simulado)
  useEffect(() => {
    // Em produção, esses dados viriam de uma API
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 152,
        totalChats: 89,
        activeChats: 3,
        resolvedChats: 86,
        avgResponseTime: '2m 35s',
        satisfaction: 95
      });
      
      setRecentChats([
        {
          id: 'chat_001',
          userName: 'João Silva',
          agentName: 'Atendente Admin',
          date: new Date(Date.now() - 25 * 60 * 1000),
          status: 'active'
        },
        {
          id: 'chat_002',
          userName: 'Maria Oliveira',
          agentName: 'Atendente Admin',
          date: new Date(Date.now() - 75 * 60 * 1000),
          status: 'resolved'
        },
        {
          id: 'chat_003',
          userName: 'Carlos Mendes',
          agentName: 'Atendente Admin',
          date: new Date(Date.now() - 120 * 60 * 1000),
          status: 'resolved'
        },
        {
          id: 'chat_004',
          userName: 'Ana Costa',
          agentName: 'Atendente Admin',
          date: new Date(Date.now() - 180 * 60 * 1000),
          status: 'resolved'
        },
        {
          id: 'chat_005',
          userName: 'Pedro Santos',
          agentName: 'Atendente Admin',
          date: new Date(Date.now() - 10 * 60 * 1000),
          status: 'active'
        }
      ]);
      
      // Recupera informações do administrador do localStorage
      if (typeof window !== 'undefined') {
        const adminName = localStorage.getItem('spositech_admin_name') || 'Administrador';
        const adminEmail = localStorage.getItem('spositech_admin_email') || 'admin@spositech.com';
        
        setAdminInfo({
          name: adminName,
          email: adminEmail
        });
      }
      
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Helper para formatar a data
  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    
    if (diffMins < 60) {
      return `${diffMins} min atrás`;
    } else if (diffMins < 1440) {
      const hours = Math.floor(diffMins / 60);
      return `${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`;
    } else {
      return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  // Configuração das colunas para a tabela de chats recentes
  const chatColumns = [
    { key: 'id', label: 'ID' },
    { key: 'userName', label: 'Usuário' },
    { key: 'agentName', label: 'Atendente' },
    { 
      key: 'date', 
      label: 'Data/Hora',
      render: (value: Date) => formatDate(value)
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`badge ${
          value === 'active' 
            ? 'bg-success' 
            : value === 'resolved'
              ? 'bg-info text-dark'
              : 'bg-warning text-dark'
        }`}>
          {value === 'active' 
            ? 'Ativo' 
            : value === 'resolved'
              ? 'Resolvido'
              : 'Pendente'
          }
        </span>
      )
    }
  ];

  // Renderiza o estado de carregamento
  if (isLoading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border text-accent-custom" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <h5 className="text-white mb-4">Visão Geral</h5>
      
      {/* Estatísticas em tempo real */}
      <div className="admin-card mb-4">
        <RealTimeStats 
          adminName={adminInfo.name}
          adminEmail={adminInfo.email}
        />
      </div>
      
      {/* Cards de estatísticas */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="admin-card p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="text-white">Total de Usuários</div>
              <FaUsers className="text-accent-custom" size={20} />
            </div>
            <div className="h3 mb-0 text-white">{stats.totalUsers}</div>
            <div className="small text-muted">Usuários registrados</div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="admin-card p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="text-white">Total de Chats</div>
              <FaComments className="text-accent-custom" size={20} />
            </div>
            <div className="h3 mb-0 text-white">{stats.totalChats}</div>
            <div className="small text-muted">{stats.activeChats} ativos, {stats.resolvedChats} resolvidos</div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="admin-card p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="text-white">Tempo de Resposta</div>
              <FaClock className="text-accent-custom" size={20} />
            </div>
            <div className="h3 mb-0 text-white">{stats.avgResponseTime}</div>
            <div className="small text-muted">Tempo médio</div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="admin-card p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="text-white">Satisfação</div>
              <FaCheckCircle className="text-accent-custom" size={20} />
            </div>
            <div className="h3 mb-0 text-white">{stats.satisfaction}%</div>
            <div className="small text-muted">Avaliação dos usuários</div>
          </div>
        </div>
      </div>
      
      {/* Chats recentes */}
      <div className="row">
        <div className="col-lg-12">
          <div className="admin-card">
            <div className="admin-card-header p-3">
              <h6 className="mb-0">Chats Recentes</h6>
            </div>
            <AdminTable 
              columns={chatColumns} 
              data={recentChats} 
              emptyMessage="Nenhum chat recente encontrado"
            />
          </div>
        </div>
      </div>
      
      {/* Ação rápida */}
      <div className="mt-4 text-center">
        <a href="/admin/chat" className="btn btn-accent">
          <FaComments className="me-2" />
          Ir para Atendimento
        </a>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard; 