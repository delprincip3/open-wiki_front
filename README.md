# Open Wiki

Open Wiki è un'applicazione web per la gestione e la consultazione di articoli Wikipedia, con funzionalità di autenticazione e salvataggio degli articoli preferiti.

## 🚀 Caratteristiche Principali

- 👤 Autenticazione utenti (login/registrazione)
- 🔍 Ricerca articoli Wikipedia
- 📚 Salvataggio articoli preferiti
- 📝 Modifica articoli salvati
- 📱 Interfaccia responsive
- 🌙 Articolo del giorno
- 🔐 Gestione profilo utente

## ⚠️ Importante: Dipendenze Backend

Questa è solo la parte frontend dell'applicazione. Per il funzionamento completo sono necessari:

1. **Java Middleware** - Per la gestione degli articoli:  
   [@delprincip3/open-wiki_Java-middleware](https://github.com/delprincip3/open-wiki_Java-middleware.git)

2. **Flask Authentication Service** - Per l'autenticazione:  
   [@delprincip3/open-wiki_autentication-signup](https://github.com/delprincip3/open-wiki_autentication-signup.git)

## 🛠️ Tecnologie Utilizzate

- React + TypeScript
- Tailwind CSS
- Shadcn/ui
- Axios
- React Router
- SweetAlert2

## 🚀 Setup

1. Clona il repository:
```bash
git clone <repository-url>
```

2. Installa le dipendenze:
```bash
npm install
```

3. Configura il file `.env`:
```env
VITE_AUTH_API_URL=<url-auth-service>
VITE_ARTICLES_API_URL=<url-java-middleware>
```

4. Avvia l'applicazione in modalità sviluppo:
```bash
npm run dev
```

## 🔧 Configurazione Backend

### Java Middleware
1. Clona il repository del middleware
2. Segui le istruzioni nel README del middleware
3. Assicurati che il servizio sia in esecuzione sulla porta configurata

### Authentication Service
1. Clona il repository del servizio di autenticazione
2. Segui le istruzioni nel README del servizio
3. Verifica che il servizio sia attivo e raggiungibile

## 🌐 Struttura del Progetto

```
src/
├── components/     # Componenti riutilizzabili
├── contexts/       # Context API
├── pages/         # Pagine dell'applicazione
├── services/      # Servizi API
├── types/         # Definizioni TypeScript
└── utils/         # Utility functions
```

## 📝 Note

- L'applicazione è ancora in fase di sviluppo
- Alcune funzionalità potrebbero non essere completamente implementate
- È necessario avere entrambi i backend attivi per il funzionamento completo

## 👥 Contributi

I contributi sono benvenuti! Per modifiche importanti, apri prima una issue per discutere le modifiche proposte.

## 📄 Licenza

[MIT](LICENSE) 