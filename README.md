# React Weather Forecast App

A simple React + TypeScript & Material UI app, displaying a 5-day weather forecast with hourly drill-down, using OpenWeatherMap API.

## Features

* Geolocation-based forecast
* City search
* 5-day forecast with hourly details
* Light, readable UI
* Loading skeletons
* Fully type-safe code
* Unit tests for data mapping

## Setup

1. Clone repository:

```bash
git clone <repo-url>
cd <repo>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root with your OpenWeatherMap API key:

```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

4. Run the app locally:

```bash
npm run dev
```

5. Run tests:

```bash
npm run test
```

## Folder Structure

```
src/
├─ components/          # UI components (DailyForecast, HourlyForecast)
├─ hooks/               # Custom hooks (useForecast)
├─ utils/               # Data normalization / mapping
├─ __tests__/           # Unit tests
├─ App.tsx
├─ main.tsx
.env
vite.config.ts
```

## Notes

* API responses are normalized in `utils/forecastMapper.ts`.
* TypeScript `verbatimModuleSyntax` is enabled; all types use `import type`.
* Skeletons display while fetching data for a better UX.
* Node test environment used for utils tests to avoid jsdom/ESM conflicts.
