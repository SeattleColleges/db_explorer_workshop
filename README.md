# Supabase Database Workshop

A hands-on exercise in designing PostgreSQL schemas and rendering backend data in a full-stack mobile app using **Expo (React Native)**, **NestJS**, and **Supabase**.

---

## What You're Building

A mobile app (Android & iOS) that reads rows from any table in a real PostgreSQL database and displays them on screen. The schema is entirely up to you.

### Your Task

1. Set up a free Supabase project
2. Design and create a table — choose your own column names and data types
3. Insert sample data
4. Connect the backend to your Supabase database
5. Set your table name in `backend/.env`
6. See your data rendered live in the app

---

## How It Works

```
Expo app (React Native)
    │  tap "Load Data"
    │  GET http://<backend-url>/plants
    ▼
NestJS backend (PlantsController → PlantsService)
    │  SELECT * FROM <TABLE_NAME> ORDER BY 1
    ▼
Supabase PostgreSQL
    │  returns rows
    ▼
App renders each row as a card
```

- The backend reads `TABLE_NAME` from `.env` and queries that table dynamically.
- If `DATABASE_URL` or `TABLE_NAME` is missing, the backend returns `{ configured: false }` and the app shows a setup hint.
- All column names and values are rendered dynamically — no hardcoding needed.

---

## Project Structure

```
db_explorer/
├── backend/                  ← NestJS API (runs on port 3001)
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   └── plants/
│   │       ├── plants.module.ts
│   │       ├── plants.controller.ts  ← GET /plants endpoint
│   │       └── plants.service.ts     ← queries the DB
│   ├── .env.example          ← copy this to .env and fill in your values
│   └── .env                  ← your credentials (never committed to git)
└── frontend/                 ← Expo React Native app
    ├── app/
    │   ├── index.tsx         ← main screen
    │   └── _layout.tsx       ← navigation setup
    ├── components/
    │   ├── PlantCard.tsx     ← generic row card
    │   ├── Loading.tsx
    │   └── ErrorState.tsx
    ├── hooks/
    │   └── usePlants.ts      ← state & API calls
    ├── utils/
    │   └── api.ts            ← handles URL differences per platform
    └── .env                  ← EXPO_PUBLIC_API_URL (safe to commit)
```

---

## Prerequisites

| Tool | All platforms | Notes |
|---|---|---|
| Node.js (18+) | Required | [nodejs.org](https://nodejs.org) |
| npm | Comes with Node | — |
| Git | Required | [git-scm.com](https://git-scm.com) |
| VS Code | Recommended | With the **Expo Tools** extension |
| Expo Go app | For physical device testing | Install on your phone from the App Store / Play Store |

**Android emulator (Windows or Mac):**
- Install [Android Studio](https://developer.android.com/studio) → includes the Android emulator
- Create a virtual device via **Device Manager** inside Android Studio

**iOS simulator (Mac only):**
- Install [Xcode](https://developer.apple.com/xcode/) from the Mac App Store
- Open Xcode once to complete the setup

> You only need one of the above. Pick the emulator/simulator that matches your OS, or skip both and use Expo Go on your phone.

---

## Getting Started

### Step 1 — Install dependencies

Open two terminal windows (or two VS Code terminal tabs).

**Terminal 1 — Backend:**

```bash
cd backend
npm install
```

**Terminal 2 — Frontend:**

```bash
cd frontend
npm install
```

---

### Step 2 — Set up Supabase and configure the backend

1. Create a free account at [supabase.com](https://supabase.com) and start a new project.
2. Open the **SQL Editor** in the Supabase dashboard and write a `CREATE TABLE` statement with columns of your choice.
3. Insert some sample rows.
4. Go to **Project Settings → Database** and copy the **Connection String (URI)**.
5. In the `backend/` folder, copy the example env file:

```bash
cd backend
cp .env.example .env
```

6. Open `backend/.env` and fill in your values:

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
TABLE_NAME=your_table_name
```

---

### Step 3 — Run the app

Start both servers, then pick the section below that matches how you want to test.

**Terminal 1 — Backend (all platforms):**

```bash
cd backend
npm run start:dev
```

**Terminal 2 — Frontend (all platforms):**

```bash
cd frontend
npm start
```

You'll see a QR code and a menu of options in the terminal.

---

#### Option A — Windows: Android Emulator

1. Launch an Android emulator from **VS Code** using the Expo Tools extension, or open Android Studio → **Device Manager** → start a virtual device.
2. In the frontend terminal (after `npm start`), press `a`.
3. The app will build and open in the emulator automatically.

> The app automatically routes requests to `10.0.2.2:3001` on Android emulators — this is how Android maps to your PC's localhost. Nothing extra to configure.

---

#### Option B — Mac: iOS Simulator

1. Make sure Xcode is installed and you've opened it at least once.
2. In the frontend terminal (after `npm start`), press `i`.
3. The iOS Simulator launches and the app loads.

> The iOS simulator uses `localhost` directly, so no extra network config needed.

---

#### Option C — Mac: Android Emulator

1. Open Android Studio → **Device Manager** → start a virtual device.
2. In the frontend terminal (after `npm start`), press `a`.
3. Same as Windows — the `10.0.2.2` mapping is handled automatically.

---

#### Option D — Any OS: Expo Go on a Physical Device

This lets you test on a real Android or iOS phone without an emulator. We use tunnels so your phone and computer don't need to be on the same network and you don't need to touch any network settings.

Install **Expo Go** on your phone from the App Store (iOS) or Play Store (Android) before you start.

You will need **three** terminal windows for this option.

**Terminal 1 — Backend** (same as always):

```bash
cd backend
npm run start:dev
```

**Terminal 2 — Backend tunnel** (exposes the backend to the internet temporarily):

```bash
npx localtunnel --port 3001
```

It prints a URL like `https://orange-zebra-42.loca.lt`. Copy it.

> First time running this? Visit that URL in your browser and click the button on the page — this "unlocks" it so API requests can pass through.

**Terminal 3 — Frontend** (update the env, then start in tunnel mode):

Open `frontend/.env` and replace the API URL with the localtunnel URL from above:

```env
EXPO_PUBLIC_API_URL=https://orange-zebra-42.loca.lt
```

Then start the frontend in tunnel mode:

```bash
cd frontend
npx expo start --tunnel
```

**Scan the QR code** with your phone:
- **Android:** Open the Expo Go app → tap **Scan QR code**
- **iOS:** Open the default **Camera app** → point at the QR code → tap the banner to open in Expo Go

Tap **"Load Data"** in the app to test the connection.

> The localtunnel URL changes every time you restart Terminal 2. When that happens, update `frontend/.env` with the new URL and restart the frontend.

> When you're done, revert `frontend/.env` back to `http://localhost:3001` so the emulator options work again.

---

## Lab Questions

After the setup works, reflect on these:

1. What is the difference between `TEXT` and `VARCHAR(n)`? When would you choose each?
2. Why is `NUMERIC` safer than `FLOAT` for storing currency or precise decimal values?
3. What does `NOT NULL` enforce, and when should you omit it?
4. What advantage does `JSONB` have over plain `JSON` in PostgreSQL?
5. What does `gen_random_uuid()` do, and why is a UUID useful as a unique identifier?
6. Why do we use `SELECT *` here, and what are the trade-offs of doing so in production?

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `Cannot connect to backend` | Make sure `npm run start:dev` is running in `backend/` |
| `Database not configured` | Check that `backend/.env` exists with a valid `DATABASE_URL` |
| `relation "..." does not exist` | Make sure `TABLE_NAME` in `.env` exactly matches your table name in Supabase |
| App loads but shows connection error on physical device | Check that the localtunnel URL in `frontend/.env` is current (it changes on restart) and that you visited the URL in a browser to unlock it |
| Android emulator can't reach backend | The emulator should auto-use `10.0.2.2` — confirm the backend is running on port 3001 |
| iOS simulator can't reach backend | Confirm `npm run start:dev` is running and try `http://localhost:3001/plants` in your browser |
| Port 3001 already in use | **Windows:** `netstat -ano \| findstr :3001` then `taskkill /PID <PID> /F` — **Mac:** `lsof -i :3001` then `kill -9 <PID>` |
| Changes not showing after updating `.env` | Stop the server with `Ctrl+C` and restart with `npm run start:dev` (backend) or `npm start` (frontend) |
