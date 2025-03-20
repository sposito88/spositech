import React from 'react';
import Layout from '@/components/Layout';
import { 
  FaCode, 
  FaMobileAlt, 
  FaServer, 
  FaDesktop, 
  FaDatabase,
  FaLink,
  FaGithub,
  FaCalendarAlt,
  FaUserAlt,
  FaChevronRight
} from 'react-icons/fa';

export default function Projetos() {
  const projetos = [
    {
      id: 1,
      titulo: 'Sistema de Gestão Empresarial',
      cliente: 'TechSolutions',
      descricao: 'Desenvolvimento de um sistema completo para gestão de processos internos, incluindo módulos de RH, financeiro, estoque e atendimento ao cliente.',
      tecnologias: ['React', 'Node.js', 'MongoDB', 'Express'],
      categoria: 'Web',
      imagem: '/images/project-placeholder.svg',
      data: 'Janeiro 2023',
      icon: <FaDesktop size={36} className="text-accent-custom" />
    },
    {
      id: 2,
      titulo: 'Aplicativo de Delivery',
      cliente: 'FoodExpress',
      descricao: 'Aplicativo mobile para pedidos de comida com integração a sistemas de pagamento e geolocalização para rastreamento de entregadores em tempo real.',
      tecnologias: ['React Native', 'Firebase', 'Google Maps API', 'Stripe'],
      categoria: 'Mobile',
      imagem: '/images/project-placeholder.svg',
      data: 'Março 2023',
      icon: <FaMobileAlt size={36} className="text-accent-custom" />
    },
    {
      id: 3,
      titulo: 'Infraestrutura em Nuvem',
      cliente: 'LogisTrade',
      descricao: 'Migração completa da infraestrutura local para a nuvem, incluindo servidores, bancos de dados e sistemas de backup com alta disponibilidade.',
      tecnologias: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      categoria: 'Infraestrutura',
      imagem: '/images/project-placeholder.svg',
      data: 'Maio 2023',
      icon: <FaServer size={36} className="text-accent-custom" />
    },
    {
      id: 4,
      titulo: 'Sistema de Business Intelligence',
      cliente: 'DataInsights',
      descricao: 'Implementação de uma solução de BI para análise de dados de vendas, marketing e operações, com dashboards personalizados e relatórios automatizados.',
      tecnologias: ['Power BI', 'SQL Server', 'Python', 'Azure'],
      categoria: 'Dados',
      imagem: '/images/project-placeholder.svg',
      data: 'Julho 2023',
      icon: <FaDatabase size={36} className="text-accent-custom" />
    },
    {
      id: 5,
      titulo: 'E-commerce Personalizado',
      cliente: 'FashionStore',
      descricao: 'Desenvolvimento de uma plataforma de e-commerce com recursos avançados de personalização de produtos, integração com marketplaces e gestão de estoque multicanalizada.',
      tecnologias: ['Next.js', 'Strapi', 'PostgreSQL', 'Stripe'],
      categoria: 'Web',
      imagem: '/images/project-placeholder.svg',
      data: 'Setembro 2023',
      icon: <FaDesktop size={36} className="text-accent-custom" />
    },
    {
      id: 6,
      titulo: 'API de Integração',
      cliente: 'FinTech Solutions',
      descricao: 'Desenvolvimento de uma API robusta para integração entre sistemas financeiros, com foco em segurança, performance e escalabilidade.',
      tecnologias: ['Node.js', 'Express', 'Redis', 'JWT', 'MongoDB'],
      categoria: 'Backend',
      imagem: '/images/project-placeholder.svg',
      data: 'Novembro 2023',
      icon: <FaCode size={36} className="text-accent-custom" />
    }
  ];

  const categorias = [
    { id: 'todos', nome: 'Todos' },
    { id: 'web', nome: 'Web' },
    { id: 'mobile', nome: 'Mobile' },
    { id: 'infraestrutura', nome: 'Infraestrutura' },
    { id: 'dados', nome: 'Dados' },
    { id: 'backend', nome: 'Backend' }
  ];

  return (
    <Layout>
      <div className="section-dark py-5" style={{ 
        background: 'url(/images/projects-bg.svg) no-repeat center center',
        backgroundSize: 'cover'
      }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-4 fw-bold">Nossos <span className="text-accent-custom neon-text">Projetos</span></h1>
              <p className="lead">
                Conheça alguns dos projetos que desenvolvemos para nossos clientes
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="section-dark-gray py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {categorias.map((categoria) => (
                  <button 
                    key={categoria.id} 
                    className="btn btn-outline-accent px-4 py-2 rounded-pill"
                  >
                    {categoria.nome}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="row g-4">
            {projetos.map((projeto) => (
              <div key={projeto.id} className="col-md-6 col-lg-4">
                <div className="card h-100 project-card">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      {projeto.icon}
                      <h3 className="card-title h5 fw-bold ms-2 mb-0">{projeto.titulo}</h3>
                    </div>
                    
                    <div className="mb-3">
                      <img 
                        src={projeto.imagem} 
                        alt={projeto.titulo} 
                        className="img-fluid rounded mb-3" 
                        style={{ 
                          border: '1px solid rgba(57, 255, 20, 0.3)',
                          boxShadow: '0 0 10px rgba(57, 255, 20, 0.1)'
                        }}
                      />
                    </div>
                    
                    <div className="mb-3 d-flex align-items-center">
                      <span className="badge bg-dark-custom text-accent-custom me-2 px-3 py-2 rounded-pill">
                        {projeto.categoria}
                      </span>
                      <div className="d-flex align-items-center small text-muted">
                        <FaCalendarAlt className="me-1" />
                        <span>{projeto.data}</span>
                      </div>
                    </div>
                    
                    <p className="card-text mb-3">{projeto.descricao}</p>
                    
                    <div className="mb-3">
                      <div className="d-flex align-items-center small mb-2">
                        <FaUserAlt className="text-accent-custom me-2" />
                        <span className="fw-bold">Cliente:</span>
                        <span className="ms-2">{projeto.cliente}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h6 className="fw-bold text-accent-custom small mb-2">Tecnologias:</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {projeto.tecnologias.map((tech, index) => (
                          <span 
                            key={index} 
                            className="badge bg-dark text-light px-2 py-1"
                            style={{ border: '1px solid rgba(57, 255, 20, 0.3)' }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <button className="btn btn-sm btn-outline-accent w-100">
                        Ver Detalhes <FaChevronRight className="ms-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="fw-bold mb-3">Metodologia de <span className="text-accent-custom neon-text">Desenvolvimento</span></h2>
              <p className="mb-4">
                Nossa abordagem para desenvolvimento de projetos segue metodologias ágeis, garantindo entregas contínuas e de alta qualidade. Trabalhamos em estreita colaboração com nossos clientes em todas as etapas do processo.
              </p>
              
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="p-3 rounded-3" style={{ border: '1px solid rgba(57, 255, 20, 0.2)', boxShadow: '0 0 10px rgba(57, 255, 20, 0.1)' }}>
                    <h5 className="fw-bold">Planejamento</h5>
                    <p className="small mb-0">Definição clara de objetivos, escopo e requisitos do projeto.</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 rounded-3" style={{ border: '1px solid rgba(57, 255, 20, 0.2)', boxShadow: '0 0 10px rgba(57, 255, 20, 0.1)' }}>
                    <h5 className="fw-bold">Design</h5>
                    <p className="small mb-0">Criação de protótipos e definição da arquitetura técnica.</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 rounded-3" style={{ border: '1px solid rgba(57, 255, 20, 0.2)', boxShadow: '0 0 10px rgba(57, 255, 20, 0.1)' }}>
                    <h5 className="fw-bold">Desenvolvimento</h5>
                    <p className="small mb-0">Implementação com ciclos curtos e entregas incrementais.</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 rounded-3" style={{ border: '1px solid rgba(57, 255, 20, 0.2)', boxShadow: '0 0 10px rgba(57, 255, 20, 0.1)' }}>
                    <h5 className="fw-bold">Entrega</h5>
                    <p className="small mb-0">Testes rigorosos, implantação e suporte contínuo.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-4">Tem um <span className="text-accent-custom neon-text">Projeto</span> em mente?</h3>
                  <p className="mb-4">
                    Entre em contato conosco para discutir suas ideias e descobrir como podemos transformá-las em realidade.
                  </p>
                  
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src="/images/mascote-spositech.jpg" 
                      alt="Mascote SposiTech" 
                      className="me-3" 
                      width="50" 
                      height="50" 
                      style={{ 
                        borderRadius: '50%', 
                        border: '2px solid rgba(57, 255, 20, 0.7)',
                        boxShadow: '0 0 15px rgba(57, 255, 20, 0.5)'
                      }}
                    />
                    <p className="mb-0 fst-italic">
                      "Transformamos suas ideias em soluções tecnológicas de alto impacto para o seu negócio."
                    </p>
                  </div>
                  
                  <a href="/contato" className="btn btn-accent w-100">Solicitar Orçamento</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" style={{ 
        background: 'linear-gradient(to right, rgba(18, 18, 18, 0.95), rgba(18, 18, 18, 0.8)), url(/images/tech-bg.svg) no-repeat center center',
        backgroundSize: 'cover',
        borderTop: '1px solid rgba(57, 255, 20, 0.2)',
        borderBottom: '1px solid rgba(57, 255, 20, 0.2)'
      }}>
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-4 mb-lg-0">
              <div className="d-flex align-items-center mb-3">
                <img 
                  src="/images/mascote-spositech.jpg" 
                  alt="Mascote SposiTech" 
                  className="me-3" 
                  width="60" 
                  height="60" 
                  style={{ 
                    borderRadius: '50%', 
                    border: '2px solid rgba(57, 255, 20, 0.7)',
                    boxShadow: '0 0 15px rgba(57, 255, 20, 0.5)'
                  }}
                />
                <h2 className="display-5 fw-bold mb-0">Vamos <span className="text-accent-custom neon-text">construir</span> juntos?</h2>
              </div>
              <p className="lead mb-0">
                Nossa equipe está pronta para transformar suas ideias em soluções tecnológicas de alto impacto.
              </p>
            </div>
            <div className="col-lg-5 text-lg-end">
              <a href="/contato" className="btn btn-accent btn-lg px-4 py-3" style={{ 
                boxShadow: '0 0 20px rgba(57, 255, 20, 0.5)',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}>
                Iniciar Projeto
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 