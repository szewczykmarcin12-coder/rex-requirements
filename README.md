# Re(x)quirements

System zarządzania dokumentami dla Rex Concepts z pełnym backendem.

## ✨ Funkcje

- **System logowania** z dwoma poziomami uprawnień (admin/user)
- **Upload plików PDF** na serwer (tylko admin)
- **Podgląd PDF** wbudowany w aplikację
- **Pobieranie dokumentów**
- **Persystencja danych** na serwerze (pliki + struktura katalogów)
- **Zarządzanie folderami** - tworzenie, edycja, usuwanie (admin)
- **Wyszukiwarka** dokumentów

## 🚀 Demo

- **Admin:** login `admin`, hasło `admin` - pełna edycja, upload plików
- **User:** login `user`, hasło `user` - tylko przeglądanie

## 📦 Instalacja lokalna

```bash
# Zainstaluj zależności
npm install

# Uruchom w trybie deweloperskim (frontend + backend)
npm run dev
```

Frontend: `http://localhost:5173`
Backend API: `http://localhost:3001`

## 🌐 Deploy na Railway.app (ZALECANE)

Railway obsługuje aplikacje Node.js z backendem. To najłatwiejsza opcja.

### Krok 1: Utwórz konto na Railway
1. Wejdź na [railway.app](https://railway.app)
2. Zarejestruj się przez GitHub

### Krok 2: Nowy projekt
1. Kliknij "New Project"
2. Wybierz "Deploy from GitHub repo"
3. Wybierz repozytorium `rex-requirements`

### Krok 3: Konfiguracja
Railway automatycznie wykryje Node.js. Dodaj zmienne:
- `PORT` = `3001` (lub zostaw domyślne)

### Krok 4: Deploy
Kliknij "Deploy" - Railway zbuduje i uruchomi aplikację.

---

## 🌐 Deploy na Render.com (alternatywa)

### Krok 1: Utwórz konto
1. Wejdź na [render.com](https://render.com)
2. Zarejestruj się przez GitHub

### Krok 2: Nowy Web Service
1. Kliknij "New" → "Web Service"
2. Połącz repozytorium GitHub

### Krok 3: Konfiguracja
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

---

## 🌐 Deploy na Vercel + Railway (zaawansowane)

Jeśli chcesz użyć Vercel dla frontendu:

1. **Backend na Railway** - deploy serwera
2. **Frontend na Vercel** - zmień `API_URL` w `src/App.jsx` na URL backendu z Railway

---

## 📁 Struktura projektu

```
rex-requirements/
├── public/
│   └── favicon.ico        # Logo Rex Concepts
├── server/
│   └── index.js           # Serwer Express
├── src/
│   ├── App.jsx            # Główny komponent React
│   ├── main.jsx           # Punkt wejścia
│   └── index.css          # Style
├── data/                  # Dane katalogu (tworzone automatycznie)
├── uploads/               # Przesłane pliki PDF (tworzone automatycznie)
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🛠️ API Endpoints

| Metoda | Endpoint | Opis |
|--------|----------|------|
| POST | `/api/login` | Logowanie |
| GET | `/api/catalog` | Pobierz strukturę katalogów |
| POST | `/api/catalog/:section` | Dodaj element (z upload PDF) |
| PUT | `/api/catalog/:section/:id` | Edytuj element |
| DELETE | `/api/catalog/:section/:id` | Usuń element |
| GET | `/api/files/:filename` | Pobierz plik PDF |
| POST | `/api/reset` | Resetuj dane |

## 📄 Licencja

© 2025 Rex Concepts. Wszystkie prawa zastrzeżone.
