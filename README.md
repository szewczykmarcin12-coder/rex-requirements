# Re(x)quirements

System zarządzania dokumentami dla Rex Concepts.

## 🚀 Demo

- **Admin:** login `admin`, hasło `admin` - pełna edycja, dodawanie plików PDF
- **User:** login `user`, hasło `user` - tylko przeglądanie

## ✨ Funkcje

- **System logowania** z dwoma poziomami uprawnień (admin/user)
- **Upload plików PDF** (tylko admin)
- **Podgląd PDF** wbudowany w aplikację
- **Pobieranie dokumentów** 
- **Persystencja danych** - zmiany zapisywane w localStorage
- **Zarządzanie folderami** - tworzenie, edycja, usuwanie (admin)
- **Wyszukiwarka** dokumentów

## 📦 Instalacja lokalna

```bash
# Klonuj repozytorium
git clone https://github.com/TWOJ-USERNAME/rex-requirements.git
cd rex-requirements

# Zainstaluj zależności
npm install

# Uruchom lokalnie
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:5173`

## 🌐 Deploy na Vercel

### Metoda 1: Przez GitHub (zalecana)

1. Wrzuć kod na GitHub
2. Wejdź na [vercel.com](https://vercel.com)
3. Kliknij "Add New Project"
4. Zaimportuj repozytorium z GitHub
5. Vercel automatycznie wykryje Vite i skonfiguruje build
6. Kliknij "Deploy"

### Metoda 2: Przez Vercel CLI

```bash
# Zainstaluj Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## 🛠️ Technologie

- React 18
- Vite
- Tailwind CSS
- Lucide React (ikony)

## 📁 Struktura projektu

```
rex-requirements/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Główny komponent
│   ├── main.jsx         # Punkt wejścia
│   └── index.css        # Style globalne
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 👥 Role użytkowników

### Administrator
- Dodawanie nowych folderów i plików
- Edycja nazw elementów
- Usuwanie elementów

### Użytkownik
- Przeglądanie dokumentów
- Nawigacja po folderach

## 📄 Licencja

© 2025 Rex Concepts. Wszystkie prawa zastrzeżone.
