# Aero Sports Club: Hub

The main site for all our games and tournaments. Visitors land on the club page, pick a game (Chess, Carrom, ...), and then pick a tournament. Each tournament either links to its own website or shows live standings from a Google Sheet.

Chess Season 1 lives here: https://lkritheesh.github.io/aero-chess-open/

## Folder structure

```
aero-sports-hub/
├── index.html   page shell
├── style.css    design (cream / ink / copper, matches the chess site)
├── app.js       routing + standings logic (no need to edit)
└── data.js      THE ONLY FILE YOU EDIT: games and tournaments
```

## How the pages work

| Page | Address | Shows |
| --- | --- | --- |
| Club home | `#/` | Games and latest tournaments |
| Game | `#/g/chess` | All tournaments of that game |
| Tournament | `#/t/chess-open-s1` | Champion, link to full site, live standings and matches |

## Deploy (free, GitHub Pages)

1. Create a public GitHub repo named `aero-sports-hub`.
2. Upload `index.html`, `style.css`, `app.js`, `data.js`.
3. Go to **Settings -> Pages -> Deploy from a branch -> main -> / (root) -> Save**.
4. Your hub will be at `https://YOUR-USERNAME.github.io/aero-sports-hub/`.

If you use a different repo name, update the "All Games" links in the chess site's `index.html`.

## Add a new game

Open `data.js` and add a line to `games`:

```js
{ id: "tt", name: "Table Tennis", icon: "🏓", blurb: "Fast rallies, first to 11." }
```

`id` is a short lowercase word with no spaces. It is used in the address and must match `game` in the tournament entries.

## Add a new tournament

Add an entry to `tournaments` in `data.js`:

```js
{
  id: "tt-cup-s1",           // unique, no spaces
  game: "tt",                // must match a game id
  name: "Aero TT Cup",
  season: "Season 1",
  status: "upcoming",        // upcoming | live | completed
  date: "Nov 20 onwards",
  winner: "",                // fill in when finished
  runnerUp: "",
  url: "",                   // its own website, if it has one
  sheetId: "SHEET_ID_HERE"   // or a Google Sheet for the built-in page
}
```

There are two ways to run a tournament:

**A. Built-in page (easiest, no new website).** Leave `url` empty and set `sheetId`. The hub builds standings and matches from the sheet.

**B. Its own website.** Copy the chess site repo, change the sheet ID in its `config.js`, and put its address in `url`. The hub then shows a "Open full tournament site" button.

## Google Sheet setup (for each tournament)

1. Copy the chess Google Sheet. Keep three tabs named exactly **Settings**, **Players**, **Matches**.
2. Share it: **Share -> General access -> Anyone with the link -> Viewer**.
3. Copy the sheet ID, the part between `/d/` and `/edit` in the sheet's address.

**Players** columns: `id | name | paid | status`

**Matches** columns: `round | player1 | player2 | date | time | result`

Results: `P1` (player 1 won), `P2` (player 2 won), `Draw`, or `Pending`. Win = 1 point, draw = 0.5.

**Settings** is two columns (name, value). To show a champion, add:

| winner | Champion's name |
| --- | --- |
| runnerUp | Runner-up's name |

The hub and the tournament page pick these up within a minute, with no code change.

## Finish a tournament

1. Enter the last results in the sheet.
2. Add `winner` and `runnerUp` to the Settings tab.
3. In `data.js`, set `status: "completed"` and fill `winner` / `runnerUp` (optional, shows the name on the cards).

## Troubleshooting

- **"Could not load the sheet":** the sheet is not shared as "Anyone with the link can view", or a tab name is wrong.
- **Changes not showing:** hard refresh (Ctrl+Shift+R). GitHub Pages can take a minute after a commit.
- **Game page is empty:** the tournament's `game` value does not match the game's `id`.
- Do not put phone numbers, bank or UPI details in a public sheet.

## Photos and posters (v3 design)

- Create a folder called `photos` in the repo and upload your tournament pictures (`1.jpg`, `2.jpg`, ...).
- List them in `data.js` under `photos` with a caption. They appear in the horizontal Gallery strip (swipe, drag, or use the arrows).
- To give a tournament a poster, upload the image to `photos/` and set `poster: "photos/chess-poster.jpg"` on it. Without one, a clean icon poster is generated.
- The "About" text, the next-event banner and the game filter chips are also set in `data.js`.
- After changing files, bump the `?v=3` number in `index.html` so browsers load the new version.
