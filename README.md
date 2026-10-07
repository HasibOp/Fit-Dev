# FitLog — Workout Library

A dark, no-nonsense gym companion designed to help you pick a lift, lock it into today's plan, and watch the week's work add up.

## 🚀 Technologies Used

- **Next.js 15** (App Router, Server Components, Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (State management with localStorage persistence)
- **React Hot Toast** (Notifications)
- **Next/Font** (Oswald for display typography)

## ✨ Key Features

1. **The Library Grid**: A fully responsive 3x4 grid displaying workouts fetched dynamically from the FitLog API, complete with search and sort functionality (by duration, calories, or rating).
2. **Comprehensive Workout Details**: A dedicated dynamic route for each workout showcasing a two-column layout with specifications (equipment, sets, reps, etc.) and step-by-step instructions.
3. **Today's Plan & Saved Lists**: Users can add up to 5 workouts to their daily plan or save them for later. State is managed globally via Zustand and persists across page reloads using localStorage.
4. **Live Metrics Dashboard**: The "My Plan" page dynamically calculates total exercises, estimated minutes, and calories burned based on the current active plan.
5. **Polished UX**: Features custom loading states, a custom 404 page, toast notifications for all user actions, and a strict dark-mode aesthetic.

## 🛠️ Getting Started Locally

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser.
