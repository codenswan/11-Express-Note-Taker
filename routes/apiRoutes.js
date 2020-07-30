const notes = require("../db/db.json");
const path = require("path");
const fs = require("fs");
const uniqueID = require("uniqid");

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    res.json(notes);
  });

  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uniqueID();
    notes.push(newNote);

    const dir = path.join(__dirname, "../db/db.json");
    const data = JSON.stringify(notes, null, 2);
    fs.writeFileSync(dir, data, (err) => {
      if (err) throw err
      console.log("New note added");
    });
    res.json(notes)
  });

  app.delete("api/notes/:id", (req, res) => {
    const note = req.params.id
    console.log(note);
  })
};
