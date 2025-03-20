import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { FaCog, FaBell, FaEnvelope, FaLock, FaUserCog, FaPalette, FaSave } from 'react-icons/fa';

// Interface para as configurações
interface Settings {
  notifications: {
    email: boolean;
    browser: boolean;
    sound: boolean;
  };
  appearance: {
    theme: 'dark' | 'light';
    fontSize: string;
  };
  account: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  chat: {
    autoAccept: boolean;
    maxConcurrentChats: number;
    defaultMessage: string;
  };
}

const AdminSettings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('notificacoes');
  const [saveStatus, setSaveStatus] = useState<null | 'saving' | 'success' | 'error'>(null);
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      email: true,
      browser: true,
      sound: true
    },
    appearance: {
      theme: 'dark',
      fontSize: 'medium'
    },
    account: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    chat: {
      autoAccept: false,
      maxConcurrentChats: 3,
      defaultMessage: 'Olá, como posso ajudar?'
    }
  });

  // Carregar configurações do usuário
  useEffect(() => {
    // Simulação de carregamento de dados
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const adminName = localStorage.getItem('spositech_admin_name') || 'Administrador';
        const adminEmail = localStorage.getItem('spositech_admin_email') || 'admin@spositech.com';
        
        setSettings(prev => ({
          ...prev,
          account: {
            ...prev.account,
            name: adminName,
            email: adminEmail
          }
        }));
        
        setIsLoading(false);
      }
    }, 1000);
  }, []);

  // Função para atualizar as configurações
  const handleChange = (section: keyof Settings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Função para salvar configurações
  const handleSave = () => {
    setSaveStatus('saving');
    
    // Simulação de salvamento
    setTimeout(() => {
      if (settings.account.name && settings.account.email) {
        localStorage.setItem('spositech_admin_name', settings.account.name);
        localStorage.setItem('spositech_admin_email', settings.account.email);
        setSaveStatus('success');
        
        // Limpar status após 3 segundos
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus('error');
      }
    }, 1500);
  };

  // Renderiza o estado de carregamento
  if (isLoading) {
    return (
      <AdminLayout title="Configurações">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border text-accent-custom" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Configurações">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <FaCog className="text-accent-custom me-2" size={24} />
          <h5 className="text-white mb-0">Configurações da Conta</h5>
        </div>
        <button 
          className={`btn ${saveStatus === 'error' ? 'btn-danger' : 'btn-accent'}`} 
          onClick={handleSave} 
          disabled={saveStatus === 'saving'}
        >
          {saveStatus === 'saving' ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Salvando...
            </>
          ) : (
            <>
              <FaSave className="me-2" />
              {saveStatus === 'success' ? 'Salvo com Sucesso!' : saveStatus === 'error' ? 'Erro ao Salvar' : 'Salvar Alterações'}
            </>
          )}
        </button>
      </div>
      
      <div className="row">
        <div className="col-md-3">
          <div className="admin-card p-0">
            <div className="list-group list-group-flush">
              <button 
                className={`list-group-item list-group-item-action bg-dark text-white border-dark ${activeTab === 'notificacoes' ? 'active' : ''}`}
                onClick={() => setActiveTab('notificacoes')}
              >
                <FaBell className="me-2 text-accent-custom" />
                Notificações
              </button>
              <button 
                className={`list-group-item list-group-item-action bg-dark text-white border-dark ${activeTab === 'aparencia' ? 'active' : ''}`}
                onClick={() => setActiveTab('aparencia')}
              >
                <FaPalette className="me-2 text-accent-custom" />
                Aparência
              </button>
              <button 
                className={`list-group-item list-group-item-action bg-dark text-white border-dark ${activeTab === 'conta' ? 'active' : ''}`}
                onClick={() => setActiveTab('conta')}
              >
                <FaUserCog className="me-2 text-accent-custom" />
                Conta
              </button>
              <button 
                className={`list-group-item list-group-item-action bg-dark text-white border-dark ${activeTab === 'chat' ? 'active' : ''}`}
                onClick={() => setActiveTab('chat')}
              >
                <FaEnvelope className="me-2 text-accent-custom" />
                Preferências de Chat
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-md-9">
          <div className="admin-card p-4">
            {activeTab === 'notificacoes' && (
              <div>
                <h5 className="mb-4 text-white">Notificações</h5>
                <div className="mb-3 form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="emailNotif" 
                    checked={settings.notifications.email}
                    onChange={(e) => handleChange('notifications', 'email', e.target.checked)}
                  />
                  <label className="form-check-label text-white" htmlFor="emailNotif">
                    Receber notificações por e-mail
                  </label>
                  <div className="text-muted small">Receba alertas sobre novos chats e mensagens por e-mail</div>
                </div>
                
                <div className="mb-3 form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="browserNotif" 
                    checked={settings.notifications.browser}
                    onChange={(e) => handleChange('notifications', 'browser', e.target.checked)}
                  />
                  <label className="form-check-label text-white" htmlFor="browserNotif">
                    Notificações no navegador
                  </label>
                  <div className="text-muted small">Exibir notificações push do navegador quando um novo chat for recebido</div>
                </div>
                
                <div className="mb-3 form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="soundNotif" 
                    checked={settings.notifications.sound}
                    onChange={(e) => handleChange('notifications', 'sound', e.target.checked)}
                  />
                  <label className="form-check-label text-white" htmlFor="soundNotif">
                    Sons de notificação
                  </label>
                  <div className="text-muted small">Reproduzir um som quando novas mensagens forem recebidas</div>
                </div>
              </div>
            )}
            
            {activeTab === 'aparencia' && (
              <div>
                <h5 className="mb-4 text-white">Aparência</h5>
                <div className="mb-3">
                  <label className="form-label text-white">Tema</label>
                  <div className="d-flex">
                    <div className="form-check me-4">
                      <input 
                        type="radio" 
                        className="form-check-input" 
                        id="darkTheme" 
                        name="theme" 
                        value="dark"
                        checked={settings.appearance.theme === 'dark'}
                        onChange={() => handleChange('appearance', 'theme', 'dark')}
                      />
                      <label className="form-check-label text-white" htmlFor="darkTheme">
                        Escuro
                      </label>
                    </div>
                    <div className="form-check">
                      <input 
                        type="radio" 
                        className="form-check-input" 
                        id="lightTheme" 
                        name="theme" 
                        value="light"
                        checked={settings.appearance.theme === 'light'}
                        onChange={() => handleChange('appearance', 'theme', 'light')}
                      />
                      <label className="form-check-label text-white" htmlFor="lightTheme">
                        Claro (em breve)
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label text-white">Tamanho da Fonte</label>
                  <select 
                    className="form-select bg-dark border-dark text-white" 
                    value={settings.appearance.fontSize}
                    onChange={(e) => handleChange('appearance', 'fontSize', e.target.value)}
                  >
                    <option value="small">Pequena</option>
                    <option value="medium">Média</option>
                    <option value="large">Grande</option>
                  </select>
                </div>
              </div>
            )}
            
            {activeTab === 'conta' && (
              <div>
                <h5 className="mb-4 text-white">Informações da Conta</h5>
                <div className="mb-3">
                  <label htmlFor="adminName" className="form-label text-white">Nome</label>
                  <input 
                    type="text" 
                    className="form-control bg-dark border-dark text-white" 
                    id="adminName" 
                    value={settings.account.name}
                    onChange={(e) => handleChange('account', 'name', e.target.value)}
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="adminEmail" className="form-label text-white">E-mail</label>
                  <input 
                    type="email" 
                    className="form-control bg-dark border-dark text-white" 
                    id="adminEmail" 
                    value={settings.account.email}
                    onChange={(e) => handleChange('account', 'email', e.target.value)}
                  />
                </div>
                
                <h5 className="mb-3 mt-4 text-white">Alterar Senha</h5>
                <div className="mb-3">
                  <label htmlFor="adminPassword" className="form-label text-white">Nova Senha</label>
                  <input 
                    type="password" 
                    className="form-control bg-dark border-dark text-white" 
                    id="adminPassword" 
                    value={settings.account.password}
                    onChange={(e) => handleChange('account', 'password', e.target.value)}
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="adminConfirmPassword" className="form-label text-white">Confirmar Nova Senha</label>
                  <input 
                    type="password" 
                    className="form-control bg-dark border-dark text-white" 
                    id="adminConfirmPassword" 
                    value={settings.account.confirmPassword}
                    onChange={(e) => handleChange('account', 'confirmPassword', e.target.value)}
                  />
                </div>
              </div>
            )}
            
            {activeTab === 'chat' && (
              <div>
                <h5 className="mb-4 text-white">Preferências de Chat</h5>
                <div className="mb-3 form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="autoAccept" 
                    checked={settings.chat.autoAccept}
                    onChange={(e) => handleChange('chat', 'autoAccept', e.target.checked)}
                  />
                  <label className="form-check-label text-white" htmlFor="autoAccept">
                    Aceitar chats automaticamente
                  </label>
                  <div className="text-muted small">Os chats serão atribuídos automaticamente a você quando disponível</div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="maxChats" className="form-label text-white">Máximo de chats simultâneos</label>
                  <select 
                    className="form-select bg-dark border-dark text-white" 
                    id="maxChats"
                    value={settings.chat.maxConcurrentChats}
                    onChange={(e) => handleChange('chat', 'maxConcurrentChats', Number(e.target.value))}
                  >
                    <option value={1}>1 chat</option>
                    <option value={2}>2 chats</option>
                    <option value={3}>3 chats</option>
                    <option value={4}>4 chats</option>
                    <option value={5}>5 chats</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="defaultMessage" className="form-label text-white">Mensagem de boas-vindas padrão</label>
                  <textarea 
                    className="form-control bg-dark border-dark text-white" 
                    id="defaultMessage" 
                    rows={3}
                    value={settings.chat.defaultMessage}
                    onChange={(e) => handleChange('chat', 'defaultMessage', e.target.value)}
                  ></textarea>
                  <div className="text-muted small mt-1">Esta mensagem será enviada automaticamente quando um chat for iniciado</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings; 