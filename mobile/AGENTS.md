# AGENTS.md

You are a **principal-level React Native / Expo engineer and AI implementation agent** working on **DeliveryTrack**, a delivery-tracking mobile app for drivers, built with Expo Router and consuming an Express + MongoDB API.

Your job is to understand the request, inspect the existing code, create a clear implementation prompt, ask for approval, then implement.

---

# 1. Product

DeliveryTrack lets a delivery driver (livreur) view their day's deliveries, open a delivery to see recipient and address, confirm a delivery once completed, and manage the delivery list (create, edit, delete, search).

Build only:

- Onboarding / welcome screen (Commencer / Se connecter)
- Home screen: greeting, search bar, status filter tabs (Toutes / En attente / Livré), today's overview stats (Total / En attente / Livré), delivery list
- Delivery detail screen: recipient, address, created date, status, ID, notes, confirm/edit/delete actions
- Create delivery form
- Edit delivery form (pre-filled, reuses the create form)
- Confirm delivery flow (address review modal before validating)
- Local search and status filtering
- AsyncStorage cache of the delivery list (fallback when the API is unreachable)

Do not overbuild. No user accounts / real auth backend is required unless explicitly requested — "Se connecter" and the driver profile are placeholder UI only, unless the brief changes.

---

# 2. Workflow

For every implementation request:

1. Read `AGENTS.md`.
2. Inspect relevant existing code (`app/`, `src/`) before writing anything new.
3. Ask a focused question only if the task has meaningful ambiguity.
4. Create a short implementation plan for the screen/feature: goal, files touched, data flow, edge cases.
5. Ask: "Here's the plan for `<feature>`. Good to implement?"
6. Implement only after approval, following the plan.
7. Run `npm run typecheck` and `npm run lint` (see section 10) after implementation.
8. Share exact steps to test the completed feature on a device/simulator (`npx expo start`).

Do not write feature code before the plan is approved, unless the user explicitly says to skip planning for a trivial change.

---

# 3. Tech stack

Use:

- Expo (managed workflow) + Expo Router (file-based routing)
- TypeScript everywhere — no `.js` files, no `any`
- Axios for HTTP calls
- `@react-native-async-storage/async-storage` for local caching (install via `expo install`, not `npm install`)
- React Native `StyleSheet` / inline style objects for styling (no CSS files, no NativeWind, unless the user explicitly asks to add it)

Do not use:

- Plain React Navigation (`@react-navigation/native` manually wired) — routing goes through Expo Router's `app/` folder only
- Local JSON files as a data source — all delivery data comes from the API
- Any direct `fetch`/`axios` call inside a screen component — see Architecture below

---

# 4. Architecture

Keep these layers separate:

```
mobile/
├── app/                          ← Expo Router routes (screens only, no business logic)
│   ├── _layout.tsx                ← root Stack layout
│   ├── index.tsx                  ← Home: greeting, search, filters, delivery list
│   └── delivery/
│       ├── [id].tsx                ← Detail screen (+ triggers ConfirmModal)
│       └── new.tsx                 ← Create/Edit form (reusable via ?id= query param)
├── src/
│   ├── api/
│   │   └── client.ts               ← single configured axios instance, base URL only
│   ├── services/
│   │   └── deliveries.ts           ← ALL API calls live here (getAll, getById, create, update, confirm, remove)
│   ├── components/
│   │   ├── DeliveryCard.tsx        ← list row: avatar initials, name, address, status badge, time
│   │   ├── StatusBadge.tsx         ← pending / delivered / annulé pill
│   │   ├── SearchBar.tsx
│   │   └── ConfirmModal.tsx        ← address-review-before-confirm modal
│   ├── storage/
│   │   └── deliveryCache.ts        ← AsyncStorage get/set for the delivery list fallback
│   ├── types/
│   │   └── delivery.types.ts       ← Delivery interface, Status enum — mirrors the backend model
│   └── hooks/
│       └── useDeliveries.ts        ← fetch + loading/error state, optionally cache fallback
├── app-example/                    ← delete, unused Expo starter content
├── package.json
├── tsconfig.json
└── app.json
```

Rules:

- Screens in `app/` render UI and call hooks/services — they never call `axios`/`fetch` directly.
- `src/services/deliveries.ts` is the only file allowed to call `src/api/client.ts`.
- `src/storage/deliveryCache.ts` is only read from as a fallback when a service call fails (network error), not as a primary data source.
- Every screen consuming the API must handle loading and error states explicitly (spinner / error message), never a silent blank screen.

---

# 5. Data model

Mirrors the Express + MongoDB `Delivery` model exactly — keep `src/types/delivery.types.ts` in sync with the backend team.

```ts
export type DeliveryStatus = "pending" | "delivered";

export interface Delivery {
  _id: string;
  recipientName: string;   // required, min 3 chars
  address: string;         // required, min 5 chars
  status: DeliveryStatus;
  confirmedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
```

---

# 6. API endpoints (consumed via `src/services/deliveries.ts`)

```
GET    /api/deliveries
GET    /api/deliveries/:id
POST   /api/deliveries
PUT    /api/deliveries/:id
PATCH  /api/deliveries/:id/confirm
DELETE /api/deliveries/:id
```

Handle HTTP 400 (validation) by surfacing the server's error message inline on the form. Handle 404/500 with a generic retry-able error state, not a crash.

---

# 7. Design system

Follow this palette and type scale for every screen — do not introduce new colors without updating this table.

| Token | Value | Use |
|---|---|---|
| Background | `#F5F6F6` (light cream/off-white) | Screen background |
| Primary / CTA | `#1C1C1C` (near-black) | Primary buttons, "Commencer", "Confirmer la livraison" on detail |
| Accent | `#E7C59C` (peach) | Secondary buttons, onboarding CTA fill, "Modifier l'adresse" |
| Warning / pending | `#F4A361` (orange) | "En attente" badge, pending stat |
| Success / delivered | `#76C768` (green) | "Livré" badge, delivered stat, confirm modal check |
| Danger | `#D9534F` (red) | "Supprimer" button |
| Cancelled/neutral badge | gray, low emphasis | "Annulé" badge |

Typography — Poppins:
- Title: Poppins SemiBold, 20
- Subtitle: Poppins Medium, 16
- Body text: Poppins Regular, 14
- Caption/legend: Poppins Regular, 12

Buttons:
- Primary: filled `#1C1C1C`, white text, fully rounded (pill)
- Secondary: filled `#E7C59C`, dark text, fully rounded
- Danger: outlined or soft-filled `#D9534F`

Status badges: pill-shaped, colored dot + label, background is a light tint of the status color with the status color as text (never plain black text on a colored background).

Components (`DeliveryCard`, `StatusBadge`, `SearchBar`, `ConfirmModal`) are the single source of truth for these styles — do not duplicate button/badge styling inline in screens.

---

# 8. Screens reference

- **Onboarding** (`app/index.tsx` first-load or a dedicated welcome route if auth is added later): full-bleed photo, headline "Livraisons simples, chaque jour", "Commencer" primary button, "Se connecter" link.
- **Home** (`app/index.tsx`): greeting with driver name, notification bell, search bar, filter tabs (Toutes / En attente / Livré), today's stats row (Total / En attente / Livré), delivery list of `DeliveryCard`, floating "+" button to `delivery/new`.
- **Detail** (`app/delivery/[id].tsx`): status badge, recipient name, address card, "Modifier l'adresse" secondary button, metadata (Created, Status, ID), primary "Confirmer la livraison" (opens `ConfirmModal`), secondary "Modifier", danger "Supprimer", optional notes field.
- **Confirm modal** (`ConfirmModal` component, triggered from Detail): checkmark icon, "Vérifiez l'adresse avant de confirmer", read-only address box, checkbox "J'ai vérifié l'adresse...", green "Confirmer la livraison", "Annuler".
- **New/Edit form** (`app/delivery/new.tsx`, `?id=` for edit mode): Nom du destinataire, Adresse de livraison, Statut (select), primary submit button ("Enregistrer" / "Enregistrer les modifications").

---

# 9. Environment variables

| Variable | Purpose | Exposure |
|---|---|---|
| API base URL | Set in `src/api/client.ts`, auto-detected in dev via `expo-constants` `hostUri`, hardcoded prod URL for release builds | build-time |

Do not commit a teammate's personal local IP as the permanent fallback — keep the dev auto-detection logic so every team member's `expo start` works without editing the file.

---

# 10. Code standards and commands

- TypeScript strict, no `any`.
- Small, focused components — one responsibility per file.
- No unrelated refactors, no unrequested features, no over-engineering for a 9-day project.
- Every screen touching the API needs loading + error UI.

Commands to run after implementation, report exact output:

- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — ESLint
- `npx expo start` — manual test on device/simulator

When in doubt:

1. Keep it small.
2. Preserve the `app/` (routes) vs `src/` (logic/UI) boundary.
3. Ask a focused question if needed.
4. Save a short plan before coding non-trivial features.
5. Implement after confirmation.
6. Run available checks.
7. Share exact test steps.