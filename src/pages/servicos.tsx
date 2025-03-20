import React from 'react';
import Layout from '@/components/Layout';
import { 
  FaDesktop, 
  FaServer, 
  FaTools, 
  FaMobileAlt, 
  FaNetworkWired, 
  FaShieldAlt,
  FaDatabase,
  FaCloud,
  FaLaptopCode,
  FaCheck,
  FaQuoteLeft,
  FaStar
} from 'react-icons/fa';

export default function Servicos() {
  const servicos = [
    {
      id: 1,
      icon: <FaDesktop size={48} className="text-accent-custom" />,
      titulo: 'Suporte Técnico',
      descricao: 'Assistência técnica para computadores, notebooks e periféricos, com atendimento remoto ou presencial. Solucionamos problemas de hardware e software com rapidez e eficiência.',
      beneficios: [
        'Atendimento rápido e eficiente',
        'Técnicos qualificados',
        'Suporte remoto e presencial',
        'Diagnóstico preciso de problemas'
      ]
    },
    {
      id: 2,
      icon: <FaServer size={48} className="text-accent-custom" />,
      titulo: 'Manutenção de Sistemas',
      descricao: 'Manutenção preventiva e corretiva de sistemas operacionais e aplicativos empresariais. Garantimos o funcionamento contínuo e estável dos seus sistemas.',
      beneficios: [
        'Prevenção de falhas e interrupções',
        'Atualizações de segurança',
        'Otimização de desempenho',
        'Backup e recuperação de dados'
      ]
    },
    {
      id: 3,
      icon: <FaTools size={48} className="text-accent-custom" />,
      titulo: 'Consultoria em TI',
      descricao: 'Análise e implementação de soluções tecnológicas adequadas às necessidades do seu negócio. Ajudamos a escolher as melhores ferramentas para aumentar a produtividade.',
      beneficios: [
        'Análise personalizada de necessidades',
        'Recomendações baseadas em custo-benefício',
        'Planejamento estratégico de TI',
        'Implementação de novas tecnologias'
      ]
    },
    {
      id: 4,
      icon: <FaMobileAlt size={48} className="text-accent-custom" />,
      titulo: 'Suporte Mobile',
      descricao: 'Configuração e manutenção de dispositivos móveis e aplicativos corporativos. Garantimos a integração perfeita entre dispositivos móveis e sistemas da empresa.',
      beneficios: [
        'Configuração de e-mail e aplicativos corporativos',
        'Sincronização de dados',
        'Segurança em dispositivos móveis',
        'Suporte para iOS e Android'
      ]
    },
    {
      id: 5,
      icon: <FaNetworkWired size={48} className="text-accent-custom" />,
      titulo: 'Redes e Infraestrutura',
      descricao: 'Instalação e configuração de redes, servidores e equipamentos de conectividade. Projetamos e implementamos infraestruturas robustas e escaláveis.',
      beneficios: [
        'Projeto e instalação de redes',
        'Configuração de servidores',
        'Monitoramento de desempenho',
        'Solução de problemas de conectividade'
      ]
    },
    {
      id: 6,
      icon: <FaShieldAlt size={48} className="text-accent-custom" />,
      titulo: 'Segurança Digital',
      descricao: 'Proteção de dados, backup em nuvem e implementação de políticas de segurança da informação. Protegemos seu negócio contra ameaças digitais.',
      beneficios: [
        'Implementação de firewalls e antivírus',
        'Backup automático de dados',
        'Políticas de segurança',
        'Treinamento de funcionários'
      ]
    },
    {
      id: 7,
      icon: <FaDatabase size={48} className="text-accent-custom" />,
      titulo: 'Gestão de Banco de Dados',
      descricao: 'Administração, otimização e manutenção de bancos de dados empresariais. Garantimos a integridade e o desempenho dos seus dados.',
      beneficios: [
        'Otimização de consultas',
        'Backup e recuperação',
        'Monitoramento de desempenho',
        'Migração de dados'
      ]
    },
    {
      id: 8,
      icon: <FaCloud size={48} className="text-accent-custom" />,
      titulo: 'Soluções em Nuvem',
      descricao: 'Migração e gerenciamento de serviços em nuvem para maior flexibilidade e redução de custos. Ajudamos sua empresa a aproveitar os benefícios da computação em nuvem.',
      beneficios: [
        'Migração para a nuvem',
        'Redução de custos de infraestrutura',
        'Escalabilidade e flexibilidade',
        'Acesso remoto seguro'
      ]
    },
    {
      id: 9,
      icon: <FaLaptopCode size={48} className="text-accent-custom" />,
      titulo: 'Desenvolvimento de Software',
      descricao: 'Desenvolvimento de aplicações personalizadas para atender às necessidades específicas do seu negócio. Criamos soluções sob medida para aumentar a eficiência operacional.',
      beneficios: [
        'Análise de requisitos',
        'Desenvolvimento ágil',
        'Testes e garantia de qualidade',
        'Suporte e manutenção contínua'
      ]
    },
    {
      id: 10,
      icon: <FaDatabase size={48} className="text-accent-custom" />,
      titulo: 'LeadHouseBr',
      descricao: 'Uma plataforma completa de captação e gestão de leads (www.leadhousebr.com.br). Automatize seu funil de vendas e maximize o potencial de seus leads com nossa solução proprietária.',
      beneficios: [
        'Captação automatizada de leads',
        'Segmentação avançada de contatos',
        'Métricas de conversão em tempo real',
        'Integração com múltiplas plataformas'
      ]
    }
  ];

  return (
    <Layout>
      <div className="section-dark py-5">
        <div className="container">
          <h1 className="display-4 fw-bold text-center">Nossos <span className="text-accent-custom neon-text">Serviços</span></h1>
          <p className="lead text-center">
            Soluções completas em tecnologia para impulsionar o seu negócio
          </p>
        </div>
      </div>

      <section className="section-dark-gray py-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="fw-bold mb-3">Como Podemos <span className="text-accent-custom neon-text">Ajudar</span></h2>
              <p className="lead">
                Na SposiTech, oferecemos uma ampla gama de serviços de tecnologia para atender às necessidades específicas da sua empresa. Nossa equipe de especialistas está pronta para fornecer soluções personalizadas e suporte técnico de alta qualidade.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {servicos.map((servico) => (
              <div key={servico.id} className="col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="card-body p-4">
                    <div className="mb-3">
                      {servico.icon}
                    </div>
                    <h3 className="card-title h4 fw-bold">{servico.titulo}</h3>
                    <p className="card-text mb-3">{servico.descricao}</p>
                    <h6 className="fw-bold text-accent-custom">Benefícios:</h6>
                    <ul className="list-unstyled">
                      {servico.beneficios.map((beneficio, index) => (
                        <li key={index} className="mb-2">
                          <div className="d-flex align-items-center">
                            <span className="text-accent-custom me-2"><FaCheck /></span>
                            {beneficio}
                          </div>
                        </li>
                      ))}
                    </ul>
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
              <h2 className="fw-bold mb-3">Por que escolher a <span className="text-accent-custom neon-text">SposiTech</span>?</h2>
              <p className="mb-4">
                Com anos de experiência no mercado de tecnologia, nossa equipe está preparada para oferecer as melhores soluções para o seu negócio. Trabalhamos com as tecnologias mais recentes e seguimos as melhores práticas do mercado.
              </p>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <span className="text-accent-custom me-2"><FaCheck /></span>
                    <span className="fw-bold">Atendimento Personalizado</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <span className="text-accent-custom me-2"><FaCheck /></span>
                    <span className="fw-bold">Profissionais Qualificados</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <span className="text-accent-custom me-2"><FaCheck /></span>
                    <span className="fw-bold">Soluções Inovadoras</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <span className="text-accent-custom me-2"><FaCheck /></span>
                    <span className="fw-bold">Suporte Contínuo</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-4">Solicite um <span className="text-accent-custom neon-text">Orçamento</span></h3>
                  <p className="mb-4">
                    Entre em contato conosco para obter um orçamento personalizado para os serviços que sua empresa necessita.
                  </p>
                  <a href="/contato" className="btn btn-accent">Fale Conosco</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark-gray py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="fw-bold mb-4">Nossos <span className="text-accent-custom neon-text">Diferenciais</span></h2>
              <div className="row g-4 mt-3">
                <div className="col-md-4">
                  <div className="p-3 rounded-3" style={{ border: '1px solid rgba(57, 255, 20, 0.2)', boxShadow: '0 0 10px rgba(57, 255, 20, 0.1)' }}>
                    <FaShieldAlt className="text-accent-custom mb-3" size={36} />
                    <h5 className="fw-bold">Segurança</h5>
                    <p>Proteção de dados e sistemas com as melhores práticas de segurança do mercado.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 rounded-3" style={{ border: '1px solid rgba(57, 255, 20, 0.2)', boxShadow: '0 0 10px rgba(57, 255, 20, 0.1)' }}>
                    <FaTools className="text-accent-custom mb-3" size={36} />
                    <h5 className="fw-bold">Eficiência</h5>
                    <p>Soluções otimizadas para garantir o melhor desempenho com menor custo operacional.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 rounded-3" style={{ border: '1px solid rgba(57, 255, 20, 0.2)', boxShadow: '0 0 10px rgba(57, 255, 20, 0.1)' }}>
                    <FaLaptopCode className="text-accent-custom mb-3" size={36} />
                    <h5 className="fw-bold">Inovação</h5>
                    <p>Acompanhamos as tendências tecnológicas para oferecer soluções sempre atualizadas.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <h2 className="fw-bold mb-3">Serviços <span className="text-accent-custom neon-text">Mais Procurados</span></h2>
              <p className="lead">
                Conheça os serviços que mais têm ajudado nossos clientes a impulsionar seus negócios
              </p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100" style={{ borderColor: 'rgba(57, 255, 20, 0.5)', boxShadow: '0 0 15px rgba(57, 255, 20, 0.3)' }}>
                <div className="card-body p-4 text-center">
                  <FaCloud className="text-accent-custom mb-3" size={60} />
                  <h3 className="fw-bold">Migração para a Nuvem</h3>
                  <p>
                    Reduza custos e aumente a flexibilidade do seu negócio com nossa solução completa de migração para a nuvem.
                  </p>
                  <div className="d-flex justify-content-center mt-3">
                    <div className="px-3 py-2 rounded-pill" style={{ backgroundColor: 'rgba(57, 255, 20, 0.1)', border: '1px solid rgba(57, 255, 20, 0.3)' }}>
                      <div className="d-flex align-items-center">
                        <FaCheck className="text-accent-custom me-2" />
                        <span>Migração segura</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100" style={{ borderColor: 'rgba(57, 255, 20, 0.5)', boxShadow: '0 0 15px rgba(57, 255, 20, 0.3)' }}>
                <div className="card-body p-4 text-center">
                  <FaShieldAlt className="text-accent-custom mb-3" size={60} />
                  <h3 className="fw-bold">Segurança Digital</h3>
                  <p>
                    Proteja seus dados e sistemas contra ameaças digitais com nossas soluções avançadas de segurança.
                  </p>
                  <div className="d-flex justify-content-center mt-3">
                    <div className="px-3 py-2 rounded-pill" style={{ backgroundColor: 'rgba(57, 255, 20, 0.1)', border: '1px solid rgba(57, 255, 20, 0.3)' }}>
                      <div className="d-flex align-items-center">
                        <FaCheck className="text-accent-custom me-2" />
                        <span>Proteção 24/7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100" style={{ borderColor: 'rgba(57, 255, 20, 0.5)', boxShadow: '0 0 15px rgba(57, 255, 20, 0.3)' }}>
                <div className="card-body p-4 text-center">
                  <FaDatabase className="text-accent-custom mb-3" size={60} />
                  <h3 className="fw-bold">LeadHouseBr</h3>
                  <p>
                    Nossa plataforma proprietária de captação e gestão de leads para maximizar suas conversões e potencializar suas estratégias de marketing digital.
                  </p>
                  <a href="https://www.leadhousebr.com.br" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-accent mt-2">
                    Visite o site
                  </a>
                  <div className="d-flex justify-content-center mt-3">
                    <div className="px-3 py-2 rounded-pill" style={{ backgroundColor: 'rgba(57, 255, 20, 0.1)', border: '1px solid rgba(57, 255, 20, 0.3)' }}>
                      <div className="d-flex align-items-center">
                        <FaCheck className="text-accent-custom me-2" />
                        <span>Solução completa</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark py-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="fw-bold mb-3">O que nossos <span className="text-accent-custom neon-text">Clientes</span> dizem</h2>
              <p className="lead">
                A satisfação de nossos clientes é o nosso maior orgulho
              </p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body p-4">
                  <div className="text-accent-custom mb-3">
                    <FaQuoteLeft size={24} />
                  </div>
                  <p className="mb-4">
                    "A migração para a nuvem realizada pela SposiTech foi um sucesso total. Reduzimos nossos custos de infraestrutura em 40% e ganhamos muito mais flexibilidade para nossa equipe que agora trabalha remotamente."
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div className="rounded-circle bg-dark-custom d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', border: '1px solid rgba(57, 255, 20, 0.3)' }}>
                        <span className="fw-bold text-accent-custom">RM</span>
                      </div>
                    </div>
                    <div>
                      <h6 className="mb-1 fw-bold">Ricardo Mendes</h6>
                      <p className="mb-0 small">Diretor de TI, TechSolutions</p>
                    </div>
                  </div>
                  <div className="mt-3 text-accent-custom">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body p-4">
                  <div className="text-accent-custom mb-3">
                    <FaQuoteLeft size={24} />
                  </div>
                  <p className="mb-4">
                    "A plataforma LeadHouseBr revolucionou nossa estratégia de marketing digital. Conseguimos aumentar em 70% a conversão de leads e automatizar todo o processo de nutrição de contatos. O suporte da SposiTech foi impecável durante a implementação."
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div className="rounded-circle bg-dark-custom d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', border: '1px solid rgba(57, 255, 20, 0.3)' }}>
                        <span className="fw-bold text-accent-custom">CS</span>
                      </div>
                    </div>
                    <div>
                      <h6 className="mb-1 fw-bold">Carla Santos</h6>
                      <p className="mb-0 small">Diretora de Marketing, DynamicSales</p>
                    </div>
                  </div>
                  <div className="mt-3 text-accent-custom">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body p-4">
                  <div className="text-accent-custom mb-3">
                    <FaQuoteLeft size={24} />
                  </div>
                  <p className="mb-4">
                    "O sistema desenvolvido pela equipe da SposiTech revolucionou nossos processos internos. Conseguimos reduzir o tempo de atendimento em 60% e melhorar significativamente a satisfação dos nossos clientes."
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div className="rounded-circle bg-dark-custom d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', border: '1px solid rgba(57, 255, 20, 0.3)' }}>
                        <span className="fw-bold text-accent-custom">PO</span>
                      </div>
                    </div>
                    <div>
                      <h6 className="mb-1 fw-bold">Paulo Oliveira</h6>
                      <p className="mb-0 small">CEO, HealthCare Plus</p>
                    </div>
                  </div>
                  <div className="mt-3 text-accent-custom">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
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
                <h2 className="display-5 fw-bold mb-0">Pronto para <span className="text-accent-custom neon-text">transformar</span> seu negócio?</h2>
              </div>
              <p className="lead mb-0">
                Entre em contato hoje mesmo e descubra como podemos ajudar sua empresa a alcançar o próximo nível tecnológico.
              </p>
            </div>
            <div className="col-lg-5 text-lg-end">
              <a href="/contato" className="btn btn-accent btn-lg px-4 py-3" style={{ 
                boxShadow: '0 0 20px rgba(57, 255, 20, 0.5)',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}>
                Solicitar Orçamento
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 