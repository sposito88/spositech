import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" />
        <script src="https://cdn.socket.io/4.6.0/socket.io.min.js" integrity="sha384-c79GN5VsunZvi+Q/WObgk2in0CbZsHnjEqvFxC5DxHn9lTfNce2WW6h2pH6u/kF+" crossOrigin="anonymous"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.socketIOLoaded = false;
            // Verificar se Socket.IO já está carregado
            function checkSocketIO() {
              if (typeof io !== 'undefined') {
                window.socketIOLoaded = true;
                console.log('Socket.IO carregado com sucesso!');
              } else {
                // Se não estiver carregado após 3 segundos, tenta carregar novamente do CDN
                setTimeout(() => {
                  if (!window.socketIOLoaded) {
                    console.warn('Socket.IO não encontrado, carregando do CDN...');
                    const script = document.createElement('script');
                    script.src = 'https://cdn.socket.io/4.6.0/socket.io.min.js';
                    script.integrity = 'sha384-c79GN5VsunZvi+Q/WObgk2in0CbZsHnjEqvFxC5DxHn9lTfNce2WW6h2pH6u/kF+';
                    script.crossOrigin = 'anonymous';
                    document.head.appendChild(script);
                  }
                }, 3000);
              }
            }
            
            // Executar verificação quando o documento estiver carregado
            if (document.readyState === 'complete') {
              checkSocketIO();
            } else {
              window.addEventListener('load', checkSocketIO);
            }
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </Html>
  )
} 