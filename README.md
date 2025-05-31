# 🌤 Previsão do tempo - Weather App

App de previsão do tempo desenvolvida como teste técnico, com frontend em **React + Vite + Redux** e backend em **Node.js + Express + MongoDB**, seguindo os requisitos definidos.

## ✅ Funcionalidades implementadas

- 🔍 Pesquisa de cidades com sugestão e autocomplete (Google Places).
- 📍 Suporte à localização atual (via navegador).
- 🌤 Exibição do clima atual e previsão para a semana (OpenWeather).
- 💾 Histórico de buscas armazenado no MongoDB.
- 📦 Cache no backend utilizando `NodeCache` nos dados climáticos.
- 🔁 Atualização automática em segundo plano com um `WorkManager` customizado.
- 🔐 Autenticação com JWT (cadastro e login).
- ⚙️ Separação clara entre frontend (`client/`) e backend (`server/`).
- 🚀 Deploy completo com frontend na **Vercel** e backend na **Render**.

---

## 🌐 Link para testar online

> Acesse a aplicação no Vercel:
[https://weather-forecast-platform.vercel.app](https://weather-forecast-platform.vercel.app)

---

## 🛠️ Como rodar localmente

### 🔧 1. Clone o projeto

```bash
git clone https://github.com/lucasbachega/weather-forecast-platform.git
cd weather-forecast-platform
```

### 🔧 2. Instale as dependências

```bash
npm install
cd ../server && npm install
```

### 🔧 3. Configure as variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `server` com base no exemplo abaixo:

```env
PORT=9100
MONGO_URI=mongodb+srv://uri_seu_banco
JWT_SECRET=seu_segredo
WEATHER_API_KEY=chave_api_OpenWeather
GOOGLE_API_KEY=chave_api_GooglePlaces
```


### 🔧 4. Inicie o backend

```bash
cd server
npm run dev
```

### 🔧 5. Inicie o frontend (Raiz do projeto)

```bash
npm run dev
```

---

## 📁 Estrutura do projeto

```
/
├── client/       # Frontend (Vite + React + Redux)
├── server/       # Backend (Express + MongoDB + JWT)
├── public/       # Imagens estáticas (ícones de clima, etc.)\

```

---

## 📌 Observações finais

- A API segue padrão RESTful com rotas centralizadas sob `/api`, utilizando autenticação com **JWT**.
- Estou ciente de que existem abordagens mais seguras para autenticação (como o uso de cookies `HttpOnly`, rotas protegidas por middleware avançado, e refresh tokens), bem como técnicas mais robustas para o armazenamento de tokens. Para este projeto, priorizei a implementação completa e funcional da lógica central do teste, cobrindo o ciclo completo de autenticação, consumo de API externa e persistência.
- A separação entre frontend e backend foi mantida de forma clara, simulando um ambiente real de produção com deploy separado (Vercel + Render).
- Em contextos, consideraria também otimizações como cache local de previsões e outras melhorias mais refinadas.
- Este é um projeto em que, normalmente, eu não utilizaria Redux, mas aproveitei a oportunidade para demonstrar o uso do Redux Toolkit com `createAsyncThunk` e gerenciamento de estado global de forma estruturada.
- Além disso, em outro cenário, eu também consideraria uma arquitetura baseada em Next.js, permitindo que o usuário utilize a aplicação sem estar logado inicialmente, e lidando com o fluxo de autenticação apenas no momento em que ele realiza ações protegidas.

🗓 Entregue em: **May 31, 2025**

---

Desenvolvido com 💙 por Lucas Bachega
