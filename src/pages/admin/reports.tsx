import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { FaChartBar, FaDownload, FaCalendarAlt, FaSync } from 'react-icons/fa';

// Dados do gráfico (dados fictícios)
const chartData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      name: 'Chats Realizados',
      data: [65, 59, 80, 81, 56, 89]
    },
    {
      name: 'Tempo Médio (minutos)',
      data: [12, 15, 13, 10, 9, 11] 
    }
  ]
};

// Interface para os relatórios
interface ReportOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const AdminReports: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  
  const reportOptions: ReportOption[] = [
    {
      id: 'chat-volume',
      name: 'Volume de Atendimentos',
      description: 'Relatório detalhado sobre o volume de atendimentos por período',
      icon: <FaChartBar className="text-accent-custom" size={24} />
    },
    {
      id: 'response-time',
      name: 'Tempo de Resposta',
      description: 'Análise de tempo médio de resposta e duração dos atendimentos',
      icon: <FaCalendarAlt className="text-accent-custom" size={24} />
    },
    {
      id: 'satisfaction',
      name: 'Satisfação do Cliente',
      description: 'Avaliações de satisfação e feedback dos clientes',
      icon: <FaChartBar className="text-accent-custom" size={24} />
    },
    {
      id: 'agent-performance',
      name: 'Desempenho dos Atendentes',
      description: 'Estatísticas de desempenho individual de cada atendente',
      icon: <FaChartBar className="text-accent-custom" size={24} />
    }
  ];

  // Efeito para simular carregamento de dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  // Renderiza o estado de carregamento
  if (isLoading) {
    return (
      <AdminLayout title="Relatórios">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border text-accent-custom" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Relatórios">
      {/* Barra de ações */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="text-white mb-0">Análise e Relatórios</h5>
        <button className="btn btn-sm btn-accent" onClick={handleRefresh}>
          <FaSync className="me-2" />
          Atualizar Dados
        </button>
      </div>
      
      {/* Seletor de período */}
      <div className="admin-card p-3 mb-4">
        <div className="row">
          <div className="col-md-5">
            <label className="text-white mb-2">Data Inicial</label>
            <input
              type="date"
              name="start"
              className="form-control bg-dark text-light border-dark"
              value={dateRange.start}
              onChange={handleChangeDate}
            />
          </div>
          <div className="col-md-5">
            <label className="text-white mb-2">Data Final</label>
            <input
              type="date"
              name="end"
              className="form-control bg-dark text-light border-dark"
              value={dateRange.end}
              onChange={handleChangeDate}
            />
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button className="btn btn-accent w-100">
              Aplicar
            </button>
          </div>
        </div>
      </div>
      
      {/* Cards de relatórios disponíveis */}
      <div className="row g-4 mb-4">
        {reportOptions.map(report => (
          <div key={report.id} className="col-md-6">
            <div className="admin-card p-3 h-100">
              <div className="d-flex mb-3">
                {report.icon}
                <div className="ms-3">
                  <h5 className="text-white mb-1">{report.name}</h5>
                  <p className="text-muted mb-0">{report.description}</p>
                </div>
              </div>
              
              <div className="mt-3 d-flex justify-content-end">
                <button className="btn btn-sm btn-outline-light me-2">
                  Visualizar
                </button>
                <button className="btn btn-sm btn-accent">
                  <FaDownload className="me-1" />
                  Exportar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Gráfico de exemplo - representação visual */}
      <div className="admin-card p-3 mb-4">
        <h5 className="text-white mb-3">Visão Geral de Atendimentos</h5>
        
        {/* Simulação de gráfico */}
        <div className="chart-container bg-dark p-4 rounded" style={{ height: '300px' }}>
          <div className="text-center text-muted mb-4">
            Gráfico de Volume de Atendimentos (Jan-Jun 2024)
          </div>
          
          <div className="d-flex h-75 align-items-end">
            {chartData.labels.map((label, index) => (
              <div key={label} className="d-flex flex-column align-items-center mx-auto">
                <div 
                  className="bg-accent-custom rounded-top" 
                  style={{ 
                    width: '20px', 
                    height: `${chartData.datasets[0].data[index] * 1.5}px`,
                    maxHeight: '100%'
                  }}
                />
                <div className="text-white mt-2 small">{label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-3 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div className="bg-accent-custom me-2" style={{ width: '12px', height: '12px' }}></div>
            <span className="text-white small">Chats Realizados</span>
          </div>
          
          <div>
            <select className="form-select form-select-sm bg-dark text-light border-dark">
              <option value="monthly">Mensal</option>
              <option value="weekly">Semanal</option>
              <option value="daily">Diário</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Estatísticas de atendimento */}
      <div className="admin-card p-3">
        <h5 className="text-white mb-3">Principais Métricas</h5>
        
        <div className="row g-3">
          <div className="col-md-4">
            <div className="border border-dark rounded p-3" style={{backgroundColor: "#232323"}}>
              <div className="text-accent-custom fw-bold h2 mb-0">89%</div>
              <div className="text-white">Taxa de Resolução</div>
              <div className="text-muted small">Em primeiro contato</div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="border border-dark rounded p-3" style={{backgroundColor: "#232323"}}>
              <div className="text-accent-custom fw-bold h2 mb-0">4.7</div>
              <div className="text-white">Avaliação Média</div>
              <div className="text-muted small">Escala de 1-5</div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="border border-dark rounded p-3" style={{backgroundColor: "#232323"}}>
              <div className="text-accent-custom fw-bold h2 mb-0">2:45</div>
              <div className="text-white">Tempo Médio</div>
              <div className="text-muted small">Minutos por atendimento</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReports; 