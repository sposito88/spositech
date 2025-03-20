import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone, FaLaptopCode } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-custom pt-5 pb-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <FaLaptopCode className="text-accent-custom me-2" size={24} />
              <h5 className="mb-0">Sposi<span className="text-accent-custom neon-text">Tech</span></h5>
            </div>
            <p>Soluções em informática e suporte a sistemas para empresas e profissionais.</p>
            <div className="d-flex mt-3">
              <a href="https://facebook.com" className="text-accent-custom me-3" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-accent-custom me-3" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={20} />
              </a>
              <a href="https://wa.me/5581998746712" className="text-accent-custom" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <h5 className="mb-3 text-accent-custom">Links Rápidos</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/" className="text-white text-decoration-none hover-accent">
                  Início
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/servicos" className="text-white text-decoration-none hover-accent">
                  Serviços
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/sobre" className="text-white text-decoration-none hover-accent">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-white text-decoration-none hover-accent">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-md-4 mb-4">
            <h5 className="mb-3 text-accent-custom">Contato</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <div className="d-flex">
                  <FaMapMarkerAlt className="text-accent-custom mt-1 me-2" />
                  <p className="mb-0">Rua Cosme Alves da Silva, 07, Cajá<br />Carpina - PE, 55813-095</p>
                </div>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <FaPhone className="text-accent-custom me-2" />
                <span>(81) 99874-6712</span>
              </li>
              <li className="d-flex align-items-center">
                <FaEnvelope className="text-accent-custom me-2" />
                <span>contato@spositech.com.br</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="mt-4 mb-4 border-accent" style={{ borderColor: 'rgba(57, 255, 20, 0.2)' }} />
        
        <div className="row">
          <div className="col-md-12 text-center">
            <p className="mb-0">&copy; {currentYear} SposiTech. Todos os direitos reservados.</p>
          </div>
        </div>

        <div className="text-center mt-4 small text-muted">
          <p>
            &copy; {new Date().getFullYear()} SposiTech. Todos os direitos reservados. <br />
            <Link href="/admin" className="text-muted hover-accent">Área Administrativa</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 