import React from 'react';
import Layout from '@/components/Layout';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaPaperPlane
} from 'react-icons/fa';

export default function Contato() {
  return (
    <Layout>
      <div className="section-dark py-5" style={{ 
        background: 'url(/images/contact-bg.svg) no-repeat center center',
        backgroundSize: 'cover'
      }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-4 fw-bold">Entre em <span className="text-accent-custom neon-text">Contato</span></h1>
              <p className="lead">
                Estamos prontos para atender às suas necessidades em tecnologia
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="section-dark-gray py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-4">Fale <span className="text-accent-custom neon-text">Conosco</span></h2>
                  <p className="mb-4">
                    Preencha o formulário abaixo e entraremos em contato o mais breve possível. Todos os campos marcados com * são obrigatórios.
                  </p>
                  
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <input 
                            type="text" 
                            className="form-control bg-dark text-white border-secondary" 
                            id="nome" 
                            placeholder="Seu nome"
                            style={{ borderColor: 'rgba(57, 255, 20, 0.3)' }}
                          />
                          <label htmlFor="nome" className="text-white">Nome completo *</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <input 
                            type="email" 
                            className="form-control bg-dark text-white border-secondary" 
                            id="email" 
                            placeholder="Seu email"
                            style={{ borderColor: 'rgba(57, 255, 20, 0.3)' }}
                          />
                          <label htmlFor="email" className="text-white">Email *</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <input 
                            type="tel" 
                            className="form-control bg-dark text-white border-secondary" 
                            id="telefone" 
                            placeholder="Seu telefone"
                            style={{ borderColor: 'rgba(57, 255, 20, 0.3)' }}
                          />
                          <label htmlFor="telefone" className="text-white">Telefone *</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <input 
                            type="text" 
                            className="form-control bg-dark text-white border-secondary" 
                            id="empresa" 
                            placeholder="Sua empresa"
                            style={{ borderColor: 'rgba(57, 255, 20, 0.3)' }}
                          />
                          <label htmlFor="empresa" className="text-white">Empresa</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <select 
                            className="form-select bg-dark text-white border-secondary" 
                            id="assunto"
                            style={{ borderColor: 'rgba(57, 255, 20, 0.3)' }}
                          >
                            <option value="">Selecione</option>
                            <option value="suporte">Suporte Técnico</option>
                            <option value="consultoria">Consultoria</option>
                            <option value="orcamento">Orçamento</option>
                            <option value="parceria">Parceria</option>
                            <option value="outro">Outro</option>
                          </select>
                          <label htmlFor="assunto" className="text-white">Assunto *</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <textarea 
                            className="form-control bg-dark text-white border-secondary" 
                            id="mensagem" 
                            placeholder="Sua mensagem" 
                            style={{ height: '150px', borderColor: 'rgba(57, 255, 20, 0.3)' }}
                          ></textarea>
                          <label htmlFor="mensagem" className="text-white">Mensagem *</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-check mb-3">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="politica"
                            style={{ borderColor: 'rgba(57, 255, 20, 0.3)' }}
                          />
                          <label className="form-check-label small text-white" htmlFor="politica">
                            Concordo com a <a href="#" className="text-accent-custom">Política de Privacidade</a> *
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button 
                          type="submit" 
                          className="btn btn-accent w-100 py-3"
                          style={{ boxShadow: '0 0 15px rgba(57, 255, 20, 0.3)' }}
                        >
                          <FaPaperPlane className="me-2" /> Enviar Mensagem
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="card">
                <div className="card-body p-4">
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
                    <h3 className="fw-bold mb-0">Atendimento <span className="text-accent-custom neon-text">Rápido</span></h3>
                  </div>
                  <p className="mb-0">
                    Para atendimento mais rápido, entre em contato pelo WhatsApp ou ligue diretamente para nosso suporte técnico.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="card mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-4">Informações de <span className="text-accent-custom neon-text">Contato</span></h2>
                  
                  <div className="d-flex mb-4">
                    <div className="me-3">
                      <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ 
                        width: '50px', 
                        height: '50px', 
                        backgroundColor: 'rgba(57, 255, 20, 0.1)',
                        border: '1px solid rgba(57, 255, 20, 0.3)'
                      }}>
                        <FaMapMarkerAlt className="text-accent-custom" size={20} />
                      </div>
                    </div>
                    <div>
                      <h5 className="fw-bold">Endereço</h5>
                      <p className="mb-0">Rua Cosme Alves da Silva, 07, Cajá<br />Carpina - PE, 55813-095</p>
                    </div>
                  </div>
                  
                  <div className="d-flex mb-4">
                    <div className="me-3">
                      <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ 
                        width: '50px', 
                        height: '50px', 
                        backgroundColor: 'rgba(57, 255, 20, 0.1)',
                        border: '1px solid rgba(57, 255, 20, 0.3)'
                      }}>
                        <FaPhone className="text-accent-custom" size={20} />
                      </div>
                    </div>
                    <div>
                      <h5 className="fw-bold">Telefone</h5>
                      <p className="mb-0">(11) 1234-5678<br />(11) 98765-4321 (WhatsApp)</p>
                    </div>
                  </div>
                  
                  <div className="d-flex mb-4">
                    <div className="me-3">
                      <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ 
                        width: '50px', 
                        height: '50px', 
                        backgroundColor: 'rgba(57, 255, 20, 0.1)',
                        border: '1px solid rgba(57, 255, 20, 0.3)'
                      }}>
                        <FaEnvelope className="text-accent-custom" size={20} />
                      </div>
                    </div>
                    <div>
                      <h5 className="fw-bold">Email</h5>
                      <p className="mb-0">contato@spositech.com.br<br />suporte@spositech.com.br</p>
                    </div>
                  </div>
                  
                  <div className="d-flex mb-4">
                    <div className="me-3">
                      <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ 
                        width: '50px', 
                        height: '50px', 
                        backgroundColor: 'rgba(57, 255, 20, 0.1)',
                        border: '1px solid rgba(57, 255, 20, 0.3)'
                      }}>
                        <FaClock className="text-accent-custom" size={20} />
                      </div>
                    </div>
                    <div>
                      <h5 className="fw-bold">Horário de Atendimento</h5>
                      <p className="mb-0">Segunda a Sexta: 08h às 18h<br />Sábado: 09h às 13h</p>
                    </div>
                  </div>
                  
                  <h5 className="fw-bold mb-3">Redes Sociais</h5>
                  <div className="d-flex gap-3">
                    <a href="#" className="btn btn-outline-accent rounded-circle" style={{ width: '40px', height: '40px' }}>
                      <FaFacebook />
                    </a>
                    <a href="#" className="btn btn-outline-accent rounded-circle" style={{ width: '40px', height: '40px' }}>
                      <FaInstagram />
                    </a>
                    <a href="#" className="btn btn-outline-accent rounded-circle" style={{ width: '40px', height: '40px' }}>
                      <FaLinkedin />
                    </a>
                    <a href="#" className="btn btn-outline-accent rounded-circle" style={{ width: '40px', height: '40px' }}>
                      <FaTwitter />
                    </a>
                    <a href="#" className="btn btn-outline-accent rounded-circle" style={{ width: '40px', height: '40px' }}>
                      <FaWhatsapp />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-3">Localização</h3>
                  <div className="ratio ratio-16x9 rounded" style={{ 
                    border: '1px solid rgba(57, 255, 20, 0.3)',
                    boxShadow: '0 0 15px rgba(57, 255, 20, 0.1)'
                  }}>
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.8982621097103!2d-35.2580683!3d-7.8520557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab0ef50b8d80b3%3A0x87386dcf4c7eda1c!2sR.%20Cosme%20Alves%20da%20Silva%2C%207%20-%20Caj%C3%A1%2C%20Carpina%20-%20PE%2C%2055813-095!5e0!3m2!1spt-BR!2sbr!4v1689466546024!5m2!1spt-BR!2sbr" 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded"
                    ></iframe>
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
                <h2 className="display-5 fw-bold mb-0">Suporte <span className="text-accent-custom neon-text">24/7</span></h2>
              </div>
              <p className="lead mb-0">
                Para clientes com contrato de suporte premium, oferecemos atendimento 24 horas por dia, 7 dias por semana.
              </p>
            </div>
            <div className="col-lg-5 text-lg-end">
              <a href="#" className="btn btn-accent btn-lg px-4 py-3" style={{ 
                boxShadow: '0 0 20px rgba(57, 255, 20, 0.5)',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}>
                <FaWhatsapp className="me-2" /> Suporte via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 