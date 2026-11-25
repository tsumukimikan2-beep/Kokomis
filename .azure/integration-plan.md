# Integration Plan

## Backend
- No backend service. This project is a static frontend.
- Entry: `index.html`
- Health endpoint: none
- Run command: open `index.html` in Chrome or Edge, or serve the workspace with a static server.

## Frontend
- Project folder: workspace root
- Build command: none (plain HTML/CSS/JavaScript)
- Dev command: serve workspace root with a static HTTP server
- API seam: none; no API routes or mock data require wiring.
- Mock files to remove: none

## API routes
- `GET /` — render `index.html` — status 200

## Database
- None
- Migration tool: none
- Migrations required: none
- Seed data: prohibited/not applicable

## Shared types
- None

## Services
- Essential: static browser rendering, theme control, bottom navigation
- Enhancement: ambient motion and orbit interaction

## Integration results
- 2026-11-24: Integration verified for the static frontend.
- Database migrations: not required; no relational database or migration tool is present.
- Backend: not present; smoke test is the static HTTP route inventory (home page and assets).
- Frontend data wiring: not required; no API seam or mock data layer exists.
- End-to-end verification: run the workspace through a local static HTTP server and verify the browser-facing route and assets return 200.
