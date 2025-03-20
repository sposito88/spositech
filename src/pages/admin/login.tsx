import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaUser, FaLock, FaExclamationCircle } from 'react-icons/fa';
import Head from 'next/head';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Verificar se já está autenticado
  useEffect(() => {
    const token = sessionStorage.getItem('adminToken');
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Tentando login com:', email);
      
      // Credenciais fixas para desenvolvimento
      const validCredentials = [
        { email: 'admin@spositech.com.br', password: 'Q3}*M8c#$P9x!Z' }
      ];
      
      const validUser = validCredentials.find(
        cred => cred.email === email && cred.password === password
      );
      
      if (validUser) {
        // Login bem-sucedido
        console.log('Login bem-sucedido');
        sessionStorage.setItem('adminToken', 'jwt-token-' + Date.now());
        sessionStorage.setItem('adminName', 'Administrador');
        sessionStorage.setItem('adminEmail', email);
        
        // Redirecionar para o painel
        router.push('/admin/dashboard');
      } else {
        setError('Credenciais inválidas. Verifique seu email e senha.');
      }
    } catch (err) {
      setError('Erro ao fazer login. Por favor, tente novamente.');
      console.error('Erro de login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login Admin - SposiTech</title>
      </Head>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>SposiTech</h1>
            <p>Painel de Administração</p>
          </div>

          {error && (
            <div className="alert-error">
              <FaExclamationCircle />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-group">
                <div className="input-icon">
                  <FaUser />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <div className="input-group">
                <div className="input-icon">
                  <FaLock />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
            
            <div className="demo-credentials">
              <p>Para acesso administrativo, use:</p>
              <p><strong>Email:</strong> admin@spositech.com.br</p>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f8f9fa;
          padding: 20px;
        }
        
        .login-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          padding: 30px;
        }
        
        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .login-header h1 {
          color: #0d6efd;
          margin: 0 0 5px;
          font-size: 28px;
        }
        
        .login-header p {
          color: #6c757d;
          margin: 0;
        }
        
        .alert-error {
          background-color: #f8d7da;
          color: #721c24;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #212529;
          font-weight: 500;
        }
        
        .input-group {
          display: flex;
          border: 1px solid #ced4da;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .input-icon {
          background-color: #e9ecef;
          color: #6c757d;
          padding: 12px 15px;
          display: flex;
          align-items: center;
        }
        
        .input-group input {
          flex: 1;
          border: none;
          padding: 12px 15px;
          outline: none;
        }
        
        .login-button {
          background-color: #0d6efd;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 12px;
          width: 100%;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .login-button:hover {
          background-color: #0b5ed7;
        }
        
        .login-button:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
        }
        
        .demo-credentials {
          margin-top: 30px;
          background-color: #e9ecef;
          padding: 15px;
          border-radius: 4px;
          color: #495057;
          font-size: 14px;
        }
        
        .demo-credentials p {
          margin: 0 0 5px;
        }
      `}</style>
    </>
  );
};

export default AdminLogin; 