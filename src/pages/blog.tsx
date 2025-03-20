import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaTag, 
  FaSearch, 
  FaChevronRight,
  FaClock,
  FaComments,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp
} from 'react-icons/fa';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  slug: string;
}

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const posts: BlogPost[] = [
    {
      id: 1,
      title: 'Como proteger sua empresa contra ataques cibernéticos',
      excerpt: 'Descubra as melhores práticas para proteger os dados da sua empresa contra ameaças digitais cada vez mais sofisticadas.',
      content: '',
      author: 'Alan Spósito',
      date: '15 de Maio de 2023',
      readTime: '5 min',
      category: 'Segurança',
      tags: ['Segurança', 'Cibersegurança', 'Proteção de Dados'],
      image: '/images/blog-post-placeholder.svg',
      slug: 'como-proteger-empresa-ataques-ciberneticos'
    },
    {
      id: 2,
      title: 'Benefícios da migração para a nuvem para pequenas empresas',
      excerpt: 'Entenda como a migração para serviços em nuvem pode reduzir custos e aumentar a eficiência operacional do seu negócio.',
      content: '',
      author: 'Ana Oliveira',
      date: '28 de Junho de 2023',
      readTime: '7 min',
      category: 'Cloud Computing',
      tags: ['Cloud', 'Migração', 'Pequenas Empresas'],
      image: '/images/blog-post-placeholder.svg',
      slug: 'beneficios-migracao-nuvem-pequenas-empresas'
    },
    {
      id: 3,
      title: 'Inteligência Artificial: como implementar na sua empresa',
      excerpt: 'Conheça as aplicações práticas de IA que podem transformar processos e impulsionar a inovação no seu negócio.',
      content: '',
      author: 'Marcos Santos',
      date: '10 de Julho de 2023',
      readTime: '8 min',
      category: 'Inovação',
      tags: ['IA', 'Inteligência Artificial', 'Inovação'],
      image: '/images/blog-post-placeholder.svg',
      slug: 'inteligencia-artificial-como-implementar'
    },
    {
      id: 4,
      title: 'Melhores práticas para backup de dados empresariais',
      excerpt: 'Aprenda estratégias eficientes para garantir a segurança e a recuperação dos dados críticos da sua empresa.',
      content: '',
      author: 'Juliana Costa',
      date: '05 de Agosto de 2023',
      readTime: '6 min',
      category: 'Segurança',
      tags: ['Backup', 'Recuperação de Dados', 'Segurança'],
      image: '/images/blog-post-placeholder.svg',
      slug: 'melhores-praticas-backup-dados-empresariais'
    },
    {
      id: 5,
      title: 'Como escolher o melhor sistema de gestão para sua empresa',
      excerpt: 'Um guia completo para selecionar o ERP ideal que atenda às necessidades específicas do seu negócio.',
      content: '',
      author: 'Alan Spósito',
      date: '22 de Setembro de 2023',
      readTime: '9 min',
      category: 'Gestão',
      tags: ['ERP', 'Sistemas de Gestão', 'Software'],
      image: '/images/blog-post-placeholder.svg',
      slug: 'como-escolher-melhor-sistema-gestao'
    },
    {
      id: 6,
      title: 'Tendências de TI para 2024: o que esperar',
      excerpt: 'Fique por dentro das principais tendências tecnológicas que devem impactar o mercado no próximo ano.',
      content: '',
      author: 'Ana Oliveira',
      date: '15 de Outubro de 2023',
      readTime: '7 min',
      category: 'Tendências',
      tags: ['Tendências', 'Inovação', 'Futuro da TI'],
      image: '/images/blog-post-placeholder.svg',
      slug: 'tendencias-ti-2024'
    }
  ];
  
  const categories = [
    'Segurança',
    'Cloud Computing',
    'Inovação',
    'Gestão',
    'Tendências',
    'Desenvolvimento'
  ];
  
  const popularTags = [
    'Segurança',
    'Cloud',
    'IA',
    'Backup',
    'ERP',
    'Tendências',
    'Inovação'
  ];
  
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="section-dark py-5" style={{ 
        background: 'url(/images/blog-bg.svg) no-repeat center center',
        backgroundSize: 'cover'
      }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-4 fw-bold">Nosso <span className="text-accent-custom neon-text">Blog</span></h1>
              <p className="lead">
                Artigos, dicas e novidades sobre tecnologia e soluções para empresas
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="section-dark-gray py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row g-4">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="col-md-6">
                    <div className="card h-100">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="card-img-top" 
                        style={{ 
                          border: '1px solid rgba(57, 255, 20, 0.3)',
                          borderBottom: 'none'
                        }}
                      />
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="badge bg-dark-custom text-accent-custom px-3 py-2 rounded-pill">
                            {post.category}
                          </span>
                          <div className="d-flex align-items-center small text-muted">
                            <FaClock className="me-1" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <h3 className="card-title h5 fw-bold mb-3">
                          <Link href={`/blog/${post.slug}`} className="text-white hover-accent text-decoration-none">
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p className="card-text mb-3">{post.excerpt}</p>
                        
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div className="d-flex align-items-center small">
                            <FaCalendarAlt className="text-accent-custom me-1" />
                            <span className="text-muted">{post.date}</span>
                          </div>
                          <div className="d-flex align-items-center small">
                            <FaUser className="text-accent-custom me-1" />
                            <span className="text-muted">{post.author}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <Link href={`/blog/${post.slug}`} className="btn btn-sm btn-outline-accent w-100">
                            Ler mais <FaChevronRight className="ms-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredPosts.length === 0 && (
                <div className="card p-4 text-center">
                  <h3 className="h5 fw-bold mb-3">Nenhum artigo encontrado</h3>
                  <p>Tente ajustar seus filtros ou termos de busca.</p>
                </div>
              )}
              
              <div className="mt-4 d-flex justify-content-center">
                <nav aria-label="Paginação do blog">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">Anterior</a>
                    </li>
                    <li className="page-item active" aria-current="page">
                      <a className="page-link bg-accent-custom border-accent-custom text-dark" href="#">1</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">2</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">3</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">Próximo</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            
            <div className="col-lg-4 mt-4 mt-lg-0">
              <div className="card mb-4">
                <div className="card-body p-4">
                  <h3 className="fw-bold h5 mb-3">Pesquisar</h3>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control bg-dark text-light border-secondary" 
                      placeholder="Buscar artigos..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ borderColor: 'rgba(57, 255, 20, 0.3)' }}
                    />
                    <button 
                      className="btn btn-accent" 
                      type="button"
                    >
                      <FaSearch />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="card mb-4">
                <div className="card-body p-4">
                  <h3 className="fw-bold h5 mb-3">Categorias</h3>
                  <div className="list-group list-group-flush">
                    <button 
                      className={`list-group-item list-group-item-action bg-transparent text-light border-secondary ${selectedCategory === '' ? 'active text-accent-custom fw-bold' : ''}`}
                      onClick={() => setSelectedCategory('')}
                      style={{ borderColor: 'rgba(57, 255, 20, 0.1)' }}
                    >
                      Todas as categorias
                    </button>
                    {categories.map((category, index) => (
                      <button 
                        key={index} 
                        className={`list-group-item list-group-item-action bg-transparent text-light border-secondary ${selectedCategory === category ? 'active text-accent-custom fw-bold' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                        style={{ borderColor: 'rgba(57, 255, 20, 0.1)' }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="card mb-4">
                <div className="card-body p-4">
                  <h3 className="fw-bold h5 mb-3">Tags Populares</h3>
                  <div className="d-flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <a 
                        key={index} 
                        href="#" 
                        className="badge bg-dark-custom text-light px-3 py-2 text-decoration-none"
                        style={{ border: '1px solid rgba(57, 255, 20, 0.3)' }}
                      >
                        {tag}
                      </a>
                    ))}
                  </div>
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
                    <h3 className="fw-bold h5 mb-0">Receba nossas <span className="text-accent-custom neon-text">novidades</span></h3>
                  </div>
                  <p className="mb-3">
                    Inscreva-se em nossa newsletter para receber artigos e dicas exclusivas sobre tecnologia.
                  </p>
                  <div className="input-group mb-3">
                    <input 
                      type="email" 
                      className="form-control bg-dark text-light border-secondary" 
                      placeholder="Seu e-mail" 
                      style={{ borderColor: 'rgba(57, 255, 20, 0.3)' }}
                    />
                    <button className="btn btn-accent" type="button">Inscrever</button>
                  </div>
                  <div className="form-check small">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="privacyCheck"
                      style={{ borderColor: 'rgba(57, 255, 20, 0.3)' }}
                    />
                    <label className="form-check-label" htmlFor="privacyCheck">
                      Concordo com a <a href="#" className="text-accent-custom">Política de Privacidade</a>
                    </label>
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
                <h2 className="display-5 fw-bold mb-0">Tem alguma <span className="text-accent-custom neon-text">dúvida</span>?</h2>
              </div>
              <p className="lead mb-0">
                Entre em contato com nossa equipe para obter mais informações sobre nossos serviços e soluções.
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