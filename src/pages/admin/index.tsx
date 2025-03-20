import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaSpinner } from 'react-icons/fa';

const AdminIndex: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const adminToken = localStorage.getItem('spositech_admin_token');
    
    if (adminToken) {
      // Se tiver token, redireciona para o dashboard
      router.push('/admin/dashboard');
    } else {
      // Se não tiver token, redireciona para login
      router.push('/admin/login');
    }
    
    // Efeito de carregamento enquanto redireciona
  }, [router]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="text-center">
        <div className="spinner-border text-light mb-3" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="text-light">Redirecionando...</p>
      </div>
    </div>
  );
};

export default AdminIndex; 