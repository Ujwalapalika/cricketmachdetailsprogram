const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const database = path.join(__dirname, "cricketMatchDetails.db");
let db = null;
const initializedbserver = async () => {
  try {
    const db = open({
      filename: database,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server running");
    });
  } catch (e) {
    console.log("Db error:", e, message);
    process.exit(1);
  }
};
initializedbserver();
const playerdet = (eachplayer) => {
  return {
    playerId: eachplayer.player_id,
    playerName: eachplayer.player_name,
  };
};
app.get("/players/", async (request, response) => {
  const getPlayersQuery = `
    SELECT
      *
    FROM
      player_details;`;
  const dbres = await db.all(player_detailsq);
  response.send(dbres.map((eachplayer) => playerdet(eachplayer)));
});
app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getplayer = `select * from player_details where player_id=${playerId};`;
  const dbresponse = await db.get(getplayer);
  response.send(playerdet(dbresponse));
});
module.exports = app;
