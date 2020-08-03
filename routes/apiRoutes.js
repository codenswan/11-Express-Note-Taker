const notes = require("../db/db.json");
const path = require("path");
const fs = require("fs");
const uniqueID = require("uniqid");
const dir = path.join(__dirname, "../db/db.json");

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    res.json(notes);
  });

  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uniqueID();
    notes.push(newNote);

    const data = JSON.stringify(notes, null, 2);
    try {
      fs.writeFileSync(dir, data);
      res.json(notes);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  });

  app.delete("/api/notes/:id", (req, res) => {
    const noteIdToDelete = req.params.id;

    let allTheNotes = JSON.parse(fs.readFileSync(dir, "utf-8")) || [];

    const filtered = allTheNotes.filter((note) => {
      const leaveNote = note.id !== noteIdToDelete;
      return leaveNote;
    });

    try {
      fs.writeFileSync(dir, JSON.stringify(filtered));
      res.json(filtered);
    } catch (err) {
      console.log(err);
      res.status(400).json({
      message: err,
      });
    }
  });
};
