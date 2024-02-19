const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "./database.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )`,
      (err) => {
        if (err) {
          console.error(err.message);
        }
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS wishlist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            item TEXT,
            FOREIGN KEY (userId) REFERENCES users (id)
        )`,
      (err) => {
        if (err) {
          console.error(err.message);
        }
      }
    );
  }
});

module.exports = db;
