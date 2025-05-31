# 🌤 Weather App

App de previsão do tempo desenvolvida como teste técnico, com frontend em **React + Vite + Redux** e backend em **Node.js + Express + MongoDB**, seguindo os requisitos definidos.

## ✅ Funcionalidades implementadas

- 🔍 Pesquisa de cidades com sugestão e autocomplete.
- 📍 Suporte à localização atual (via navegador).
- 🌤 Exibição do clima atual e previsão para a semana.
- 💾 Histórico de buscas armazenado no MongoDB.
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
cd client && npm install
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
npm install
npm run dev
```

### 🔧 5. Inicie o frontend (Raiz do projeto)

```bash
npm install
npm run dev
```

---

## 📁 Estrutura do projeto

```
/
├── client/       # Frontend (Vite + React + Redux)
├── server/       # Backend (Express + MongoDB + JWT)
├── public/       # Imagens estáticas (ícones de clima, etc.)
├── .env          # Variáveis de ambiente unificadas
```

---

## 📌 Observações finais

- A aplicação utiliza Vite com suporte à importação de imagens dinâmicas via `public/`.
- O `WorkManager` atualiza previsões em segundo plano com base em `selectedQuery`.
- Os endpoints da API seguem padrão RESTful em `/api`.

🗓 Entregue em: **May 31, 2025**

---

Desenvolvido com 💙 por Lucas Bachega
