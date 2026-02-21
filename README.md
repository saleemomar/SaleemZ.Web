# Nearby Explorer

A mobile application for discovering nearby points of interest using GPS location and OpenStreetMap data.

## Features

- 🗺️ Real-time location detection using device GPS
- 🔍 Search for any location worldwide
- 📍 Discover nearby restaurants, cafes, hotels, and more
- ⭐ Save favorite places
- 🎯 Filter by category and distance
- 📱 Native mobile app (Android) using Capacitor

## Technologies

- **Frontend:** React 18 with TypeScript
- **Mobile:** Capacitor 8
- **UI Framework:** shadcn/ui + Tailwind CSS
- **API:** OpenStreetMap Overpass API
- **Build Tool:** Vite

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- (For Android) Android Studio

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:5173/`

### Building for Android
```bash
# Build web app
npm run build

# Sync to Capacitor
npx cap sync

# Open in Android Studio
npx cap open android
```

## Project Structure
```
src/
├── components/     # UI components
├── hooks/          # Custom React hooks
├── pages/          # Main pages
├── services/       # API services
└── types/          # TypeScript types
```

## Features Implementation

### Location Search
Users can search for any city or address worldwide using the Nominatim geocoding API.

### Favorites System
Favorites are stored locally using localStorage and persist across sessions.

### Multi-endpoint API Fallback
Implements a fallback system across three Overpass API endpoints for high reliability.

## Academic Project

Developed as part of "Webanwendungen" course  
Winter Semester 2025/26

## 🙏 Acknowledgments

- OpenStreetMap contributors for POI data
- shadcn/ui for the component library
- React, TypeScript, and Capacitor communities
- Initial project scaffolding assisted by AI tools

**Team:**
- Saleem Omar saleem.omar@hs-osnabrueck.de
- Zaid Shawakfeh zaid.shawakfeh@hs-osnabrueck.de

## License

This project was developed for educational purposes.