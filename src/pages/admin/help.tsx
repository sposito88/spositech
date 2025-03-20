import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { FaBook, FaSearch, FaQuestionCircle, FaKey, FaTools, FaExclamationTriangle, FaLightbulb } from 'react-icons/fa';

// Interface para os tópicos de ajuda
interface HelpTopic {
  id: string;
  title: string;
  category: string;
  content: React.ReactNode;
}

const AdminHelp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Lista de tópicos de ajuda
  const helpTopics: HelpTopic[] = [
    {
      id: 'getting-started',
      title: 'Primeiros Passos',
      category: 'basics',
      content: (
        <div>
          <p>
            Bem-vindo ao Painel Administrativo SposiTech! Este guia ajudará você a começar a usar o painel.
          </p>
          <h6 className="text-accent-custom mt-4">Visão Geral do Painel</h6>
          <p>
            O painel administrativo é dividido em várias seções:
          </p>
          <ul>
            <li><strong>Dashboard</strong> - Visão geral com estatísticas importantes</li>
            <li><strong>Atendimento</strong> - Interface para gerenciar conversas com usuários</li>
            <li><strong>Usuários</strong> - Gerenciamento de usuários do sistema</li>
            <li><strong>Relatórios</strong> - Relatórios e análises de desempenho</li>
            <li><strong>Configurações</strong> - Personalize suas preferências</li>
          </ul>
          
          <h6 className="text-accent-custom mt-4">Fluxo de Trabalho Básico</h6>
          <ol>
            <li>Acesse o dashboard para visualizar estatísticas em tempo real</li>
            <li>Verifique a fila de atendimento na seção Atendimento</li>
            <li>Atenda aos usuários respondendo às suas mensagens</li>
            <li>Consulte relatórios para analisar o desempenho</li>
          </ol>
        </div>
      )
    },
    {
      id: 'chat-management',
      title: 'Gerenciamento de Atendimento',
      category: 'chat',
      content: (
        <div>
          <p>
            O sistema de atendimento permite gerenciar conversas com usuários em tempo real.
          </p>
          
          <h6 className="text-accent-custom mt-4">Iniciando um Atendimento</h6>
          <p>
            Quando um usuário solicita um atendimento, ele entra na fila de espera. Para iniciar um atendimento:
          </p>
          <ol>
            <li>Acesse a página de Atendimento</li>
            <li>Veja os usuários na fila de espera à esquerda</li>
            <li>Clique em um usuário para aceitar o atendimento</li>
            <li>Inicie a conversa respondendo à mensagem do usuário</li>
          </ol>
          
          <h6 className="text-accent-custom mt-4">Gerenciando Múltiplos Atendimentos</h6>
          <p>
            Você pode gerenciar até 3 atendimentos simultaneamente por padrão:
          </p>
          <ul>
            <li>Use a lista de conversas ativas para alternar entre atendimentos</li>
            <li>O sistema notificará quando novas mensagens chegarem</li>
            <li>Priorize atendimentos baseados no tempo de espera</li>
          </ul>
          
          <h6 className="text-accent-custom mt-4">Encerrando um Atendimento</h6>
          <p>
            Para encerrar um atendimento:
          </p>
          <ol>
            <li>Certifique-se de que todas as dúvidas do usuário foram respondidas</li>
            <li>Clique no botão "Encerrar Atendimento" no topo da conversa</li>
            <li>Selecione um motivo para o encerramento (opcional)</li>
            <li>O sistema notificará o usuário que o atendimento foi encerrado</li>
          </ol>
        </div>
      )
    },
    {
      id: 'user-management',
      title: 'Gerenciamento de Usuários',
      category: 'users',
      content: (
        <div>
          <p>
            A seção de gerenciamento de usuários permite visualizar, editar e gerenciar usuários do sistema.
          </p>
          
          <h6 className="text-accent-custom mt-4">Visualizando Usuários</h6>
          <p>
            A lista de usuários mostra todos os usuários registrados no sistema:
          </p>
          <ul>
            <li>Use a barra de pesquisa para encontrar usuários específicos</li>
            <li>Clique nos cabeçalhos das colunas para ordenar a lista</li>
            <li>Use os filtros para visualizar usuários por status</li>
          </ul>
          
          <h6 className="text-accent-custom mt-4">Editando Informações de Usuário</h6>
          <p>
            Para editar as informações de um usuário:
          </p>
          <ol>
            <li>Encontre o usuário na lista</li>
            <li>Clique no ícone de edição ao lado do nome do usuário</li>
            <li>Modifique as informações necessárias</li>
            <li>Clique em "Salvar" para aplicar as alterações</li>
          </ol>
          
          <h6 className="text-accent-custom mt-4">Gerenciando Status de Usuário</h6>
          <p>
            Você pode alterar o status de um usuário para:
          </p>
          <ul>
            <li><strong>Ativo</strong> - Usuário com acesso normal ao sistema</li>
            <li><strong>Inativo</strong> - Usuário temporariamente sem acesso</li>
            <li><strong>Bloqueado</strong> - Usuário com acesso bloqueado permanentemente</li>
          </ul>
        </div>
      )
    },
    {
      id: 'reports',
      title: 'Relatórios e Análises',
      category: 'reports',
      content: (
        <div>
          <p>
            Os relatórios fornecem insights sobre o desempenho do atendimento e atividades dos usuários.
          </p>
          
          <h6 className="text-accent-custom mt-4">Tipos de Relatórios Disponíveis</h6>
          <ul>
            <li><strong>Volume de Atendimentos</strong> - Número de atendimentos por período</li>
            <li><strong>Tempo de Resposta</strong> - Tempo médio de resposta e duração dos atendimentos</li>
            <li><strong>Satisfação do Cliente</strong> - Avaliações e feedback dos usuários</li>
            <li><strong>Desempenho dos Atendentes</strong> - Estatísticas individuais de cada atendente</li>
          </ul>
          
          <h6 className="text-accent-custom mt-4">Filtrando Relatórios</h6>
          <p>
            Você pode filtrar os relatórios por:
          </p>
          <ul>
            <li>Período específico (data inicial e final)</li>
            <li>Atendente específico</li>
            <li>Tipo de atendimento</li>
            <li>Status do atendimento (resolvido, pendente, etc.)</li>
          </ul>
          
          <h6 className="text-accent-custom mt-4">Exportando Relatórios</h6>
          <p>
            Os relatórios podem ser exportados em vários formatos:
          </p>
          <ul>
            <li>CSV - Para análise em ferramentas como Excel</li>
            <li>PDF - Para apresentações e documentação</li>
            <li>JSON - Para integração com outros sistemas</li>
          </ul>
        </div>
      )
    },
    {
      id: 'system-settings',
      title: 'Configurações do Sistema',
      category: 'settings',
      content: (
        <div>
          <p>
            As configurações permitem personalizar sua experiência no painel administrativo.
          </p>
          
          <h6 className="text-accent-custom mt-4">Configurações de Conta</h6>
          <p>
            Gerencie suas informações pessoais:
          </p>
          <ul>
            <li>Nome e e-mail</li>
            <li>Senha de acesso</li>
            <li>Preferências de contato</li>
          </ul>
          
          <h6 className="text-accent-custom mt-4">Configurações de Notificação</h6>
          <p>
            Personalize como você recebe notificações:
          </p>
          <ul>
            <li>Notificações por e-mail</li>
            <li>Notificações no navegador</li>
            <li>Sons de notificação</li>
          </ul>
          
          <h6 className="text-accent-custom mt-4">Configurações de Aparência</h6>
          <p>
            Ajuste a aparência do painel:
          </p>
          <ul>
            <li>Tema (claro/escuro)</li>
            <li>Tamanho da fonte</li>
            <li>Layout do painel</li>
          </ul>
          
          <h6 className="text-accent-custom mt-4">Configurações de Chat</h6>
          <p>
            Personalize sua experiência de atendimento:
          </p>
          <ul>
            <li>Aceitar chats automaticamente</li>
            <li>Número máximo de chats simultâneos</li>
            <li>Mensagens pré-definidas</li>
          </ul>
        </div>
      )
    },
    {
      id: 'shortcuts',
      title: 'Atalhos de Teclado',
      category: 'basics',
      content: (
        <div>
          <p>
            O painel administrativo oferece atalhos de teclado para agilizar seu trabalho.
          </p>
          
          <h6 className="text-accent-custom mt-4">Navegação</h6>
          <table className="table table-sm table-dark">
            <thead>
              <tr>
                <th>Atalho</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>Alt + D</code></td>
                <td>Ir para o Dashboard</td>
              </tr>
              <tr>
                <td><code>Alt + C</code></td>
                <td>Ir para o Atendimento</td>
              </tr>
              <tr>
                <td><code>Alt + U</code></td>
                <td>Ir para Usuários</td>
              </tr>
              <tr>
                <td><code>Alt + R</code></td>
                <td>Ir para Relatórios</td>
              </tr>
              <tr>
                <td><code>Alt + S</code></td>
                <td>Ir para Configurações</td>
              </tr>
            </tbody>
          </table>
          
          <h6 className="text-accent-custom mt-4">Atendimento</h6>
          <table className="table table-sm table-dark">
            <thead>
              <tr>
                <th>Atalho</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>Ctrl + Enter</code></td>
                <td>Enviar mensagem</td>
              </tr>
              <tr>
                <td><code>Ctrl + ←/→</code></td>
                <td>Navegar entre conversas</td>
              </tr>
              <tr>
                <td><code>Ctrl + N</code></td>
                <td>Aceitar próximo atendimento na fila</td>
              </tr>
              <tr>
                <td><code>Ctrl + E</code></td>
                <td>Encerrar atendimento atual</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      id: 'troubleshooting',
      title: 'Solução de Problemas',
      category: 'support',
      content: (
        <div>
          <p>
            Encontrou algum problema? Aqui estão algumas soluções comuns.
          </p>
          
          <h6 className="text-accent-custom mt-4">Problemas de Login</h6>
          <p>
            Se você não conseguir fazer login:
          </p>
          <ul>
            <li>Verifique se está usando as credenciais corretas</li>
            <li>Limpe o cache do navegador</li>
            <li>Verifique se o navegador está atualizado</li>
            <li>Se persistir, entre em contato com o suporte técnico</li>
          </ul>
          
          <h6 className="text-accent-custom mt-4">Problemas de Conexão</h6>
          <p>
            Se você estiver tendo problemas de conexão:
          </p>
          <ul>
            <li>Verifique sua conexão com a internet</li>
            <li>Recarregue a página</li>
            <li>Verifique se o servidor está em manutenção</li>
            <li>Tente acessar em outro horário ou dispositivo</li>
          </ul>
          
          <h6 className="text-accent-custom mt-4">Notificações não Funcionam</h6>
          <p>
            Se as notificações não estiverem funcionando:
          </p>
          <ul>
            <li>Verifique as permissões do navegador</li>
            <li>Verifique as configurações de notificação do sistema</li>
            <li>Desative extensões que podem estar bloqueando notificações</li>
          </ul>
          
          <h6 className="text-accent-custom mt-4">Contato com Suporte</h6>
          <p>
            Se você não conseguir resolver o problema, entre em contato com o suporte:
          </p>
          <ul>
            <li>E-mail: suporte@spositech.com</li>
            <li>Telefone: (XX) XXXX-XXXX</li>
            <li>Horário de atendimento: Segunda a Sexta, 9h às 18h</li>
          </ul>
        </div>
      )
    }
  ];

  // Categorias de tópicos
  const categories = [
    { id: 'all', name: 'Todos', icon: <FaBook className="me-2" /> },
    { id: 'basics', name: 'Básico', icon: <FaKey className="me-2" /> },
    { id: 'chat', name: 'Atendimento', icon: <FaQuestionCircle className="me-2" /> },
    { id: 'users', name: 'Usuários', icon: <FaQuestionCircle className="me-2" /> },
    { id: 'reports', name: 'Relatórios', icon: <FaQuestionCircle className="me-2" /> },
    { id: 'settings', name: 'Configurações', icon: <FaTools className="me-2" /> },
    { id: 'support', name: 'Suporte', icon: <FaExclamationTriangle className="me-2" /> }
  ];

  // Filtrar tópicos por pesquisa e categoria
  const filteredTopics = helpTopics.filter(topic => {
    const matchesSearch = 
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (topic.content ? topic.content.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false);
    
    const matchesCategory = activeCategory === 'all' || topic.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Estado do tópico ativo
  const [activeTopic, setActiveTopic] = useState(filteredTopics.length > 0 ? filteredTopics[0].id : '');

  return (
    <AdminLayout title="Ajuda">
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="d-flex align-items-center">
            <FaBook className="text-accent-custom me-2" size={24} />
            <h5 className="text-white mb-0">Centro de Ajuda</h5>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-dark text-light border-dark">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control bg-dark text-light border-dark"
              placeholder="Buscar por tópico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-3">
          {/* Categorias */}
          <div className="admin-card p-0 mb-4">
            <div className="admin-card-header p-3">
              <h6 className="mb-0">Categorias</h6>
            </div>
            <div className="list-group list-group-flush">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`list-group-item list-group-item-action bg-dark text-white border-dark d-flex align-items-center ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Lista de tópicos */}
          <div className="admin-card p-0">
            <div className="admin-card-header p-3">
              <h6 className="mb-0">Tópicos</h6>
            </div>
            {filteredTopics.length > 0 ? (
              <div className="list-group list-group-flush">
                {filteredTopics.map(topic => (
                  <button
                    key={topic.id}
                    className={`list-group-item list-group-item-action bg-dark text-white border-dark ${activeTopic === topic.id ? 'active' : ''}`}
                    onClick={() => setActiveTopic(topic.id)}
                  >
                    {topic.title}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-muted">
                <FaSearch className="mb-2" size={20} />
                <p className="mb-0">Nenhum tópico encontrado</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="col-md-9">
          {/* Conteúdo do tópico */}
          <div className="admin-card p-4">
            {filteredTopics.length > 0 ? (
              filteredTopics.find(topic => topic.id === activeTopic) ? (
                <>
                  <h4 className="text-white mb-4">
                    {filteredTopics.find(topic => topic.id === activeTopic)?.title}
                  </h4>
                  <div className="help-content text-light">
                    {filteredTopics.find(topic => topic.id === activeTopic)?.content}
                  </div>
                </>
              ) : (
                <>
                  <h4 className="text-white mb-4">
                    {filteredTopics[0].title}
                  </h4>
                  <div className="help-content text-light">
                    {filteredTopics[0].content}
                  </div>
                </>
              )
            ) : (
              <div className="text-center p-5">
                <FaSearch className="text-accent-custom mb-3" size={40} />
                <h5 className="text-white">Nenhum resultado encontrado</h5>
                <p className="text-muted">
                  Tente uma pesquisa diferente ou explore as categorias disponíveis.
                </p>
              </div>
            )}
          </div>
          
          {/* Dica rápida */}
          <div className="admin-card p-3 mt-4">
            <div className="d-flex">
              <div className="me-3">
                <FaLightbulb className="text-accent-custom" size={24} />
              </div>
              <div>
                <h6 className="text-white mb-1">Dica Rápida</h6>
                <p className="text-muted mb-0">
                  Você pode pressionar <code>Ctrl+F</code> para buscar texto específico dentro de um tópico de ajuda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminHelp; 