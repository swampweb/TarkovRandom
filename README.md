# CajunVeteran Raid Roulette

A simple static website for a Tarkov stream event.

## What it does

- Admin setup page
- Streamer entry page
- Shared dashboard page
- Player name, level, and money/budget fields
- Ready status turns players green
- Admin chooses map and day/night
- Admin randomizes loadouts only when all players are ready
- Streamers may mod the assigned weapon however they want, but must use the gun they were given

## Upload to GitHub Pages

1. Create a new GitHub repository.
2. Upload these files to the root of the repository:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
3. Go to repository **Settings**.
4. Go to **Pages**.
5. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. Save.
7. GitHub will give you a public website link.

## Important note

This first version is a static front-end prototype. It uses browser local storage, so it works best when one person controls the event from one browser. For true live shared admin/viewer/dashboard links across multiple streamers, the next step is adding a backend like Firebase or Supabase.
