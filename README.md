# 🇧🇷 SolidSign API - Front-end de Exemplo: Assinatura CMS com HSM/Nuvem (React)

## Como funciona

Este front-end chama `POST /api/cms/sign/form` (`http://localhost:8080` por padrão) no back-end de exemplo, enviando as credenciais do HSM/nuvem (`hsmUrl`, `hsmToken`, `uuidCert`). O back-end assina o(s) documento(s) e devolve um `.zip`.

## Requisitos

Rode **um** destes back-ends de exemplo localmente (todos implementam o mesmo endpoint de formulário e a mesma porta padrão usada abaixo):

- **Java**: [`exemplo-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-integracao-cms-cloud)
- **C#**: [`exemplo-csharp-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-csharp-integracao-cms-cloud)
- **TypeScript**: [`exemplo-typescript-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-typescript-integracao-cms-cloud)
- **Python**: [`exemplo-python-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-python-integracao-cms-cloud)
- **PHP**: [`exemplo-php-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-php-integracao-cms-cloud)
- **Node.js**: [`exemplo-nodejs-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-nodejs-integracao-cms-cloud)
- **JavaScript**: [`exemplo-javascript-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-javascript-integracao-cms-cloud)

- Um token JWT válido (`POST /solidsign/auth/token`)

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`, preencha o formulário e envie.

## Variáveis do formulário

| Campo | Significado | Default |
|---|---|---|
| `baseUrl` | URL base da SolidSign API | `https://www.solidsign.com.br` |
| `authorization` | Token JWT (Bearer) | (vazio) |
| `hsmUrl / hsmToken / uuidCert` | Credenciais do HSM/PSC de nuvem | (vazio) |
| `documents` | Documento(s) a assinar | (vazio) |
| `profile` | Perfil de assinatura PBAD/ETSI | `ADRB` |
| `hashAlgorithm` | Algoritmo de hash | `SHA256` |
| `signaturePackaging` | Empacotamento CMS | `ATTACHED` |

---

# 🇬🇧 SolidSign API - Example Front-end: CMS Signing with HSM/Cloud (React)

## How it works

This front-end calls `POST /api/cms/sign/form` (`http://localhost:8080` by default) on the example backend, sending the HSM/cloud credentials (`hsmUrl`, `hsmToken`, `uuidCert`). The backend signs the document(s) and returns a `.zip`.

## Requirements

Run **one** of these example backends locally (all implement the same form endpoint and default port used below):

- **Java**: [`exemplo-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-integracao-cms-cloud)
- **C#**: [`exemplo-csharp-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-csharp-integracao-cms-cloud)
- **TypeScript**: [`exemplo-typescript-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-typescript-integracao-cms-cloud)
- **Python**: [`exemplo-python-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-python-integracao-cms-cloud)
- **PHP**: [`exemplo-php-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-php-integracao-cms-cloud)
- **Node.js**: [`exemplo-nodejs-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-nodejs-integracao-cms-cloud)
- **JavaScript**: [`exemplo-javascript-integracao-cms-cloud`](https://github.com/SolidTechSolutions/exemplo-javascript-integracao-cms-cloud)

- A valid JWT token (`POST /solidsign/auth/token`)

## Running

```bash
npm install
npm run dev
```

Open `http://localhost:5173`, fill in the form and submit.

## Form fields

| Field | Meaning | Default |
|---|---|---|
| `baseUrl` | SolidSign API base URL | `https://www.solidsign.com.br` |
| `authorization` | JWT (Bearer) token | (empty) |
| `hsmUrl / hsmToken / uuidCert` | Cloud HSM/PSC credentials | (empty) |
| `documents` | Document(s) to sign | (empty) |
| `profile` | PBAD/ETSI signature profile | `ADRB` |
| `hashAlgorithm` | Hash algorithm | `SHA256` |
| `signaturePackaging` | CMS packaging | `ATTACHED` |
