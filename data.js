// ===== EDIT ONLY THIS FILE to change the site =====
window.HUB = {
  org: {
    name: "Aero Games Hub",
    about: "Aero Games Hub is the home of every game and tournament run by the Aero Games Organization. Main reason for the creation of these events are to integrate students in the class, take a break from all the stressful studies and just have fun. This hub is the gateway for all the organized tournaments. Pick a tournament, check who plays whom, follow the live table and see who takes the crown.",
    sub: "Open to everyone: experienced players, beginners and anyone who just wants a break from class. Registration is small, the rivalry is big."
  },
  // Games used for the filter chips (icon = emoji)
  games: [
    { id: "chess", name: "Chess", icon: "♞" },
    { id: "badminton", name: "Badminton", icon: "🏸" },
    { id: "racing", name: "Racing", icon: "🏁" }
  ],
  // Next event banner (set to null to hide)
  next: { title: "Next tournament coming soon", text: "Want your game here? Tell the organisers and we will set it up.", label: "Suggest a game", url: "mailto:businesschime1@gmail.com" },
  // Photos: put image files in a folder called photos/ in this repo
  photos: [
    { src: "photos/1.jpeg", caption: "Round of 16" },
    { src: "photos/2.jpeg", caption: "Game face on" },
    { src: "photos/3.jpeg", caption: "Round of 16 Game 5" },
    { src: "photos/4.jpeg", caption: "Openings by book" },
    { src: "photos/5.jpeg", caption: "Time's ticking!" },
    { src: "photos/6.jpeg", caption: "Patience Wins Games" },
    { src: "photos/7.jpeg", caption: "Winner's prize!" },
    { src: "photos/8.jpeg", caption: "Quarter Final!" },
    { src: "photos/9.jpeg", caption: "Runner up's prize!" },
    { src: "photos/10.jpeg", caption: "Semi Finals" },
    { src: "photos/11.jpeg", caption: "Prize time (Runner up!)" },
    { src: "photos/12.jpeg", caption: "Prize time (Winner!!)" },
    { src: "photos/13.jpeg", caption: "Finals" },
    { src: "photos/14.jpeg", caption: "Finals" },
  ],
  tournaments: [
    {
      id: "chess-open-s1", game: "chess", name: "Aero Chess Open", season: "Season 1",
      status: "completed",               // upcoming | live | completed
      date: "Sep 30 onwards",
      poster: "",                        // optional poster image, e.g. "photos/chess-poster.jpg"
      winner: "",                        // leave empty to read from the Google Sheet (Settings tab)
      runnerUp: "",
      url: "https://lkritheesh.github.io/aero-chess-open/",
      sheetId: "1TU7oxekoErJuN9eIZFujQTNRbCMAqBky-p-3WysGTpk"
    },
    {
      id: "chess-open-s2", game: "chess", name: "Aero Chess Open", season: "Season 2",
      status: "upcoming", date: "Dates to be announced",
      poster: "photos/chess-s2-poster.jpg",
      details: ["Venue: Aero 3rd Year Classroom", "For 3rd Year Aero students"],
      winner: "", runnerUp: "", url: "", sheetId: ""
    },
    {
      id: "badminton-open", game: "badminton", name: "Aerospace Badminton Tournament", season: "Season 1",
      status: "upcoming", date: "22 November",
      poster: "photos/badminton-poster.jpg",
      details: ["Venue: Synthetic Badminton Court, Behind Vasistha", "Badminton Support Coordinator: Viswanath K"],
      winner: "", runnerUp: "",
      url: "https://lkritheesh.github.io/aero-badminton-open/",
      sheetId: "1qPVsGHSQphinLdd4ydsIY9ovki3zz8sSppwHfnhz3fY"
    },
    {
      id: "apex-cup", game: "racing", name: "The Apex Cup Grand Prix", season: "Season 1",
      status: "upcoming", date: "Dates to be announced",
      poster: "photos/apex-cup-poster.jpg",
      details: ["Powered by RaceRoom Racing Experience", "Circuit: Sepang International Circuit"],
      winner: "", runnerUp: "", url: "", sheetId: ""
    }
  ]
};
