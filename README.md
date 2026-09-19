# 🇧🇷 SolidSign API - Front-end de Exemplo: Assinatura CMS/CAdES em Nuvem/HSM (React)

Este projeto é a contrapartida visual do back-end [`exemplo-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-integracao-cms-cloud). Reaproveita a lógica de campos e parâmetros da tela **Assinar CMS (Nuvem/HSM)** do Portal SolidSign, simplificada: sem login, sem i18n e sem co-assinatura.

## Como funciona

Este front-end fala com o back-end de exemplo local (`POST /api/cms/sign/form`, CORS liberado), que repassa `authorization`/`baseUrl`/`cloudCredentials`, assina, baixa os `.p7s` resultantes e devolve um único `.zip` pronto pra download.

## Pré-requisitos

1. Rode o back-end [`exemplo-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-integracao-cms-cloud) localmente (`mvn spring-boot:run`, porta padrão `8080`).
2. Tenha um token JWT válido e as credenciais do seu provedor de HSM/nuvem (URL, token de acesso e UUID do certificado).

## Rodando

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`, preencha o formulário e assine.

---

# 🇬🇧 SolidSign API - Example Front-end: Cloud/HSM CMS/CAdES Signing (React)

This project is the visual counterpart to the [`exemplo-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-integracao-cms-cloud) backend. It reuses the field logic from the Portal SolidSign **Sign CMS (Cloud/HSM)** screen, simplified: no login, no i18n and no co-signing.

## How it works

This front-end talks to the local example backend (`POST /api/cms/sign/form`, CORS enabled), which forwards `authorization`/`baseUrl`/`cloudCredentials`, signs, downloads the resulting `.p7s` files and returns a single ready-to-download `.zip`.

## Prerequisites

1. Run the [`exemplo-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-integracao-cms-cloud) backend locally (`mvn spring-boot:run`, default port `8080`).
2. Have a valid JWT token and your cloud/HSM provider credentials (URL, access token and certificate UUID).

## Running

```bash
npm install
npm run dev
```

Open `http://localhost:5173`, fill in the form and sign.
