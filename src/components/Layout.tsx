import React from 'react';
import Header from './Header';
import Footer from './Footer';
import dynamic from 'next/dynamic';

// Importamos o Chatbot com carregamento dinâmico para evitar erros no SSR
const Chatbot = dynamic(() => import('./Chatbot'), { ssr: false });

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <Chatbot />
    </>
  );
};

export default Layout; 