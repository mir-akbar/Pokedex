# Pokedex Application

A full-stack Pokedex application that allows users to search for Pokemon and view detailed information. The application features a robust backend with Redis caching for performance and a modern, responsive frontend.

## Features

- **Search**: Search for any Pokemon by name.
- **Rich UI**: Displays Pokemon images, types, stats, and abilities in a beautifully designed card.
- **Caching**: Backend caches PokeAPI responses in Redis for 1 hour to reduce latency and API calls.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Graceful Degradation**: Backend continues to function (without caching) if Redis is unavailable.

## Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: TailwindCSS
- **UI Library**: shadcn/ui
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Caching**: Redis
- **External API**: PokeAPI

## Prerequisites

- Node.js (v14+ recommended)
- Redis (Optional, but recommended for caching features)

## Installation & Running

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Start the backend server:

```bash
npm start
```
*The server runs on http://localhost:3000*

### 2. Frontend Setup

Open a new terminal, navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```
*The application will be available at http://localhost:5173*

## Project Structure

```
pokedex/
├── backend/
│   ├── server.js       # Express server with Redis caching logic
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/ # UI components (PokemonCard, etc.)
    │   ├── lib/        # API utilities
    │   └── App.jsx     # Main application logic
    └── package.json
```

## API Endpoints

### `GET /api/pokemon/:name`
Fetches Pokemon details.
- **Params**: `name` (string) - Name of the Pokemon.
- **Response**: JSON object containing Pokemon data and source (`cache` or `api`).
