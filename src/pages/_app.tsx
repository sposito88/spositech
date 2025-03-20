import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'
import '@/styles/admin.css';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { useEffect } from 'react'
import SocketProvider from '@/components/SocketProvider';
import SocketDebug from '@/components/SocketDebug';
import SocketOverride from '@/components/SocketOverride';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Importar o JavaScript do Bootstrap no lado do cliente
    typeof document !== 'undefined' && require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  // Determinar se estamos em produção
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <React.Fragment>
      <Head>
        <title>SposiTech - Suporte em Sistemas de Informática</title>
        <meta name="description" content="Soluções em informática e suporte a sistemas para empresas e profissionais" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SocketProvider>
        <Component {...pageProps} />
        {!isProduction && <SocketDebug />}
      </SocketProvider>
      <SocketOverride />
      <style jsx global>{`
        /* Oculta a mensagem de Socket.IO */
        :root {
          --socket-debug-display: none !important;
        }
        
        /* Seletores específicos para garantir que a mensagem seja ocultada */
        div[class*="socket-status"],
        .socket-debug,
        .socket-info,
        [data-testid="socket-status"] {
          display: none !important;
        }
      `}</style>
    </React.Fragment>
  )
} 