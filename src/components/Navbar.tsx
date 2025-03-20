import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaLaptopCode, FaBars, FaHeadset } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Verificar se o componente está montado no lado do cliente
  useEffect(() => {
    setIsMounted(true);
    const adminToken = localStorage.getItem('spositech_admin_token');
    setIsAdmin(!!adminToken);
  }, []);

  // Se não estiver montado no cliente, renderiza o componente sem o link de admin
  // para evitar erros de hidratação
  if (!isMounted) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
        <div className="container">
          <Link href="/" className="navbar-brand d-flex align-items-center">
            <FaLaptopCode className="text-accent-custom me-2" size={24} />
            <span className="fw-bold">Sposi<span className="text-accent-custom neon-text">Tech</span></span>
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarMain" 
            aria-controls="navbarMain" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <FaBars />
          </button>
          
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/" className="nav-link hover-accent">
                  Início
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/servicos" className="nav-link hover-accent">
                  Serviços
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/projetos" className="nav-link hover-accent">
                  Projetos
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/sobre" className="nav-link hover-accent">
                  Sobre Nós
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contato" className="nav-link hover-accent">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <FaLaptopCode className="text-accent-custom me-2" size={24} />
          <span className="fw-bold">Sposi<span className="text-accent-custom neon-text">Tech</span></span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarMain" 
          aria-controls="navbarMain" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>
        
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link hover-accent">
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/servicos" className="nav-link hover-accent">
                Serviços
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/projetos" className="nav-link hover-accent">
                Projetos
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sobre" className="nav-link hover-accent">
                Sobre Nós
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contato" className="nav-link hover-accent">
                Contato
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link href="/admin/chat" className="nav-link hover-accent">
                  <FaHeadset className="me-1" />
                  Painel Admin
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 