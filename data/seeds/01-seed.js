const games = require("../json/games");
const currentDate = new Date();
const dayLong = 7 * 24 * 60 * 60 * 1000;
exports.seed = function(knex) {
  // players
  const players = [
    "Sarah Ting",
    "Jeffrey Ting",
    "Roger Yii",
    "James Tan",
    "Christopher Tan"
  ];

  // events
  const events = [];
  for (let i = 0; i < 5; i++) {
    events.push({
      name: generateEventName(),
      created_at: new Date(currentDate - dayLong * i * (7 + Math.random()))
    });
  }

  // create attendees
  const eventAttendees = {};
  for (const i in events) {
    eventAttendees[i] = [];
    const attendees = shuffle(players.keys()).slice(
      0,
      Math.ceil(Math.random() * players.length)
    );
    for (const j of attendees) {
      eventAttendees[i].push({
        player_id: j + 1,
        event_id: Number(i) + 1
      });
    }
  }

  // create rounds
  const eventRounds = [];
  const eventRoundPlayers = [];
  for (const i in events) {
    const numRounds = Math.ceil(Math.random() * 10);
    for (let j = 0; j < numRounds; j++) {
      eventRounds.push({
        event_id: Number(i) + 1,
        game_id: randomKey(games) + 1,
        created_at: new Date(
          Number(events[i].created_at) + Math.random() * 1000 * 60 * 60 * 5
        )
      });
      const players = shuffle(eventAttendees[i])
        .slice(0, Math.ceil(Math.random() * eventAttendees[i].length))
        .map(x => x.player_id);
      for (const x of players) {
        eventRoundPlayers.push({
          player_id: x,
          round_id: j + 1,
          score: Math.floor(Math.random() * 100)
        });
      }
    }
  }
  return knex("games")
    .insert(games.map(({ name, url }) => ({ name, url })))
    .then(() => knex("players").insert(players.map(x => ({ name: x }))))
    .then(() => knex("events").insert(events))
    .then(() => knex("rounds").insert(eventRounds))
    .then(() => knex("round_players").insert(eventRoundPlayers));
};

function generateEventName() {
  const people = ["Sarah", "Jeff", "Roger", "James", "Christopher"];
  const event = [
    "Birthday",
    "Barbeque",
    "Saturday",
    "House Party",
    "Games Night"
  ];
  return `${randomValue(people)}'s ${randomValue(event)}`;
}

function randomValue(array) {
  return array[randomKey(array)];
}

function randomKey(array) {
  return Math.floor(Math.random() * array.length);
}

function shuffle(array) {
  const newArray = [...array];
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return newArray;
}
