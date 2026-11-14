// ===== EDIT ONLY THIS FILE to add games & tournaments =====
window.HUB = {
  org: { name: "Aero Sports Club", tagline: "Friendly competitions for 3rd Year Aerospace Engineering. Pick a game, join a tournament, watch the table." },
  games: [
    { id: "chess", name: "Chess", icon: "♞", blurb: "Rapid boards, 10 minutes a side." },
    { id: "carrom", name: "Carrom", icon: "◎", blurb: "Coming soon." }
    // { id: "tt", name: "Table Tennis", icon: "🏓", blurb: "..." }
  ],
  tournaments: [
    {
      id: "chess-open-s1", game: "chess", name: "Aero Chess Open", season: "Season 1",
      status: "completed",              // upcoming | live | completed
      date: "Sep 30 onwards",
      winner: "",                       // leave empty to use the winner from the Google Sheet (Settings tab)
      runnerUp: "",                     // optional
      url: "https://lkritheesh.github.io/aero-chess-open/", // existing site
      sheetId: "1TU7oxekoErJuN9eIZFujQTNRbCMAqBky-p-3WysGTpk" // winner/runnerUp can also come from the Settings tab
    }
    // New tournament with NO separate site: fill sheetId and leave url "".
  ]
};
