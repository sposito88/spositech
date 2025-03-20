import React, { useState, useEffect } from 'react';
import { FaCircle, FaSync, FaExclamationTriangle, FaCheck } from 'react-icons/fa';

interface SocketStatusProps {
  socketUrl?: string;
}

const SocketStatus: React.FC<SocketStatusProps> = ({ 
  socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000'
}) => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [message, setMessage] = useState<string>('Verificando conexão...');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  useEffect(() => {
    const checkSocketServer = async () => {
      try {
        // Tenta fazer uma requisição para o endpoint do Socket.IO
        const response = await fetch(`${socketUrl}/socket.io/?EIO=4&transport=polling`, {
          method: 'GET',
          mode: 'no-cors', // Importante para evitar erros de CORS
        });
        
        // Como estamos usando no-cors, não podemos verificar o status
        // Mas se chegou aqui sem erro, consideramos que está online
        setStatus('online');
        setMessage('Servidor Socket.IO está online');
      } catch (error) {
        console.error('Erro ao verificar o servidor Socket.IO:', error);
        setStatus('offline');
        setMessage('Servidor Socket.IO não está respondendo');
      } finally {
        setLastChecked(new Date());
      }
    };

    // Verificar status imediatamente
    checkSocketServer();

    // Verificar a cada 30 segundos
    const interval = setInterval(checkSocketServer, 30000);

    return () => clearInterval(interval);
  }, [socketUrl]);

  const renderIcon = () => {
    switch (status) {
      case 'online':
        return <FaCheck className="status-icon online" />;
      case 'offline':
        return <FaExclamationTriangle className="status-icon offline" />;
      default:
        return <FaSync className="status-icon checking spin" />;
    }
  };

  const formatTime = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className={`socket-status ${status}`}>
      <div className="status-indicator">
        {renderIcon()}
        <span className="status-message">{message}</span>
      </div>
      {lastChecked && (
        <div className="last-checked">
          Última verificação: {formatTime(lastChecked)}
        </div>
      )}

      <style jsx>{`
        .socket-status {
          padding: 10px 15px;
          border-radius: 6px;
          margin-bottom: 15px;
          display: flex;
          flex-direction: column;
        }
        
        .online {
          background-color: #d4edda;
          color: #155724;
        }
        
        .offline {
          background-color: #f8d7da;
          color: #721c24;
        }
        
        .checking {
          background-color: #fff3cd;
          color: #856404;
        }
        
        .status-indicator {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .status-icon {
          font-size: 16px;
        }
        
        .status-message {
          font-weight: 500;
        }
        
        .last-checked {
          font-size: 12px;
          margin-top: 5px;
          opacity: 0.8;
        }
        
        .spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SocketStatus; 