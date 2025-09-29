# Sistema de Gestão de Funcionários

Um sistema completo de gestão de funcionários com frontend moderno em React e backend robusto em Node.js.

## 📋 Sobre o Projeto

Este projeto consiste em uma aplicação full-stack para gerenciamento de funcionários, permitindo operações completas de CRUD (Create, Read, Update, Delete) através de uma interface moderna e intuitiva.

### 🎯 Funcionalidades

- ✅ Cadastro de funcionários
- ✅ Listagem de funcionários
- ✅ Edição de dados
- ✅ Exclusão de funcionários
- ✅ Busca por nome
- ✅ Interface responsiva
- ✅ Validação de formulários
- ✅ Notificações toast

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset do JavaScript com tipagem
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/ui** - Componentes UI modernos
- **React Router** - Roteamento SPA
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **TanStack Query** - Gerenciamento de estado servidor

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **Sequelize** - ORM para JavaScript
- **SQLite** - Banco de dados leve
- **dotenv** - Gerenciamento de variáveis ambiente


## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Backend

1. **Clone o repositório e navegue para a pasta do backend:**
```bash
git clone [seu-repositorio]
cd backend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
Crie um arquivo `.env` na raiz do backend:
```env
PORT=3030
```

4. **Execute o servidor:**
```bash
# Desenvolvimento
npm run dev

# Produção
npm run prod
```

O servidor estará rodando em `http://localhost:3030`

### Frontend

1. **Navegue para a pasta do frontend:**
```bash
cd frontend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute o projeto:**
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:8080`

## 📡 API Endpoints

### Funcionários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/` | Mensagem de boas-vindas |
| `POST` | `/employee/create` | Criar funcionário |
| `GET` | `/employee` | Listar todos os funcionários |
| `GET` | `/employee/id/:id` | Buscar funcionário por ID |
| `GET` | `/employee/name/:name` | Buscar funcionário por nome |
| `PUT` | `/employee/update` | Atualizar funcionário |
| `POST` | `/employee/remove/:id` | Remover funcionário |

### Exemplos de Uso

**Criar funcionário:**
```json
POST /employee/create
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999"
}
```

**Atualizar funcionário:**
```json
PUT /employee/update
{
  "id": 1,
  "name": "João Santos",
  "email": "joao.santos@email.com",
  "phone": "(11) 88888-8888"
}
```

## 🎨 Características do Frontend

- **Design System**: Utiliza tokens semânticos para cores e tipografia
- **Responsivo**: Adaptável a diferentes tamanhos de tela
- **Acessibilidade**: Componentes com suporte a navegação por teclado
- **UX Moderna**: Animações suaves e feedback visual
- **Validação**: Formulários com validação em tempo real
- **Estado Global**: Gerenciamento eficiente com TanStack Query

## 🔧 Configuração

### Banco de Dados
O banco SQLite é criado automaticamente na primeira execução. O arquivo `db.sqlite` conterá todos os dados dos funcionários.

### CORS
Para permitir requisições do frontend, configure o CORS no backend se necessário.

## 👤 Autor

**Caíque Souza**

## 📄 Licença

Este projeto está sob a licença ISC.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, entre em contato através do email ou abra uma issue no repositório.

---

⭐ Se este projeto te ajudou, deixe uma estrela no repositório!
