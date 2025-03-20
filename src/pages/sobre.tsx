import React from 'react';
import Layout from '@/components/Layout';
import { 
  FaUsers, 
  FaLightbulb, 
  FaRocket, 
  FaHandshake, 
  FaAward,
  FaCheck,
  FaQuoteRight
} from 'react-icons/fa';

export default function Sobre() {
  const valores = [
    {
      id: 1,
      icon: <FaUsers className="text-accent-custom" size={36} />,
      titulo: 'Foco no Cliente',
      descricao: 'Colocamos as necessidades dos nossos clientes em primeiro lugar, buscando sempre superar suas expectativas.'
    },
    {
      id: 2,
      icon: <FaLightbulb className="text-accent-custom" size={36} />,
      titulo: 'Inovação',
      descricao: 'Buscamos constantemente novas tecnologias e soluções para oferecer o que há de melhor no mercado.'
    },
    {
      id: 3,
      icon: <FaRocket className="text-accent-custom" size={36} />,
      titulo: 'Excelência',
      descricao: 'Comprometimento com a qualidade em todos os serviços prestados, garantindo resultados excepcionais.'
    },
    {
      id: 4,
      icon: <FaHandshake className="text-accent-custom" size={36} />,
      titulo: 'Integridade',
      descricao: 'Atuamos com ética, transparência e honestidade em todos os relacionamentos e negócios.'
    }
  ];

  const equipe = [
    {
      id: 1,
      nome: 'Alan Spósito',
      cargo: 'CEO & Fundador',
      foto: '/images/project-placeholder.svg',
      descricao: 'Especialista em tecnologia com mais de 15 anos de experiência no mercado de TI.'
    },
    {
      id: 2,
      nome: 'Ana Oliveira',
      cargo: 'Diretora de Operações',
      foto: '/images/project-placeholder.svg',
      descricao: 'Responsável por garantir a excelência operacional em todos os projetos e serviços.'
    },
    {
      id: 3,
      nome: 'Marcos Santos',
      cargo: 'Líder de Desenvolvimento',
      foto: '/images/project-placeholder.svg',
      descricao: 'Especialista em desenvolvimento de software e arquitetura de sistemas.'
    },
    {
      id: 4,
      nome: 'Juliana Costa',
      cargo: 'Gerente de Suporte',
      foto: '/images/project-placeholder.svg',
      descricao: 'Coordena a equipe de suporte técnico, garantindo atendimento de qualidade.'
    }
  ];

  return (
    <Layout>
      <div className="section-dark py-5" style={{ 
        background: 'url(/images/about-image.svg) no-repeat center center',
        backgroundSize: 'cover'
      }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-4 fw-bold">Sobre <span className="text-accent-custom neon-text">Nós</span></h1>
              <p className="lead">
                Conheça nossa história, valores e a equipe por trás da SposiTech
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="section-dark-gray py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="fw-bold mb-3">Nossa <span className="text-accent-custom neon-text">História</span></h2>
              <p className="mb-3">
                Fundada em 2015, a SposiTech nasceu com o objetivo de oferecer soluções tecnológicas inovadoras e acessíveis para empresas de todos os portes. Começamos como uma pequena consultoria de TI e, ao longo dos anos, expandimos nossos serviços para atender às crescentes demandas do mercado.
              </p>
              <p className="mb-3">
                Com um time de profissionais altamente qualificados e apaixonados por tecnologia, conquistamos a confiança de nossos clientes através de um trabalho sério, comprometido com resultados e focado em construir relacionamentos duradouros.
              </p>
              <p className="mb-4">
                Hoje, somos reconhecidos pela excelência em suporte técnico, desenvolvimento de software e consultoria em TI, sempre buscando as melhores soluções para impulsionar o crescimento e a transformação digital dos nossos clientes.
              </p>
              
              <div className="d-flex align-items-center">
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
                <div>
                  <h5 className="fw-bold mb-1">Alan Spósito</h5>
                  <p className="mb-0 small">Fundador e CEO</p>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-3">Nossa <span className="text-accent-custom neon-text">Missão</span></h3>
                  <p className="mb-4">
                    Oferecer soluções tecnológicas inovadoras e de alta qualidade, contribuindo para o crescimento e sucesso dos nossos clientes através de um atendimento personalizado e excelência em serviços de TI.
                  </p>
                  
                  <h3 className="fw-bold mb-3">Nossa <span className="text-accent-custom neon-text">Visão</span></h3>
                  <p className="mb-4">
                    Ser referência nacional em soluções tecnológicas, reconhecida pela qualidade dos serviços, inovação constante e compromisso com a satisfação dos clientes.
                  </p>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <span className="text-accent-custom me-2"><FaCheck /></span>
                        <span className="fw-bold">Compromisso com Qualidade</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <span className="text-accent-custom me-2"><FaCheck /></span>
                        <span className="fw-bold">Inovação Constante</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <span className="text-accent-custom me-2"><FaCheck /></span>
                        <span className="fw-bold">Atendimento Personalizado</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <span className="text-accent-custom me-2"><FaCheck /></span>
                        <span className="fw-bold">Soluções Sob Medida</span>
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
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <h2 className="fw-bold mb-3">Nossos <span className="text-accent-custom neon-text">Valores</span></h2>
              <p className="lead">
                Princípios que guiam nossas ações e decisões no dia a dia
              </p>
            </div>
          </div>
          
          <div className="row g-4">
            {valores.map((valor) => (
              <div key={valor.id} className="col-md-6 col-lg-3">
                <div className="card h-100 text-center">
                  <div className="card-body p-4">
                    <div className="mb-3">
                      {valor.icon}
                    </div>
                    <h3 className="card-title h5 fw-bold">{valor.titulo}</h3>
                    <p className="card-text">{valor.descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark-gray py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <h2 className="fw-bold mb-3">Nossa <span className="text-accent-custom neon-text">Equipe</span></h2>
              <p className="lead">
                Conheça os profissionais que fazem a SposiTech acontecer
              </p>
            </div>
          </div>
          
          <div className="row g-4">
            {equipe.map((membro) => (
              <div key={membro.id} className="col-md-6 col-lg-3">
                <div className="card h-100 text-center">
                  <div className="card-body p-4">
                    <div className="mb-3">
                      <img 
                        src={membro.foto} 
                        alt={membro.nome} 
                        className="rounded-circle mb-3" 
                        width="120" 
                        height="120" 
                        style={{ 
                          border: '2px solid rgba(57, 255, 20, 0.5)',
                          boxShadow: '0 0 15px rgba(57, 255, 20, 0.2)'
                        }}
                      />
                      <h3 className="card-title h5 fw-bold">{membro.nome}</h3>
                      <p className="text-accent-custom small mb-3">{membro.cargo}</p>
                    </div>
                    <p className="card-text small">{membro.descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <h2 className="fw-bold mb-3">Por que <span className="text-accent-custom neon-text">Escolher</span> a SposiTech?</h2>
              <p className="lead">
                Diferenciais que nos destacam no mercado
              </p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 rounded-3" style={{ border: '1px solid rgba(57, 255, 20, 0.2)', boxShadow: '0 0 10px rgba(57, 255, 20, 0.1)' }}>
                <div className="d-flex align-items-center mb-3">
                  <FaAward className="text-accent-custom me-3" size={36} />
                  <h3 className="h5 fw-bold mb-0">Experiência Comprovada</h3>
                </div>
                <p className="mb-0">
                  Anos de atuação no mercado, com centenas de projetos bem-sucedidos e clientes satisfeitos.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="p-4 rounded-3" style={{ border: '1px solid rgba(57, 255, 20, 0.2)', boxShadow: '0 0 10px rgba(57, 255, 20, 0.1)' }}>
                <div className="d-flex align-items-center mb-3">
                  <FaUsers className="text-accent-custom me-3" size={36} />
                  <h3 className="h5 fw-bold mb-0">Equipe Qualificada</h3>
                </div>
                <p className="mb-0">
                  Profissionais certificados e em constante atualização para oferecer as melhores soluções.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="p-4 rounded-3" style={{ border: '1px solid rgba(57, 255, 20, 0.2)', boxShadow: '0 0 10px rgba(57, 255, 20, 0.1)' }}>
                <div className="d-flex align-items-center mb-3">
                  <FaRocket className="text-accent-custom me-3" size={36} />
                  <h3 className="h5 fw-bold mb-0">Soluções Personalizadas</h3>
                </div>
                <p className="mb-0">
                  Desenvolvemos projetos sob medida para atender às necessidades específicas de cada cliente.
                </p>
              </div>
            </div>
          </div>
          
          <div className="row mt-5">
            <div className="col-lg-8 mx-auto">
              <div className="card">
                <div className="card-body p-4 text-center">
                  <FaQuoteRight className="text-accent-custom mb-3" size={36} />
                  <p className="lead fst-italic mb-3">
                    "Na SposiTech, acreditamos que a tecnologia deve ser uma aliada para o crescimento dos negócios, não um obstáculo. Por isso, trabalhamos incansavelmente para oferecer soluções que realmente façam a diferença para nossos clientes."
                  </p>
                  <div className="d-flex align-items-center justify-content-center">
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
                    <div className="text-start">
                      <h5 className="fw-bold mb-0">Alan Spósito</h5>
                      <p className="small mb-0">CEO & Fundador</p>
                    </div>
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
                <h2 className="display-5 fw-bold mb-0">Vamos <span className="text-accent-custom neon-text">conversar</span>?</h2>
              </div>
              <p className="lead mb-0">
                Entre em contato conosco e descubra como podemos ajudar sua empresa a alcançar o próximo nível.
              </p>
            </div>
            <div className="col-lg-5 text-lg-end">
              <a href="/contato" className="btn btn-accent btn-lg px-4 py-3" style={{ 
                boxShadow: '0 0 20px rgba(57, 255, 20, 0.5)',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}>
                Fale Conosco
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 