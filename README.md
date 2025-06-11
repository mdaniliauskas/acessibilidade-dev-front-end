# Acessibilidade Dev - Frontend ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

> **TCC - Trabalho de Conclusão de Graduação | FATEC**  
> Interface moderna e acessível para plataforma colaborativa de discussão sobre acessibilidade digital. Desenvolvido com React, focado em usabilidade e inclusão para pessoas com deficiência.

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://acessibilidade-dev-front-end.vercel.app/)
[![Backend](https://img.shields.io/badge/Backend-Heroku-430098?style=flat-square&logo=heroku&logoColor=white)](https://acessibilidade-dev-back-end.herokuapp.com)
[![Organização](https://img.shields.io/badge/Organização-GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/acessibilidadedev)

## 🚀 Sobre o Projeto

### 🎯 **Missão Social & Técnica**
Interface web moderna projetada para **democratizar o acesso ao conhecimento sobre acessibilidade digital**. Como parte de um **TCC premiado na FATEC**, este frontend demonstra como tecnologia de ponta pode ser usada para **inclusão social** e **impacto positivo**.

### ✨ **Diferenciais de UX/UI**
- **♿ Acessibilidade Nativa**: Design inclusivo para pessoas com deficiência
- **📱 Responsivo Total**: Experiência consistente em todos os dispositivos  
- **🎨 Design System**: Chakra UI para consistência visual
- **🚀 Performance**: Carregamento otimizado com Vite
- **🔐 Autenticação Segura**: Auth0 com perfis especializados

### 🌟 **Funcionalidades Inovadoras**
- **🤖 Chat IA Especializado**: Interface para ChatGPT focado em acessibilidade
- **💬 Salas de Discussão**: Chat em tempo real com Firebase
- **📝 Editor Markdown**: Preview em tempo real para posts técnicos
- **🏷️ Sistema de Tags**: Categorização inteligente de conteúdo
- **🗳️ Votação Democrática**: Sistema de votos para tópicos relevantes

## 🛠️ Stack Tecnológica

### ⚛️ **Frontend Core**
![React](https://img.shields.io/badge/React%2018-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite%204-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript%20ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=flat-square&logo=react-router&logoColor=white)

### 🎨 **UI/UX & Styling**
![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat-square&logo=chakra-ui&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap%205-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![React Icons](https://img.shields.io/badge/React%20Icons-E10051?style=flat-square&logo=react&logoColor=white)

### 🔐 **Autenticação & Integração**
![Auth0](https://img.shields.io/badge/Auth0-EB5424?style=flat-square&logo=auth0&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

### 📝 **Editores & Funcionalidades**
![Markdown](https://img.shields.io/badge/Markdown-000000?style=flat-square&logo=markdown&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white)

### ⚙️ **Build & Deploy**
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)

## 🏗️ Arquitetura & Componentes

### 🧩 **Estrutura de Componentes**
```
src/
├── components/           # Componentes reutilizáveis
│   ├── Navbar/          # Navegação principal
│   ├── TextCard/        # Cards de tópicos/artigos
│   ├── ChatCard/        # Cards de salas de chat
│   ├── CustomButton/    # Botões padronizados
│   ├── MenuSideBar/     # Menu lateral responsivo
│   ├── CategoryFilter/  # Filtros por categoria
│   ├── InputTags/       # Sistema de tags
│   └── Markdown/        # Editor e preview MD
├── pages/               # Páginas principais
│   ├── Forum/           # Fórum de discussões
│   ├── Chat/            # Salas virtuais
│   ├── OpenIA/          # Chat com IA
│   └── Register/        # Cadastro de usuários
├── services/            # Integrações API
├── hooks/               # Custom hooks
└── utils/               # Utilitários e validações
```

### 🎨 **Design System & Acessibilidade**
- **🎨 Chakra UI**: Sistema de design consistente
- **♿ ARIA Labels**: Navegação assistiva completa
- **⌨️ Keyboard Navigation**: Totalmente navegável via teclado
- **🎯 Focus Management**: Indicadores visuais claros
- **📱 Mobile First**: Design responsivo priorizando mobile
- **🌈 Alto Contraste**: Paleta otimizada para visibilidade

## 🚀 Funcionalidades Principais

### 💬 **Fórum Colaborativo**
- **📝 Editor Markdown**: Criação de posts com preview em tempo real
- **🏷️ Sistema de Tags**: Categorização automática de conteúdo
- **🗳️ Votação**: Sistema democrático para relevância
- **💬 Respostas**: Threading de discussões
- **🔍 Busca Avançada**: Full-text search com filtros

### 🏠 **Salas de Discussão**
```jsx
// Chat em tempo real com Firebase
const handleSendMessage = async () => {
  const payload = {
    path: `messages/${chatId}`,
    data: {
      author: user.nickname,
      message: message.split("\n").join("<br>"),
      createdAt: TIMESTAMP(),
    },
  };
  await writeData(payload);
};
```

### 🤖 **IA Conversacional**
```jsx
// Integração com ChatGPT para acessibilidade
const handleSendMessage = async () => {
  const response = await fetch(
    "https://acessibilidade-dev-back-end.herokuapp.com/openai",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: inputRef.current.value }),
    }
  );
  const data = await response.json();
  setResult(data.message);
};
```

## ⚙️ Como executar

### Pré-requisitos
- Node.js 18+ e npm/yarn
- Conta Auth0 configurada
- Firebase projeto configurado

### Instalação e execução
```bash
# Clonar o repositório
git clone https://github.com/mdaniliauskas/acessibilidade-dev-front-end.git
cd acessibilidade-dev-front-end

# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Configure Auth0 e Firebase no código

# Iniciar servidor de desenvolvimento
npm run dev

# Aplicação rodando em http://localhost:5173
```

### 🚀 **Build para Produção**
```bash
# Build otimizado
npm run build

# Preview do build
npm run preview

# Deploy automático para Vercel
```

## 🌟 Componentes Destacados

### 📝 **Editor Markdown**
```jsx
// Editor com preview em tempo real
import MDEditor from "@uiw/react-md-editor";

const Editor = ({ text, handleText }) => {
  return (
    <MDEditor
      value={text}
      onChange={(newValue) => handleText(newValue)}
      preview="edit"
    />
  );
};
```

### 🏷️ **Sistema de Tags Inteligente**
```jsx
// Componente de tags com autocomplete
const InputTags = ({ textLabel, onAddTag, tags }) => {
  const handleInput = (e) => {
    let tag = e.target.value.toUpperCase().trim();
    if (e.keyCode === 32 && !tags.includes(tag) && tag !== "") {
      onAddTag([...tags, tag]);
    }
  };
};
```

## 🎨 Design System

### 🌈 **Paleta de Cores Acessível**
- **Primária**: `#14AE5C` (Verde acessível)
- **Secundária**: `#0070BB` (Azul contrastante)  
- **Sucesso**: `#5A9A08` (Verde escuro)
- **Atenção**: `#C05746` (Laranja acessível)
- **Neutros**: Escala de cinzas com contraste 4.5:1

### 📱 **Breakpoints Responsivos**
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px - 1439px
- **Wide**: 1440px+

## 👥 Equipe de Desenvolvimento

### 🎓 **TCC FATEC - Análise e Desenvolvimento de Sistemas**

| Desenvolvedor | GitHub |
|--------------|--------|
| **Marcelo Daniliauskas** | [@mdaniliauskas](https://github.com/mdaniliauskas) |
| **Arthur Nascimento** | [@Arthur-cmd256](https://github.com/Arthur-cmd256) |
| **Luan Teixeira** | [@luanLTS](https://github.com/luanLTS) |
| **Ranayna Alves de Oliveira** | [@Ranayna](https://github.com/Ranayna) |
| **Weslley Rodrigues** | [@weslleyrods](https://github.com/weslleyrods) |

> **🏆 Interface premiada pela qualidade de UX inclusivo**  
> **🎨 Design system consistente e acessível**  
> **📱 Performance otimizada para todos os dispositivos**

## 🔗 Ecossistema do Projeto

### 🌐 **Repositórios Relacionados**
- **Backend API**: [acessibilidade-dev-back-end](https://github.com/mdaniliauskas/acessibilidade-dev-back-end)
- **Chat Firebase**: [Chat_Firebase](https://github.com/mdaniliauskas/Chat_Firebase)
- **Organização**: [acessibilidadedev](https://github.com/acessibilidadedev)

### 🚀 **Demonstração Online**
- **🌐 Aplicação**: https://acessibilidade-dev-front-end.vercel.app/
- **🔗 API Backend**: https://acessibilidade-dev-back-end.herokuapp.com
- **📖 Storybook**: Documentação de componentes

## 📚 Metodologia & Acessibilidade

### ♿ **Diretrizes WCAG 2.1**
- **Nível AA** de conformidade
- **Navegação por teclado** 100% funcional
- **Screen readers** totalmente compatível
- **Alto contraste** em todos os elementos
- **Textos alternativos** em imagens e ícones

### 🧪 **Testes & Qualidade**
- **Lighthouse**: Score 90+ em acessibilidade
- **axe-core**: Validação automática de a11y
- **Manual testing**: Testes com usuários PcD
- **Cross-browser**: Compatibilidade garantida

## 📄 Status & Contribuições

> ✅ **Projeto Finalizado - TCC Aprovado**  
> 🎨 **Interface Inclusiva Premiada**  
> 📱 **Performance Otimizada**  
> ♿ **100% Acessível (WCAG 2.1 AA)**

---

<p align="center">
  <strong>🎓 FATEC - Tecnólogo em Análise e Desenvolvimento de Sistemas</strong><br>
  <em>Design inclusivo e tecnologia a serviço da acessibilidade</em>
</p>

<p align="center">
  <a href="https://github.com/mdaniliauskas">
    <img src="https://img.shields.io/badge/Portfólio%20GitHub-100000?style=flat-square&logo=github&logoColor=white" alt="Portfólio GitHub">
  </a>
  <a href="mailto:marcelo.daniliauskas@gmail.com">
    <img src="https://img.shields.io/badge/E--mail-D14836?style=flat-square&logo=gmail&logoColor=white" alt="E-mail">
  </a>
  <a href="https://www.linkedin.com/in/mdaniliauskas">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
</p>
