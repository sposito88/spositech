import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import AdminTable from '@/components/AdminTable';
import { FaSearch, FaUserEdit, FaTrash, FaUserPlus, FaFileCsv } from 'react-icons/fa';

// Interface para os dados de usuário
interface User {
  id: string;
  name: string;
  email: string;
  lastActive: Date;
  totalChats: number;
  status: 'active' | 'inactive' | 'blocked';
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Efeito para carregar os dados (simulado)
  useEffect(() => {
    // Em produção, esses dados viriam de uma API
    setTimeout(() => {
      const mockUsers: User[] = Array.from({ length: 30 }, (_, index) => ({
        id: `user_${(index + 1).toString().padStart(3, '0')}`,
        name: [
          'João Silva', 'Maria Oliveira', 'Carlos Mendes', 'Ana Costa', 'Pedro Santos',
          'Lúcia Ferreira', 'Marcos Souza', 'Juliana Lima', 'Roberto Alves', 'Fernanda Gomes',
          'Paulo Ribeiro', 'Amanda Carvalho', 'Luiz Martins', 'Beatriz Pereira', 'Renato Barbosa',
          'Camila Dias', 'Bruno Nascimento', 'Daniela Castro', 'André Cardoso', 'Patrícia Nunes',
          'Ricardo Monteiro', 'Vanessa Rodrigues', 'Gustavo Pinto', 'Mariana Teixeira', 'Felipe Lopes',
          'Débora Moraes', 'Alexandre Correia', 'Luciana Vieira', 'Eduardo Machado', 'Cristina Fernandes'
        ][index],
        email: `usuario${index + 1}@exemplo.com`,
        lastActive: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
        totalChats: Math.floor(Math.random() * 10),
        status: ['active', 'inactive', 'blocked'][Math.floor(Math.random() * 3)] as 'active' | 'inactive' | 'blocked'
      }));
      
      setUsers(mockUsers);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Filtrar usuários pelo termo de pesquisa
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Helper para formatar a data
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  // Configuração das colunas para a tabela
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { 
      key: 'lastActive', 
      label: 'Último Acesso',
      render: (value: Date) => formatDate(value)
    },
    { key: 'totalChats', label: 'Total de Chats' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`badge ${
          value === 'active' 
            ? 'bg-success' 
            : value === 'inactive'
              ? 'bg-warning text-dark'
              : 'bg-danger'
        }`}>
          {value === 'active' 
            ? 'Ativo' 
            : value === 'inactive'
              ? 'Inativo'
              : 'Bloqueado'
          }
        </span>
      )
    },
    { 
      key: 'actions', 
      label: 'Ações',
      render: () => (
        <>
          <button className="btn btn-sm btn-outline-light me-2" title="Editar">
            <FaUserEdit />
          </button>
          <button className="btn btn-sm btn-outline-danger" title="Excluir">
            <FaTrash />
          </button>
        </>
      )
    }
  ];

  // Renderiza o estado de carregamento
  if (isLoading) {
    return (
      <AdminLayout title="Usuários">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border text-accent-custom" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Usuários">
      {/* Barra de ações */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="text-white mb-0">Gerenciamento de Usuários</h5>
        <div>
          <button className="btn btn-outline-light btn-sm me-2">
            <FaFileCsv className="me-2" />
            Exportar CSV
          </button>
          <button className="btn btn-accent btn-sm">
            <FaUserPlus className="me-2" />
            Novo Usuário
          </button>
        </div>
      </div>
      
      {/* Pesquisa */}
      <div className="admin-card p-3 mb-4">
        <div className="input-group">
          <span className="input-group-text bg-dark text-light border-dark">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control bg-dark text-light border-dark"
            placeholder="Buscar por nome, email ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Tabela de usuários */}
      <div className="admin-card">
        <AdminTable 
          columns={columns} 
          data={currentUsers} 
          emptyMessage="Nenhum usuário encontrado"
        />
      </div>
      
      {/* Paginação */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link bg-dark text-light border-dark" 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  Anterior
                </button>
              </li>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                  <button
                    className={`page-link ${
                      currentPage === page 
                        ? 'bg-accent-custom border-dark text-dark' 
                        : 'bg-dark text-light border-dark'
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
              
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button 
                  className="page-link bg-dark text-light border-dark" 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                  Próxima
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUsers; 