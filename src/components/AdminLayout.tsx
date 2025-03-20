import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FaHome, FaComments, FaSignOutAlt, FaUsers, FaChartBar, FaUserShield, FaCog, FaQuestionCircle, FaInfoCircle, FaComment } from 'react-icons/fa';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  title = 'Painel Administrativo' 
}) => {
  const router = useRouter();
  const [adminName, setAdminName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  useEffect(() => {
    // Verificar se o usuário está autenticado
    const token = sessionStorage.getItem('adminToken');
    const name = sessionStorage.getItem('adminName');
    
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    if (name) {
      setAdminName(name);
    }
  }, [router]);
  
  // Função para logout
  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminName');
    sessionStorage.removeItem('adminEmail');
    router.push('/admin/login');
  };

  // Determinar seção ativa
  const getActiveSection = () => {
    if (!router.pathname) return '';
    
    if (router.pathname.includes('/admin/dashboard')) return 'dashboard';
    if (router.pathname.includes('/admin/users')) return 'users';
    if (router.pathname.includes('/admin/settings')) return 'settings';
    if (router.pathname.includes('/admin/reports')) return 'reports';
    if (router.pathname.includes('/admin/help')) return 'help';
    if (router.pathname.includes('/admin/about')) return 'about';
    if (router.pathname.includes('/admin/chat')) return 'chat';
    if (router.pathname.includes('/admin/chatbox')) return 'chatbox';
    
    return '';
  };

  if (adminName === '') {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <div className="spinner-border text-accent-custom" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <Head>
        <title>{title} | SposiTech Admin</title>
        <link rel="icon" href="/admin-favicon.ico" />
      </Head>
      
      <header className="admin-header">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <FaUserShield className="text-accent-custom me-2" size={24} />
              <h4 className="mb-0 text-white">{title}</h4>
            </div>
            <div>
              <Link href="/" className="btn btn-outline-light btn-sm me-2">
                <FaHome className="me-1" />
                Site Principal
              </Link>
              <button 
                className="btn btn-outline-danger btn-sm" 
                onClick={handleLogout}
              >
                <FaSignOutAlt className="me-1" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="d-flex flex-grow-1">
        <aside className="admin-sidebar d-none d-md-block">
          <nav className="pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link 
                  href="/admin/dashboard" 
                  className={`admin-nav-link ${getActiveSection() === 'dashboard' ? 'active' : ''}`}
                >
                  <FaChartBar className="icon" />
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  href="/admin/chat" 
                  className={`admin-nav-link ${getActiveSection() === 'chat' ? 'active' : ''}`}
                >
                  <FaComments className="icon" />
                  Atendimento
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  href="/admin/users" 
                  className={`admin-nav-link ${getActiveSection() === 'users' ? 'active' : ''}`}
                >
                  <FaUsers className="icon" />
                  Usuários
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  href="/admin/reports" 
                  className={`admin-nav-link ${getActiveSection() === 'reports' ? 'active' : ''}`}
                >
                  <FaChartBar className="icon" />
                  Relatórios
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  href="/admin/settings" 
                  className={`admin-nav-link ${getActiveSection() === 'settings' ? 'active' : ''}`}
                >
                  <FaCog className="icon" />
                  Configurações
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  href="/admin/help" 
                  className={`admin-nav-link ${getActiveSection() === 'help' ? 'active' : ''}`}
                >
                  <FaQuestionCircle className="icon" />
                  Ajuda
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  href="/admin/about" 
                  className={`admin-nav-link ${getActiveSection() === 'about' ? 'active' : ''}`}
                >
                  <FaInfoCircle className="icon" />
                  Sobre
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  href="/admin/chatbox" 
                  className={`admin-nav-link ${getActiveSection() === 'chatbox' ? 'active' : ''}`}
                >
                  <FaComment className="icon" />
                  Chat
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        
        <main className="admin-content flex-grow-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 