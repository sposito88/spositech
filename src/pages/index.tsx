import React from 'react';
import Layout from '@/components/Layout';
import { FaDesktop, FaServer, FaTools, FaMobileAlt, FaNetworkWired, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import ChatBox from '../components/ChatBox';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

export default function Home() {
  return (
    <>
      <Head>
        <title>SposiTech - Soluções em Tecnologia</title>
        <meta name="description" content="Serviços de tecnologia da informação para empresas e profissionais" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="section-dark py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <div className="d-flex align-items-center mb-3">
                  <img 
                    src="/images/mascote-spositech.jpg" 
                    alt="Mascote SposiTech" 
                    className="me-3" 
                    width="70" 
                    height="70" 
                    style={{ 
                      borderRadius: '50%', 
                      border: '2px solid rgba(57, 255, 20, 0.7)',
                      boxShadow: '0 0 10px rgba(57, 255, 20, 0.5)' 
                    }}
                  />
                  <h1 className="display-5 text-white mb-0">
                    <span className="fw-bold">Sposi</span>
                    <span className="text-accent-custom neon-text fw-bold">Tech</span>
                  </h1>
                </div>
                <h2 className="h2 fw-bold mb-4">
                  Suporte a <span className="text-accent-custom neon-text">Sistemas</span>
                </h2>
                <p className="lead mb-4">
                  Oferecemos serviços especializados em suporte técnico, manutenção de sistemas e consultoria em TI para empresas de todos os portes.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <a href="#servicos" className="btn btn-accent btn-lg">Nossos Serviços</a>
                  <a href="/contato" className="btn btn-outline-light btn-lg">Fale Conosco</a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="text-center">
                  <img 
                    src="/images/mascote-spositech.jpg" 
                    alt="Mascote SposiTech" 
                    className="img-fluid rounded-circle"
                    style={{ 
                      maxHeight: '400px',
                      border: '3px solid rgba(57, 255, 20, 0.7)',
                      boxShadow: '0 0 30px rgba(57, 255, 20, 0.5)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços Section */}
        <section id="servicos" className="section-dark-gray section-padding">
          <div className="container">
            <div className="text-center mb-5">
              <span className="badge bg-accent-custom text-dark px-3 py-2 mb-2">NOSSOS SERVIÇOS</span>
              <h2 className="fw-bold mb-3">Soluções <span className="text-accent-custom neon-text">Completas</span> para sua Empresa</h2>
              <p className="lead text-light">
                Tecnologia de ponta para atender todas as necessidades do seu negócio
              </p>
            </div>

            <div className="row g-4">
              <div className="col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="card-body text-center p-4">
                    <div className="text-accent-custom mb-3">
                      <FaDesktop size={48} />
                    </div>
                    <h5 className="card-title fw-bold">Suporte Técnico</h5>
                    <p className="card-text">
                      Assistência técnica para computadores, notebooks e periféricos, com atendimento remoto ou presencial.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="card-body text-center p-4">
                    <div className="text-accent-custom mb-3">
                      <FaServer size={48} />
                    </div>
                    <h5 className="card-title fw-bold">Manutenção de Sistemas</h5>
                    <p className="card-text">
                      Manutenção preventiva e corretiva de sistemas operacionais e aplicativos empresariais.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="card-body text-center p-4">
                    <div className="text-accent-custom mb-3">
                      <FaTools size={48} />
                    </div>
                    <h5 className="card-title fw-bold">Consultoria em TI</h5>
                    <p className="card-text">
                      Análise e implementação de soluções tecnológicas adequadas às necessidades do seu negócio.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="card-body text-center p-4">
                    <div className="text-accent-custom mb-3">
                      <FaMobileAlt size={48} />
                    </div>
                    <h5 className="card-title fw-bold">Suporte Mobile</h5>
                    <p className="card-text">
                      Configuração e manutenção de dispositivos móveis e aplicativos corporativos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="card-body text-center p-4">
                    <div className="text-accent-custom mb-3">
                      <FaNetworkWired size={48} />
                    </div>
                    <h5 className="card-title fw-bold">Redes e Infraestrutura</h5>
                    <p className="card-text">
                      Instalação e configuração de redes, servidores e equipamentos de conectividade.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="card-body text-center p-4">
                    <div className="text-accent-custom mb-3">
                      <FaShieldAlt size={48} />
                    </div>
                    <h5 className="card-title fw-bold">Segurança Digital</h5>
                    <p className="card-text">
                      Proteção de dados, backup em nuvem e implementação de políticas de segurança da informação.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-4">
              <a href="/servicos" className="btn btn-outline-accent me-2">Ver Todos os Serviços</a>
              <a href="/projetos" className="btn btn-outline-accent">Conheça Nossos Projetos <FaArrowRight className="ms-2" /></a>
            </div>
          </div>
        </section>

        {/* Sobre Section */}
        <section className="section-dark section-padding">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <span className="badge bg-accent-custom text-dark px-3 py-2 mb-2">SOBRE NÓS</span>
                <h2 className="fw-bold mb-3">Sobre a <span className="text-accent-custom neon-text">SposiTech</span></h2>
                <p className="mb-4">
                  Somos uma empresa especializada em soluções de tecnologia da informação, com foco em suporte técnico e manutenção de sistemas para empresas de todos os portes.
                </p>
                <p className="mb-4">
                  Nossa equipe é formada por profissionais qualificados e experientes, prontos para oferecer o melhor atendimento e as soluções mais adequadas para o seu negócio.
                </p>
                <a href="/sobre" className="btn btn-accent">Conheça Nossa História</a>
              </div>
              <div className="col-lg-6">
                <div className="text-center">
                  <img 
                    src="/images/about-image.svg" 
                    alt="Sobre a SposiTech" 
                    className="img-fluid rounded neon-border"
                    style={{ maxHeight: '400px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-dark-gray py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <div className="d-flex align-items-center justify-content-center mb-3">
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
                  <h2 className="fw-bold mb-0">Pronto para <span className="text-accent-custom neon-text">melhorar</span> a tecnologia da sua empresa?</h2>
                </div>
                <p className="lead mb-4">
                  Entre em contato conosco hoje mesmo e descubra como podemos ajudar o seu negócio a crescer com soluções tecnológicas eficientes.
                </p>
                <a href="/contato" className="btn btn-accent btn-lg">Solicite um Orçamento <FaArrowRight className="ms-2" /></a>
              </div>
            </div>
          </div>
        </section>

        {/* Adiciona apenas o componente Chatbot */}
        <Chatbot />
      </Layout>

      <style jsx>{`
        .admin-access-alert {
          background-color: #0d6efd;
          color: white;
          padding: 12px 0;
          position: relative;
          z-index: 100;
        }
        
        .alert-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }
        
        .alert-icon {
          font-size: 20px;
        }
        
        .alert-message {
          font-size: 15px;
        }
        
        .alert-message p {
          margin: 0;
        }
        
        .alert-message a {
          color: white;
          text-decoration: underline;
        }
        
        .alert-button {
          background-color: white;
          color: #0d6efd;
          padding: 5px 15px;
          border-radius: 4px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
        }
        
        .alert-button:hover {
          background-color: #f8f9fa;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
} 