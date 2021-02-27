import express from "express";
import sqlite from "sqlite3";
const app = express();
import cors from "cors";

const conn = sqlite.verbose();
const db = new conn.Database(__dirname + "./score.db", (err) => {
  if (err) {
    console.log("error connecting to database: ");
    console.log(err);
    return;
  }

  console.log("Successfully connected to database");
});

app.use(cors());

app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("world");
});

app.get("/leaderboard", (req, res) => {
  db.all("SELECT * FROM leaderboard ORDER BY score DESC", [], (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }

    res.send(JSON.stringify(rows));
  });
});

app.post("/upload", (req, res) => {
  if (!req.body) return res.send("input required");

  const { name, score } = req.body;
  if (!name || !score) return res.send("name and score cant be null");

  db.get(`SELECT * FROM leaderboard WHERE name = "${name}"`, (err, row) => {
    if (err) {
      console.error(err);
      return;
    }

    if (row !== undefined)
      return res.send({ error: `${name} is already taken` });

    db.all("SELECT * FROM leaderboard ORDER BY score DESC", (err, row) => {
      if (err) {
        console.error(err);
        return;
      }

      if (row.length >= 10 && row.find((it) => it.score > score)) {
        return res.send({ success: false });
      }

      db.run(
        "INSERT INTO leaderboard (name, score) VALUES (?,?)",
        [name, score],
        (err) => {
          if (err) {
            console.error(err);
            return;
          }

          res.send({ success: true });
        }
      );
      if (row.length > 10) {
        db.run(
          "DELETE FROM leaderboard WHERE name = ?",
          [row[row.length - 1].name],
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
      }
    });
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
