# GambitForge Web

Vue 3 + Vite frontend for GambitForge, a chess operations platform for tournaments, coaching, live games, calendars, and platform content.

## Requirements

- Node.js 20 or newer
- npm
- GambitForge Laravel API running locally or deployed

## Fresh Clone Setup

```bash
git clone <repo-url>
cd gambitforge-web
npm ci
cp .env.example .env
npm run dev
```

On PowerShell, copy the env file with:

```powershell
Copy-Item .env.example .env
```

If PowerShell blocks the `npm` script shim, use `npm.cmd` instead:

```powershell
npm.cmd ci
npm.cmd run dev
```

The local app runs on the Vite URL printed in the terminal, usually `http://127.0.0.1:5173/`.

## Environment Variables

Create `.env` from `.env.example` and adjust values for your environment.

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_REVERB_APP_KEY=
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http
```

For production deployments, set `VITE_API_BASE_URL` to the deployed Laravel API URL, including `/api`.

Example:

```bash
VITE_API_BASE_URL=https://api.gambitforge.com/api
```

Realtime private channel auth is derived from `VITE_API_BASE_URL`, so the frontend will call:

```bash
https://api.gambitforge.com/broadcasting/auth
```

## Production Build

```bash
npm run build
npm run preview
```

Deploy the generated `dist` directory to Vercel or another static hosting provider. In Vercel, add the same `VITE_*` variables in Project Settings before building.

## Git Safety

Do not commit local environment files.

- Vue local env: `.env`
- Laravel backend local env: `../gambitforge-api/.env`

Only `.env.example` should be committed for each project.

## Routes

- `/`
- `/login`
- `/register`
- `/dashboard`
- `/admin`
- `/games`
- `/games/:id`
- `/tournaments`
- `/tournaments/:id`
- `/coaching`
- `/calendar`
- `/blog`
- `/:pathMatch(.*)*` 404 fallback
