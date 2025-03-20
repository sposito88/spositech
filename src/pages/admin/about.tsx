import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { FaInfoCircle, FaGithub, FaCode, FaServer, FaDatabase, FaReact, FaNodeJs } from 'react-icons/fa';

const AdminAbout: React.FC = () => {
  const systemInfo = {
    version: '1.0.0',
    releaseDate: '17/03/2024',
    lastUpdate: '17/03/2024',
    developer: 'SposiTech Team',
    repository: 'https://github.com/spositech/admin-panel',
    dependencies: [
      { name: 'React', version: '18.2.0', icon: <FaReact className="text-info" /> },
      { name: 'Next.js', version: '14.1.0', icon: <FaCode className="text-white" /> },
      { name: 'Node.js', version: '20.12.2', icon: <FaNodeJs className="text-success" /> },
      { name: 'Socket.io', version: '4.8.1', icon: <FaServer className="text-warning" /> },
      { name: 'Bootstrap', version: '5.3.2', icon: <FaCode className="text-primary" /> },
    ],
    database: { 
      type: 'MongoDB (simulado)', 
      version: '6.0',
      collections: ['users', 'chats', 'agents', 'settings', 'logs']
    },
    environment: {
      server: 'Next.js built-in',
      platform: 'Node.js',
      deployment: 'Vercel (recomendado)'
    }
  };

  return (
    <AdminLayout title="Sobre o Sistema">
      <div className="d-flex align-items-center mb-4">
        <FaInfoCircle className="text-accent-custom me-2" size={24} />
        <h5 className="text-white mb-0">Informações do Sistema</h5>
      </div>
      
      <div className="row g-4">
        <div className="col-md-6">
          {/* Informações do Sistema */}
          <div className="admin-card p-4 h-100">
            <h6 className="text-accent-custom mb-3">Detalhes da Versão</h6>
            <div className="mb-4">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-white">Versão:</span>
                <span className="text-light">{systemInfo.version}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-white">Data de Lançamento:</span>
                <span className="text-light">{systemInfo.releaseDate}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-white">Última Atualização:</span>
                <span className="text-light">{systemInfo.lastUpdate}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-white">Desenvolvido por:</span>
                <span className="text-light">{systemInfo.developer}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-white">Repositório:</span>
                <a 
                  href={systemInfo.repository} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent-custom"
                >
                  <FaGithub className="me-1" />
                  Ver no Github
                </a>
              </div>
            </div>
            
            <h6 className="text-accent-custom mb-3">Ambiente</h6>
            <div className="mb-4">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-white">Servidor:</span>
                <span className="text-light">{systemInfo.environment.server}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-white">Plataforma:</span>
                <span className="text-light">{systemInfo.environment.platform}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-white">Implantação Recomendada:</span>
                <span className="text-light">{systemInfo.environment.deployment}</span>
              </div>
            </div>
            
            <h6 className="text-accent-custom mb-3">Banco de Dados</h6>
            <div className="mb-0">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-white">Tipo:</span>
                <span className="text-light">{systemInfo.database.type}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-white">Versão:</span>
                <span className="text-light">{systemInfo.database.version}</span>
              </div>
              <div className="d-flex align-items-start justify-content-between">
                <span className="text-white">Coleções:</span>
                <div className="text-end">
                  {systemInfo.database.collections.map((collection, index) => (
                    <div key={index} className="text-light">
                      {collection}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          {/* Dependências */}
          <div className="admin-card p-4 h-100">
            <h6 className="text-accent-custom mb-3">Dependências</h6>
            <div className="table-responsive">
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th scope="col">Biblioteca</th>
                    <th scope="col">Versão</th>
                    <th scope="col">Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  {systemInfo.dependencies.map((dep, index) => (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center">
                          {dep.icon}
                          <span className="ms-2">{dep.name}</span>
                        </div>
                      </td>
                      <td>{dep.version}</td>
                      <td>
                        {dep.name === 'React' && 'Biblioteca principal de UI'}
                        {dep.name === 'Next.js' && 'Framework React para SSR/SSG'}
                        {dep.name === 'Node.js' && 'Ambiente de execução JavaScript'}
                        {dep.name === 'Socket.io' && 'Comunicação em tempo real'}
                        {dep.name === 'Bootstrap' && 'Framework CSS para UI responsiva'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Status da Licença */}
            <div className="mt-4 p-3 border border-dark rounded bg-dark">
              <h6 className="text-accent-custom mb-3">Licença</h6>
              <p className="text-light mb-1">
                Este software é licenciado sob os termos da licença MIT.
              </p>
              <p className="text-muted mb-0 small">
                A licença MIT permite uso, cópia, modificação, mesclagem, publicação, distribuição, sublicenciamento e/ou 
                venda de cópias do software, sujeitas às condições especificadas na licença completa.
              </p>
            </div>
            
            {/* Informações de Suporte */}
            <div className="mt-4">
              <h6 className="text-accent-custom mb-3">Suporte</h6>
              <p className="text-light mb-1">
                Para suporte técnico, entre em contato através de:
              </p>
              <ul className="text-light mb-0">
                <li>Email: suporte@spositech.com</li>
                <li>Site: https://www.spositech.com/suporte</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAbout; 