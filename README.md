# 📧 Mailer API

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-0A9EDC?style=for-the-badge&logo=gmail&logoColor=white)
![Sentry](https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white)

Um serviço de API para envio de e-mails construído com NestJS, TypeScript e Nodemailer, com monitoramento de erros via Sentry.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Monitoramento de Erros](#monitoramento-de-erros)
- [Desenvolvimento](#desenvolvimento)
- [Implantação](#implantação)
- [Licença](#licença)

## 🔍 Visão Geral

Este serviço fornece uma API RESTful para envio de e-mails, ideal para formulários de contato, notificações e comunicações automatizadas. Construído com NestJS e TypeScript, oferece uma solução robusta e tipada para gerenciamento de e-mails com integração Sentry para monitoramento de erros em produção.

## ✨ Funcionalidades

- Envio de e-mails via SMTP
- Configuração flexível via variáveis de ambiente
- Formatação personalizada de remetente e assunto
- Suporte a resposta automática (reply-to)
- Monitoramento e rastreamento de erros com Sentry
- Implantação simplificada com Vercel

## 🛠️ Tecnologias

- **Framework**: [NestJS](https://nestjs.com/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Biblioteca de E-mail**: [Nodemailer](https://nodemailer.com/)
- **Monitoramento de Erros**: [Sentry](https://sentry.io/)
- **Configuração**: [@nestjs/config](https://docs.nestjs.com/techniques/configuration)
- **Implantação**: [Vercel](https://vercel.com/)

## 📋 Requisitos

- Node.js (v16 ou superior)
- npm ou yarn
- Servidor SMTP ou serviço de e-mail (Gmail, SendGrid, etc.)
- Conta Sentry (opcional, para monitoramento de erros)

## 🚀 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/h4rd1ideveloper/mailer.git
   cd mailer
   ```

2. Instale as dependências:
   ```bash
   # Com npm
   npm install

   # Com yarn
   yarn install
   ```

3. Configure as variáveis de ambiente (veja a seção [Configuração](#configuração)).

4. Execute o projeto:
   ```bash
   # Modo de desenvolvimento
   npm run start:dev
   # ou
   yarn start:dev

   # Modo de produção
   npm run build && npm run start:prod
   # ou
   yarn build && yarn start:prod
   ```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configuração do servidor SMTP
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=seu-email@example.com
SMTP_PASS=sua-senha-segura

# Configuração do Sentry (opcional)
SENTRY_DSN=https://your-sentry-dsn.ingest.sentry.io/project-id
```

### Configuração do SMTP

Você pode usar qualquer provedor SMTP, como:
- Gmail
- SendGrid
- Mailgun
- Amazon SES
- Servidor SMTP próprio

### Configuração do Sentry

Para habilitar o monitoramento de erros com Sentry:

1. Crie uma conta em [sentry.io](https://sentry.io/)
2. Crie um novo projeto para JavaScript/Node.js
3. Copie o DSN fornecido para a variável `SENTRY_DSN` no arquivo `.env`

## 📝 Uso

### Endpoints

#### Enviar E-mail

```
POST /email/send
```

**Corpo da Requisição:**
```json
{
  "name": "Nome do Remetente",
  "email": "email-do-remetente@example.com",
  "subject": "Assunto do E-mail",
  "message": "Conteúdo da mensagem que será enviada."
}
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

#### Testar Monitoramento Sentry

```
GET /email/debug-sentry
```

Este endpoint propositalmente lança um erro para testar a integração com o Sentry.

### Exemplo de Uso com cURL

```bash
curl -X POST http://localhost:3000/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "subject": "Teste de API",
    "message": "Esta é uma mensagem de teste enviada via API."
  }'
```

### Exemplo de Uso com JavaScript/Fetch

```javascript
fetch('http://localhost:3000/email/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'João Silva',
    email: 'joao@example.com',
    subject: 'Teste de API',
    message: 'Esta é uma mensagem de teste enviada via API.'
  }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Erro:', error));
```

## 🔍 Monitoramento de Erros

O projeto utiliza Sentry para monitoramento e rastreamento de erros em tempo real. Quando configurado corretamente:

1. Todos os erros não tratados serão automaticamente capturados e enviados ao Sentry
2. Você receberá notificações de erros em tempo real
3. Poderá visualizar stack traces completos, informações do ambiente e contexto do erro
4. Terá acesso a métricas de desempenho e uso

Para testar a integração, acesse o endpoint `/email/debug-sentry` que propositalmente lança um erro.

## 💻 Desenvolvimento

### Estrutura do Projeto

```
src/
├── email/                # Módulo de e-mail
│   ├── dto/              # Objetos de transferência de dados
│   │   └── create-email.dto.ts
│   ├── email.controller.ts
│   ├── email.module.ts
│   └── email.service.ts
├── app.module.ts         # Módulo principal da aplicação
├── instrument.ts         # Configuração do Sentry
└── main.ts               # Ponto de entrada da aplicação
```

### Comandos Disponíveis

```bash
# Desenvolvimento
npm run start:dev     # Inicia o servidor em modo de desenvolvimento com hot-reload

# Compilação
npm run build         # Compila o projeto para produção

# Produção
npm run start:prod    # Executa a versão compilada

# Testes
npm run test          # Executa testes unitários
npm run test:e2e      # Executa testes end-to-end
npm run test:cov      # Gera relatório de cobertura de testes

# Linting e Formatação
npm run lint          # Executa o ESLint
npm run format        # Formata o código com Prettier

# Sentry
npm run sentry:sourcemaps  # Envia sourcemaps para o Sentry
```

## 🚀 Implantação

### Vercel

O projeto inclui um arquivo `vercel.json` para facilitar a implantação na Vercel:

1. Instale a CLI da Vercel:
   ```bash
   npm i -g vercel
   ```

2. Faça login na sua conta Vercel:
   ```bash
   vercel login
   ```

3. Implante o projeto:
   ```bash
   vercel
   ```

4. Para implantação em produção:
   ```bash
   vercel --prod
   ```

Não se esqueça de configurar as variáveis de ambiente na plataforma Vercel.

### Outras Plataformas

O projeto pode ser implantado em qualquer plataforma que suporte Node.js:

- Heroku
- AWS Elastic Beanstalk
- Google Cloud Run
- DigitalOcean App Platform
- Render

## 📄 Licença

Este projeto está licenciado sob a licença [UNLICENSED](LICENSE).

---

Desenvolvido por [Yan Policarpo](https://github.com/h4rd1ideveloper)
