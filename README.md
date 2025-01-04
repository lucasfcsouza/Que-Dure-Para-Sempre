# Relógio do Amor - Sistema de Páginas Personalizadas

Sistema web para criação de páginas românticas personalizadas com contador, fotos e músicas.

## Estrutura do Projeto

```
/love-surprise
├── /frontend                 # Interface do usuário
│   ├── /public              # Arquivos estáticos
│   └── /src                 # Código fonte React
├── /backend                 # API e servidor
│   ├── /config             # Configurações
│   ├── /controllers        # Controladores
│   ├── /models            # Modelos do banco de dados
│   ├── /routes            # Rotas da API
│   └── /utils             # Utilitários
└── /admin                  # Painel administrativo
    └── /src               # Código fonte do painel admin
```

## Tecnologias Utilizadas

- Frontend: React.js, TailwindCSS
- Backend: Node.js, Express
- Banco de Dados: MongoDB
- Autenticação: JWT
- Email: NodeMailer
- Upload: Multer + AWS S3
- Pagamentos: Stripe

## Funcionalidades

### Cliente
- Criar página personalizada
- Upload de fotos (máx. 7)
- Seleção de música
- Contador personalizado
- Link único
- Planos (Vitalício/Anual)

### Administrador
- Login seguro
- Gestão de páginas
- Moderação de conteúdo
- Relatórios
- Gestão de pagamentos

## Instalação e Uso

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente
4. Inicie o servidor: `npm start`
